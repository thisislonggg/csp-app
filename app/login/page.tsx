import { loginAction } from "../actions/auth";

export default function LoginPage() {
  return (
    <main style={{ maxWidth: 420 }}>
      <h2>Login</h2>
      <form action={loginAction} style={{ display: "grid", gap: 12 }}>
        <input name="email" type="email" placeholder="email" required />
        <input name="password" type="password" placeholder="password" required />
        <button type="submit">Login</button>
      </form>
    </main>
  );
}
