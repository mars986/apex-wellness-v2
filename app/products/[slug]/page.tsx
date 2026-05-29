const products = {
  "trimix": {
    name: "TriMix",
    strength: "150MG / 5MG / 50MCG",
    description:
      "Precision compounded intracavernosal formulation prepared for reconstitution.",
    variants: [
      { size: "2.5mL Multi-Dose Vial", price: "$179.99" },
      { size: "5mL Multi-Dose Vial", price: "$329.99" },
    ],
  },

  "quadmix": {
    name: "QuadMix",
    strength: "150MG / 10MG / 100MCG / 1MG",
    description:
      "Precision compounded intracavernosal formulation prepared for reconstitution.",
    variants: [
      { size: "2.5mL Multi-Dose Vial", price: "$199.99" },
      { size: "5mL Multi-Dose Vial", price: "$379.99" },
    ],
  },

  "nad-500mg": {
    name: "NAD+ 500MG",
    strength: "500MG",
    description:
      "Nicotinamide Adenine Dinucleotide prepared for reconstitution.",
    variants: [
      { size: "10mL Vial", price: "$149.99" },
    ],
  },

  "pt-141": {
    name: "PT-141",
    strength: "10MG",
    description:
      "Bremelanotide / PT-141 prepared as a lyophilized formulation.",
    variants: [
      { size: "10mL Vial", price: "$149.99" },
    ],
  },

  "bacteriostatic-water": {
    name: "Bacteriostatic Water",
    strength: "Deionized Pure Water with 0.9% Benzyl Alcohol",
    description:
      "Sterile diluent designed for reconstitution support.",
    variants: [
      { size: "5mL Multi-Use Vial", price: "$14.99" },
      { size: "10mL Multi-Use Vial", price: "$24.99" },
    ],
  },
} as const;
import { hasReferralCode } from "@/lib/referrals/cookies";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product =
    products[slug as keyof typeof products];

  if (!product) {
    return (
      <main className="p-8">
        <h1 className="text-3xl font-bold">
          Product Not Found
        </h1>
      </main>
    );
  }
const referralUnlocked = await hasReferralCode();
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <p className="text-sm uppercase tracking-wide text-slate-500">
        Product
      </p>

      <h1 className="mt-2 text-5xl font-bold">
        {product.name}
      </h1>

      <p className="mt-4 text-lg text-slate-600">
        {product.description}
      </p>

      <div className="mt-6 rounded-xl border p-4">
        <h2 className="font-semibold">
          Strength
        </h2>

        <p className="mt-2">
          {product.strength}
        </p>
      </div>

      <div className="mt-6 rounded-xl border p-6">
        <h2 className="text-xl font-semibold">
          Available Variants
        </h2>

        <div className="mt-4 space-y-3">
          {product.variants.map((variant) => (
            <div
              key={variant.size}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <p className="font-medium">
                  {variant.size}
                </p>
              </div>

              <div className="text-lg font-semibold">
                {variant.price}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-slate-100 p-6">
        <p className="font-medium">
          Provider referral code required for purchase.
        </p>

{referralUnlocked ? (
  <form action="/api/cart/add" method="POST">
    <input
      type="hidden"
      name="slug"
      value={slug}
    />

    <button className="mt-4 rounded-lg bg-slate-950 px-5 py-3 text-white">
      Add To Cart
    </button>
  </form>
) : (
  <button
    className="mt-4 rounded-lg bg-slate-950 px-5 py-3 text-white opacity-50"
    disabled
  >
    Apply Referral Code To Unlock Checkout
  </button>
)}
      </div>
    </main>
  );
}