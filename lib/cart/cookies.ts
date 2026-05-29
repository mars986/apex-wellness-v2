import { cookies } from "next/headers";

export type CartItem = {
  slug: string;
  name: string;
  variant: string;
  price: string;
  quantity: number;
};

const CART_COOKIE = "apex_cart";

export async function getCart(): Promise<CartItem[]> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(CART_COOKIE)?.value;

  if (!raw) return [];

  try {
    return JSON.parse(decodeURIComponent(raw));
  } catch {
    return [];
  }
}

export async function setCart(items: CartItem[]) {
  const cookieStore = await cookies();

  cookieStore.set(CART_COOKIE, encodeURIComponent(JSON.stringify(items)), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}
