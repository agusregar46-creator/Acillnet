import { SiteHeader } from "./components/SiteHeader";
import { WhatsAppFab } from "./components/WhatsAppFab";
import { FaqSection } from "./components/FaqSection";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-white">
      <SiteHeader />

      <main className="container mx-auto px-6 py-10">
        <section className="py-20">
          <h1 className="text-5xl font-bold">
            Acillnet 🚀
          </h1>

          <p className="mt-4 max-w-2xl text-muted-foreground">
            Platform pembayaran internet berbasis Solana dengan
            integrasi wallet Phantom dan Supabase authentication.
          </p>
        </section>

        <section className="mt-20">
          <FaqSection />
        </section>
      </main>

      <WhatsAppFab />
    </div>
  );
}