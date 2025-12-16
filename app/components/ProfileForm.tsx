"use client";

import { useState } from "react";
import { upsertMyProfileAction } from "@/app/actions/profile";

type Profile = {
  full_name: string | null;
  address: string | null;
  ktp_number: string | null;
};

export default function ProfileForm({ initial }: { initial: Profile | null }) {
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  return (
    <form
      action={async (fd) => {
        setMsg(null);
        try {
          await upsertMyProfileAction(fd);
          setMsg({ type: "ok", text: "✅ Data tersimpan!" });
        } catch (e: any) {
          setMsg({ type: "err", text: `❌ ${e?.message || "Gagal simpan"}` });
        }
      }}
      className="grid"
      style={{ maxWidth: 560 }}
    >
      <div className="grid" style={{ gap: 10 }}>
        <label className="p" style={{ fontSize: 13 }}>Nama</label>
        <input className="input" name="full_name" defaultValue={initial?.full_name ?? ""} required />
      </div>

      <div className="grid" style={{ gap: 10 }}>
        <label className="p" style={{ fontSize: 13 }}>Alamat</label>
        <textarea className="textarea" name="address" defaultValue={initial?.address ?? ""} required />
      </div>

      <div className="grid" style={{ gap: 10 }}>
        <label className="p" style={{ fontSize: 13 }}>No KTP</label>
        <input className="input" name="ktp_number" defaultValue={initial?.ktp_number ?? ""} required />
      </div>

      <div className="grid" style={{ gap: 10 }}>
        <label className="p" style={{ fontSize: 13 }}>Upload Foto</label>
        <input className="file" name="photo" type="file" accept="image/*" />
      </div>

      <button className="btn btnPrimary" type="submit">Simpan / Update</button>

      {msg ? (
        <p className={msg.type === "ok" ? "msgOk" : "msgErr"} style={{ margin: 0 }}>
          {msg.text}
        </p>
      ) : null}
    </form>
  );
}
