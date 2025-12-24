import { redirect } from 'next/navigation';

export default async function AuthPage() {
  // Redirect to the signin page
  redirect('/auth/signin');
}
