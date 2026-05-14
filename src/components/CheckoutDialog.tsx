import { useMemo, useState } from "react";

import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useWallet } from "@/hooks/useWallet";

type PackageType = {
  id: string;
  name: string;
  speed_mbps: number;
  duration_days: number;
  price_sol: number;
};

type Props = {
  pkg: PackageType | null;
  onClose: () => void;
};

// GANTI DENGAN ADDRESS PHANTOM KAMU
const MERCHANT_WALLET =
  "MASUKKAN_ADDRESS_PHANTOM_KAMU";

export function CheckoutDialog({
  pkg,
  onClose,
}: Props) {
  const { address, connect } = useWallet();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  const [signature, setSignature] =
    useState<string | null>(null);

  const connection = useMemo(
    () =>
      new Connection(
        "https://api.devnet.solana.com",
        "confirmed"
      ),
    []
  );

  if (!pkg) return null;

  async function pay() {
    try {
      setLoading(true);

      // =========================
      // CONNECT WALLET
      // =========================
      if (!address) {
        await connect();
        return;
      }

      const provider =
        (window as any).phantom?.solana;

      if (!provider) {
        alert(
          "Phantom Wallet tidak ditemukan"
        );

        return;
      }

      // =========================
      // CREATE TRANSACTION
      // =========================
      const fromPubkey =
        new PublicKey(address);

      const toPubkey =
        new PublicKey(MERCHANT_WALLET);

      const transaction =
        new Transaction().add(
          SystemProgram.transfer({
            fromPubkey,
            toPubkey,

            lamports:
              pkg.price_sol *
              LAMPORTS_PER_SOL,
          })
        );

      transaction.feePayer =
        fromPubkey;

      const latestBlockhash =
        await connection.getLatestBlockhash();

      transaction.recentBlockhash =
        latestBlockhash.blockhash;

      // =========================
      // SIGN TRANSACTION
      // =========================
      const signed =
        await provider.signTransaction(
          transaction
        );

      // =========================
      // SEND TRANSACTION
      // =========================
      const txid =
        await connection.sendRawTransaction(
          signed.serialize()
        );

      // =========================
      // CONFIRM TRANSACTION
      // =========================
      await connection.confirmTransaction(
        txid
      );

      setSignature(txid);

      // =========================
      // SAVE TO SUPABASE
      // =========================
      const { data, error } =
        await supabase
          .from("payments")
          .insert({
            invoice: `INV-${Date.now()}`,

            package_name: pkg.name,

            customer_email:
              user?.email,

            wallet: address,

            network:
              "solana-devnet",

            amount_sol:
              pkg.price_sol,

            signature: txid,

            status: "paid",

            user_id: user?.id,
          });

      console.log(
        "PAYMENT DATA:",
        data
      );

      if (error) {
        console.error(
          "SUPABASE ERROR:",
          error
        );

        alert(error.message);

        return;
      }

      alert(
        "Pembayaran berhasil 🚀"
      );
    } catch (err: any) {
      console.error(err);

      alert(
        err?.message ??
          "Pembayaran gagal"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-6">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111] p-8 text-white">
        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Checkout Paket
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Pembayaran menggunakan
              Solana 🚀
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 px-3 py-1 text-sm"
          >
            ✕
          </button>
        </div>

        {/* PACKAGE INFO */}
        <div className="mt-8 space-y-4">
          <div className="rounded-2xl bg-white/5 p-4">
            <p className="text-sm text-muted-foreground">
              Paket
            </p>

            <p className="text-xl font-semibold">
              {pkg.name}
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 p-4">
            <p className="text-sm text-muted-foreground">
              Speed
            </p>

            <p className="text-xl font-semibold">
              {pkg.speed_mbps} Mbps
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 p-4">
            <p className="text-sm text-muted-foreground">
              Durasi
            </p>

            <p className="text-xl font-semibold">
              {pkg.duration_days} Hari
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 p-4">
            <p className="text-sm text-muted-foreground">
              Harga
            </p>

            <p className="text-xl font-semibold text-purple-400">
              {pkg.price_sol} SOL
            </p>
          </div>
        </div>

        {/* SUCCESS */}
        {signature && (
          <div className="mt-6 rounded-2xl border border-green-500/20 bg-green-500/10 p-4">
            <p className="font-semibold text-green-400">
              Pembayaran berhasil ✅
            </p>

            <a
              href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 block break-all text-sm text-blue-400 underline"
            >
              Lihat transaksi
            </a>
          </div>
        )}

        {/* ACTIONS */}
        <div className="mt-8 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-2xl border border-white/10 px-5 py-3"
          >
            Tutup
          </button>

          <button
            onClick={pay}
            disabled={loading}
            className="flex-1 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-3 font-semibold transition hover:opacity-90 disabled:opacity-50"
          >
            {loading
              ? "Processing..."
              : address
              ? "Bayar SOL"
              : "Connect Wallet"}
          </button>
        </div>
      </div>
    </div>
  );
}