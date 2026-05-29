import Link from "next/link";
import { getCart } from "@/lib/cart/cookies";

export default async function CartPage() {
  const cart = await getCart();

  const isEmpty = cart.length === 0;

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-4xl font-bold">Shopping Cart</h1>

      {isEmpty ? (
        <div className="mt-8 rounded-xl border p-6">
          <p className="text-slate-600">Your cart is currently empty.</p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {cart.map((item) => (
            <div
              key={`${item.slug}-${item.variant}`}
              className="flex items-center justify-between rounded-xl border p-6"
            >
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-slate-600">{item.variant}</p>
                <p className="text-sm text-slate-600">
                  Quantity: {item.quantity}
                </p>
              </div>

              <p className="text-lg font-semibold">{item.price}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex gap-3">
        <Link
          href="/products"
          className="rounded-lg border border-slate-300 px-5 py-3"
        >
          Continue Shopping
        </Link>

<form action="/api/checkout/create-session" method="POST">
  <button className="rounded-lg bg-slate-950 px-5 py-3 text-white">
    Checkout
  </button>
</form>
      </div>
    </main>
  );
}
