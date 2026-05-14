import { SiteHeader } from "./components/SiteHeader";
import { WhatsAppFab } from "./components/WhatsAppFab";
import { FaqSection } from "./components/FaqSection";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-white">
      <SiteHeader />

      <main className="container mx-auto px-6 py-10">
        <h1 className="text-5xl font-bold">
          Acillnet 🚀
        </h1>

        <p className="mt-4 text-muted-foreground">
          Solana internet payment platform.
        </p>

        <div className="mt-10">
          <FaqSection />
        </div>
      </main>

      <WhatsAppFab />
    </div>
  );
}