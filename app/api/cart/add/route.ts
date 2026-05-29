import { redirect } from "next/navigation";
import { getCart, setCart } from "@/lib/cart/cookies";
import { hasReferralCode } from "@/lib/referrals/cookies";

const productMap = {
  trimix: {
    name: "TriMix",
    variant: "2.5mL Multi-Dose Vial",
    price: "$179.99",
  },
  quadmix: {
    name: "QuadMix",
    variant: "2.5mL Multi-Dose Vial",
    price: "$199.99",
  },
  "nad-500mg": {
    name: "NAD+ 500MG",
    variant: "10mL Vial",
    price: "$149.99",
  },
  "pt-141": {
    name: "PT-141",
    variant: "10mL Vial",
    price: "$149.99",
  },
  "bacteriostatic-water": {
    name: "Bacteriostatic Water",
    variant: "5mL Multi-Use Vial",
    price: "$14.99",
  },
} as const;

export async function POST(request: Request) {
  const referralUnlocked = await hasReferralCode();

  if (!referralUnlocked) {
    redirect("/account/referral?error=referral_required");
  }

  const formData = await request.formData();
  const slug = String(formData.get("slug") || "");

  const product = productMap[slug as keyof typeof productMap];

  if (!product) {
    redirect("/products");
  }

  const cart = await getCart();

  const existing = cart.find(
    (item) => item.slug === slug && item.variant === product.variant
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      slug,
      name: product.name,
      variant: product.variant,
      price: product.price,
      quantity: 1,
    });
  }

  await setCart(cart);

  redirect("/cart");
}