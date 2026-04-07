import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import LogoutButton from '@/components/LogoutButton';
import PostActions from '@/components/PostActions';

export default async function AdminDashboard() {
  const allPosts = await getAllPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Panel de Admin</h1>
              <p className="text-gray-600 mt-1">Gestiona tu blog de manera visual</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/blog"
                className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors"
              >
                ← Volver al Blog
              </Link>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-2">¡Bienvenido al Panel de Administración!</h2>
          <p className="text-amber-100 max-w-2xl">
            Desde aquí puedes crear nuevos posts, editar existentes y gestionar el contenido de tu blog de manera visual sin tocar código.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Create New Post */}
          <Link
            href="/admin/nuevo-post"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-2 border-amber-200 hover:border-amber-400"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">✨</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Crear Nuevo Post</h3>
                <p className="text-gray-600 text-sm">
                  Formula visual para crear un nuevo artículo con imagen, título, contenido y más.
                </p>
                <div className="mt-4 text-amber-700 font-semibold text-sm">
                  Ir →
                </div>
              </div>
            </div>
          </Link>

          {/* Statistics */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-4">
              <div className="text-3xl">📊</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Estadísticas</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total de posts:</span>
                    <span className="font-bold text-amber-700">{allPosts.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Posts con imagen:</span>
                    <span className="font-bold text-amber-700">
                      {allPosts.filter(p => p.image).length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Posts sin imagen:</span>
                    <span className="font-bold text-red-600">
                      {allPosts.filter(p => !p.image).length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-bold text-gray-900">Posts Recientes</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Título</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Categoría</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Imagen</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">En Stories</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {allPosts.slice(0, 10).map((post) => (
                  <tr key={post.slug} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{post.title}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {post.image ? (
                        <span className="text-green-600 font-semibold">✓ Sí</span>
                      ) : (
                        <span className="text-red-600 font-semibold">✗ No</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {post.image ? (
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          Sí aparece
                        </span>
                      ) : (
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                          No aparece
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <PostActions slug={post.slug} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {allPosts.length === 0 && (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500">No hay posts aún. ¡Crea el primero!</p>
            </div>
          )}
        </div>

        {/* Info Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {/* Create Post Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
              <span className="text-xl">📝</span> Crear Post
            </h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>✓ Formulario visual completo</li>
              <li>✓ Sube imagen desde tu compu</li>
              <li>✓ Editor de contenido de markdown</li>
              <li>✓ Vista previa de imagen</li>
              <li>✓ Se publica automáticamente</li>
            </ul>
          </div>

          {/* Tips */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
              <span className="text-xl">💡</span> Consejos
            </h3>
            <ul className="text-sm text-green-800 space-y-2">
              <li>✓ Necesitas imagen para stories</li>
              <li>✓ Usa markdown en el contenido</li>
              <li>✓ Imagen máximo 5MB</li>
              <li>✓ Elige categoría relevante</li>
              <li>✓ Escribe excerpt atractivo</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
