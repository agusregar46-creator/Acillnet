import { useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client";

type Payment = {
  amount_sol: number;
  customer_email: string;
};

export function AdminStats() {
  const [totalRevenue, setTotalRevenue] =
    useState(0);

  const [totalTransactions, setTotalTransactions] =
    useState(0);

  const [totalCustomers, setTotalCustomers] =
    useState(0);

  useEffect(() => {
    async function loadStats() {
      const { data, error } =
        await supabase
          .from("payments")
          .select("amount_sol, customer_email");

      if (!error && data) {
        const revenue = data.reduce(
          (acc, item) =>
            acc + Number(item.amount_sol),
          0
        );

        const uniqueCustomers =
          new Set(
            data.map(
              (item) => item.customer_email
            )
          );

        setTotalRevenue(revenue);

        setTotalTransactions(data.length);

        setTotalCustomers(
          uniqueCustomers.size
        );
      }
    }

    loadStats();
  }, []);

  return (
    <section className="mt-24">
      <div className="mb-8">
        <h2 className="text-4xl font-bold">
          Statistik Revenue
        </h2>

        <p className="mt-2 text-muted-foreground">
          Statistik pembayaran Acillnet.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* TOTAL SOL */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="text-sm text-muted-foreground">
            Total Revenue
          </p>

          <h3 className="mt-3 text-4xl font-bold text-purple-400">
            {totalRevenue.toFixed(2)} SOL
          </h3>
        </div>

        {/* TOTAL TRANSACTION */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="text-sm text-muted-foreground">
            Total Transaksi
          </p>

          <h3 className="mt-3 text-4xl font-bold">
            {totalTransactions}
          </h3>
        </div>

        {/* TOTAL CUSTOMERS */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="text-sm text-muted-foreground">
            Total Customer
          </p>

          <h3 className="mt-3 text-4xl font-bold text-cyan-400">
            {totalCustomers}
          </h3>
        </div>
      </div>
    </section>
  );
}