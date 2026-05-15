import { SiteHeader } from "./components/SiteHeader";
import { WhatsAppFab } from "./components/WhatsAppFab";
import { FaqSection } from "./components/FaqSection";

import { useAuth } from "./hooks/useAuth";
import { supabase } from "./integrations/supabase/client";
import { PaketSection } from "./components/PaketSection";
import { PaymentHistory } from "./components/PaymentHistory";
import { AdminPayments } from "./components/AdminPayments";
import { AdminStats } from "./components/AdminStats";

export default function App() {
  const { user, isAdmin } = useAuth();

  // =========================
  // LOGOUT
  // =========================
  async function logout() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  // =========================
  // SIGNUP EMAIL
  // =========================
  async function signup() {
    const email = prompt("Masukkan email:");

    if (!email) return;

    const password = prompt(
      "Masukkan password minimal 6 karakter:"
    );

    if (!password) return;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Akun berhasil dibuat. Cek email verifikasi.");
  }

  // =========================
  // LOGIN GOOGLE
  // =========================
  async function loginGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      alert(error.message);
    }
  }

  return (
    <div className="min-h-screen bg-background text-white">
      {/* HEADER */}
      <SiteHeader />

      {/* MAIN */}
      <main className="container mx-auto px-6 py-10">
        {/* HERO */}
        <section className="py-20">
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

                  {/* EMAIL */}
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-sm text-muted-foreground">
                      Email
                    </p>

                    <p className="font-mono">
                      {user.email}
                    </p>
                  </div>

                  {/* ROLE */}
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-sm text-muted-foreground">
                      Role
                    </p>

                    <p className="font-semibold">
                      {isAdmin ? "Admin" : "User"}
                    </p>
                  </div>

                  {/* LOGOUT */}
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

                  {/* BUTTONS */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={loginGoogle}
                      className="rounded-xl bg-white px-5 py-3 font-medium text-black transition hover:opacity-90"
                    >
                      Login Google
                    </button>

                    <button
                      onClick={signup}
                      className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 font-medium text-white transition hover:bg-white/20"
                    >
                      Daftar Email
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

{/* PAKET INTERNET */}
<PaketSection />
        {/* FAQ */}
        <section className="mt-20">
          <FaqSection />
        </section>
      </main>
      {/* RIWAYAT PEMBAYARAN */}
<PaymentHistory />
{isAdmin && (
  <>
    <AdminStats />

<AdminPayments />

      {/* FLOATING WHATSAPP */}
      <WhatsAppFab />
    </div>
  );
}