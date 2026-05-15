import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function AuthPage() {
  const [loading, setLoading] = useState(false);

  const [isRegister, setIsRegister] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

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

  async function loginEmail() {
    setLoading(true);

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    window.location.href = "/";
  }

  async function registerEmail() {
    setLoading(true);

    const { error } =
      await supabase.auth.signUp({
        email,
        password,
      });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Register berhasil");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <h1 className="text-center text-4xl font-bold">
          Acillnet 🚀
        </h1>

        <p className="mt-3 text-center text-gray-400">
          Login atau register akun
        </p>

        <button
          onClick={loginGoogle}
          className="mt-8 w-full rounded-2xl bg-white px-5 py-3 font-semibold text-black"
        >
          Login dengan Google
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
          className="mt-5 w-full rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-3 font-semibold"
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
  );
}