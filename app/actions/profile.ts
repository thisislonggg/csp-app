"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { cookies } from "next/headers";
import { uploadProfilePhotoAction } from "./storage";

async function getUserIdFromCookie() {
  const c = await cookies();
  const access = c.get("sb_access_token")?.value;
  if (!access) throw new Error("Not authenticated.");

  const { data, error } = await supabaseAdmin.auth.getUser(access);
  if (error) throw new Error(error.message);
  if (!data.user) throw new Error("User not found.");
  return data.user.id;
}

export async function getMyProfileAction() {
  const userId = await getUserIdFromCookie();

  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("id, full_name, address, ktp_number, photo_path, updated_at")
    .eq("id", userId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
}

export async function upsertMyProfileAction(formData: FormData) {
  const userId = await getUserIdFromCookie();

  const full_name = String(formData.get("full_name") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const ktp_number = String(formData.get("ktp_number") || "").trim();
  const photo = formData.get("photo") as File | null;

  let photo_path: string | null = null;
  if (photo && typeof photo === "object" && photo.size > 0) {
    photo_path = await uploadProfilePhotoAction(photo);
  }

  const payload: any = {
    id: userId,
    full_name,
    address,
    ktp_number,
    updated_at: new Date().toISOString(),
  };
  if (photo_path) payload.photo_path = photo_path;

  const { error } = await supabaseAdmin.from("profiles").upsert(payload);
  if (error) throw new Error(error.message);

  return { ok: true };
}
