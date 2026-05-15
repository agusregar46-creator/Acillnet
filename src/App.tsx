import { useState } from "react";
import { Wifi, Menu, X, LogIn, LogOut } from "lucide-react";

import { WalletButton } from "@/components/WalletButton";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  const { user } = useAuth();

  async function logout() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050816]/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* LOGO */}
        <a
          href="#home"
          className="flex items-center gap-3"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-purple-500">
            <Wifi className="h-6 w-6 text-black" />
          </div>

          <div className="text-2xl font-bold">
            Acill
            <span className="text-purple-400">
              Net
            </span>
          </div>
        </a>

        {/* DESKTOP MENU */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#home"
            className="text-sm text-muted-foreground transition hover:text-white"
          >
            Home
          </a>

          <a
            href="#paket"
            className="text-sm text-muted-foreground transition hover:text-white"
          >
            Paket
          </a>

          <a
            href="#tentang"
            className="text-sm text-muted-foreground transition hover:text-white"
          >
            Tentang
          </a>

          <a
            href="#faq"
            className="text-sm text-muted-foreground transition hover:text-white"
          >
            FAQ
          </a>

          <a
            href="#kontak"
            className="text-sm text-muted-foreground transition hover:text-white"
          >
            Kontak
          </a>

          <a
            href="#admin"
            className="text-sm text-muted-foreground transition hover:text-white"
          >
            Admin
          </a>
        </nav>

        {/* RIGHT BUTTONS */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <Button
              onClick={logout}
              variant="outline"
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          ) : (
            <a href="/auth">
              <Button
                variant="outline"
                className="gap-2"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </a>
          )}

          <WalletButton />
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open ? (
            <X className="h-7 w-7" />
          ) : (
            <Menu className="h-7 w-7" />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="border-t border-white/10 bg-[#050816] md:hidden">
          <div className="flex flex-col gap-4 px-6 py-6">
            <a
              href="#home"
              onClick={() => setOpen(false)}
              className="text-muted-foreground transition hover:text-white"
            >
              Home
            </a>

            <a
              href="#paket"
              onClick={() => setOpen(false)}
              className="text-muted-foreground transition hover:text-white"
            >
              Paket
            </a>

            <a
              href="#tentang"
              onClick={() => setOpen(false)}
              className="text-muted-foreground transition hover:text-white"
            >
              Tentang
            </a>

            <a
              href="#faq"
              onClick={() => setOpen(false)}
              className="text-muted-foreground transition hover:text-white"
            >
              FAQ
            </a>

            <a
              href="#kontak"
              onClick={() => setOpen(false)}
              className="text-muted-foreground transition hover:text-white"
            >
              Kontak
            </a>

            <a
              href="#admin"
              onClick={() => setOpen(false)}
              className="text-muted-foreground transition hover:text-white"
            >
              Admin
            </a>

            <div className="mt-4 flex flex-col gap-3">
              {user ? (
                <Button
                  onClick={logout}
                  variant="outline"
                >
                  Logout
                </Button>
              ) : (
                <a href="/auth">
                  <Button
                    variant="outline"
                    className="w-full"
                  >
                    Login
                  </Button>
                </a>
              )}

              <WalletButton />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}