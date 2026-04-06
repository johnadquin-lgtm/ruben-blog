import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Rubén Fidalgo</h3>
            <p className="text-sm text-gray-400">
              Coaching deportivo y desarrollo personal. Entrena más allá del físico.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-amber-400 transition-colors">Inicio</Link></li>
              <li><Link href="/blog" className="hover:text-amber-400 transition-colors">Blog</Link></li>
              <li><Link href="/#about" className="hover:text-amber-400 transition-colors">Sobre Mí</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">Categorías</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog?category=mentalidad" className="hover:text-amber-400 transition-colors">Mentalidad</Link></li>
              <li><Link href="/blog?category=vida-activa" className="hover:text-amber-400 transition-colors">Vida Activa</Link></li>
              <li><Link href="/blog?category=desarrollo" className="hover:text-amber-400 transition-colors">Desarrollo</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Sígueme</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-amber-400 transition-colors" title="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-amber-400 transition-colors" title="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m0 2.12c5.496 0 9.88 4.385 9.88 9.88s-4.385 9.88-9.88 9.88S2.12 17.496 2.12 12 6.504 2.12 12 2.12m0 1.44c-4.707 0-8.44 3.733-8.44 8.44s3.733 8.44 8.44 8.44 8.44-3.733 8.44-8.44-3.733-8.44-8.44-8.44m0 1.35c3.998 0 7.09 3.092 7.09 7.09s-3.092 7.09-7.09 7.09-7.09-3.092-7.09-7.09 3.092-7.09 7.09-7.09m4.088-1.42c-.476 0-.92.193-1.248.52-.328.328-.52.772-.52 1.248 0 .976.793 1.768 1.768 1.768.476 0 .92-.192 1.248-.52.328-.327.52-.771.52-1.248 0-.976-.793-1.768-1.768-1.768"/>
                </svg>
              </a>
              <a href="#" className="hover:text-amber-400 transition-colors" title="Twitter">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 002.856-9.97 10.02 10.02 0 01-2.857 2.857c1.03-1.59 1.45-3.37 1.275-5.14 1.05-.555 2.052-1.206 3-1.963-1.157.522-2.387.875-3.658 1.026.516-.635.887-1.379 1.106-2.175-1.223.732-2.53 1.307-3.918 1.69C19.503 1.054 18.18.614 16.823.614c-2.606 0-4.72 2.114-4.72 4.72 0 .37.041.73.121 1.08-3.92-.196-7.405-2.073-9.74-4.925-.405.694-.635 1.5-.635 2.365 0 1.64.834 3.087 2.1 3.94-.775-.025-1.504-.237-2.14-.583v.06c0 2.283 1.622 4.185 3.772 4.62-.395.108-.813.166-1.242.166-.303 0-.598-.028-.888-.083.599 1.86 2.311 3.214 4.35 3.25-1.612 1.26-3.64 2.012-5.84 2.012-.378 0-.75-.022-1.117-.067 2.137 1.37 4.684 2.167 7.413 2.167 8.894 0 13.75-7.368 13.75-13.75 0-.21-.005-.42-.015-.63 1.002-1.027 1.872-2.318 2.557-3.787"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {currentYear} Rubén Fidalgo. Todos los derechos reservados.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-gray-300 transition-colors">Política de Privacidad</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Términos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
