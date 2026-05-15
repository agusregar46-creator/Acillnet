import { SiteHeader, SiteFooter } from "./components/SiteHeader";
import { WhatsAppFab } from "./components/WhatsAppFab";
import { FaqSection } from "./components/FaqSection";
import { PaketSection } from "./components/PaketSection";
import { AdminPanel } from "./components/AdminPanel";

import { useAuth } from "./hooks/useAuth";
import { supabase } from "./integrations/supabase/client";

export default function App() {
  const { user, isAdmin } = useAuth();

  async function logout() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  return (
    <div className="min-h-screen bg-background text-white">
      <SiteHeader />

      <main className="container mx-auto px-6 py-10">

        {/* HOME */}
        <section
          id="home"
          className="py-20"
        >
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold leading-tight">
              Acillnet 🚀
            </h1>

            <p className="mt-5 text-lg text-muted-foreground">
              Platform pembayaran internet berbasis Solana dengan
              integrasi wallet Phantom dan Supabase authentication.
            </p>

            {/* AUTH CARD */}
            <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
              {user ? (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-semibold">
                      Berhasil login ✅
                    </h2>

                    <p className="mt-2 text-muted-foreground">
                      Selamat datang kembali.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-sm text-muted-foreground">
                      Email
                    </p>

                    <p className="font-mono">
                      {user.email}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-sm text-muted-foreground">
                      Role
                    </p>

                    <p className="font-semibold">
                      {isAdmin ? "Admin" : "User"}
                    </p>
                  </div>

                  <button
                    onClick={logout}
                    className="rounded-xl bg-red-500 px-5 py-3 font-medium text-white transition hover:opacity-90"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-semibold">
                      Belum login
                    </h2>

                    <p className="mt-2 text-muted-foreground">
                      Login untuk mengakses fitur pembayaran,
                      dashboard pelanggan, dan wallet integration.
                    </p>
                  </div>

                  <a
                    href="/auth"
                    className="inline-flex rounded-xl bg-white px-5 py-3 font-medium text-black transition hover:opacity-90"
                  >
                    Login / Register
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* PAKET */}
        <section id="paket">
          <PaketSection />
        </section>

        {/* TENTANG */}
        <section
          id="tentang"
          className="mt-24"
        >
          <h2 className="text-4xl font-bold">
            Tentang Acillnet
          </h2>

          <p className="mt-5 max-w-3xl text-muted-foreground leading-8">
            Acillnet adalah platform pembayaran internet modern
            berbasis blockchain Solana yang memungkinkan pengguna
            melakukan pembayaran dengan cepat, aman, dan transparan.
          </p>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="mt-24"
        >
          <FaqSection />
        </section>

        {/* KONTAK */}
        <section
          id="kontak"
          className="mt-24"
        >
          <h2 className="text-4xl font-bold">
            Kontak
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-semibold">
                WhatsApp
              </h3>

              <p className="mt-4 text-muted-foreground">
                +62 823-2406-3763
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-semibold">
                Email
              </h3>

              <p className="mt-4 text-muted-foreground">
                admin@acillnet.com
              </p>
            </div>
          </div>
        </section>

      {/* ADMIN */}
    {isAdmin && (
      <section
        id="admin"
        className="mt-24"
      >
        <AdminPanel />
      </section>
    )}

      </main>

      <SiteFooter />

      <WhatsAppFab />
    </div>
  );
}