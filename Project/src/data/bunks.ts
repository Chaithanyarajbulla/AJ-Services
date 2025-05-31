import { Bunk } from "@/types";

const bunks: Bunk[] = [
  { 
    id: 1, 
    name: "HP Petrol Bunk", 
    fuelAvailable: ["Petrol", "Diesel"], 
    mechanicAvailable: true, 
    price: 102, 
    distance: 5 
  },
  { 
    id: 2, 
    name: "Indian Oil Bunk", 
    fuelAvailable: ["Petrol"], 
    mechanicAvailable: false, 
    price: 101, 
    distance: 9 
  },
  { 
    id: 3, 
    name: "Bharat Petroleum", 
    fuelAvailable: ["Diesel"], 
    mechanicAvailable: true, 
    price: 98, 
    distance: 12 
  },
  { 
    id: 4, 
    name: "Shell Petrol Station", 
    fuelAvailable: ["Petrol", "Diesel", "Premium"], 
    mechanicAvailable: true, 
    price: 105, 
    distance: 3.5 
  },
  { 
    id: 5, 
    name: "Reliance Petroleum", 
    fuelAvailable: ["Petrol", "Diesel"], 
    mechanicAvailable: false, 
    price: 100, 
    distance: 7.2 
  },
  { 
    id: 6, 
    name: "Essar Oil", 
    fuelAvailable: ["Diesel"], 
    mechanicAvailable: true, 
    price: 97, 
    distance: 8.5 
  },
];

export function getBunks(): Bunk[] {
  return bunks;
}

export function getBunkById(id: number): Bunk | undefined {
  return bunks.find(bunk => bunk.id === id);
}