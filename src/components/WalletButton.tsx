import { Wallet, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/useWallet";

export function WalletButton() {
  const { address, short, connect, disconnect, connecting } = useWallet();
  if (address) {
    return (
      <Button variant="outline" onClick={disconnect} className="gap-2 font-mono">
        <Wallet className="h-4 w-4 text-[var(--solana)]" />
        {short}
        <LogOut className="h-3.5 w-3.5 opacity-60" />
      </Button>
    );
  }
  return (
    <Button onClick={connect} disabled={connecting} className="btn-solana hover:btn-solana-hover gap-2">
      <Wallet className="h-4 w-4" />
      {connecting ? "Menghubungkan…" : "Connect Phantom"}
    </Button>
  );
}
