import { getAllPosts, getCategories } from '@/lib/posts';
import BlogClient from './blog-client';
import StoriesList from '@/components/StoriesList';

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const allPosts = await getAllPosts();
  const categories = await getCategories();

  return (
    <>
      {/* Stories Section */}
      <StoriesList />

      {/* Content */}
      <BlogClient posts={allPosts} categories={categories} />
    </>
  );
}
