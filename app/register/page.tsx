import { registerAction } from "../actions/auth";

export default function RegisterPage() {
  return (
    <main className="split">
      <section className="card">
        <h1 className="h1">Buat akun</h1>
        <p className="p">Daftar untuk akses dashboard dan isi data CSP kamu.</p>
        <hr className="hr" />

        <form action={registerAction as any} style={{ display: "grid", gap: 12 }}>
          <div className="grid" style={{ gap: 10 }}>
            <label className="p" style={{ fontSize: 13 }}>Email</label>
            <input className="input" name="email" type="email" placeholder="contoh@email.com" required />
          </div>

          <div className="grid" style={{ gap: 10 }}>
            <label className="p" style={{ fontSize: 13 }}>Password</label>
            <input className="input" name="password" type="password" placeholder="Minimal 6 karakter" required />
          </div>

          <button className="btn btnPrimary" type="submit">Buat akun</button>
          <div className="badge">
            Tips: setelah daftar, kamu akan langsung diarahkan ke <span className="kbd">/dashboard</span>
          </div>
        </form>
      </section>

      <aside className="card">
        <h2 className="h2">Apa yang disimpan?</h2>
        <p className="p">
          Setelah login, kamu bisa mengisi <b>nama</b>, <b>alamat</b>, <b>No KTP</b>, dan <b>foto</b>.
          Data disimpan ke Supabase dengan policy per-user.
        </p>
      </aside>
    </main>
  );
}
