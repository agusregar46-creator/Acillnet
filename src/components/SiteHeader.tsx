import { useState } from "react";

import {
  Wifi,
  Menu,
  X,
  LogIn,
  LogOut,
} from "lucide-react";

import { WalletButton } from "@/components/WalletButton";

import { Button } from "@/components/ui/button";

import { useAuth } from "@/hooks/useAuth";

const navItems = [
  {
    href: "#home",
    label: "Home",
  },
  {
    href: "#paket",
    label: "Paket",
  },
  {
    href: "#tentang",
    label: "Tentang",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
  {
    href: "#kontak",
    label: "Kontak",
  },
];

export function SiteHeader() {
  const [open, setOpen] =
    useState(false);

  const { user, signOut } =
    useAuth();

  async function handleLogout() {
    try {
      await signOut();

      window.location.href = "/";
    } catch (error) {
      console.error(error);

      alert("Logout gagal");
    }
  }

  return (
    <header className="sticky top-0 z-[9999] border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* LOGO */}
        <a
          href="/"
          className="flex items-center gap-3"
        >
          <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-r from-green-400 to-purple-500">
            <Wifi className="h-5 w-5 text-black" />
          </div>

          <span className="text-xl font-bold">
            Acill
            <span className="text-purple-400">
              {" "}
              Net
            </span>
          </span>
        </a>

        {/* MENU */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-gray-300 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />

                Logout
              </Button>

              <WalletButton />
            </>
          ) : (
            <Button
              onClick={() => {
                window.location.href =
                  "/auth";
              }}
            >
              <LogIn className="mr-2 h-4 w-4" />

              Login
            </Button>
          )}

          {/* MOBILE */}
          <button
            onClick={() =>
              setOpen(!open)
            }
            className="text-white md:hidden"
          >
            {open ? (
              <X />
            ) : (
              <Menu />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="border-t border-white/10 bg-black/80 md:hidden">
          <div className="flex flex-col gap-4 px-6 py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() =>
                  setOpen(false)
                }
                className="text-gray-300"
              >
                {item.label}
              </a>
            ))}

            {user && (
              <Button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600"
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 py-8 text-center text-sm text-gray-400">
      © 2026 Acill Net ISP — built on Solana.
    </footer>
  );
}