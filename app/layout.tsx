import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <div className="container">
          <header className="nav">
            <div className="brand">
              <div className="logo" />
              <div>
                <div style={{ fontWeight: 700 }}>CSP App</div>
                <div className="p" style={{ fontSize: 13, marginTop: 2 }}>
                  Register/Login (Server Actions) + Supabase
                </div>
              </div>
            </div>

            <nav className="row">
              <Link className="btn btnGhost" href="/">Home</Link>
              <Link className="btn btnGhost" href="/register">Register</Link>
              <Link className="btn btnGhost" href="/login">Login</Link>
              <Link className="btn btnGhost" href="/dashboard">Dashboard</Link>
            </nav>
          </header>

          {children}
        </div>
      </body>
    </html>
  );
}
