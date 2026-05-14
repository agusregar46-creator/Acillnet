const paketList = [
  {
    name: "Basic",
    speed: "10 Mbps",
    price: "150.000",
    sol: "0.12 SOL",
    features: [
      "Unlimited bandwidth",
      "Support WhatsApp",
      "Free instalasi",
    ],
  },
  {
    name: "Pro",
    speed: "20 Mbps",
    price: "250.000",
    sol: "0.20 SOL",
    features: [
      "Unlimited bandwidth",
      "Prioritas support",
      "Latency rendah",
    ],
  },
  {
    name: "Ultra",
    speed: "50 Mbps",
    price: "500.000",
    sol: "0.40 SOL",
    features: [
      "Unlimited bandwidth",
      "Gaming optimized",
      "Support 24/7",
    ],
  },
];

export function PaketSection() {
  return (
    <section className="mt-24">
      <div className="mb-10">
        <h2 className="text-4xl font-bold">
          Paket Internet 🚀
        </h2>

        <p className="mt-3 text-muted-foreground">
          Pilih paket internet sesuai kebutuhan Anda.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {paketList.map((paket) => (
          <div
            key={paket.name}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur transition hover:border-purple-500/50 hover:bg-white/10"
          >
            <div className="space-y-3">
              <h3 className="text-2xl font-bold">
                {paket.name}
              </h3>

              <p className="text-4xl font-bold">
                {paket.speed}
              </p>

              <div>
                <p className="text-lg font-semibold">
                  Rp {paket.price}
                </p>

                <p className="text-sm text-purple-400">
                  ≈ {paket.sol}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {paket.features.map((feature) => (
                <div
                  key={feature}
                  className="rounded-xl bg-black/20 px-4 py-3 text-sm"
                >
                  ✅ {feature}
                </div>
              ))}
            </div>

            <button
              className="mt-8 w-full rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-3 font-semibold transition hover:opacity-90"
            >
              Pilih Paket
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}