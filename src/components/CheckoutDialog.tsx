import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, ExternalLink, AlertTriangle } from "lucide-react";
import type { Package } from "@/lib/api";
import { recordPayment } from "@/lib/api";
import { payWithSol, SOLANA_NETWORK, ISP_RECEIVER_ADDRESS, shortAddr } from "@/lib/solana";
import { useWallet } from "@/hooks/useWallet";

type Props = { pkg: Package | null; onClose: () => void };

type Status =
  | { kind: "idle" }
  | { kind: "paying" }
  | { kind: "ok"; signature: string; invoice: string }
  | { kind: "err"; message: string };

export function CheckoutDialog({ pkg, onClose }: Props) {
  const { address, connect } = useWallet();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  if (!pkg) return null;

  async function pay() {
    if (!pkg) return;
    if (!name || !email) {
      setStatus({ kind: "err", message: "Isi nama dan email dulu." });
      return;
    }
    if (!address) {
      await connect();
      return;
    }
    try {
      setStatus({ kind: "paying" });
      const signature = await payWithSol(pkg.price_sol);
      const rec = await recordPayment({
        package_id: pkg.id,
        wallet: address,
        signature,
        amount_sol: pkg.price_sol,
        customer_name: name,
        customer_email: email,
        network: SOLANA_NETWORK,
      });
      setStatus({ kind: "ok", signature, invoice: rec.invoice });
    } catch (e) {
      setStatus({ kind: "err", message: (e as Error).message });
    }
  }

  const explorer = (sig: string) =>
    `https://explorer.solana.com/tx/${sig}?cluster=${SOLANA_NETWORK}`;

  return (
    <Dialog open={!!pkg} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="glass max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Checkout · <span className="text-gradient">{pkg.name}</span>
          </DialogTitle>
          <DialogDescription>
            {pkg.speed_mbps} Mbps · {pkg.duration_days} hari ·{" "}
            <span className="font-mono text-foreground">{pkg.price_sol} SOL</span>
          </DialogDescription>
        </DialogHeader>

        {status.kind === "ok" ? (
          <div className="space-y-4 py-2">
            <div className="flex items-start gap-3 rounded-lg border border-[var(--solana)]/30 bg-[var(--solana)]/10 p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-[var(--solana)]" />
              <div className="space-y-1 text-sm">
                <p className="font-semibold">Pembayaran berhasil!</p>
                <p className="text-muted-foreground">
                  Invoice <span className="font-mono text-foreground">{status.invoice}</span>
                </p>
              </div>
            </div>
            <a
              href={explorer(status.signature)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-lg border bg-background/40 p-3 text-xs hover:bg-background/70"
            >
              <span className="font-mono">{shortAddr(status.signature, 8)}</span>
              <ExternalLink className="h-4 w-4" />
            </a>
            <Button className="w-full" onClick={onClose}>Tutup</Button>
          </div>
        ) : (
          <>
            <div className="space-y-3 py-2">
              <div className="grid gap-1.5">
                <Label htmlFor="n">Nama lengkap</Label>
                <Input id="n" value={name} onChange={(e) => setName(e.target.value)} placeholder="Budi Santoso" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="e">Email</Label>
                <Input id="e" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="budi@email.com" />
              </div>
              <div className="rounded-lg border bg-background/40 p-3 text-xs text-muted-foreground space-y-1">
                <div className="flex justify-between">
                  <span>Network</span>
                  <span className="font-mono uppercase text-foreground">{SOLANA_NETWORK}</span>
                </div>
                <div className="flex justify-between">
                  <span>Receiver</span>
                  <span className="font-mono text-foreground">{shortAddr(ISP_RECEIVER_ADDRESS, 6)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Wallet anda</span>
                  <span className="font-mono text-foreground">{address ? shortAddr(address, 6) : "belum connect"}</span>
                </div>
              </div>
              {status.kind === "err" && (
                <div className="flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 p-2 text-xs text-destructive-foreground">
                  <AlertTriangle className="mt-0.5 h-4 w-4 text-destructive" />
                  <span>{status.message}</span>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                onClick={pay}
                disabled={status.kind === "paying"}
                className="btn-solana hover:btn-solana-hover w-full gap-2"
              >
                {status.kind === "paying" && <Loader2 className="h-4 w-4 animate-spin" />}
                {status.kind === "paying"
                  ? "Memproses transaksi…"
                  : address
                    ? `Bayar ${pkg.price_sol} SOL`
                    : "Connect Phantom"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
