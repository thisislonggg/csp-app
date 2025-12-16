import { logoutAction } from "@/app/actions/auth";

export default function AuthButton() {
  return (
    <form action={logoutAction}>
      <button type="submit">Logout</button>
    </form>
  );
}
