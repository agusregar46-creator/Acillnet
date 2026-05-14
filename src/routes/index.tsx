import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Wifi, Zap, Shield, Globe2, Check, ArrowRight, Cpu, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import { FaqSection } from "@/components/FaqSection";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { useSolToIdr } from "@/hooks/useSolToIdr";
import { fetchPackages, type Package } from "@/lib/api";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Acill Net ISP — Internet cepat, bayar dengan Solana" },
      {
        name: "description",
        content:
          "ISP berbasis blockchain Solana. Pilih paket, connect wallet Phantom, bayar real-time dengan SOL. Transparan dan instan.",
      },
      { property: "og:title", content: "Acill Net ISP — Internet × Solana" },
      {
        property: "og:description",
        content: "Pembayaran ISP real-time on-chain dengan Solana.",
      },
    ],
  }),
});

function Index() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [active, setActive] = useState<Package | null>(null);
  const { rate, format } = useSolToIdr();

  useEffect(() => {
    fetchPackages().then(setPackages);
  }, []);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* HERO */}
      <section className="relative mx-auto max-w-7xl px-6 pt-20 pb-24 md:pt-32">
        <Badge variant="outline" className="mb-6 gap-2 border-[var(--solana)]/40 bg-[var(--solana)]/10 text-[var(--solana)]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--solana)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--solana)]" />
          </span>
          Live di Solana Devnet
        </Badge>
        <h1 className="max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
          Internet super cepat,
          <br />
          dibayar <span className="text-gradient">on-chain</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Acill Net adalah ISP generasi baru — pilih paket, connect wallet Phantom Anda, dan bayar
          langsung dengan SOL. Transparan, instan, tanpa perantara.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#packages">
            <Button size="lg" className="btn-solana hover:btn-solana-hover gap-2">
              Lihat paket <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
          <a href="#how">
            <Button size="lg" variant="outline">Cara kerja</Button>
          </a>
        </div>

        {/* floating stats */}
        <div className="mt-20 grid gap-4 sm:grid-cols-3">
          {[
            { k: "99.9%", v: "Uptime SLA" },
            { k: "< 2s", v: "Konfirmasi pembayaran" },
            { k: "0%", v: "Biaya middleman" },
          ].map((s) => (
            <div key={s.v} className="glass animate-float rounded-2xl p-6">
              <div className="text-3xl font-bold text-gradient">{s.k}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-3xl font-bold md:text-4xl">Kenapa Acill Net?</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Infrastruktur fiber kelas operator dipadu dengan rel pembayaran blockchain Solana.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { i: Zap, t: "Pembayaran <2 detik", d: "Solana memproses ribuan TPS dengan biaya fraksi sen." },
            { i: Lock, t: "Tanpa data kartu", d: "Connect wallet, sign, selesai. Privasi pengguna terjaga." },
            { i: Cpu, t: "Smart provisioning", d: "Begitu transaksi terkonfirmasi, paket aktif otomatis." },
            { i: Shield, t: "Audit on-chain", d: "Setiap pembayaran tercatat permanen di explorer Solana." },
            { i: Globe2, t: "Global ready", d: "Bayar dari mana saja, tidak terikat bank lokal." },
            { i: Wifi, t: "Fiber to the Home", d: "Latency rendah untuk gaming, streaming, dan WFH." },
          ].map(({ i: Icon, t, d }) => (
            <div key={t} className="glass group rounded-2xl p-6 transition hover:-translate-y-1">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[var(--solana)]/20 to-[var(--solana-2)]/20 text-[var(--solana)]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Pilih paket Anda</h2>
            <p className="mt-2 text-muted-foreground">Bayar bulanan dengan SOL. Aktif seketika.</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {packages.map((p) => (
            <div
              key={p.id}
              className={`glass relative rounded-2xl p-7 transition hover:-translate-y-1 ${
                p.highlight ? "ring-1 ring-[var(--solana)]/60" : ""
              }`}
            >
              {p.highlight && (
                <Badge className="absolute -top-3 left-7 btn-solana">Paling populer</Badge>
              )}
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gradient">{p.price_sol}</span>
                <span className="text-sm text-muted-foreground">SOL / {p.duration_days}h</span>
              </div>
              {rate && (
                <div className="mt-1 text-xs text-muted-foreground">
                  ≈ <span className="font-mono text-foreground">{format(p.price_sol)}</span>
                </div>
              )}
              <div className="mt-2 text-sm font-mono text-muted-foreground">
                {p.speed_mbps} Mbps
              </div>
              <ul className="mt-6 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-[var(--solana)]" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => setActive(p)}
                className={`mt-7 w-full gap-2 ${p.highlight ? "btn-solana hover:btn-solana-hover" : ""}`}
                variant={p.highlight ? "default" : "outline"}
              >
                Bayar dengan SOL <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-3xl font-bold md:text-4xl">Cara kerja</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { n: "01", t: "Connect Phantom", d: "Klik tombol Connect di pojok kanan atas." },
            { n: "02", t: "Pilih paket & checkout", d: "Isi data pelanggan, sign transaksi di wallet." },
            { n: "03", t: "Aktif otomatis", d: "Setelah blok confirm, paket aktif & invoice tersimpan di database." },
          ].map((s) => (
            <div key={s.n} className="glass rounded-2xl p-7">
              <div className="font-mono text-5xl text-gradient">{s.n}</div>
              <h3 className="mt-3 text-lg font-semibold">{s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <FaqSection />

      <SiteFooter rate={rate} />

      <CheckoutDialog pkg={active} onClose={() => setActive(null)} />
      <WhatsAppFab />
    </div>
  );
}
