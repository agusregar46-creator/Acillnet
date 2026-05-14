import { useState } from "react";

import { SiteHeader } from "./components/SiteHeader";
import { WhatsAppFab } from "./components/WhatsAppFab";
import { FaqSection } from "./components/FaqSection";

import { useAuth } from "./hooks/useAuth";
import { supabase } from "./integrations/supabase/client";

export default function App() {
  const { user, isAdmin } = useAuth();

  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      alert(error.message);
    }

    setLoading(false);
  }

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

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
            {user ? (
              <div className="space-y-2">
                <p className="text-lg font-semibold">
                  Berhasil login ✅
                </p>

                <p className="font-mono text-sm text-muted-foreground">
                  {user.email}
                </p>

                <p>
                  Role:
                  {" "}
                  {isAdmin ? "Admin" : "User"}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-lg font-semibold">
                  Belum login
                </p>

                <button
                  onClick={login}
                  disabled={loading}
                  className="mt-4 rounded-xl bg-white px-5 py-3 font-medium text-black transition hover:opacity-90"
                >
                  {loading ? "Loading..." : "Login Google"}
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="mt-20">
          <FaqSection />
        </section>
      </main>

      <WhatsAppFab />
    </div>
  );
}