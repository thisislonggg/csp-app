"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { cookies } from "next/headers";

async function getUserIdFromCookie() {
  const access = cookies().get("sb_access_token")?.value;
  if (!access) throw new Error("Not authenticated.");

  const { data, error } = await supabaseAdmin.auth.getUser(access);
  if (error) throw new Error(error.message);
  if (!data.user) throw new Error("User not found.");
  return data.user.id;
}

export async function uploadProfilePhotoAction(file: File) {
  const userId = await getUserIdFromCookie();
  if (!file || file.size === 0) throw new Error("File foto kosong.");

  const ext = file.name.split(".").pop() || "jpg";
  const path = `${userId}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabaseAdmin.storage
    .from("profile-photos")
    .upload(path, file, {
      contentType: file.type || "image/jpeg",
      upsert: false,
    });

  if (error) throw new Error(error.message);
  return path;
}
