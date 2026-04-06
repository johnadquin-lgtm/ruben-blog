import Link from 'next/link';
import Image from 'next/image';
import { PostMetadata } from '@/lib/posts';

export default function PostCard({ post }: { post: PostMetadata }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      {post.image && (
        <div className="relative h-48 w-full overflow-hidden bg-gray-200">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Category Badge */}
        {post.category && (
          <div className="mb-3">
            <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full">
              {post.category}
            </span>
          </div>
        )}

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-amber-700">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h2>

        {/* Date */}
        <p className="text-sm text-gray-500 mb-3">
          {formatDate(post.date)}
        </p>

        {/* Excerpt */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Read More Link */}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-block text-amber-700 font-semibold hover:text-amber-900 transition-colors"
        >
          Leer más →
        </Link>
      </div>
    </article>
  );
}
