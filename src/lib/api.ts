import { supabase } from "@/integrations/supabase/client";

export type Package = {
  id: string;
  name: string;
  speed_mbps: number;
  duration_days: number;
  price_sol: number;
  features: string[];
  highlight?: boolean;
};

function normalizePackage(row: {
  id: string;
  name: string;
  speed_mbps: number;
  duration_days: number;
  price_sol: number | string;
  features: unknown;
  highlight: boolean;
}): Package {
  return {
    id: row.id,
    name: row.name,
    speed_mbps: row.speed_mbps,
    duration_days: row.duration_days,
    price_sol: Number(row.price_sol),
    features: Array.isArray(row.features) ? (row.features as string[]) : [],
    highlight: row.highlight,
  };
}

export async function fetchPackages(): Promise<Package[]> {
  const { data, error } = await supabase
    .from("packages")
    .select("id,name,speed_mbps,duration_days,price_sol,features,highlight,is_active,sort_order")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error || !data) return [];
  return data.map(normalizePackage);
}

export type RecordPaymentInput = {
  package_id: string;
  package_name?: string;
  wallet: string;
  signature: string;
  amount_sol: number;
  customer_name: string;
  customer_email: string;
  network: "devnet" | "mainnet-beta";
};

export async function recordPayment(input: RecordPaymentInput) {
  const invoice = `INV-${Date.now().toString(36).toUpperCase()}-${input.signature.slice(0, 6).toUpperCase()}`;
  const { data: userData } = await supabase.auth.getUser();
  const { error } = await supabase.from("payments").insert({
    invoice,
    package_id: input.package_id,
    package_name: input.package_name ?? null,
    customer_name: input.customer_name,
    customer_email: input.customer_email,
    wallet: input.wallet,
    network: input.network,
    amount_sol: input.amount_sol,
    signature: input.signature,
    status: "confirmed",
    user_id: userData.user?.id ?? null,
  });
  if (error) {
    return { ok: false as const, invoice: `LOCAL-${input.signature.slice(0, 8).toUpperCase()}`, error: error.message };
  }
  return { ok: true as const, invoice };
}
