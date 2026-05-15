import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    window.location.href = "/";
  }

  async function register() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Register berhasil");
  }

  return (
    <div className="min-h-screen bg-background text-white">
      <SiteHeader />

      <main className="container mx-auto px-6 py-20">
        <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 p-8">
          <h1 className="text-3xl font-bold">
            Login / Register
          </h1>

          <div className="mt-6 space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-black/30 px-4 py-3 outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl bg-black/30 px-4 py-3 outline-none"
            />

            <button
              onClick={login}
              className="w-full rounded-xl bg-white py-3 font-semibold text-black"
            >
              Login
            </button>

            <button
              onClick={register}
              className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 py-3 font-semibold"
            >
              Register
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}