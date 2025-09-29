import { redirect } from "next/navigation";

export default function AuthPage() {
  // Redirect to the signin page
  redirect("/auth/signin");
}
