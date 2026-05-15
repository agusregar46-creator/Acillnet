import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Wifi, LogOut, Wallet, Plus, Trash2, Pencil, ExternalLink, TrendingUp, Loader2, X, Check, ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { adminApi, type Stats } from "@/lib/adminApi";
import type { Package } from "@/lib/api";
import { shortAddr } from "@/lib/solana";
import { useSolToIdr } from "@/hooks/useSolToIdr";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({ meta: [{ title: "Admin · Acill Net" }] }),
});

function AdminPage() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 glass">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <div className="grid h-9 w-9 place-items-center rounded-xl btn-solana">
              <Wifi className="h-5 w-5" />
            </div>
            <span>Acill<span className="text-gradient"> Net</span> · <span className="text-muted-foreground font-normal">admin</span></span>
          </Link>
          {user && (
            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-muted-foreground sm:inline">{user.email}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={async () => { await signOut(); navigate({ to: "/auth" }); }}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </div>
          )}
        </div>
      </header>
      {loading || !user ? (
        <div className="grid place-items-center py-24"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : !isAdmin ? (
        <NotAdmin email={user.email ?? ""} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

function NotAdmin({ email }: { email: string }) {
  return (
    <div className="mx-auto max-w-md px-6 py-24">
      <div className="glass space-y-4 rounded-2xl p-8 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-destructive/10 text-destructive">
          <ShieldAlert className="h-5 w-5" />
        </div>
        <h1 className="text-xl font-bold">Akses ditolak</h1>
        <p className="text-sm text-muted-foreground">
          Akun <span className="font-mono">{email}</span> tidak memiliki role <span className="font-mono">admin</span>.
        </p>
        <p className="text-xs text-muted-foreground">
          Untuk memberi role admin, jalankan SQL ini di Cloud (ganti USER_ID dengan ID Anda):
        </p>
        <code className="block rounded bg-muted/40 p-3 text-left font-mono text-[10px]">
          INSERT INTO user_roles(user_id, role){"\n"}VALUES ('USER_ID', 'admin');
        </code>
        <button
          type="button"
          className="text-xs font-mono text-[var(--solana)] underline"
          onClick={async () => {
            const { data } = await supabase.auth.getUser();
            if (data.user) {
              navigator.clipboard.writeText(data.user.id);
            }
          }}
        >Salin user ID saya</button>
      </div>
    </div>
  );
}

function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [packages, setPackages] = useState<Package[]>([]);
  const [editing, setEditing] = useState<Partial<Package> | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const { format } = useSolToIdr();

  async function reload() {
    try {
      const [s, p] = await Promise.all([adminApi.stats(), adminApi.packages()]);
      setStats(s);
      setPackages(p);
    } catch (e) {
      setErr((e as Error).message);
    }
  }
  useEffect(() => { reload(); }, []);

  async function del(id: string) {
    if (!confirm("Hapus paket ini?")) return;
    await adminApi.deletePackage(id);
    reload();
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 space-y-10">
      {err && (
        <div className="glass rounded-xl border border-destructive/40 p-4 text-sm text-destructive-foreground">
          {err}
        </div>
      )}

      {/* STATS */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total transaksi" value={stats?.total_tx ?? "—"} />
        <StatCard
          label="Total pendapatan"
          value={stats ? `${stats.total_sol.toFixed(4)} SOL` : "—"}
          sub={stats && format ? format(stats.total_sol) ?? undefined : undefined}
          accent
        />
        <StatCard label="Transaksi hari ini" value={stats?.today_tx ?? "—"} />
        <StatCard
          label="Pendapatan hari ini"
          value={stats ? `${stats.today_sol.toFixed(4)} SOL` : "—"}
          sub={stats && format ? format(stats.today_sol) ?? undefined : undefined}
        />
      </section>

      {/* PACKAGES */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Paket</h2>
          <Button
            onClick={() => setEditing({ name: "", speed_mbps: 50, duration_days: 30, price_sol: 0.05, features: [], highlight: false })}
            className="btn-solana hover:btn-solana-hover gap-2"
          >
            <Plus className="h-4 w-4" /> Paket baru
          </Button>
        </div>
        <div className="glass overflow-hidden rounded-2xl">
          <table className="w-full text-sm">
            <thead className="bg-background/40 text-left text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Nama</th>
                <th className="px-4 py-3">Speed</th>
                <th className="px-4 py-3">Durasi</th>
                <th className="px-4 py-3">Harga</th>
                <th className="px-4 py-3">Highlight</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((p) => (
                <tr key={p.id} className="border-t border-border/50">
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3 font-mono">{p.speed_mbps} Mbps</td>
                  <td className="px-4 py-3">{p.duration_days} hari</td>
                  <td className="px-4 py-3 font-mono">{p.price_sol} SOL</td>
                  <td className="px-4 py-3">{p.highlight ? <Check className="h-4 w-4 text-[var(--solana)]" /> : <X className="h-4 w-4 text-muted-foreground" />}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost" onClick={() => setEditing(p)}><Pencil className="h-4 w-4" /></Button>
                      <Button size="sm" variant="ghost" onClick={() => del(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
              {!packages.length && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">Belum ada paket.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* TRANSACTIONS */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Transaksi terbaru</h2>
          <Badge variant="outline" className="gap-1.5"><TrendingUp className="h-3 w-3" /> {stats?.recent?.length ?? 0} transaksi</Badge>
        </div>
        <div className="glass overflow-hidden rounded-2xl">
          <table className="w-full text-sm">
            <thead className="bg-background/40 text-left text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Invoice</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Wallet</th>
                <th className="px-4 py-3">Jumlah</th>
                <th className="px-4 py-3">Waktu</th>
                <th className="px-4 py-3 text-right">TX</th>
              </tr>
            </thead>
            <tbody>
              {stats?.recent?.map((r) => (
                <tr key={r.signature} className="border-t border-border/50">
                  <td className="px-4 py-3 font-mono text-xs">{r.invoice}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{r.customer_name}</div>
                    <div className="text-xs text-muted-foreground">{r.customer_email}</div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">
                    <span className="inline-flex items-center gap-1.5"><Wallet className="h-3 w-3 text-[var(--solana)]" /> {shortAddr(r.wallet, 6)}</span>
                  </td>
                  <td className="px-4 py-3 font-mono">{r.amount_sol} SOL</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString("id-ID")}</td>
                  <td className="px-4 py-3 text-right">
                    <a
                      href={`https://explorer.solana.com/tx/${r.signature}?cluster=${r.network}`}
                      target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[var(--solana)] hover:underline"
                    >
                      explorer <ExternalLink className="h-3 w-3" />
                    </a>
                  </td>
                </tr>
              ))}
              {!stats?.recent?.length && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">Belum ada transaksi.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <PackageDialog
        pkg={editing}
        onClose={() => setEditing(null)}
        onSaved={() => { setEditing(null); reload(); }}
      />
    </main>
  );
}

function StatCard({ label, value, sub, accent }: { label: string; value: React.ReactNode; sub?: string; accent?: boolean }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-2 text-2xl font-bold ${accent ? "text-gradient" : ""}`}>{value}</div>
      {sub && <div className="mt-1 text-xs text-muted-foreground">≈ {sub}</div>}
    </div>
  );
}

function PackageDialog({ pkg, onClose, onSaved }: { pkg: Partial<Package> | null; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState<Partial<Package>>({});
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => { if (pkg) setForm(pkg); }, [pkg]);

  if (!pkg) return null;

  async function save() {
    setErr(null); setSaving(true);
    try {
      await adminApi.savePackage({
        ...form,
        features: typeof form.features === "string"
          ? (form.features as unknown as string).split("\n").map((s) => s.trim()).filter(Boolean)
          : form.features ?? [],
      });
      onSaved();
    } catch (e) {
      setErr((e as Error).message);
    } finally { setSaving(false); }
  }

  const featuresText = Array.isArray(form.features) ? form.features.join("\n") : "";

  return (
    <Dialog open={!!pkg} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="glass max-w-lg">
        <DialogHeader>
          <DialogTitle>{form.id ? "Edit paket" : "Paket baru"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Field label="Nama" value={form.name ?? ""} onChange={(v) => setForm({ ...form, name: v })} />
          <div className="grid grid-cols-3 gap-3">
            <Field label="Speed (Mbps)" type="number" value={String(form.speed_mbps ?? "")} onChange={(v) => setForm({ ...form, speed_mbps: +v })} />
            <Field label="Durasi (hari)" type="number" value={String(form.duration_days ?? "")} onChange={(v) => setForm({ ...form, duration_days: +v })} />
            <Field label="Harga (SOL)" type="number" step="0.001" value={String(form.price_sol ?? "")} onChange={(v) => setForm({ ...form, price_sol: +v })} />
          </div>
          <div className="grid gap-1.5">
            <Label>Fitur (1 baris = 1 fitur)</Label>
            <textarea
              className="min-h-24 rounded-md border bg-background/40 p-2 text-sm"
              value={featuresText}
              onChange={(e) => setForm({ ...form, features: e.target.value.split("\n") })}
            />
          </div>
          <div className="flex items-center justify-between rounded-md border bg-background/40 p-3">
            <Label htmlFor="hl">Tandai sebagai populer</Label>
            <Switch id="hl" checked={!!form.highlight} onCheckedChange={(v) => setForm({ ...form, highlight: v })} />
          </div>
          {err && <div className="text-sm text-destructive">{err}</div>}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Batal</Button>
          <Button onClick={save} disabled={saving} className="btn-solana hover:btn-solana-hover">
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, value, onChange, type = "text", step }: { label: string; value: string; onChange: (v: string) => void; type?: string; step?: string }) {
  return (
    <div className="grid gap-1.5">
      <Label>{label}</Label>
      <Input type={type} step={step} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
