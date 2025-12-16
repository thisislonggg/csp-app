"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/admin";

async function setAuthCookies(accessToken: string, refreshToken: string) {
  const c = await cookies();

  const isProd = process.env.NODE_ENV === "production";

  c.set("sb_access_token", accessToken, {
    httpOnly: true,
    secure: isProd,          // ✅ penting!
    sameSite: "lax",
    path: "/",
  });

  c.set("sb_refresh_token", refreshToken, {
    httpOnly: true,
    secure: isProd,          // ✅ penting!
    sameSite: "lax",
    path: "/",
  });
}


export async function registerAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();
  if (!email || !password) throw new Error("Email & password wajib diisi.");

  const { data, error } = await supabaseAdmin.auth.signUp({ email, password });
  if (error) throw new Error(error.message);

  if (!data.session) {
    return { ok: true, message: "Registrasi berhasil. Cek email untuk verifikasi." };
  }

  await setAuthCookies(data.session.access_token, data.session.refresh_token);
  redirect("/dashboard");
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();
  if (!email || !password) throw new Error("Email & password wajib diisi.");

  const { data, error } = await supabaseAdmin.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);

  await setAuthCookies(data.session.access_token, data.session.refresh_token);
  redirect("/dashboard");
}

export async function logoutAction() {
  const c = await cookies();
  c.delete("sb_access_token");
  c.delete("sb_refresh_token");
  redirect("/login");
}
