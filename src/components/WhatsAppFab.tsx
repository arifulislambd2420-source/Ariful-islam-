import { MessageCircle } from "lucide-react";

export default function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/8801874783819"
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp চ্যাট"
      className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-accent text-bg shadow-lg shadow-accent/20 transition hover:brightness-110"
    >
      <MessageCircle size={20} />
    </a>
  );
}
