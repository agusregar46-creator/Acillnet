import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { PaketSection } from "@/components/PaketSection";
import { FaqSection } from "@/components/FaqSection";
import { WhatsAppFab } from "@/components/WhatsAppFab";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-white">
      <SiteHeader />

      <main className="container mx-auto px-6 py-10">
        <section id="home" className="py-20">
          <h1 className="text-5xl font-bold">
            Acillnet 🚀
          </h1>

          <p className="mt-4 max-w-2xl text-muted-foreground">
            Platform pembayaran internet berbasis Solana
            dengan integrasi wallet Phantom dan Supabase.
          </p>
        </section>

        <section id="paket">
          <PaketSection />
        </section>

        <section id="faq" className="mt-20">
          <FaqSection />
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}