import { useEffect, useState } from "react";

let cached: { idr: number; ts: number } | null = null;

export function useSolToIdr() {
  const [rate, setRate] = useState<number | null>(cached?.idr ?? null);

  useEffect(() => {
    const now = Date.now();
    if (cached && now - cached.ts < 5 * 60_000) {
      setRate(cached.idr);
      return;
    }
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=idr")
      .then((r) => r.json())
      .then((d) => {
        const idr = d?.solana?.idr;
        if (typeof idr === "number") {
          cached = { idr, ts: Date.now() };
          setRate(idr);
        }
      })
      .catch(() => {});
  }, []);

  function format(sol: number) {
    if (!rate) return null;
    const idr = Math.round(sol * rate);
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(idr);
  }

  return { rate, format };
}
