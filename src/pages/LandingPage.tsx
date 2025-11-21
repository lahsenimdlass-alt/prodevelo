import { useState, useRef } from 'react';
import { CheckCircle, Zap, Shield, Headphones, ArrowRight, Send, Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ServiceInfo {
  name: string;
  price: string;
  delay: string;
}

const SERVICES: Record<string, ServiceInfo> = {
  'Site Professionnel': {
    name: 'Site Professionnel',
    price: '3 500 MAD',
    delay: '5 à 7 jours'
  },
  'Site E-Commerce': {
    name: 'Site E-Commerce',
    price: '8 500 MAD',
    delay: '10 à 15 jours'
  },
  'Application Web': {
    name: 'Application Web',
    price: 'À partir de 15 000 MAD',
    delay: '15 à 30 jours'
  }
};

export default function LandingPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const selectedServiceInfo = formData.service ? SERVICES[formData.service as keyof typeof SERVICES] : null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await supabase
        .from('contact_submissions')
        .insert([{
          name: formData.name || null,
          email: formData.email || null,
          phone: formData.phone || null,
          company: null,
          service: formData.service || null,
          budget: selectedServiceInfo?.price || null,
          message: `Délai: ${selectedServiceInfo?.delay || 'N/A'}`
        }]);

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`;
      await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: selectedServiceInfo?.price || 'N/A',
          delay: selectedServiceInfo?.delay || 'N/A'
        })
      });

      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: ''
      });

      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error('Error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.service) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    const message = `Bonjour Prodevelo,\n\nVoici mes informations :\n- Nom : ${formData.name}\n- Email : ${formData.email}\n- Téléphone : ${formData.phone}\n- Service : ${formData.service}\n- Prix : ${selectedServiceInfo?.price}\n- Délai : ${selectedServiceInfo?.delay}\n\nJ'aimerais discuter de mon projet.`;

    const whatsappNumber = '212619533551';
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          {/* ton contenu ici */}
        </Link>

        <div className="text-sm text-gray-600 font-medium">
          ⏱ Démo gratuite en 3-5 jours
        </div>
      </div>
    </div>
  </div>
</div>

      <div className="pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <section className="text-center py-8 sm:py-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Obtenez votre site web professionnel
            </h1>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#FFC107] mb-6">
              Gratuitement en 3-5 jours
            </h2>
            <p className="text-lg sm:text-xl text-white text-opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Remplissez le formulaire et recevez une démo complète et un premier contact sous 24h
            </p>
            <button
              onClick={scrollToForm}
              className="bg-[#FFC107] text-[#1A73E8] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#FFB800] transition-all transform hover:scale-105 shadow-lg inline-flex items-center space-x-2"
            >
              <span>Recevoir mon devis maintenant</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-8 h-8 text-[#FFC107] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-white mb-1">Consultation Gratuite</h3>
                  <p className="text-white text-opacity-80 text-sm">Sans engagement, 100% gratuit</p>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20">
              <div className="flex items-start space-x-4">
                <Zap className="w-8 h-8 text-[#FFC107] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-white mb-1">Livrés Rapidement</h3>
                  <p className="text-white text-opacity-80 text-sm">5 à 15 jours selon le projet</p>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20">
              <div className="flex items-start space-x-4">
                <Shield className="w-8 h-8 text-[#FFC107] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-white mb-1">100% Sécurisé</h3>
                  <p className="text-white text-opacity-80 text-sm">Paiement après validation</p>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20">
              <div className="flex items-start space-x-4">
                <Headphones className="w-8 h-8 text-[#FFC107] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-white mb-1">Support 24/7</h3>
                  <p className="text-white text-opacity-80 text-sm">Réactif et professionnel</p>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-8 h-8 text-[#FFC107] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-white mb-1">Prix Transparents</h3>
                  <p className="text-white text-opacity-80 text-sm">Pas de frais cachés</p>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-8 h-8 text-[#FFC107] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-white mb-1">Expertise Pro</h3>
                  <p className="text-white text-opacity-80 text-sm">Équipe expérimentée</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 border border-white border-opacity-20 my-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">Comment ça marche</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { step: '1', title: 'Remplissez', desc: 'le formulaire' },
                { step: '2', title: 'Contactez', desc: 'sous 24h' },
                { step: '3', title: 'Démo', desc: 'gratuite créée' },
                { step: '4', title: 'Validez', desc: 'et payez 30%' },
                { step: '5', title: 'Recevez', desc: 'votre site' }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-[#FFC107] text-[#1A73E8] rounded-full flex items-center justify-center font-bold text-lg mb-2">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-white text-center">{item.title}</h3>
                  <p className="text-white text-opacity-70 text-sm text-center">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section ref={formRef} className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center">
              Demande de Devis
            </h2>
            <p className="text-gray-600 text-center mb-8 text-lg">
              Réponse sous 24h — Consultation gratuite, sans engagement
            </p>

            {isSuccess && (
              <div className="mb-6 bg-[#00C58E] bg-opacity-10 border-2 border-[#00C58E] text-[#00C58E] p-4 rounded-lg flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                <span className="font-medium">Merci ! Nous vous répondrons sous 24h.</span>
              </div>
            )}

            {error && (
              <div className="mb-6 bg-red-50 border-2 border-red-200 text-red-700 p-4 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                  Votre Nom *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jean Dupont"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent outline-none transition-all text-base"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent outline-none transition-all text-base"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+212 6XX XXX XXX"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent outline-none transition-all text-base"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-semibold text-gray-900 mb-2">
                  Type de Service *
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent outline-none transition-all text-base"
                  required
                >
                  <option value="">-- Sélectionnez un service --</option>
                  <option value="Site Professionnel">Site Professionnel — 3 500 MAD / 5–7 jours</option>
                  <option value="Site E-Commerce">Site E-Commerce — 8 500 MAD / 10–15 jours</option>
                  <option value="Application Web">Application Web — À partir de 15 000 MAD / 15–30 jours</option>
                </select>
              </div>

              {selectedServiceInfo && (
                <div className="bg-gray-50 rounded-xl p-8 pt-12 text-center hover:shadow-lg transition-shadow">
                  <h3 className="font-bold text-gray-900 mb-4">{selectedServiceInfo.name}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Prix TTC</p>
                      <p className="text-2xl font-bold text-[#1A73E8]">{selectedServiceInfo.price}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Délai</p>
                      <p className="text-2xl font-bold text-[#00C58E]">{selectedServiceInfo.delay}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.name || !formData.email || !formData.phone || !formData.service}
                  className="w-full bg-[#1A73E8] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#1557b0] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <span>Recevoir mon devis par Email</span>
                  <Send className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppSubmit}
                  disabled={!formData.name || !formData.email || !formData.phone || !formData.service}
                  className="w-full bg-[#25D366] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#20ba5a] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <span>Recevoir via WhatsApp</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-start space-x-2 text-sm text-gray-600 border-t pt-4">
                <Lock className="w-4 h-4 text-[#00C58E] flex-shrink-0 mt-0.5" />
                <p>Vos informations sont confidentielles et ne seront jamais partagées</p>
              </div>
            </form>
          </section>

          <section className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 border border-white border-opacity-20 mb-12">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Zap className="w-8 h-8 text-[#FFC107]" />
              <h2 className="text-2xl font-bold text-white">Garantie de Réponse Rapide</h2>
              <Zap className="w-8 h-8 text-[#FFC107]" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
              <div className="text-white">
                <p className="text-4xl font-bold text-[#FFC107] mb-2">24h</p>
                <p className="text-lg">Réponse Garantie</p>
              </div>
              <div className="text-white">
                <p className="text-4xl font-bold text-[#FFC107] mb-2">0 MAD</p>
                <p className="text-lg">Consultation Gratuite</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
