import { useState } from "react";

import { supabase } from "./integrations/supabase/client";

import { SiteHeader } from "./components/SiteHeader";
import { PaketSection } from "./components/PaketSection";
import { FaqSection } from "./components/FaqSection";
import { WhatsAppFab } from "./components/WhatsAppFab";

import { useAuth } from "./hooks/useAuth";

export default function App() {
  const { user, isAdmin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function register() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Berhasil daftar, cek email verifikasi");
  }

  async function login() {
    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Login berhasil");
  }

  async function loginGoogle() {
    const { error } =
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });

    if (error) {
      alert(error.message);
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  return (
    <div className="min-h-screen bg-background text-white">
      <SiteHeader />

      <main
        id="home"
        className="container mx-auto px-6 py-10"
      >
        {/* HERO */}
        <section className="py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold">
              Acillnet 🚀
            </h1>

            <p className="mt-5 text-lg text-muted-foreground">
              Platform pembayaran internet berbasis
              Solana dengan integrasi wallet Phantom
              dan Supabase authentication.
            </p>

            {/* AUTH */}
            <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">
              {user ? (
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">
                    Berhasil login ✅
                  </h2>

                  <p>{user.email}</p>

                  <p>
                    Role:
                    {" "}
                    {isAdmin
                      ? "Admin"
                      : "User"}
                  </p>

                  <button
                    onClick={logout}
                    className="rounded-xl bg-red-500 px-5 py-3"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">
                    Login / Register
                  </h2>

                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3"
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3"
                  />

                  <div className="flex gap-3">
                    <button
                      onClick={login}
                      className="rounded-xl bg-blue-500 px-5 py-3 font-semibold"
                    >
                      Login
                    </button>

                    <button
                      onClick={register}
                      className="rounded-xl bg-green-500 px-5 py-3 font-semibold"
                    >
                      Register
                    </button>
                  </div>

                  <button
                    onClick={loginGoogle}
                    className="w-full rounded-xl bg-white px-5 py-3 font-semibold text-black"
                  >
                    Login Google
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* PAKET */}
        <section id="paket">
          <PaketSection />
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="mt-20"
        >
          <FaqSection />
        </section>

        {/* TENTANG */}
        <section
          id="tentang"
          className="mt-20"
        >
          <h2 className="text-4xl font-bold">
            Tentang
          </h2>

          <p className="mt-4 text-muted-foreground">
            Acillnet adalah platform ISP modern
            berbasis blockchain Solana untuk
            pembayaran internet yang cepat,
            transparan, dan aman.
          </p>
        </section>

        {/* KONTAK */}
        <section
          id="kontak"
          className="mt-20"
        >
          <h2 className="text-4xl font-bold">
            Kontak
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-2xl font-semibold">
                WhatsApp
              </h3>

              <p className="mt-3 text-muted-foreground">
                +62 823-2406-3763
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-2xl font-semibold">
                Email
              </h3>

              <p className="mt-3 text-muted-foreground">
                admin@acillnet.com
              </p>
            </div>
          </div>
        </section>

        {/* ADMIN */}
        <section
          id="admin"
          className="mt-20"
        >
          <h2 className="text-4xl font-bold">
            Admin Panel
          </h2>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-8">
            {isAdmin ? (
              <p className="text-green-400">
                Anda login sebagai Admin ✅
              </p>
            ) : (
              <p className="text-red-400">
                Anda bukan admin
              </p>
            )}
          </div>
        </section>
      </main>

      <WhatsAppFab />
    </div>
  );
}