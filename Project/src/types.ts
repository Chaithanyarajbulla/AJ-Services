export type View = "options" | "home" | "cart" | "tracking" | "profile";
export type SubView = "fuel" | "mechanic";

export interface Bunk {
  id: number;
  name: string;
  fuelAvailable: string[];
  mechanicAvailable: boolean;
  price: number;
  distance: number; // in km
}