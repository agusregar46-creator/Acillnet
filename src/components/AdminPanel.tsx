import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Payment = {
  id: string;
  invoice: string;
  package_name: string;
  customer_email: string;
  wallet: string;
  amount_sol: number;
  status: string;
  created_at: string;
};

export function AdminPanel() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadPayments() {
    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setPayments(data);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadPayments();
  }, []);

  const totalIncome = payments.reduce(
    (acc, item) => acc + Number(item.amount_sol),
    0
  );

  return (
    <section
      id="admin"
      className="mt-24"
    >
      <div className="mb-8">
        <h2 className="text-4xl font-bold">
          Admin Panel
        </h2>

        <p className="mt-2 text-muted-foreground">
          Monitoring pembayaran pelanggan.
        </p>
      </div>

      {/* STATS */}
      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-muted-foreground">
            Total Transaksi
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {payments.length}
          </h3>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-muted-foreground">
            Total Income
          </p>

          <h3 className="mt-2 text-3xl font-bold text-purple-400">
            {totalIncome.toFixed(2)} SOL
          </h3>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-muted-foreground">
            Status
          </p>

          <h3 className="mt-2 text-2xl font-bold text-green-400">
            Online
          </h3>
        </div>
      </div>

      {/* TABLE */}
      <div className="mt-10 overflow-x-auto rounded-3xl border border-white/10 bg-white/5">
        <table className="min-w-full text-sm">
          <thead className="border-b border-white/10">
            <tr className="text-left">
              <th className="px-5 py-4">
                Invoice
              </th>

              <th className="px-5 py-4">
                Email
              </th>

              <th className="px-5 py-4">
                Paket
              </th>

              <th className="px-5 py-4">
                Wallet
              </th>

              <th className="px-5 py-4">
                SOL
              </th>

              <th className="px-5 py-4">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-10 text-center text-muted-foreground"
                >
                  Loading...
                </td>
              </tr>
            ) : payments.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-10 text-center text-muted-foreground"
                >
                  Belum ada transaksi
                </td>
              </tr>
            ) : (
              payments.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-white/5"
                >
                  <td className="px-5 py-4 font-mono">
                    {item.invoice}
                  </td>

                  <td className="px-5 py-4">
                    {item.customer_email}
                  </td>

                  <td className="px-5 py-4">
                    {item.package_name}
                  </td>

                  <td className="px-5 py-4 font-mono">
                    {item.wallet?.slice(0, 4)}...
                    {item.wallet?.slice(-4)}
                  </td>

                  <td className="px-5 py-4 text-purple-400">
                    {item.amount_sol}
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}