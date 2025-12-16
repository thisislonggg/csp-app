import { loginAction } from "../actions/auth";

export default function LoginPage() {
  return (
    <main className="split">
      <section className="card">
        <h1 className="h1">Login</h1>
        <p className="p">Masuk untuk mengakses dashboard & data profil.</p>
        <hr className="hr" />

        <form action={loginAction} className="grid">
          <div className="grid" style={{ gap: 10 }}>
            <label className="p" style={{ fontSize: 13 }}>Email</label>
            <input className="input" name="email" type="email" placeholder="contoh@email.com" required />
          </div>

          <div className="grid" style={{ gap: 10 }}>
            <label className="p" style={{ fontSize: 13 }}>Password</label>
            <input className="input" name="password" type="password" placeholder="Password kamu" required />
          </div>

          <button className="btn btnPrimary" type="submit">Login</button>
          <div className="badge">
            Shortcut: buka <span className="kbd">/dashboard</span> setelah login
          </div>
        </form>
      </section>

      <aside className="card">
        <h2 className="h2">Keamanan</h2>
        <p className="p">
          Login/registrasi memakai <b>Server Actions</b> (bukan client-side),
          dan data profil dilindungi oleh <b>RLS</b>.
        </p>
      </aside>
    </main>
  );
}
