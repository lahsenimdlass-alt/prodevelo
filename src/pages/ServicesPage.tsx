import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServicesPage() {
  const services = [
    {
      name: 'Site Vitrine',
      price: '2 500 MAD',
      description: 'Parfait pour présenter votre activité',
      features: [
        'Design moderne et responsive',
        'Jusqu\'à 5 pages',
        'Formulaire de contact',
        'Optimisation SEO de base',
        'Domaine .com ou .ma (1 an)',
        'Hébergement rapide (1 an)',
        '2 adresses email pro (1 an)',
        'Logo professionnel inclus',
        'SSL sécurisé',
        'Formation à la gestion'
      ],
      popular: false,
      color: 'border-gray-200'
    },
    {
      name: 'Site Business',
      price: '4 500 MAD',
      description: 'Pour développer votre entreprise en ligne',
      features: [
        'Design premium et sur-mesure',
        'Jusqu\'à 10 pages',
        'Formulaire de contact avancé',
        'Optimisation SEO avancée',
        'Domaine .com ou .ma (1 an)',
        'Hébergement premium (1 an)',
        '5 adresses email pro (1 an)',
        'Logo + Charte graphique',
        'Intégration réseaux sociaux',
        'Google Analytics',
        'SSL sécurisé',
        'Formation complète',
        'Support prioritaire 3 mois'
      ],
      popular: true,
      color: 'border-[#1A73E8]'
    },
    {
      name: 'Site E-commerce',
      price: 'Sur Devis',
      description: 'Vendez vos produits en ligne',
      features: [
        'Boutique en ligne complète',
        'Gestion des produits',
        'Panier et paiement en ligne',
        'Gestion des commandes',
        'Domaine .com ou .ma (1 an)',
        'Hébergement e-commerce (1 an)',
        '10 adresses email pro (1 an)',
        'Logo + Charte graphique',
        'Optimisation SEO complète',
        'Formation e-commerce',
        'Support dédié 6 mois'
      ],
      popular: false,
      color: 'border-gray-200'
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
            Des offres transparentes et complètes pour tous vos besoins digitaux
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 ${service.color} ${
                service.popular ? 'transform lg:-translate-y-4 lg:scale-105' : ''
              } transition-all hover:shadow-xl`}
            >
              {service.popular && (
                <div className="bg-[#1A73E8] text-white text-center py-2 font-semibold">
                  ⭐ Le Plus Populaire
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-6">{service.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    {service.price}
                  </span>
                  {service.price !== 'Sur Devis' && (
                    <span className="text-gray-600 ml-2">TTC</span>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-[#00C58E] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={`block w-full text-center py-3 rounded-lg font-semibold transition-all ${
                    service.popular
                      ? 'bg-[#1A73E8] text-white hover:bg-[#1557b0]'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Choisir cette offre
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tous Nos Avantages Inclus
            </h2>
            <p className="text-lg text-gray-600">
              Sans frais cachés, tout est transparent
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Paiement à la Livraison',
                description: 'Payez uniquement quand vous êtes satisfait'
              },
              {
                title: 'Modifications Gratuites',
                description: 'Retouches illimitées après livraison'
              },
              {
                title: 'Livraison Rapide',
                description: 'Votre site prêt en 7 à 14 jours'
              },
              {
                title: 'Support Technique',
                description: 'Assistance disponible par email et téléphone'
              },
              {
                title: 'Sécurité SSL',
                description: 'Certificat de sécurité inclus'
              },
              {
                title: 'Garantie Satisfaction',
                description: 'Nous travaillons jusqu\'à votre satisfaction complète'
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#1A73E8] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-[#1A73E8]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-[#1A73E8] to-[#0d47a1] rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Besoin d'un Projet Personnalisé ?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Contactez-nous pour un devis sur mesure adapté à vos besoins spécifiques
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 bg-white text-[#1A73E8] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            <span>Demander un devis gratuit</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
