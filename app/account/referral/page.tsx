import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function ReferralPage() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <main className="mx-auto max-w-md p-8">
      <h1 className="text-2xl font-semibold">Apply referral code</h1>
      <p className="mt-2 text-sm text-slate-600">
        Enter an approved provider referral code to unlock cart and checkout.
      </p>

      <form action="/api/referral/apply" method="POST" className="mt-6 space-y-4">
        <input
          className="w-full rounded-lg border border-slate-300 px-3 py-2 uppercase"
          name="code"
          placeholder="DRSMITH15"
          required
        />

        <button
          className="w-full rounded-lg bg-slate-950 px-4 py-2 text-white"
          type="submit"
        >
          Apply code
        </button>
      </form>
    </main>
  );
}
