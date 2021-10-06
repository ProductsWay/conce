import { createClient } from "@pankod/refine-supabase";

// TODO: read from .env file
const SUPABASE_URL = "https://gjxvzzhqvecxdtfqvdah.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMzI1MTU3NSwiZXhwIjoxOTQ4ODI3NTc1fQ.l1LfM1UfLaoHUXPvsEPh1jpV-yteP-1KGALbxtnQ_l4";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabaseClient;
