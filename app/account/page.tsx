import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">Customer Account</h1>
      <p className="mt-2 text-slate-600">Signed in as {session.email}</p>
    </main>
  );
}
