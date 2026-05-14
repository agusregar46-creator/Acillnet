import { createFileRoute, Link } from "@tanstack/react-router";
import { Cpu, Globe2, Lock, Shield, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { WhatsAppFab } from "@/components/WhatsAppFab";

export const Route = createFileRoute("/tentang")({
  component: TentangPage,
  head: () => ({
    meta: [
      { title: "Tentang Kami — Acill Net ISP" },
      { name: "description", content: "Acill Net adalah penyedia layanan internet generasi baru yang memadukan fiber optik dengan pembayaran on-chain Solana." },
      { property: "og:title", content: "Tentang Acill Net" },
      { property: "og:description", content: "ISP yang dibangun di atas Solana — transparan, instan, tanpa perantara." },
    ],
  }),
});

function TentangPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-6 pt-16 pb-10 md:pt-24">
        <h1 className="text-4xl font-bold leading-tight md:text-6xl">
          Internet untuk era <span className="text-gradient">Web3</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Acill Net dibangun dengan satu prinsip sederhana: layanan internet
          seharusnya secepat dan setransparan teknologi yang dijalankannya. Kami
          menghubungkan fiber optik kelas operator dengan rel pembayaran Solana
          agar pelanggan bisa berlangganan tanpa perantara, tanpa kartu kredit,
          dan tanpa biaya tersembunyi.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-20 md:grid-cols-3">
        {[
          { i: Zap, t: "Misi", d: "Menyediakan akses internet cepat & adil yang dibayar on-chain." },
          { i: Shield, t: "Visi", d: "Menjadi ISP pertama di Indonesia yang sepenuhnya transparan secara on-chain." },
          { i: Users, t: "Tim", d: "Engineer telekomunikasi & developer Solana dari berbagai kota." },
        ].map(({ i: Icon, t, d }) => (
          <div key={t} className="glass rounded-2xl p-7">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[var(--solana)]/20 to-[var(--solana-2)]/20 text-[var(--solana)]">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="glass rounded-2xl p-8">
          <h2 className="text-2xl font-bold md:text-3xl">Nilai yang kami pegang</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {[
              { i: Lock, t: "Privasi dulu", d: "Kami tidak menyimpan data sensitif — hanya alamat wallet publik." },
              { i: Cpu, t: "Otomasi penuh", d: "Aktivasi paket otomatis begitu transaksi terkonfirmasi." },
              { i: Globe2, t: "Akses global", d: "Pelanggan bisa membayar dari mana saja, tanpa terikat bank lokal." },
              { i: Shield, t: "Audit publik", d: "Setiap pembayaran tercatat permanen di Solana Explorer." },
            ].map(({ i: Icon, t, d }) => (
              <div key={t} className="flex items-start gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[var(--solana)]/15 text-[var(--solana)]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">{t}</div>
                  <div className="text-sm text-muted-foreground">{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Siap mencoba?</h2>
        <p className="mt-2 text-muted-foreground">Pilih paket Anda dan bayar dalam hitungan detik.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/paket"><Button size="lg" className="btn-solana hover:btn-solana-hover">Lihat paket</Button></Link>
          <Link to="/kontak"><Button size="lg" variant="outline">Hubungi kami</Button></Link>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}
