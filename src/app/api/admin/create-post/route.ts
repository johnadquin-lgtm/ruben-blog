import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// Generar slug desde el título
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Obtener datos del formulario
    const title = formData.get('title') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const category = formData.get('category') as string;
    const imageFile = formData.get('image') as File;

    // Validación
    if (!title?.trim()) {
      return NextResponse.json(
        { error: 'El título es obligatorio' },
        { status: 400 }
      );
    }
    if (!excerpt?.trim()) {
      return NextResponse.json(
        { error: 'El excerpt es obligatorio' },
        { status: 400 }
      );
    }
    if (!content?.trim()) {
      return NextResponse.json(
        { error: 'El contenido es obligatorio' },
        { status: 400 }
      );
    }
    if (!imageFile) {
      return NextResponse.json(
        { error: 'La imagen es obligatoria' },
        { status: 400 }
      );
    }

    const validCategories = ['mentalidad', 'desarrollo', 'vida-activa'];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: 'Categoría no válida' },
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

    // Generar slug y nombres de archivo
    const slug = slugify(title);
    
    // Verificar que el slug no exista ya
    const postsDir = join(process.cwd(), 'posts');
    const postPath = join(postsDir, `${slug}.md`);
    
    if (existsSync(postPath)) {
      return NextResponse.json(
        { error: 'Un post con ese título ya existe' },
        { status: 400 }
      );
    }

    // Guardar imagen
    const imagesDir = join(process.cwd(), 'public', 'images');
    
    // Crear directorio si no existe
    if (!existsSync(imagesDir)) {
      await mkdir(imagesDir, { recursive: true });
    }

    // Generar nombre único para la imagen
    const imageExtension = imageFile.name.split('.').pop() || 'jpg';
    const imageName = `${slug}-${Date.now()}.${imageExtension}`;
    const imagePath = join(imagesDir, imageName);

    // Guardar imagen
    const imageBuffer = await imageFile.arrayBuffer();
    await writeFile(imagePath, Buffer.from(imageBuffer));

    // Crear contenido del archivo markdown
    const today = new Date().toISOString().split('T')[0];
    const markdownContent = `---
title: "${title}"
date: ${today}
excerpt: "${excerpt}"
image: "/images/${imageName}"
category: "${category}"
---

${content}
`;

    // Guardar archivo markdown
    if (!existsSync(postsDir)) {
      await mkdir(postsDir, { recursive: true });
    }

    await writeFile(postPath, markdownContent, 'utf-8');

    // Retornar respuesta exitosa
    return NextResponse.json(
      {
        success: true,
        slug,
        message: 'Post creado exitosamente',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Error al crear el post',
      },
      { status: 500 }
    );
  }
}
