import { useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client";
import { useAuth } from "../hooks/useAuth";

type Payment = {
  id: string;
  invoice: string;
  package_name: string;
  amount_sol: number;
  status: string;
  signature: string;
  created_at: string;
};

export function PaymentHistory() {
  const { user } = useAuth();

  const [payments, setPayments] =
    useState<Payment[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadPayments() {
      if (!user) return;

      const { data, error } =
        await supabase
          .from("payments")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: false,
          });

      if (!error && data) {
        setPayments(data);
      }

      setLoading(false);
    }

    loadPayments();
  }, [user]);

  if (!user) return null;

  return (
    <section className="mt-24">
      <div className="mb-8">
        <h2 className="text-4xl font-bold">
          Riwayat Pembayaran
        </h2>

        <p className="mt-2 text-muted-foreground">
          Semua transaksi pembayaran internet Anda.
        </p>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          Loading...
        </div>
      ) : payments.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          Belum ada transaksi.
        </div>
      ) : (
        <div className="space-y-5">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold">
                    {payment.package_name}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {payment.invoice}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {new Date(
                      payment.created_at
                    ).toLocaleString("id-ID")}
                  </p>
                </div>

                <div className="space-y-2 text-right">
                  <p className="text-2xl font-bold text-purple-400">
                    {payment.amount_sol} SOL
                  </p>

                  <p
                    className={`text-sm font-medium ${
                      payment.status === "paid"
                        ? "text-green-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {payment.status}
                  </p>

                  <a
                    href={`https://explorer.solana.com/tx/${payment.signature}?cluster=devnet`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-cyan-400 hover:underline"
                  >
                    Lihat Transaksi
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}