import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Wifi, Menu, X, LogIn, LogOut } from "lucide-react";
import { WalletButton } from "@/components/WalletButton";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const navItems: { to: "/" | "/paket" | "/tentang" | "/faq" | "/kontak" | "/admin"; label: string; exact?: boolean }[] = [
  { to: "/", label: "Home", exact: true },
  { to: "/paket", label: "Paket" },
  { to: "/tentang", label: "Tentang" },
  { to: "/faq", label: "FAQ" },
  { to: "/kontak", label: "Kontak" },
  { to: "/admin", label: "Admin" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const authBtn = user ? (
    <Button variant="outline" size="sm" onClick={async () => { await signOut(); navigate({ to: "/" }); }} className="gap-2">
      <LogOut className="h-4 w-4" /> Logout
    </Button>
  ) : (
    <Button variant="outline" size="sm" onClick={() => navigate({ to: "/auth" })} className="gap-2">
      <LogIn className="h-4 w-4" /> Login
    </Button>
  );
  const linkCls = "transition hover:text-foreground";
  return (
    <header className="sticky top-0 z-40 glass">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <div className="grid h-9 w-9 place-items-center rounded-xl btn-solana">
            <Wifi className="h-5 w-5" />
          </div>
          <span className="text-lg">Acill<span className="text-gradient"> Net</span></span>
        </Link>

        <nav className="hidden gap-7 text-sm text-muted-foreground md:flex">
          {navItems.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={n.exact ? { exact: true } : undefined}
              activeProps={{ className: "text-foreground font-medium" }}
              className={linkCls}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex md:items-center md:gap-2">{authBtn}<WalletButton /></div>
          <button
            type="button"
            aria-label="Buka menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-border/50 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-border/50 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4 text-sm">
            {navItems.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={n.exact ? { exact: true } : undefined}
                activeProps={{ className: "bg-[var(--solana)]/10 text-foreground" }}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted/40 hover:text-foreground"
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">{authBtn}<WalletButton /></div>
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter({ rate }: { rate?: number | null }) {
  return (
    <footer className="border-t border-border/50">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted-foreground md:flex-row">
        <span>© {new Date().getFullYear()} Acill Net ISP — built on Solana.</span>
        <nav className="flex gap-5 text-xs">
          <Link to="/tentang" className="hover:text-foreground">Tentang</Link>
          <Link to="/kontak" className="hover:text-foreground">Kontak</Link>
          <Link to="/faq" className="hover:text-foreground">FAQ</Link>
        </nav>
        <span className="font-mono text-xs">
          {rate ? `1 SOL ≈ ${new Intl.NumberFormat("id-ID").format(rate)} IDR` : "devnet · powered by XAMPP"}
        </span>
      </div>
    </footer>
  );
}
