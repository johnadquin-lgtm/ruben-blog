import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image') as File;

    if (!imageFile) {
      return NextResponse.json(
        { error: 'La imagen es obligatoria' },
        { status: 400 }
      );
    }

    // Validar tamaño de imagen (5MB max)
    if (imageFile.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'La imagen es demasiado grande (máximo 5MB)' },
        { status: 400 }
      );
    }

    // Guardar imagen en public/images/stories/
    const storiesImagesDir = join(process.cwd(), 'public', 'images', 'stories');

    if (!existsSync(storiesImagesDir)) {
      await mkdir(storiesImagesDir, { recursive: true });
    }

    // Generar nombre único para la imagen
    const imageExtension = imageFile.name.split('.').pop() || 'jpg';
    const imageName = `story-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${imageExtension}`;
    const imagePath = join(storiesImagesDir, imageName);

    // Guardar imagen
    const imageBuffer = await imageFile.arrayBuffer();
    await writeFile(imagePath, Buffer.from(imageBuffer));

    // URL pública de la imagen
    const imageUrl = `/images/stories/${imageName}`;

    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error('Error uploading story image:', error);
    return NextResponse.json(
      { error: 'Error al subir la imagen' },
      { status: 500 }
    );
  }
}
