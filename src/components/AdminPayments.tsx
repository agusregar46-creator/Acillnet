import { useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client";

type Payment = {
  id: string;
  invoice: string;
  package_name: string;
  customer_email: string;
  amount_sol: number;
  status: string;
  created_at: string;
};

export function AdminPayments() {
  const [payments, setPayments] =
    useState<Payment[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadPayments() {
      const { data, error } =
        await supabase
          .from("payments")
          .select("*")
          .order("created_at", {
            ascending: false,
          });

      if (!error && data) {
        setPayments(data);
      }

      setLoading(false);
    }

    loadPayments();
  }, []);

  return (
    <section className="mt-24">
      <div className="mb-8">
        <h2 className="text-4xl font-bold">
          Admin Dashboard
        </h2>

        <p className="mt-2 text-muted-foreground">
          Semua pembayaran pelanggan.
        </p>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          Loading...
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
                    {payment.customer_email}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {payment.invoice}
                  </p>
                </div>

                <div className="space-y-2 text-right">
                  <p className="text-2xl font-bold text-purple-400">
                    {payment.amount_sol} SOL
                  </p>

                  <p className="text-green-400">
                    {payment.status}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {new Date(
                      payment.created_at
                    ).toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}