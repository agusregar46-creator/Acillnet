import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export default function KontakPage() {
  return (
    <div className="min-h-screen bg-background text-white">
      <SiteHeader />

      <main className="container mx-auto px-6 py-20">
        <h1 className="text-5xl font-bold">
          Kontak
        </h1>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-bold">
              WhatsApp
            </h2>

            <p className="mt-4 text-muted-foreground">
              +62 823-2406-3763
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-bold">
              Email
            </h2>

            <p className="mt-4 text-muted-foreground">
              admin@acillnet.com
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}