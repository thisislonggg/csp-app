"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/admin";

function setAuthCookies(accessToken: string, refreshToken: string) {
  const c = cookies();
  c.set("sb_access_token", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
  c.set("sb_refresh_token", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
}

export async function registerAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();

  if (!email || !password) throw new Error("Email & password wajib diisi.");

  const { data, error } = await supabaseAdmin.auth.signUp({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  if (!data.session) {
    // Jika Supabase require email confirmation, session bisa null
    return { ok: true, message: "Registrasi berhasil. Cek email untuk verifikasi." };
  }

  setAuthCookies(data.session.access_token, data.session.refresh_token);
  redirect("/dashboard");
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();
  if (!email || !password) throw new Error("Email & password wajib diisi.");

  const { data, error } = await supabaseAdmin.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  setAuthCookies(data.session.access_token, data.session.refresh_token);
  redirect("/dashboard");
}

export async function logoutAction() {
  const c = cookies();
  c.delete("sb_access_token");
  c.delete("sb_refresh_token");
  redirect("/login");
}
