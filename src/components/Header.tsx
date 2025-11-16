import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code2 } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Code2 className="w-8 h-8 text-[#1A73E8]" />
            <span className="text-2xl font-bold text-gray-900">
              Pro<span className="text-[#1A73E8]">develo</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-base font-medium transition-colors ${
                isActive('/') ? 'text-[#1A73E8]' : 'text-gray-700 hover:text-[#1A73E8]'
              }`}
            >
              Accueil
            </Link>
            <Link
              to="/services"
              className={`text-base font-medium transition-colors ${
                isActive('/services') ? 'text-[#1A73E8]' : 'text-gray-700 hover:text-[#1A73E8]'
              }`}
            >
              Services & Tarifs
            </Link>
            <Link
              to="/contact"
              className="bg-[#1A73E8] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#1557b0] transition-colors"
            >
              Contact
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg ${
                isActive('/') ? 'bg-[#1A73E8] text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Accueil
            </Link>
            <Link
              to="/services"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg ${
                isActive('/services') ? 'bg-[#1A73E8] text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Services & Tarifs
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 bg-[#1A73E8] text-white rounded-lg text-center"
            >
              Contact
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
