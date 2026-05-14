import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} from "@solana/web3.js";

// Ganti dengan address wallet ISP penerima (devnet ok untuk testing).
export const ISP_RECEIVER_ADDRESS =
  (import.meta.env.VITE_ISP_RECEIVER as string | undefined) ??
  "11111111111111111111111111111111"; // placeholder — ganti!

export const SOLANA_NETWORK: "devnet" | "mainnet-beta" = "devnet";

export const connection = new Connection(clusterApiUrl(SOLANA_NETWORK), "confirmed");

type PhantomProvider = {
  isPhantom?: boolean;
  publicKey: PublicKey | null;
  connect: () => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  signAndSendTransaction: (tx: Transaction) => Promise<{ signature: string }>;
};

declare global {
  interface Window {
    solana?: PhantomProvider;
  }
}

export function getPhantom(): PhantomProvider | null {
  if (typeof window === "undefined") return null;
  const p = window.solana;
  return p && p.isPhantom ? p : null;
}

export async function payWithSol(amountSol: number): Promise<string> {
  const phantom = getPhantom();
  if (!phantom) throw new Error("Phantom wallet tidak terdeteksi. Install dari phantom.app");
  const resp = await phantom.connect();
  const from = resp.publicKey;
  const to = new PublicKey(ISP_RECEIVER_ADDRESS);

  const lamports = Math.round(amountSol * LAMPORTS_PER_SOL);
  const { blockhash } = await connection.getLatestBlockhash();

  const tx = new Transaction({
    recentBlockhash: blockhash,
    feePayer: from,
  }).add(
    SystemProgram.transfer({
      fromPubkey: from,
      toPubkey: to,
      lamports,
    })
  );

  const { signature } = await phantom.signAndSendTransaction(tx);
  await connection.confirmTransaction(signature, "confirmed");
  return signature;
}

export function shortAddr(addr: string, n = 4) {
  return `${addr.slice(0, n)}…${addr.slice(-n)}`;
}
