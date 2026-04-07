'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

          {/* Navigation Links - Desktop */}
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
            <Link 
              href="/stories" 
              className="text-gray-700 hover:text-amber-700 font-medium transition-colors"
            >
              📖 Historias
            </Link>
            <Link 
              href="/viewer" 
              className="text-gray-700 hover:text-amber-700 font-medium transition-colors"
            >
              👁️ Visor
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
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-amber-700 font-medium transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                href="/blog" 
                className="text-gray-700 hover:text-amber-700 font-medium transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/#about" 
                className="text-gray-700 hover:text-amber-700 font-medium transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sobre Mí
              </Link>
              <Link 
                href="/#contact" 
                className="text-gray-700 hover:text-amber-700 font-medium transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contacto
              </Link>
              <Link 
                href="/stories" 
                className="text-gray-700 hover:text-amber-700 font-medium transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                📖 Historias
              </Link>
              <Link 
                href="/viewer" 
                className="text-gray-700 hover:text-amber-700 font-medium transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                👁️ Visor
              </Link>
              <Link 
                href="/admin" 
                className="text-xs px-3 py-2 bg-amber-100 text-amber-700 rounded-full hover:bg-amber-200 font-semibold transition-colors text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                ⚙️ Admin
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
