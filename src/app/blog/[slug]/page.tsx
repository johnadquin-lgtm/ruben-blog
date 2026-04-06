import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import Link from 'next/link';
import Image from 'next/image';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <>
      {/* Article Header */}
      {post.image && (
        <div className="relative w-full h-96 bg-gray-200">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Article Content */}
      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-block text-blue-600 hover:text-blue-800 font-medium mb-6"
          >
            ← Volver al blog
          </Link>

          {/* Meta */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-gray-600">
              <span>{formatDate(post.date)}</span>
              {post.category && (
                <>
                  <div className="hidden sm:block">•</div>
                  <Link
                    href={`/blog?category=${encodeURIComponent(post.category)}`}
                    className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full hover:bg-blue-200 transition-colors mt-2 sm:mt-0"
                  >
                    {post.category}
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-gray-600 italic mb-8 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Content */}
          <div className="mb-12">
            <MarkdownRenderer content={post.content} />
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Rubén Fidalgo
                </h3>
                <p className="text-gray-600">
                  Coach deportivo especializado en desarrollo mental y rendimiento bajo presión.
                </p>
              </div>
            </div>
          </div>

          {/* Related Posts Section */}
          <div className="mt-12 pt-12 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Más artículos
            </h3>
            <Link
              href="/blog"
              className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ver todos los artículos
            </Link>
          </div>
        </div>
      </article>

      {/* Subscribe Section */}
      <section className="py-12 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Te gustó este artículo?
          </h2>
          <p className="text-gray-600 mb-6">
            Suscríbete para recibir nuevos artículos y reflexiones sobre coaching deportivo.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-600"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Suscribirse
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
