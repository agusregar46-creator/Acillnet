import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";

export default function AuthPage() {
  const navigate = useNavigate();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // EMAIL LOGIN / SIGNUP
  // =========================
  async function submit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast.success("Berhasil login 🚀");

        navigate({ to: "/" });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            },
            emailRedirectTo: window.location.origin,
          },
        });

        if (error) throw error;

        toast.success("Cek email untuk verifikasi akun");
      }
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // OAUTH LOGIN
  // =========================
  async function oauth(provider: "google" | "github" | "discord") {
    setLoading(true);

    const result = await lovable.auth.signInWithOAuth(provider as any, {
      redirect_uri: window.location.origin,
    });

    if (result.error) {
      toast.error((result.error as Error).message ?? "OAuth gagal");
      setLoading(false);
      return;
    }

    if (result.redirected) return;

    navigate({ to: "/" });
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-border bg-background/60 p-8 backdrop-blur">
        <h1 className="text-3xl font-bold">
          {mode === "login" ? "Login" : "Daftar"}
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Masuk ke platform Acillnet 🚀
        </p>

        {/* ================= OAuth Buttons ================= */}
        <div className="mt-6 space-y-3">
          <Button
            type="button"
            onClick={() => oauth("google")}
            disabled={loading}
            variant="outline"
            className="w-full"
          >
            Login dengan Google
          </Button>

          <Button
            type="button"
            onClick={() => oauth("github")}
            disabled={loading}
            variant="outline"
            className="w-full"
          >
            Login dengan GitHub
          </Button>

          <Button
            type="button"
            onClick={() => oauth("discord")}
            disabled={loading}
            variant="outline"
            className="w-full"
          >
            Login dengan Discord
          </Button>
        </div>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">atau</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* ================= Form ================= */}
        <form onSubmit={submit} className="space-y-4">
          {mode === "signup" && (
            <div className="space-y-2">
              <Label>Nama</Label>

              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama lengkap"
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Email</Label>

            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@gmail.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>

            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {mode === "login" ? "Login" : "Daftar"}
          </Button>
        </form>

        {/* Switch mode */}
        <button
          type="button"
          onClick={() =>
            setMode(mode === "login" ? "signup" : "login")
          }
          className="mt-5 text-sm text-muted-foreground hover:text-white"
        >
          {mode === "login"
            ? "Belum punya akun? Daftar"
            : "Sudah punya akun? Login"}
        </button>
      </div>
    </div>
  );
}