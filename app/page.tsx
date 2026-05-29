import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Apex Wellness
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight">
            Provider-guided wellness products with referral-gated checkout.
          </h1>

          <p className="mt-6 text-lg text-slate-600">
            Browse precision-compounded wellness products, create an account,
            and unlock ordering with an approved provider referral code.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-lg bg-slate-950 px-5 py-3 text-sm font-medium text-white"
            >
              View Products
            </Link>

            <Link
              href="/auth/login"
              className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-medium"
            >
              Sign In
            </Link>

            <Link
              href="/account/referral"
              className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-medium"
            >
              Apply Referral Code
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-14 md:grid-cols-3">
          <div className="rounded-xl border bg-white p-6">
            <h2 className="text-lg font-semibold">1. Browse</h2>
            <p className="mt-2 text-sm text-slate-600">
              Review available products, strengths, variants, and inventory.
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6">
            <h2 className="text-lg font-semibold">2. Apply Code</h2>
            <p className="mt-2 text-sm text-slate-600">
              Use an approved provider referral code to unlock cart and checkout.
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6">
            <h2 className="text-lg font-semibold">3. Checkout</h2>
            <p className="mt-2 text-sm text-slate-600">
              Your 15% referral discount is applied when your account has a valid code.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-2xl font-semibold">Provider Referral Program</h2>
        <p className="mt-3 max-w-2xl text-slate-600">
          Approved providers receive referral codes, tracking links, commission reporting,
          payout visibility, and downloadable marketing assets.
        </p>

        <div className="mt-6">
          <Link
            href="/provider"
            className="rounded-lg bg-slate-950 px-5 py-3 text-sm font-medium text-white"
          >
            Provider Portal
          </Link>
        </div>
      </section>
    </main>
  );
}
