import { useEffect, useState, useCallback } from "react";
import { getPhantom, shortAddr } from "@/lib/solana";

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔄 sync wallet state on load
  useEffect(() => {
    const p = getPhantom();
    if (!p) return;

    if (p.publicKey) {
      setAddress(p.publicKey.toBase58());
    }

    const handleConnect = (publicKey: any) => {
      setAddress(publicKey.toBase58());
      setConnecting(false);
    };

    const handleDisconnect = () => {
      setAddress(null);
      setConnecting(false);
    };

    const handleAccountChanged = (publicKey: any) => {
      if (publicKey) {
        setAddress(publicKey.toBase58());
      } else {
        setAddress(null);
      }
    };

    p.on("connect", handleConnect);
    p.on("disconnect", handleDisconnect);
    p.on("accountChanged", handleAccountChanged);

    return () => {
      p.off("connect", handleConnect);
      p.off("disconnect", handleDisconnect);
      p.off("accountChanged", handleAccountChanged);
    };
  }, []);

  // 🔌 connect wallet (ANTI STUCK)
  const connect = useCallback(async () => {
    setError(null);

    const p = getPhantom();

    if (!p) {
      setError("Phantom tidak terdeteksi. Install dari phantom.app");
      window.open("https://phantom.app/", "_blank");
      return;
    }

    try {
      setConnecting(true);

      const result = await Promise.race([
        p.connect({ onlyIfTrusted: false }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Connection timeout")), 10000)
        ),
      ]);

      const r = result as any;

      setAddress(r.publicKey.toBase58());
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setConnecting(false);
    }
  }, []);

  // 🔌 disconnect clean
  const disconnect = useCallback(async () => {
    const p = getPhantom();

    try {
      await p?.disconnect();
    } finally {
      setAddress(null);
      setConnecting(false);
    }
  }, []);

  return {
    address,
    connect,
    disconnect,
    connecting,
    error,
    short: address ? shortAddr(address) : null,
  };
}