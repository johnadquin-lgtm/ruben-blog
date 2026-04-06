'use client';

import { useSearchParams } from 'next/navigation';
import PostCard from '@/components/PostCard';
import type { PostMetadata } from '@/lib/posts';

interface BlogClientProps {
  posts: PostMetadata[];
  categories: string[];
}

export default function BlogClient({ posts, categories }: BlogClientProps) {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  const filteredPosts = category
    ? posts.filter((post) => post.category === category)
    : posts;

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Categorías</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/blog"
                    className={`block px-4 py-2 rounded-lg transition-colors ${
                      !category
                        ? 'bg-amber-700 text-white font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Todas
                  </a>
                </li>
                {categories.map((cat) => (
                  <li key={cat}>
                    <a
                      href={`/blog?category=${encodeURIComponent(cat)}`}
                      className={`block px-4 py-2 rounded-lg transition-colors capitalize ${
                        category === cat
                          ? 'bg-amber-700 text-white font-semibold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {cat}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Posts Grid */}
          <main className="lg:col-span-3">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-600 text-lg">
                  No hay artículos en esta categoría por el momento.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}
