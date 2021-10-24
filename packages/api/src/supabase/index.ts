import { createClient } from "@supabase/supabase-js";

import { definitions } from "./types";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.SUPABASE_URL || "https://xyzcompany.supabase.co",
  process.env.SUPABASE_KEY || "public-anon-key"
);

export async function insertUserAddress(address: string, profileId: string) {
  const createdWallet = await supabase
    .from<definitions["wallets"]>("wallets")
    .insert({ address, profile_id: profileId });
  return createdWallet;
}

export async function getUserAddress(profileId: string) {
  const userAddress = await supabase.from<definitions["wallets"]>("wallets").select("*").eq("profile_id", profileId);

  return userAddress;
}

// count all wallets
export async function countWallets() {
  const { count } = await supabase.from<definitions["wallets"]>("wallets").select("id", { count: "exact" });

  return count;
}

export default supabase;
