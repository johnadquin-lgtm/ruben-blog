import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">RF</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
              Rubén Fidalgo
            </h1>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-amber-700 font-medium transition-colors"
            >
              Inicio
            </Link>
            <Link 
              href="/blog" 
              className="text-gray-700 hover:text-amber-700 font-medium transition-colors"
            >
              Blog
            </Link>
            <Link 
              href="/#about" 
              className="text-gray-700 hover:text-amber-700 font-medium transition-colors"
            >
              Sobre Mí
            </Link>
            <Link 
              href="/#contact" 
              className="text-gray-700 hover:text-amber-700 font-medium transition-colors"
            >
              Contacto
            </Link>
            
            {/* Admin Button */}
            <Link 
              href="/admin" 
              className="text-xs px-3 py-1 bg-amber-100 text-amber-700 rounded-full hover:bg-amber-200 font-semibold transition-colors"
              title="Panel de administración"
            >
              ⚙️ Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 rounded-md text-gray-700 hover:bg-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
