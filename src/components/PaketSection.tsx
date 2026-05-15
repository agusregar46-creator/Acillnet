import { useState } from "react";

import { CheckoutDialog } from "./CheckoutDialog";
import { ManualPayment } from "./ManualPayment";

const paketList = [
  {
    id: "basic",
    name: "Basic",
    speed: "10 Mbps",
    speed_mbps: 10,
    duration_days: 30,
    price: "150.000",
    price_sol: 0.12,
    sol: "0.12 SOL",
    features: [
      "Unlimited bandwidth",
      "Support WhatsApp",
      "Free instalasi",
    ],
  },

  {
    id: "pro",
    name: "Pro",
    speed: "20 Mbps",
    speed_mbps: 20,
    duration_days: 30,
    price: "250.000",
    price_sol: 0.2,
    sol: "0.20 SOL",
    features: [
      "Unlimited bandwidth",
      "Prioritas support",
      "Latency rendah",
    ],
  },

  {
    id: "ultra",
    name: "Ultra",
    speed: "50 Mbps",
    speed_mbps: 50,
    duration_days: 30,
    price: "500.000",
    price_sol: 0.4,
    sol: "0.40 SOL",
    features: [
      "Unlimited bandwidth",
      "Gaming optimized",
      "Support 24/7",
    ],
  },
];

export function PaketSection() {
  const [selected, setSelected] =
    useState<any>(null);

  const [openManual, setOpenManual] =
    useState(false);

  return (
    <section className="mt-24">
      {/* HEADER */}
      <div className="mb-10">
        <h2 className="text-4xl font-bold">
          Paket Internet 🚀
        </h2>

        <p className="mt-3 text-muted-foreground">
          Pilih paket internet sesuai kebutuhan Anda.
        </p>
      </div>

      {/* GRID */}
      <div className="grid gap-6 md:grid-cols-3">
        {paketList.map((paket) => (
          <div
            key={paket.id}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur transition hover:border-purple-500/50 hover:bg-white/10"
          >
            {/* TITLE */}
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

            {/* FEATURES */}
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

            {/* BUTTONS */}
            <div className="mt-8 flex flex-col gap-3">
              {/* SOL PAYMENT */}
              <button
                onClick={() =>
                  setSelected(paket)
                }
                className="w-full rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-3 font-semibold transition hover:opacity-90"
              >
                Bayar SOL
              </button>

              {/* MANUAL PAYMENT */}
              <button
                onClick={() =>
                  setOpenManual(true)
                }
                className="w-full rounded-2xl bg-white/10 px-5 py-3 font-semibold transition hover:bg-white/20"
              >
                QRIS / Transfer
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SOL CHECKOUT */}
      <CheckoutDialog
        pkg={selected}
        onClose={() => setSelected(null)}
      />

      {/* MANUAL PAYMENT */}
      <ManualPayment
        open={openManual}
        onClose={() =>
          setOpenManual(false)
        }
      />
    </section>
  );
}