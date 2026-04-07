import { NextRequest, NextResponse } from 'next/server';
import { updatePost, deletePost, getPostBySlug } from '@/lib/posts';
import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'posts');
const publicImagesDirectory = path.join(process.cwd(), 'public/images/posts');

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const formData = await request.formData();
    
    const title = formData.get('title') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const category = formData.get('category') as string;
    const image = formData.get('image') as File | null;
    const removeImage = formData.get('removeImage') === 'true';

    // Obtener el post actual
    const currentPost = await getPostBySlug(slug);
    if (!currentPost) {
      return NextResponse.json(
        { error: 'Post no encontrado' },
        { status: 404 }
      );
    }

    let imagePath = currentPost.image;

    // Manejar nueva imagen
    if (image) {
      // Eliminar imagen anterior si existe
      if (currentPost.image) {
        const oldImagePath = path.join(process.cwd(), 'public', currentPost.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Guardar nueva imagen
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const imageName = `${Date.now()}-${image.name}`;
      const imageDir = path.join(process.cwd(), 'public/images/posts');
      
      if (!fs.existsSync(imageDir)) {
        fs.mkdirSync(imageDir, { recursive: true });
      }

      const imagePathFull = path.join(imageDir, imageName);
      fs.writeFileSync(imagePathFull, buffer);
      imagePath = `/images/posts/${imageName}`;
    }

    // Eliminar imagen si se solicita
    if (removeImage && currentPost.image) {
      const oldImagePath = path.join(process.cwd(), 'public', currentPost.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      imagePath = undefined;
    }

    // Actualizar el post
    const result = await updatePost(slug, {
      title,
      excerpt,
      content,
      category,
      image: imagePath,
    });

    return NextResponse.json({
      success: true,
      slug: result.slug,
    });
  } catch (error) {
    console.error('Error al actualizar post:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error al actualizar el post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    // Obtener el post para eliminar la imagen asociada
    const currentPost = await getPostBySlug(slug);
    if (!currentPost) {
      return NextResponse.json(
        { error: 'Post no encontrado' },
        { status: 404 }
      );
    }

    // Eliminar imagen asociada si existe
    if (currentPost.image) {
      const imagePath = path.join(process.cwd(), 'public', currentPost.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Eliminar el post
    await deletePost(slug);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al eliminar post:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error al eliminar el post' },
      { status: 500 }
    );
  }
}
