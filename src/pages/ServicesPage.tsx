import { Check, ArrowRight, Zap, ShoppingCart, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServicesPage() {
  const services = [
    {
      icon: Zap,
      name: 'Site Professionnel',
      subtitle: 'Vitrine / Business',
      price: '3 500 MAD',
      delay: '5 à 7 jours',
      description: 'La solution principale pour une présence en ligne professionnelle',
      features: [
        'Design moderne et responsive',
        '3 à 7 pages personnalisées',
        'Formulaire WhatsApp + Contact',
        'SEO de base',
        'Domaine offert (1 an)',
        'Hébergement offert (1 an)',
        '1 email professionnel offert',
        'SSL sécurisé',
        'Logo simple offert',
        'Modifications gratuites après livraison',
        'Support 1 mois'
      ],
      popular: true,
      color: 'border-[#1A73E8]',
      accentColor: '#1A73E8',
      bgAccent: 'bg-[#1A73E8]'
    },
    {
      icon: ShoppingCart,
      name: 'Site E-Commerce',
      subtitle: 'Boutique en ligne',
      price: '8 500 MAD',
      delay: '10 à 15 jours',
      description: 'Vendez vos produits en ligne avec une boutique complète',
      features: [
        'Boutique complète et responsive',
        'Paiement en ligne + livraison',
        'Gestion produits illimités',
        'SEO e-commerce optimisé',
        'Domaine offert (1 an)',
        'Hébergement rapide (1 an)',
        '3 emails professionnels',
        'Logo + Charte graphique',
        'Optimisation vitesse',
        'Sécurité renforcée',
        'Formation e-commerce',
        'Modifications gratuites (1 mois)',
        'Support 1 mois'
      ],
      popular: false,
      color: 'border-[#00C58E]',
      accentColor: '#00C58E',
      bgAccent: 'bg-[#00C58E]'
    },
    {
      icon: Code2,
      name: 'Application Web',
      subtitle: 'Projet personnalisé',
      price: 'À partir de 15 000 MAD',
      delay: '15 à 30 jours',
      description: 'Solutions sur mesure pour des besoins complexes',
      features: [
        'UI/UX personnalisé et sur mesure',
        'Authentification sécurisée',
        'Tableau de bord complet',
        'Fonctionnalités sur mesure',
        'Domaine offert (1 an)',
        'Hébergement offert (1 an)',
        '5 emails professionnels',
        'Logo + Charte graphique',
        'Intégrations API',
        'Support 2 mois',
        'Modifications gratuites après livraison',
        'Formations et documentation'
      ],
      popular: false,
      color: 'border-[#FFC107]',
      accentColor: '#FFC107',
      bgAccent: 'bg-[#FFC107]',
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Nos Services & Tarifs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Trois offres complètes avec tout inclus. Aucun frais caché, aucune surprise.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 ${service.color} ${
                  service.popular ? 'transform lg:-translate-y-8 lg:scale-105' : ''
                } transition-all hover:shadow-xl relative`}
              >
                {service.popular && (
                  <div className="bg-gradient-to-r from-[#1A73E8] to-[#0d47a1] text-white text-center py-3 font-semibold text-lg">
                    ⭐ Le Plus Populaire
                  </div>
                )}

                {service.badge && (
                  <div className="absolute -top-3 right-4 bg-[#FFC107] text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                    {service.badge}
                  </div>
                )}

                <div className="p-8">
                  <div className={`w-14 h-14 ${service.bgAccent} bg-opacity-10 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="w-7 h-7" style={{ color: service.accentColor }} />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{service.subtitle}</p>
                  <p className="text-gray-600 mb-6 min-h-12">{service.description}</p>

                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="mb-3">
                      <span className="text-4xl font-bold text-gray-900">
                        {service.price}
                      </span>
                      <span className="text-gray-600 ml-2 text-sm">TTC</span>
                    </div>
                    <div className="text-sm font-semibold" style={{ color: service.accentColor }}>
                      Délai : {service.delay}
                    </div>
                  </div>

                  <div className="mb-8">
                    <p className="text-xs text-gray-500 font-semibold uppercase mb-3">Inclus :</p>
                    <ul className="space-y-2.5">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2.5">
                          <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: service.accentColor }} />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to="/contact"
                    state={{ selectedService: service.name, price: service.price, delay: service.delay }}
                    className={`block w-full text-center py-3 rounded-lg font-semibold transition-all ${
                      service.popular
                        ? 'bg-[#1A73E8] text-white hover:bg-[#1557b0]'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Commencer maintenant
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Avantages Inclus dans Toutes les Offres
            </h2>
            <p className="text-lg text-gray-600">
              Sans frais cachés, tout est transparent
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Paiement en 2 étapes',
                description: '30% à la validation, reste à la livraison'
              },
              {
                title: 'Démo avant paiement',
                description: 'Vous validez avant d\'investir'
              },
              {
                title: 'Modifications gratuites',
                description: 'Ajustements gratuits après livraison'
              },
              {
                title: 'Domaine + Hébergement',
                description: 'Offerts pendant 1 an minimum'
              },
              {
                title: 'Support technique',
                description: 'Assistance réactive par email/téléphone'
              },
              {
                title: 'Sécurité SSL',
                description: 'Certificat de sécurité inclus'
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#1A73E8] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-[#1A73E8]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-blue-50 border-2 border-[#1A73E8] border-opacity-30 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Le Processus Prodevelo</h3>
            <ol className="space-y-4">
              <li className="flex space-x-4">
                <div className="w-8 h-8 bg-[#1A73E8] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
                <div>
                  <p className="font-semibold text-gray-900">Création démo</p>
                  <p className="text-sm text-gray-600">Version sans domaine en 5-7 jours</p>
                </div>
              </li>
              <li className="flex space-x-4">
                <div className="w-8 h-8 bg-[#00C58E] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
                <div>
                  <p className="font-semibold text-gray-900">Validation</p>
                  <p className="text-sm text-gray-600">Vous testez et nous ajustons gratuitement</p>
                </div>
              </li>
              <li className="flex space-x-4">
                <div className="w-8 h-8 bg-[#FFC107] rounded-full flex items-center justify-center text-gray-900 font-bold flex-shrink-0">3</div>
                <div>
                  <p className="font-semibold text-gray-900">Paiement acompte 30%</p>
                  <p className="text-sm text-gray-600">On finalise, vous payez le reste à la livraison</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-gradient-to-br from-[#1A73E8] to-[#0d47a1] rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold mb-4">Garantie Prodevelo</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Check className="w-6 h-6 text-[#FFC107] flex-shrink-0 mt-0.5" />
                <span>Délais garantis ou réduction appliquée</span>
              </li>
              <li className="flex items-start space-x-3">
                <Check className="w-6 h-6 text-[#FFC107] flex-shrink-0 mt-0.5" />
                <span>Satisfaction 100% ou remboursement</span>
              </li>
              <li className="flex items-start space-x-3">
                <Check className="w-6 h-6 text-[#FFC107] flex-shrink-0 mt-0.5" />
                <span>Support réactif pendant la période incluse</span>
              </li>
              <li className="flex items-start space-x-3">
                <Check className="w-6 h-6 text-[#FFC107] flex-shrink-0 mt-0.5" />
                <span>Formation complète à l'utilisation de votre site</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-[#1A73E8] to-[#0d47a1] rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Vous Avez des Questions ?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Contactez-nous pour une consultation gratuite et sans engagement
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 bg-white text-[#1A73E8] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            <span>Demander un devis</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
