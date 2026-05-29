import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function ProviderPage() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-semibold">Provider Dashboard</h1>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-4">
          <h2 className="text-sm text-slate-500">Referral Code</h2>
          <p className="mt-2 text-xl font-semibold">DRSMITH15</p>
        </div>

        <div className="rounded-xl border p-4">
          <h2 className="text-sm text-slate-500">Commission Earned</h2>
          <p className="mt-2 text-xl font-semibold">$0.00</p>
        </div>

        <div className="rounded-xl border p-4">
          <h2 className="text-sm text-slate-500">Referred Orders</h2>
          <p className="mt-2 text-xl font-semibold">0</p>
        </div>

        <div className="rounded-xl border p-4">
          <h2 className="text-sm text-slate-500">Pending Payout</h2>
          <p className="mt-2 text-xl font-semibold">$0.00</p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border p-6">
        <h2 className="text-lg font-semibold">Referral Link</h2>
        <p className="mt-2 break-all text-sm">
          https://wellness.apexcompounding.com?r=DRSMITH15
        </p>
      </div>
    </main>
  );
}
