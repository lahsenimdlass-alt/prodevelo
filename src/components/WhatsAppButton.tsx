import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const whatsappNumber = '212619533551';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Bonjour%20Prodevelo%2C%20j%27aimerais%20discuter%20de%20mes%20besoins%20pour%20un%20site%20web.`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 w-16 h-16 bg-[#25D366] hover:bg-[#20ba5a] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-110 z-40"
      title="Contacter via WhatsApp"
    >
      <MessageCircle className="w-8 h-8 text-white" fill="currentColor" />
    </a>
  );
}
