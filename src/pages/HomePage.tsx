import { Link } from 'react-router-dom';
import { ArrowRight, Check, Zap, Shield, Gift } from 'lucide-react';
import AdvantagesSection from '../components/AdvantagesSection';

export default function HomePage() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1A73E8] via-[#1557b0] to-[#0d47a1] text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Votre Site Web Professionnel
              <br />
              <span className="text-[#FFC107]">Sans Risque</span>
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Créez votre présence en ligne avec une agence qui vous accompagne du début à la fin
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/services"
                className="bg-white text-[#1A73E8] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center space-x-2"
              >
                <span>Voir nos offres</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#1A73E8] transition-all"
              >
                Demander un devis
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#1A73E8] bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-[#1A73E8]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Livraison Rapide</h3>
              <p className="text-gray-600 leading-relaxed">
                Votre site web prêt en quelques jours. Des délais respectés et une mise en ligne rapide.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#00C58E] bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-[#00C58E]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Paiement Sécurisé</h3>
              <p className="text-gray-600 leading-relaxed">
                Payez uniquement à la livraison. Zéro risque, satisfaction garantie.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#FFC107] bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                <Gift className="w-6 h-6 text-[#FFC107]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Offres Incluses</h3>
              <p className="text-gray-600 leading-relaxed">
                Domaine, hébergement, emails pro et logo offerts pendant 1 an.
              </p>
            </div>
          </div>
        </div>
      </section>

      <AdvantagesSection />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi Choisir Prodevelo ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une approche unique qui place votre satisfaction au centre
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              'Paiement uniquement après livraison',
              'Modifications gratuites après livraison',
              'Support réactif et personnalisé',
              'Design moderne et professionnel',
              'Site 100% responsive (mobile, tablette, desktop)',
              'Optimisation SEO incluse',
              'Sécurité SSL garantie',
              'Formation à la gestion de votre site'
            ].map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Check className="w-6 h-6 text-[#00C58E] flex-shrink-0 mt-1" />
                <span className="text-gray-700 text-lg">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-[#1A73E8] to-[#0d47a1] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Prêt à Lancer Votre Projet ?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Discutons de votre projet et recevez un devis gratuit sous 24h
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 bg-white text-[#1A73E8] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            <span>Demander un devis gratuit</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
