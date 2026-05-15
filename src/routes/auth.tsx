import { useState } from "react";
import { supabase } from "../integrations/supabase/client";

export default function AuthPage() {
  const [loading, setLoading] = useState(false);

  async function loginGoogle() {
    try {
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
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8">
        <h1 className="text-3xl font-bold">
          Login Acillnet
        </h1>

        <p className="mt-3 text-gray-400">
          Login menggunakan akun Google
        </p>

        <button
          onClick={loginGoogle}
          disabled={loading}
          className="mt-8 w-full rounded-2xl bg-white px-5 py-3 font-semibold text-black"
        >
          {loading ? "Loading..." : "Login dengan Google"}
        </button>
      </div>
    </div>
  );
}