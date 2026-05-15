export function KontakSection() {
  return (
    <section
      id="kontak"
      className="mt-24"
    >
      <div className="max-w-4xl">
        <h2 className="text-4xl font-bold">
          Kontak 📞
        </h2>

        <p className="mt-4 text-lg text-muted-foreground">
          Hubungi tim Acillnet untuk
          pemasangan internet atau bantuan
          pembayaran.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {/* WHATSAPP */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold">
              WhatsApp
            </h3>

            <p className="mt-3 text-muted-foreground">
              +62 823-2406-3763
            </p>
          </div>

          {/* EMAIL */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold">
              Email
            </h3>

            <p className="mt-3 text-muted-foreground">
              support@acillnet.id
            </p>
          </div>

          {/* ADDRESS */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold">
              Lokasi
            </h3>

            <p className="mt-3 text-muted-foreground">
              Semarang, Indonesia
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}