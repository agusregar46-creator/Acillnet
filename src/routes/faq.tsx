import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { FaqSection } from "@/components/FaqSection";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { WhatsAppFab } from "@/components/WhatsAppFab";

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () => ({
    meta: [
      { title: "FAQ — Acill Net ISP" },
      { name: "description", content: "Pertanyaan umum tentang berlangganan Acill Net, pembayaran SOL, instalasi, dan dukungan pelanggan." },
      { property: "og:title", content: "FAQ Acill Net" },
      { property: "og:description", content: "Jawaban untuk pertanyaan paling sering tentang Acill Net." },
    ],
  }),
});

function FaqPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="mx-auto max-w-4xl px-6 pt-16 md:pt-24">
        <h1 className="text-4xl font-bold leading-tight md:text-5xl">
          Pertanyaan <span className="text-gradient">populer</span>.
        </h1>
        <p className="mt-3 text-muted-foreground">
          Semua yang ingin Anda tahu sebelum berlangganan.
        </p>
      </section>
      <FaqSection />
      <section className="mx-auto max-w-4xl px-6 pb-24 text-center">
        <p className="text-muted-foreground">Masih ragu? Tim kami siap membantu.</p>
        <Link to="/kontak"><Button className="mt-4 btn-solana hover:btn-solana-hover">Hubungi kami</Button></Link>
      </section>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}
