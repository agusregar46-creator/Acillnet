import { useState } from "react";
import { supabase } from "../integrations/supabase/client";

export default function AuthPage() {
  const [loading, setLoading] = useState(false);

  const [isRegister, setIsRegister] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginGoogle() {
    try {
      setLoading(true);

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
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function loginEmail() {
    try {
      setLoading(true);

      const { error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) {
        alert(error.message);
        return;
      }

      window.location.href = "/";
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function registerEmail() {
    try {
      setLoading(true);

      const { error } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (error) {
        alert(error.message);
        return;
      }

      alert(
        "Register berhasil. Silakan cek email untuk verifikasi akun."
      );
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#00ffcc22,transparent_30%),radial-gradient(circle_at_bottom_right,#a855f722,transparent_30%)]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold">
              Acillnet 🚀
            </h1>

            <p className="mt-3 text-gray-400">
              Platform pembayaran internet berbasis Solana
            </p>
          </div>

          <button
            onClick={loginGoogle}
            disabled={loading}
            className="w-full rounded-2xl bg-white px-5 py-3 font-semibold text-black transition hover:opacity-90"
          >
            {loading
              ? "Loading..."
              : "Login dengan Google"}
          </button>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />

            <span className="text-sm text-gray-400">
              atau
            </span>

            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
            />
          </div>

          <button
            onClick={
              isRegister
                ? registerEmail
                : loginEmail
            }
            disabled={loading}
            className="mt-5 w-full rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-3 font-semibold transition hover:opacity-90"
          >
            {loading
              ? "Loading..."
              : isRegister
              ? "Register"
              : "Login"}
          </button>

          <div className="mt-6 text-center text-sm text-gray-400">
            {isRegister
              ? "Sudah punya akun?"
              : "Belum punya akun?"}

            <button
              onClick={() =>
                setIsRegister(!isRegister)
              }
              className="ml-2 font-semibold text-purple-400"
            >
              {isRegister
                ? "Login"
                : "Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}