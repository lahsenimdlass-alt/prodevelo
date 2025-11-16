import { Mail, Phone, MapPin, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Code2 className="w-8 h-8 text-[#1A73E8]" />
              <span className="text-2xl font-bold">
                Pro<span className="text-[#1A73E8]">develo</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Votre partenaire digital pour des sites web professionnels et performants.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-[#1A73E8] transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-[#1A73E8] transition-colors">
                  Services & Tarifs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-[#1A73E8] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-5 h-5 text-[#1A73E8]" />
                <span>contact@prodevelo.com</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-5 h-5 text-[#1A73E8]" />
                <span>+212 6XX XXX XXX</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-5 h-5 text-[#1A73E8]" />
                <span>Maroc</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Prodevelo. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
