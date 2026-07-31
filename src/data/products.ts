export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  discountPercentage?: number;
  badges?: string[];
  image: string;
  images?: string[];
  category: string;
  feeling: string;
  design: string;
  color: string;
  description: string;
  createdAt?: string;
  isPopular?: boolean;
  specs?: {
    year?: string;
    mileage?: string;
    fuel?: string;
    gearbox?: string;
    caroserie?: string;
    brand?: string;
    modelName?: string;
    power?: string;
    owners?: string;
  };
}

// Initial PRODUCTS list - Empty (0 demo listings)
export const PRODUCTS: Product[] = [];

export const CATEGORIES = [
  "Toate",
  "Imobiliare",
  "Auto",
  "Locuri de muncă",
  "Electronice",
  "Servicii",
  "Matrimoniale",
  "Modă",
  "Animale",
  "Turism"
];
export const FEELINGS = ["Toate", "Cute", "Mood", "Love", "Work", "Surprise", "Science"];
export const DESIGNS = ["Toate", "Special", "Cute", "Moon", "Medical", "Heart", "Dino", "Flask", "Funny"];
export const COLORS = ["Toate", "Multicolor", "Alb/Negru", "Galben/Negru", "Mov", "Roșu", "Roz", "Portocaliu"];
