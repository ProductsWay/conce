import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

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
  const userAddress = await supabase
    .from<definitions["wallets"]>("wallets")
    .select("*")
    .eq("profile_id", profileId)
    .single();

  return userAddress;
}

function md5(password: string) {
  return crypto.createHash("md5").update(password).digest("hex");
}

export async function getAdminUser(username: string, password: string) {
  // md5 password
  const md5Password = md5(password);

  // select admin user
  const admin = await supabase
    .from<definitions["admin_users"]>("admin_users")
    .select("*")
    .eq("username", username)
    .eq("password", md5Password)
    .single();

  return admin;
}

// count all wallets
export async function countWallets() {
  const { count } = await supabase.from<definitions["wallets"]>("wallets").select("id", { count: "exact" });

  return count;
}

export default supabase;
