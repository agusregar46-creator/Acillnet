export function TentangSection() {
  return (
    <section
      id="tentang"
      className="mt-24"
    >
      <div className="max-w-4xl">
        <h2 className="text-4xl font-bold">
          Tentang Acillnet 🚀
        </h2>

        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Acillnet adalah platform pembayaran
          internet berbasis Web3 yang
          mengintegrasikan Solana Blockchain,
          Phantom Wallet, dan Supabase.
        </p>

        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Project ini dibuat untuk menghadirkan
          sistem pembayaran internet modern
          dengan transaksi crypto yang cepat,
          aman, dan realtime.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold">
              ⚡ Fast Payment
            </h3>

            <p className="mt-3 text-sm text-muted-foreground">
              Pembayaran SOL realtime dengan
              konfirmasi blockchain Solana.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold">
              🔒 Secure
            </h3>

            <p className="mt-3 text-sm text-muted-foreground">
              Menggunakan wallet Phantom dan
              sistem autentikasi Supabase.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold">
              🚀 Web3 Ready
            </h3>

            <p className="mt-3 text-sm text-muted-foreground">
              Dibangun dengan React, Vercel,
              dan Solana Web3 SDK.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}