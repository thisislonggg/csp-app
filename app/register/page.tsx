import { registerAction } from "../actions/auth";

export default function RegisterPage() {
  return (
    <main style={{ maxWidth: 420 }}>
      <h2>Register</h2>
      <form action={registerAction} style={{ display: "grid", gap: 12 }}>
        <input name="email" type="email" placeholder="email" required />
        <input name="password" type="password" placeholder="password" required />
        <button type="submit">Buat akun</button>
      </form>
    </main>
  );
}
