import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CheckCircle, ArrowRight } from 'lucide-react';
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

export default function ContactPage() {
  const location = useLocation();
  const locationState = location.state as { selectedService?: string; price?: string; delay?: string } | undefined;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: locationState?.selectedService || ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const selectedServiceInfo = formData.service ? SERVICES[formData.service as keyof typeof SERVICES] : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const { error: dbError } = await supabase
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

      if (dbError) throw dbError;

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`;
      const response = await fetch(apiUrl, {
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

      if (!response.ok) {
        console.error('Email sending failed, but form was saved');
      }

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
      setError('Veuillez remplir tous les champs avant d\'envoyer via WhatsApp');
      return;
    }

    const message = `Bonjour Prodevelo,

Voici mes informations :
- Nom : ${formData.name}
- Email : ${formData.email}
- Téléphone : ${formData.phone}
- Service : ${formData.service}
- Prix : ${selectedServiceInfo?.price}
- Délai : ${selectedServiceInfo?.delay}

J'aimerais discuter de mon projet.`;

    const whatsappNumber = '212619533551';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Commencer Votre Projet
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Les prix et délais s'affichent automatiquement selon le service choisi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {isSuccess && (
                <div className="mb-6 bg-[#00C58E] bg-opacity-10 border border-[#00C58E] text-[#00C58E] p-4 rounded-lg flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6" />
                  <span className="font-medium">Merci ! Nous vous répondrons sous 24h.</span>
                </div>
              )}

              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent outline-none transition-all"
                    placeholder="Votre nom"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent outline-none transition-all"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent outline-none transition-all"
                      placeholder="+212 6XX XXX XXX"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    Type de service *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={(e) => {
                      handleChange(e);
                      setShowAnimation(false);
                      setTimeout(() => setShowAnimation(true), 50);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent outline-none transition-all"
                  >
                    <option value="">-- Sélectionner un service --</option>
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
                        <p className="text-sm text-gray-600 mb-1">Délai de réalisation</p>
                        <p className="text-2xl font-bold text-[#00C58E]">{selectedServiceInfo.delay}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-4 italic">
                      Processus : Démo → Validation → Paiement 30% d'acompte → Finalisation
                    </p>
                  </div>
                )}

                <div className="pt-4 space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.name || !formData.email || !formData.phone || !formData.service}
                    className="w-full bg-[#1A73E8] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#1557b0] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <span>Envoi en cours...</span>
                    ) : (
                      <>
                        <span>Envoyer par Email</span>
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppSubmit}
                    disabled={!formData.name || !formData.email || !formData.phone || !formData.service}
                    className="w-full bg-[#25D366] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#20ba5a] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <span>Envoyer via WhatsApp</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-sm text-gray-500 text-center pt-4 border-t">
                  Tous les champs marqués * sont requis
                </p>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Informations de Contact
              </h2>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#1A73E8] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#1A73E8]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Email</h3>
                    <a href="mailto:support@prodevelo.com" className="text-gray-600 hover:text-[#1A73E8]">
                      support@prodevelo.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#25D366] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#25D366]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">WhatsApp</h3>
                    <a href="https://wa.me/212619533551" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#25D366]">
                      +212 619 533 551
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#FFC107] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#FFC107]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Localisation</h3>
                    <p className="text-gray-600">Maroc</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#1A73E8] to-[#0d47a1] rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-3">Réponse Rapide Garantie</h3>
              <p className="text-blue-100 leading-relaxed mb-4">
                Nous nous engageons à vous répondre dans les <span className="font-bold">24 heures</span> pour discuter de votre projet.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#FFC107]" />
                  <span>Consultation gratuite</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#FFC107]" />
                  <span>Devis personnalisé</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#FFC107]" />
                  <span>Démonstration gratuite</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border-2 border-[#1A73E8] border-opacity-20 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Comment ça marche</h3>
              <ol className="space-y-3 text-sm">
                <li className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-[#1A73E8] text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">1</span>
                  <span className="text-gray-700">Vous complétez le formulaire</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-[#00C58E] text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">2</span>
                  <span className="text-gray-700">Nous vous contactons sous 24h</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-[#FFC107] text-gray-900 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">3</span>
                  <span className="text-gray-700">Nous créons une démo</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-[#1A73E8] text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">4</span>
                  <span className="text-gray-700">Vous validez et payez 30%</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-[#00C58E] text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">5</span>
                  <span className="text-gray-700">On finalise et vous livrez</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
