import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export default function TentangPage() {
  return (
    <div className="min-h-screen bg-background text-white">
      <SiteHeader />

      <main className="container mx-auto px-6 py-20">
        <h1 className="text-5xl font-bold">
          Tentang Acillnet
        </h1>

        <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
          Acillnet adalah platform pembayaran internet berbasis blockchain
          Solana yang mendukung pembayaran crypto, wallet Phantom,
          dan integrasi Supabase authentication.
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}