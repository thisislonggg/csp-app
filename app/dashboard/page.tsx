import AuthButton from "@/app/components/AuthButton";
import ProfileForm from "@/app/components/ProfileForm";
import { getMyProfileAction } from "@/app/actions/profile";
import Link from "next/link";

export default async function DashboardPage() {
  let profile = null;

  try {
    profile = await getMyProfileAction();
  } catch {
    return (
      <main className="card">
        <h2 className="h2">Belum Login</h2>
        <p className="p">
          Kamu harus login terlebih dahulu untuk mengakses dashboard.
        </p>
        <Link className="btn btnPrimary" href="/login">
          Login
        </Link>
      </main>
    );
  }

  return (
    <main className="split">
      <section className="card">
        <h2 className="h2">Dashboard</h2>
        <AuthButton />
        <ProfileForm
          initial={{
            full_name: profile?.full_name ?? "",
            address: profile?.address ?? "",
            ktp_number: profile?.ktp_number ?? "",
          }}
        />
      </section>

      <aside className="card">
        <h3 className="h2">Status Akun</h3>
        <p className="p">✅ Login aktif</p>
        <p className="p">🔐 Data hanya bisa diakses oleh akun ini</p>
      </aside>
    </main>
  );
}
