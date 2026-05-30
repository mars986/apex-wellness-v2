import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;

      console.log("Checkout completed");
      console.log("Session ID:", session.id);
      console.log("Referral:", session.metadata?.referralCode);
      console.log("Provider:", session.metadata?.providerId);
      console.log("Cart:", session.metadata?.cart);

      break;
    }

    default: {
      break;
    }
  }

  return NextResponse.json({ received: true });
}