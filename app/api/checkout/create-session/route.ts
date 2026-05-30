import { redirect } from "next/navigation";
import Stripe from "stripe";
import { getCart } from "@/lib/cart/cookies";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  const cart = await getCart();

  if (!cart.length) {
    redirect("/cart?error=empty");
  }

  const subtotalCents = cart.reduce((sum, item) => {
    return sum + Math.round(Number(item.price.replace("$", "")) * 100) * item.quantity;
  }, 0);

  const discountCents = Math.round(subtotalCents * 0.15);
  const totalCents = subtotalCents - discountCents;

  const lineItems = cart.map((item) => ({
    quantity: item.quantity,
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
        description: item.variant,
      },
      unit_amount: Math.round(Number(item.price.replace("$", "")) * 100),
    },
  }));

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    discounts: [],
    metadata: {
      referralCode: "DRSMITH15",
      providerId: "prov_001",
      referralCodeId: "ref_001",
      customerId: "cust_guest",
      subtotalCents: String(subtotalCents),
      discountCents: String(discountCents),
      totalCents: String(totalCents),
      cart: JSON.stringify(cart),
    },
    success_url: `${process.env.APP_URL}/checkout/success`,
    cancel_url: `${process.env.APP_URL}/cart`,
  });

  redirect(session.url!);
}