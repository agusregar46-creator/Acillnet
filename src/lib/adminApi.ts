import { supabase } from "@/integrations/supabase/client";
import type { Package } from "./api";

export async function isCurrentUserAdmin(): Promise<boolean> {
  const { data: userData } = await supabase.auth.getUser();
  const uid = userData.user?.id;
  if (!uid) return false;
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", uid)
    .eq("role", "admin")
    .maybeSingle();
  if (error) return false;
  return !!data;
}

export type Stats = {
  total_tx: number;
  total_sol: number;
  today_tx: number;
  today_sol: number;
  recent: Array<{
    invoice: string;
    customer_name: string;
    customer_email: string;
    wallet: string;
    signature: string;
    amount_sol: number;
    network: string;
    created_at: string;
    package_id: string | null;
  }>;
};

async function fetchStats(): Promise<Stats> {
  const { data: rows, error } = await supabase
    .from("payments")
    .select("invoice,customer_name,customer_email,wallet,signature,amount_sol,network,created_at,package_id,status")
    .order("created_at", { ascending: false })
    .limit(500);
  if (error) throw new Error(error.message);
  const all = rows ?? [];
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  let total_sol = 0,
    today_tx = 0,
    today_sol = 0;
  for (const r of all) {
    const amt = Number(r.amount_sol) || 0;
    total_sol += amt;
    if (new Date(r.created_at) >= todayStart) {
      today_tx += 1;
      today_sol += amt;
    }
  }
  return {
    total_tx: all.length,
    total_sol,
    today_tx,
    today_sol,
    recent: all.slice(0, 20).map((r) => ({
      invoice: r.invoice,
      customer_name: r.customer_name,
      customer_email: r.customer_email,
      wallet: r.wallet,
      signature: r.signature ?? "",
      amount_sol: Number(r.amount_sol),
      network: r.network,
      created_at: r.created_at,
      package_id: r.package_id,
    })),
  };
}

async function listAllPackages(): Promise<Package[]> {
  const { data, error } = await supabase
    .from("packages")
    .select("id,name,speed_mbps,duration_days,price_sol,features,highlight,is_active,sort_order")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []).map((r) => ({
    id: r.id,
    name: r.name,
    speed_mbps: r.speed_mbps,
    duration_days: r.duration_days,
    price_sol: Number(r.price_sol),
    features: Array.isArray(r.features) ? (r.features as string[]) : [],
    highlight: r.highlight,
  }));
}

async function savePackage(p: Partial<Package>) {
  if (!p.name || p.speed_mbps == null || p.duration_days == null || p.price_sol == null) {
    throw new Error("Lengkapi semua field paket");
  }
  const payload = {
    name: p.name,
    speed_mbps: p.speed_mbps,
    duration_days: p.duration_days,
    price_sol: p.price_sol,
    features: p.features ?? [],
    highlight: p.highlight ?? false,
    is_active: true,
  };
  if (p.id) {
    const { error } = await supabase.from("packages").update(payload).eq("id", p.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("packages").insert(payload);
    if (error) throw new Error(error.message);
  }
}

async function deletePackage(id: string) {
  const { error } = await supabase.from("packages").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export const adminApi = {
  stats: fetchStats,
  packages: listAllPackages,
  savePackage,
  deletePackage,
};
