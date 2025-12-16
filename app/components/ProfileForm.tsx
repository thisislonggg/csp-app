"use client";

import { useState } from "react";
import { upsertMyProfileAction } from "@/app/actions/profile";

type Profile = {
  full_name: string | null;
  address: string | null;
  ktp_number: string | null;
};

export default function ProfileForm({ initial }: { initial: Profile | null }) {
  const [msg, setMsg] = useState<string>("");

  return (
    <form
      action={async (fd) => {
        setMsg("");
        try {
          await upsertMyProfileAction(fd);
          setMsg("✅ Data tersimpan!");
        } catch (e: any) {
          setMsg(`❌ ${e?.message || "Gagal simpan"}`);
        }
      }}
      style={{ display: "grid", gap: 12, maxWidth: 520 }}
    >
      <input
        name="full_name"
        placeholder="Nama"
        defaultValue={initial?.full_name ?? ""}
        required
      />
      <textarea
        name="address"
        placeholder="Alamat"
        defaultValue={initial?.address ?? ""}
        rows={3}
        required
      />
      <input
        name="ktp_number"
        placeholder="No KTP"
        defaultValue={initial?.ktp_number ?? ""}
        required
      />
      <input name="photo" type="file" accept="image/*" />
      <button type="submit">Simpan / Update</button>
      {msg ? <p>{msg}</p> : null}
    </form>
  );
}
