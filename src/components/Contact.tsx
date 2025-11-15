import { useState } from 'react';
import { Send, CheckCircle, MessageCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    projectType: '',
    clientName: '',
    email: '',
    whatsapp: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(`${supabaseUrl}/functions/v1/send-contact-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Erreur lors de l\'envoi');
      }

      setIsSuccess(true);
      setFormData({
        projectType: '',
        clientName: '',
        email: '',
        whatsapp: '',
        message: '',
      });

      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error('Error submitting form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/212619533551', '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-white relative">
      <button
        onClick={openWhatsApp}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 animate-bounce"
        aria-label="Contact WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
      </button>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1E1E1E] mb-4">
            Démarrez votre projet
          </h2>
          <p className="text-xl text-gray-600">
            Remplissez le formulaire ci-dessous pour obtenir un devis gratuit et personnalisé
          </p>
        </div>

        {isSuccess && (
          <div className="mb-8 bg-gradient-to-r from-[#00C58E] to-[#1A73E8] text-white p-6 rounded-xl flex items-center gap-4 shadow-lg">
            <CheckCircle className="w-8 h-8 flex-shrink-0" />
            <div>
              <div className="font-bold text-lg mb-1">Message envoyé avec succès!</div>
              <div>Nous vous contacterons très bientôt pour discuter de votre projet.</div>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 text-red-800 p-6 rounded-xl">
            {error}
          </div>
        )}

        <div className="mb-6 bg-gradient-to-r from-[#25D366]/10 to-[#128C7E]/10 border-2 border-[#25D366] rounded-xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1E1E1E] mb-1">
                  Besoin de plus d'informations?
                </h3>
                <p className="text-gray-600">
                  Contactez-nous directement sur WhatsApp pour toute question ou clarification
                </p>
              </div>
            </div>
            <button
              onClick={openWhatsApp}
              className="bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg whitespace-nowrap"
            >
              <MessageCircle className="w-5 h-5" />
              Ouvrir WhatsApp
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#F5F6FA] rounded-2xl p-8 shadow-lg">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#1E1E1E] mb-2">
                Type de projet
              </label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent outline-none transition-all"
              >
                <option value="">Sélectionnez le type de projet</option>
                <option value="landing">Landing Page React</option>
                <option value="vitrine">Site Vitrine (3–5 pages)</option>
                <option value="ecommerce">Site E-commerce moderne</option>
                <option value="webapp">Application Web (Dashboard, Auth)</option>
                <option value="marketplace">Marketplace / SaaS complet</option>
                <option value="autre">Autre projet personnalisé</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#1E1E1E] mb-2">
                  Votre nom
                </label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="Nom complet"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1E1E1E] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="votre@email.com"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1E1E1E] mb-2">
                Numéro WhatsApp
              </label>
              <input
                type="tel"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                placeholder="+212 6XX XXX XXX"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1E1E1E] mb-2">
                Décrivez votre projet
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Parlez-nous de votre projet, vos objectifs, vos besoins..."
                rows={4}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent outline-none transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#1A73E8] to-[#00C58E] text-white py-4 rounded-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>Envoi en cours...</>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Demander un devis gratuit
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-500">
              Aucune information n'est obligatoire. Remplissez uniquement les champs que vous souhaitez.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
