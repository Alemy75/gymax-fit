import { createClient } from "@supabase/supabase-js";
import { Database } from "./types";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient<Database>(url, key);

export * from "./types";
