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
    transmission?: string;
    engine?: string;
    model?: string;
    // Moda
    material?: string;
    type?: string;
    details?: string;
    length?: string;
    style?: string;
    color?: string;
    modelSize?: string;
    collection?: string;
    bathrooms?: string;
  };
  seller?: {
    name?: string;
    avatar?: string;
    rating?: number;
    reviews?: number;
    joined?: string;
  };
}

// Initial PRODUCTS list
export const PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Vând apartament 2 camere',
    price: 85000,
    originalPrice: 90000,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1de2d966ce?auto=format&fit=crop&q=80&w=600',
    category: 'Imobiliare',
    feeling: 'Vânzare',
    design: 'Apartament',
    color: 'Toate',
    location: 'București, România',
    description: 'Apartament luminos, decomandat, zonă liniștită.',
    createdAt: new Date().toISOString(),
    specs: {
      length: '55 mp',
      modelSize: 'Etaj 3/8',
      collection: 'An constructie',
      style: '1980',
      bathrooms: '1 baie'
    }
  },
  {
    id: '2',
    title: 'BMW Seria 3, an 2018',
    price: 18500,
    originalPrice: 19900,
    image: 'https://images.unsplash.com/photo-1555353540-64fddef71eb8?auto=format&fit=crop&q=80&w=600',
    category: 'Auto',
    feeling: 'Vânzare',
    design: 'Toate',
    color: 'Albastru',
    location: 'Cluj-Napoca, România',
    description: 'Stare impecabilă, carte service, un singur proprietar.',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    specs: {
      year: '2018',
      mileage: '120.000 km',
      fuel: 'Diesel',
      transmission: 'Automată',
      engine: '2.0 / 190 CP',
      brand: 'BMW',
      model: 'Seria 3'
    }
  },
  {
    id: '3',
    title: 'Meseriaș ofer servicii amenajări interioare',
    price: 0,
    originalPrice: 0,
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=600',
    category: 'Locuri de muncă',
    feeling: 'Caut de muncă',
    design: 'Pictori în ulei',
    color: 'Toate',
    location: 'București, România',
    description: 'Ofer servicii de pictură în ulei pentru apartamente și case.',
    createdAt: new Date(Date.now() - 31 * 60000).toISOString()
  },
  {
    id: '4',
    title: 'Angajăm șofer taxi / Uber',
    price: 0,
    originalPrice: 0,
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=600',
    category: 'Locuri de muncă',
    feeling: 'Vânzare',
    design: 'Skoda',
    color: 'Toate',
    location: 'Timișoara, România',
    description: 'Caut șofer de taxi pentru Skoda Rapid 2013.',
    createdAt: new Date(Date.now() - 36 * 60000).toISOString()
  },
  {
    id: '5',
    title: 'Închiriere apartament cu 3 camere',
    price: 450,
    originalPrice: 500,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=600',
    category: 'Imobiliare',
    feeling: 'Închiriere',
    design: 'Cameră',
    color: 'Toate',
    location: 'București, România',
    description: 'Apartament spațios, complet utilat.',
    createdAt: new Date(Date.now() - 24 * 60000).toISOString(),
    specs: {
      length: '92 mp',
      modelSize: '2 dormitoare',
      collection: 'Primul',
      style: '1993',
      bathrooms: '1 baie'
    }
  },
  {
    id: '6',
    title: 'Apartament lux 2 camere, Bloc Nou',
    price: 135000,
    originalPrice: 140000,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1de2d966ce?auto=format&fit=crop&q=80&w=600',
    category: 'Imobiliare',
    feeling: 'Vânzare',
    design: 'Apartament',
    color: 'Toate',
    location: 'Cluj-Napoca, România',
    description: 'Apartament spațios, complet utilat.',
    createdAt: new Date(Date.now() - 24 * 60000).toISOString(),
    specs: {
      length: '92 mp',
      modelSize: '2 dormitoare',
      collection: 'Primul',
      style: '1993',
      bathrooms: '1 baie'
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
export const AUTO_COLORS = ["Toate", "Alb", "Negru", "Gri", "Argintiu", "Albastru", "Roșu", "Verde"];
export const FUELS = ["Orice", "Benzină", "Diesel", "Electric", "Hibrid", "GPL"];
export const BODY_TYPES = ["Orice", "Sedan", "SUV", "Hatchback", "Break", "Coupe", "Cabrio", "Monovolum", "Pickup"];
export const TRANSMISSIONS = ["Orice", "Manuală", "Automată"];
