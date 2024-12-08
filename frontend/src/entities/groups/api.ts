import { supabase } from "@/shared/api/supabase";

export const getGroups = (options: { start: number; end: number }) =>
  supabase
    .from("muscle_group")
    .select("*", { count: "exact" })
    .range(options.start, options.end);
