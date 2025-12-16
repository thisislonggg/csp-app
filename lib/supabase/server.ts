import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export async function supabaseServer() {
  const cookieStore = await cookies();
  const access = cookieStore.get("sb_access_token")?.value;
  const refresh = cookieStore.get("sb_refresh_token")?.value;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );

  return { supabase, access, refresh };
}
