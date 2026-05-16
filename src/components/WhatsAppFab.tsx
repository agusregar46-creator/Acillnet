import { MessageCircle } from "lucide-react";

const WA_NUMBER = "6281234567890";
const WA_TEXT =
  "Halo Acill Net, saya mau tanya tentang layanan internet.";

export function WhatsAppFab() {
  const href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    WA_TEXT
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat admin via WhatsApp"
      className="fixed bottom-6 right-6 z-10 grid h-14 w-14 place-items-center rounded-full text-white shadow-2xl transition hover:scale-110"
      style={{
        background:
          "linear-gradient(135deg, #25D366, #128C7E)",
        boxShadow:
          "0 12px 30px -8px rgba(37,211,102,0.6)",
      }}
    >
      <MessageCircle className="h-7 w-7" />

      <span className="absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground shadow-lg backdrop-blur md:block">
        Chat admin
      </span>
    </a>
  );
}