import { Bunk } from "@/types";

export const DELIVERY_CHARGE = 20;

export function calculateTotal(cart: Bunk[], discount: number): number {
  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  return subtotal + DELIVERY_CHARGE - discount;
}