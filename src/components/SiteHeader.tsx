import { useState } from "react";
import { Wifi, Menu, X, LogIn, LogOut } from "lucide-react";

import { WalletButton } from "@/components/WalletButton";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#paket", label: "Paket" },
  { href: "#tentang", label: "Tentang" },
  { href: "#faq", label: "FAQ" },
  { href: "#kontak", label: "Kontak" },
  { href: "#admin", label: "Admin" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  const { user, signOut } = useAuth();

  const authBtn = user ? (
    <Button
      variant="outline"
      size="sm"
      onClick={async () => {
        await signOut();
        window.location.reload();
      }}
      className="gap-2"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  ) : (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        window.location.href = "/auth";
      }}
      className="gap-2"
    >
      <LogIn className="h-4 w-4" />
      Login
    </Button>
  );

  const linkCls =
    "transition hover:text-foreground";

  return (
    <header className="sticky top-0 z-40 glass">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-6 py-4">
        {/* LOGO */}
        <a
          href="#home"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <div className="grid h-9 w-9 place-items-center rounded-xl btn-solana">
            <Wifi className="h-5 w-5" />
          </div>

          <span className="text-lg">
            Acill
            <span className="text-gradient">
              {" "}
              Net
            </span>
          </span>
        </a>

        {/* DESKTOP MENU */}
        <nav className="hidden gap-7 text-sm text-muted-foreground md:flex">
          {navItems.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={linkCls}
            >
              {n.label}
            </a>
          ))}
        </nav>

        {/* RIGHT BUTTONS */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex md:items-center md:gap-2">
            {authBtn}

            <WalletButton />
          </div>

          {/* MOBILE BUTTON */}
          <button
            type="button"
            aria-label="Buka menu"
            onClick={() =>
              setOpen((v) => !v)
            }
            className="grid h-10 w-10 place-items-center rounded-lg border border-border/50 md:hidden"
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="border-t border-border/50 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4 text-sm">
            {navItems.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() =>
                  setOpen(false)
                }
                className="rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted/40 hover:text-foreground"
              >
                {n.label}
              </a>
            ))}

            <div className="mt-3 flex flex-col gap-2">
              {authBtn}

              <WalletButton />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter({
  rate,
}: {
  rate?: number | null;
}) {
  return (
    <footer className="border-t border-border/50">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted-foreground md:flex-row">
        <span>
          © {new Date().getFullYear()} Acill Net ISP —
          built on Solana.
        </span>

        <nav className="flex gap-5 text-xs">
          <a
            href="#tentang"
            className="hover:text-foreground"
          >
            Tentang
          </a>

          <a
            href="#kontak"
            className="hover:text-foreground"
          >
            Kontak
          </a>

          <a
            href="#faq"
            className="hover:text-foreground"
          >
            FAQ
          </a>
        </nav>

        <span className="font-mono text-xs">
          {rate
            ? `1 SOL ≈ ${new Intl.NumberFormat(
                "id-ID"
              ).format(rate)} IDR`
            : "powered by Solana"}
        </span>
      </div>
    </footer>
  );
}