import { useState } from "react";

import { SiteHeader } from "./components/SiteHeader";
import { WhatsAppFab } from "./components/WhatsAppFab";
import { FaqSection } from "./components/FaqSection";
import { PaketSection } from "./components/PaketSection";
import { AdminPanel } from "./components/AdminPanel";

import { useAuth } from "./hooks/useAuth";
import { supabase } from "./integrations/supabase/client";

export default function App() {
  const { user, isAdmin } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function logout() {
    await supabase.auth.signOut();

    window.location.reload();
  }

  async function loginEmail() {
    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      alert(error.message);
    } else {
      window.location.reload();
    }
  }

  async function register() {
    const { error } =
      await supabase.auth.signUp({
        email,
        password,
      });

    if (error) {
      alert(error.message);
    } else {
      alert(
        "Cek email untuk verifikasi akun 🚀"
      );
    }
  }

  async function loginGoogle() {
    const { error } =
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo:
            window.location.origin,
        },
      });

    if (error) {
      alert(error.message);
    }
  }

  return (
    <div
      id="home"
      className="min-h-screen bg-background text-white"
    >
      <SiteHeader />

      <main className="container mx-auto px-6 py-10">
        {/* HERO */}
        <section className="py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold leading-tight">
              Acillnet 🚀
            </h1>

            <p className="mt-5 text-lg text-muted-foreground">
              Platform pembayaran internet
              berbasis Solana dengan
              integrasi wallet Phantom dan
              Supabase authentication.
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
                      {isAdmin
                        ? "Admin"
                        : "User"}
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
                <div className="space-y-5">
                  <div>
                    <h2 className="text-2xl font-semibold">
                      Login / Register
                    </h2>

                    <p className="mt-2 text-muted-foreground">
                      Masuk untuk
                      mengakses dashboard,
                      pembayaran, dan wallet
                      integration.
                    </p>
                  </div>

                  {/* EMAIL */}
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) =>
                        setEmail(
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
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
                      className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
                    />
                  </div>

                  {/* BUTTONS */}
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={loginEmail}
                      className="rounded-xl bg-blue-500 px-5 py-3 font-medium text-white transition hover:opacity-90"
                    >
                      Login Email
                    </button>

                    <button
                      onClick={register}
                      className="rounded-xl bg-purple-500 px-5 py-3 font-medium text-white transition hover:opacity-90"
                    >
                      Register
                    </button>

                    <button
                      onClick={loginGoogle}
                      className="rounded-xl bg-white px-5 py-3 font-medium text-black transition hover:opacity-90"
                    >
                      Login Google
                    </button>
                  </div>
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

          <p className="mt-4 max-w-3xl text-muted-foreground">
            Acillnet adalah platform ISP
            modern berbasis blockchain
            Solana untuk pembayaran internet
            yang cepat, aman, dan transparan.
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

          <div className="mt-6 space-y-3 text-muted-foreground">
            <p>
              WhatsApp:
              {" "}
              08xxxxxxxxxx
            </p>

            <p>
              Email:
              {" "}
              support@acillnet.my.id
            </p>

            <p>
              Lokasi:
              {" "}
              Indonesia
            </p>
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

      {/* FLOATING WHATSAPP */}
      <WhatsAppFab />
    </div>
  );
}