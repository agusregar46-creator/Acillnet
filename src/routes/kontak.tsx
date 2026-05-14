import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, MessageCircle, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const WA_NUMBER = "6281234567890";

export const Route = createFileRoute("/kontak")({
  component: KontakPage,
  head: () => ({
    meta: [
      { title: "Kontak Kami — Acill Net ISP" },
      { name: "description", content: "Hubungi tim Acill Net via WhatsApp, email, atau kunjungi kantor kami. Support 24/7 untuk pelanggan internet berbasis Solana." },
      { property: "og:title", content: "Kontak Acill Net" },
      { property: "og:description", content: "Tim support Acill Net siap membantu 24/7." },
    ],
  }),
});

function KontakPage() {
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nama = String(data.get("nama") ?? "");
    const email = String(data.get("email") ?? "");
    const pesan = String(data.get("pesan") ?? "");
    setSending(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: nama, email, message: pesan,
    });
    if (error) {
      toast.error("Gagal kirim: " + error.message);
    } else {
      toast.success("Pesan terkirim! Kami juga buka WhatsApp.");
      const text = `Halo Acill Net!%0A%0ANama: ${nama}%0AEmail: ${email}%0APesan: ${pesan}`;
      window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, "_blank");
      (e.target as HTMLFormElement).reset();
    }
    setSending(false);
  }

  const items = [
    { i: MessageCircle, t: "WhatsApp", d: "+62 812-3456-7890", href: `https://wa.me/${WA_NUMBER}` },
    { i: Mail, t: "Email", d: "halo@acillnet.id", href: "mailto:halo@acillnet.id" },
    { i: Phone, t: "Telepon", d: "(021) 1234-5678", href: "tel:+622112345678" },
    { i: MapPin, t: "Kantor", d: "Jl. Blockchain No. 1, Jakarta Selatan", href: "#" },
  ];

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-6 pt-16 pb-10 md:pt-24">
        <h1 className="text-4xl font-bold leading-tight md:text-6xl">
          Mari <span className="text-gradient">terhubung</span>.
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Punya pertanyaan tentang paket, instalasi, atau pembayaran SOL? Tim kami siap membantu Anda 24/7.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-20 md:grid-cols-2">
        {/* Form */}
        <form onSubmit={onSubmit} className="glass space-y-4 rounded-2xl p-7">
          <h2 className="text-xl font-semibold">Kirim pesan</h2>
          <div className="space-y-2">
            <Label htmlFor="nama">Nama</Label>
            <Input id="nama" name="nama" required placeholder="Nama lengkap Anda" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required placeholder="email@contoh.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pesan">Pesan</Label>
            <Textarea id="pesan" name="pesan" required rows={5} placeholder="Tulis pertanyaan Anda..." />
          </div>
          <Button type="submit" disabled={sending} className="btn-solana hover:btn-solana-hover w-full gap-2">
            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Kirim pesan
          </Button>
        </form>

        {/* Info */}
        <div className="space-y-4">
          {items.map(({ i: Icon, t, d, href }) => (
            <a key={t} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
               className="glass flex items-start gap-4 rounded-2xl p-5 transition hover:-translate-y-1">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[var(--solana)]/20 to-[var(--solana-2)]/20 text-[var(--solana)]">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">{t}</div>
                <div className="text-sm text-muted-foreground">{d}</div>
              </div>
            </a>
          ))}
          <div className="glass rounded-2xl p-5">
            <div className="text-sm font-semibold">Jam operasional</div>
            <div className="mt-1 text-sm text-muted-foreground">Senin – Minggu · 24 jam</div>
            <div className="mt-3 text-xs text-muted-foreground">
              Pertanyaan teknis di luar jam kerja akan ditangani via WhatsApp prioritas.
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Cek juga halaman <Link to="/faq" className="text-[var(--solana)] hover:underline">FAQ</Link>.
          </div>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}
