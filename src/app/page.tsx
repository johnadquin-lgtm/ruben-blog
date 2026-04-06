'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import PostCard from '@/components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch posts from API
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data.slice(0, 6)); // Show last 6 posts
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-600 to-amber-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Rubén Fidalgo
              </h1>
              <p className="text-xl md:text-2xl text-amber-100 mb-6 font-semibold">
                Coaching Deportivo & Desarrollo Personal
              </p>
              <p className="text-lg text-amber-100 mb-8 leading-relaxed">
                Especializado en desarrollo de mentalidad, rendimiento bajo presión y transformación personal. Entrena más allá del físico.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/blog"
                  className="inline-block bg-white text-amber-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors text-center"
                >
                  Ver Blog
                </Link>
                <a
                  href="#contact"
                  className="inline-block border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-amber-700 transition-colors text-center"
                >
                  Contactar
                </a>
              </div>
            </div>

            {/* Right - Image Placeholder */}
            <div className="hidden md:block relative h-96">
              <div className="absolute inset-0 bg-amber-400 rounded-lg opacity-30"></div>
              <div className="absolute inset-4 bg-gradient-to-br from-amber-300 to-amber-500 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-24 h-24 text-white mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  <p className="text-white text-lg font-semibold">Imagen de Perfil</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Últimos Artículos</h2>
            <p className="text-lg text-gray-600">
              Descubre reflexiones sobre mentalidad, rendimiento y desarrollo personal
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {posts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>

              {/* View All Button */}
              <div className="text-center">
                <Link
                  href="/blog"
                  className="inline-block bg-amber-700 text-white font-semibold px-8 py-3 rounded-lg hover:bg-amber-800 transition-colors"
                >
                  Ver todos los artículos
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <div className="hidden md:block relative h-96">
              <div className="absolute inset-0 bg-amber-100 rounded-lg opacity-50"></div>
              <div className="absolute inset-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-24 h-24 text-amber-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-amber-700 text-lg font-semibold">Sobre Mí</p>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Sobre Mí
              </h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Con más de una década de experiencia en coaching deportivo, me especializo en desarrollar la mentalidad ganadora en atletas y profesionales.
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Creo que el verdadero cambio ocurre cuando entrenas lo que no se ve: tu mentalidad, emociones, creencias y narrativa interna.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                A través de este blog, comparto herramientas, reflexiones y estrategias probadas para impulsar tu rendimiento personal y profesional.
              </p>

              {/* Values */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-md bg-amber-700 text-white">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-semibold">Mentalidad Ganadora</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-md bg-amber-700 text-white">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-semibold">Cambio Real</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-md bg-amber-700 text-white">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-semibold">Rendimiento</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-md bg-amber-700 text-white">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-semibold">Transformación</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">¿Quieres trabajar conmigo?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Si estás interesado en coaching personalizado o charlas, no dudes en contactarme.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="mailto:contacto@fidalgoruben.com"
              className="inline-block bg-amber-700 text-white font-semibold px-8 py-3 rounded-lg hover:bg-amber-800 transition-colors"
            >
              Enviar Email
            </a>
            <a
              href="#"
              className="inline-block border-2 border-amber-700 text-amber-400 font-semibold px-8 py-3 rounded-lg hover:bg-amber-700 hover:text-white transition-colors"
            >
              Redes Sociales
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
