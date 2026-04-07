import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get('slug');
  
  if (slug) {
    const post = await getPostBySlug(slug);
    if (!post) {
      return NextResponse.json({ error: 'Post no encontrado' }, { status: 404 });
    }
    return NextResponse.json([post]);
  }
  
  const posts = await getAllPosts();
  return NextResponse.json(posts);
}
