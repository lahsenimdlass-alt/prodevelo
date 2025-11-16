import { CheckCircle2, Globe, Server, Mail, Palette, Edit3 } from 'lucide-react';

export default function AdvantagesSection() {
  const advantages = [
    {
      icon: CheckCircle2,
      title: 'Première version gratuite,
      description: 'Première version offerte, acompte après validation, paiement final à la livraison. satisfaction assurée',
      color: 'bg-[#00C58E]'
    },
    {
      icon: Edit3,
      title: 'Modifications Gratuites',
      description: 'Ajustements et corrections gratuits après la livraison',
      color: 'bg-[#1A73E8]'
    },
    {
      icon: Globe,
      title: 'Domaine Gratuit 1 An',
      description: 'Votre nom de domaine .com ou .ma offert pendant un an',
      color: 'bg-[#FFC107]'
    },
    {
      icon: Server,
      title: 'Hébergement Rapide 1 An',
      description: 'Hébergement performant et sécurisé inclus gratuitement',
      color: 'bg-[#00C58E]'
    },
    {
      icon: Mail,
      title: 'Email Pro Offert 1 An',
      description: 'Adresses email professionnelles @votredomaine.com',
      color: 'bg-[#1A73E8]'
    },
    {
      icon: Palette,
      title: 'Logo Professionnel',
      description: 'Un logo unique et professionnel créé pour votre marque',
      color: 'bg-[#FFC107]'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Nos Avantages Exclusifs
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tout ce dont vous avez besoin pour démarrer votre présence en ligne
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`w-14 h-14 ${advantage.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {advantage.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
