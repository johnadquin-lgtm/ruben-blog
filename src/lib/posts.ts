'use server';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
  category?: string;
}

export interface Post extends PostMetadata {
  content: string;
}

// Obtener todos los posts
export async function getAllPosts(): Promise<PostMetadata[]> {
  const files = fs.readdirSync(postsDirectory);
  
  const posts = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(postsDirectory, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug: file.replace('.md', ''),
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        image: data.image,
        category: data.category,
      };
    });

  // Ordenar por fecha (más reciente primero)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Obtener un post específico por slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const filePath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      image: data.image,
      category: data.category,
      content,
    };
  } catch {
    return null;
  }
}

// Obtener posts por categoría
export async function getPostsByCategory(category: string): Promise<PostMetadata[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.category === category);
}

// Obtener categorías únicas
export async function getCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const categories = new Set(
    posts
      .map((post) => post.category)
      .filter((cat): cat is string => !!cat)
  );
  return Array.from(categories);
}

// Actualizar un post existente
export async function updatePost(
  slug: string,
  updates: {
    title?: string;
    excerpt?: string;
    content?: string;
    category?: string;
    image?: string;
  }
): Promise<{ success: boolean; slug: string }> {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`Post "${slug}" no encontrado`);
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  // Actualizar campos
  const updatedData = {
    ...data,
    ...(updates.title && { title: updates.title }),
    ...(updates.excerpt && { excerpt: updates.excerpt }),
    ...(updates.content !== undefined && { content: updates.content }),
    ...(updates.category && { category: updates.category }),
    ...(updates.image !== undefined && { image: updates.image }),
  };

  // Si se actualiza el título, puede cambiar el slug
  const newSlug = updates.title
    ? updates.title
        .toLowerCase()
        .replace(/[^a-z0-9áéíóúñü\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
    : slug;

  // Generar el contenido del archivo
  const newContent = matter.stringify(updates.content !== undefined ? updates.content : content, updatedData);

  // Si el slug cambió, renombrar el archivo
  if (newSlug !== slug) {
    const newFilePath = path.join(postsDirectory, `${newSlug}.md`);
    fs.writeFileSync(newFilePath, newContent, 'utf8');
    fs.unlinkSync(filePath);
    return { success: true, slug: newSlug };
  }

  fs.writeFileSync(filePath, newContent, 'utf8');
  return { success: true, slug };
}

// Eliminar un post
export async function deletePost(slug: string): Promise<{ success: boolean }> {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`Post "${slug}" no encontrado`);
  }

  fs.unlinkSync(filePath);
  return { success: true };
}
