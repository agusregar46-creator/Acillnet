import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { useSolToIdr } from "@/hooks/useSolToIdr";
import { fetchPackages, type Package } from "@/lib/api";

export const Route = createFileRoute("/paket")({
  component: PaketPage,
  head: () => ({
    meta: [
      { title: "Paket Internet — Acill Net ISP" },
      { name: "description", content: "Pilih paket internet Acill Net dari Starter hingga Enterprise. Bayar dengan SOL — aktif seketika setelah transaksi terkonfirmasi." },
      { property: "og:title", content: "Paket Internet Acill Net" },
      { property: "og:description", content: "Bayar bulanan dengan SOL. Aktif seketika." },
    ],
  }),
});

function PaketPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [active, setActive] = useState<Package | null>(null);
  const { rate, format } = useSolToIdr();

  useEffect(() => { fetchPackages().then(setPackages); }, []);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-6 pt-16 pb-10 md:pt-24">
        <h1 className="text-4xl font-bold leading-tight md:text-6xl">
          Paket <span className="text-gradient">internet</span> Anda.
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Bayar bulanan dengan SOL — aktif seketika setelah konfirmasi blok.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-24 md:grid-cols-3">
        {packages.map((p) => (
          <div key={p.id}
               className={`glass relative rounded-2xl p-7 transition hover:-translate-y-1 ${p.highlight ? "ring-1 ring-[var(--solana)]/60" : ""}`}>
            {p.highlight && <Badge className="absolute -top-3 left-7 btn-solana">Paling populer</Badge>}
            <h3 className="text-xl font-semibold">{p.name}</h3>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gradient">{p.price_sol}</span>
              <span className="text-sm text-muted-foreground">SOL / {p.duration_days}h</span>
            </div>
            {rate && <div className="mt-1 text-xs text-muted-foreground">≈ <span className="font-mono text-foreground">{format(p.price_sol)}</span></div>}
            <div className="mt-2 text-sm font-mono text-muted-foreground">{p.speed_mbps} Mbps</div>
            <ul className="mt-6 space-y-2 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-[var(--solana)]" />
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>
            <Button onClick={() => setActive(p)}
                    className={`mt-7 w-full gap-2 ${p.highlight ? "btn-solana hover:btn-solana-hover" : ""}`}
                    variant={p.highlight ? "default" : "outline"}>
              Bayar dengan SOL <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </section>

      <SiteFooter rate={rate} />
      <CheckoutDialog pkg={active} onClose={() => setActive(null)} />
      <WhatsAppFab />
    </div>
  );
}
