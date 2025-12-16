import AuthButton from "@/app/components/AuthButton";
import ProfileForm from "@/app/components/ProfileForm";
import { getMyProfileAction } from "@/app/actions/profile";
import { supabaseClient } from "@/lib/supabase/client";

export default async function DashboardPage() {
  const profile = await getMyProfileAction();

  // URL foto (kalau bucket private, pakai signed URL di server — versi simpel ini public URL)
  // Kalau bucket kamu private, bilang ya—nanti aku ubah jadi signed URL via server action.
  const photoUrl =
    profile?.photo_path
      ? supabaseClient.storage.from("profile-photos").getPublicUrl(profile.photo_path).data.publicUrl
      : null;

  return (
    <main style={{ maxWidth: 720 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Dashboard</h2>
        <AuthButton />
      </div>

      {photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photoUrl} alt="Profile" style={{ width: 160, height: 160, objectFit: "cover", borderRadius: 12 }} />
      ) : (
        <p>Belum ada foto.</p>
      )}

      <h3>Data Profil</h3>
      <ProfileForm
        initial={{
          full_name: profile?.full_name ?? "",
          address: profile?.address ?? "",
          ktp_number: profile?.ktp_number ?? "",
        }}
      />
    </main>
  );
}
