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
  location?: string;
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
    // Moda
    material?: string;
    type?: string;
    details?: string;
    length?: string;
    style?: string;
    color?: string;
    modelSize?: string;
    collection?: string;
  };
}

// Initial PRODUCTS list
export const PRODUCTS: Product[] = [
  {
    id: 'job-1',
    title: 'Pictură în ulei a apartamentelor, caselor',
    price: 0,
    originalPrice: 0,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600',
    category: 'Locuri de muncă',
    feeling: 'Caut de muncă',
    design: 'Pictori în ulei',
    color: 'Toate',
    location: 'ATENA 10438',
    description: 'Ofer servicii de pictură în ulei pentru apartamente și case.',
    createdAt: new Date(Date.now() - 31 * 60000).toISOString()
  },
  {
    id: 'job-2',
    title: 'SKODA RAPID 2013',
    price: 60,
    originalPrice: 60,
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c3b9?auto=format&fit=crop&q=80&w=600',
    category: 'Locuri de muncă',
    feeling: 'Ofer de muncă',
    design: 'Șoferi de taxi',
    color: 'Toate',
    location: 'KALLITHEA 17675',
    description: 'Caut șofer de taxi pentru Skoda Rapid 2013.',
    createdAt: new Date(Date.now() - 36 * 60000).toISOString()
  },
  {
    id: 'job-3',
    title: 'ELECTRICIAN ȘI MECANIC utilaje de ridicat',
    price: 800,
    originalPrice: 800,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600',
    category: 'Locuri de muncă',
    feeling: 'Ofer de muncă',
    design: 'Electronic',
    color: 'Toate',
    location: 'ACHARNES 13677',
    description: 'Angajăm electrician și mecanic pentru utilaje de ridicat.',
    createdAt: new Date(Date.now() - 41 * 60000).toISOString()
  },
  {
    id: 'imob-1',
    title: 'Apartament 92 mp de vânzare',
    price: 192000,
    originalPrice: 192000,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=600',
    category: 'Imobiliare',
    feeling: 'Vânzare',
    design: 'Apartament',
    color: 'Toate',
    location: 'Salonic - Municipalități suburbane » Ampelokipoi',
    description: 'Apartament spațios, complet utilat.',
    createdAt: new Date(Date.now() - 24 * 60000).toISOString(),
    specs: {
      length: '92 mp',
      modelSize: '2 dormitoare',
      collection: 'Primul',
      style: '1993'
    }
  }
];

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
