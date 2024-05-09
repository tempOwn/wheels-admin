import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { TInventory } from "@/src/modules/inventory/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAssetImage(type: TInventory["type"]) {
  switch (type) {
    case "capsule":
      return "/assets/images/reeddi-capsule.png";
    case "energy-box":
      return "/assets/images/reeddi-energy-box.png";
    case "big-energy":
      return "/assets/images/reeddi-big-energy.png";
    case "bike":
      return "/assets/images/bike.png";
    case "van":
      return "/assets/images/van.png";
  }
}

export function getAssetType(type: TInventory["type"]) {
  switch (type) {
    case "capsule":
      return "Reeddi Capsule";
    case "energy-box":
      return "Reeddi Energy Box";
    case "big-energy":
      return "Reeddi Big Energy";
    case "bike":
      return "Bike";
    case "van":
      return "Van";
  }
}
