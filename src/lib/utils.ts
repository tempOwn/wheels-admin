import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { TAsset } from "@/src/modules/assets/types";

export function mergeRefs<T = any>(
  refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>,
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAssetImage(type: TAsset["type"]) {
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

export function getAssetType(type: TAsset["type"]) {
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

export function getIntials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}
