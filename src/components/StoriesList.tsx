'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PostMetadata } from '@/lib/posts';

interface StoriesListProps {
  posts: PostMetadata[];
}

export default function StoriesList({ posts }: StoriesListProps) {
  // Mostrar solo los primeros 8 posts que tengan imagen
  const storiesPosts = posts.filter(post => post.image).slice(0, 8);

  return (
    <section className="bg-gradient-to-b from-amber-50 to-transparent py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Historias</h2>
          <Link 
            href="/blog" 
            className="text-amber-700 hover:text-amber-900 text-sm font-medium transition-colors"
          >
            Ver todas
          </Link>
        </div>
        
        <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
          {storiesPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex flex-col items-center gap-3 flex-shrink-0 group"
            >
              {/* Story Circle Image */}
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-amber-200 group-hover:border-amber-400 transition-colors shadow-md flex-shrink-0">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                    <span className="text-amber-700 text-xs text-center px-2">Foto</span>
                  </div>
                )}
              </div>

              {/* Story Title */}
              <p className="text-sm text-gray-700 text-center line-clamp-2 max-w-[100px] group-hover:text-amber-700 transition-colors">
                {post.title}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
