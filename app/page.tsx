import Link from "next/link";

export default function Home() {
  return (
    <main style={{ maxWidth: 720 }}>
      <h1>CSP App</h1>
      <p>Register/Login via Server Actions, simpan profil ke Supabase.</p>
      <div style={{ display: "flex", gap: 12 }}>
        <Link href="/register">Register</Link>
        <Link href="/login">Login</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>
    </main>
  );
}
