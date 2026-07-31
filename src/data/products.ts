export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  discountPercentage?: number;
  badges?: string[];
  image: string;
  category: string;
  feeling: string;
  design: string;
  color: string;
  description: string;
  isPopular?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "auto-1",
    title: "VW Polo 1.2 TSI",
    price: 3000,
    originalPrice: 4000,
    discountPercentage: 25,
    badges: ["25%", "AUTO"],
    image: "/images/c1.png",
    category: "Auto",
    feeling: "Work",
    design: "Special",
    color: "Negru",
    description: "VW Polo 1.2 TSI în stare excelentă, an 2014, 145.000 km. Carte de service la zi, fără accidente.",
    isPopular: true
  },
  {
    id: "auto-2",
    title: "BMW Serie 3 M Sport",
    price: 18500,
    originalPrice: 21000,
    discountPercentage: 12,
    badges: ["VERIFICAT"],
    image: "/images/coches.png",
    category: "Auto",
    feeling: "Mood",
    design: "Special",
    color: "Albastru",
    description: "BMW Seria 3 M Sport pachet original, interior piele, navigație mare, senzori parcare.",
    isPopular: true
  },
  {
    id: "1",
    title: "2 Mystery Pins",
    price: 50,
    originalPrice: 80,
    discountPercentage: 38,
    badges: ["HOT PICK", "38%"],
    image: "/images/mystery_pins.png",
    category: "Mystery",
    feeling: "Surprise",
    design: "Special",
    color: "Multicolor",
    description: "Pachet surpriză cu 2 pinuri metalice alese aleatoriu din colecția noastră bestseller. Calitate superioară din email dur.",
    isPopular: true
  },
  {
    id: "2",
    title: "Pin Metalic Sarcastic Bunny",
    price: 30,
    originalPrice: 40,
    discountPercentage: 25,
    badges: ["25%"],
    image: "/images/sarcastic_bunny_pin.png",
    category: "Animale",
    feeling: "Mood",
    design: "Cute",
    color: "Alb/Negru",
    description: "Exprimă-ți atitudinea directă cu acest iepuraș sarcastic adorabil! Fabricat din metal durabil cu încuietoare de siguranță."
  },
  {
    id: "3",
    title: "Pin Metalic Cat Lovers",
    price: 30,
    originalPrice: 40,
    discountPercentage: 25,
    badges: ["25%"],
    image: "/images/cat_lovers_pin.png",
    category: "Animale",
    feeling: "Cute",
    design: "Moon",
    color: "Galben/Negru",
    description: "Pin metalic cu pisicuță neagră dormind pe o lună aurie. Perfect pentru iubitorii de pisici și pasionații de astronomie."
  },
  {
    id: "4",
    title: "Pin Metalic Stethoscope",
    price: 30,
    originalPrice: 40,
    discountPercentage: 25,
    badges: ["25%"],
    image: "/images/stethoscope_pin.png",
    category: "Profesii",
    feeling: "Work",
    design: "Medical",
    color: "Mov",
    description: "Insignă metalică stetoscop cu finisaj elegant. Cadoul ideal pentru medici, asistente, studenți la medicină sau rezidenți."
  },
  {
    id: "5",
    title: "Pin Metalic I'm yours",
    price: 30,
    originalPrice: 40,
    discountPercentage: 25,
    badges: ["25%"],
    image: "/images/im_yours_pin.png",
    category: "Love & Valentine",
    feeling: "Love",
    design: "Heart",
    color: "Roșu",
    description: "Pin inimioară roșie cu motănel portocaliu și ursuleț. O declarație dulce de dragoste pentru persoana iubită."
  },
  {
    id: "6",
    title: "Pin Metalic Pink Baby Dino",
    price: 30,
    originalPrice: 40,
    discountPercentage: 25,
    badges: ["25%"],
    image: "/images/pink_dino_pin.png",
    category: "Animale",
    feeling: "Cute",
    design: "Dino",
    color: "Roz",
    description: "Dinozaur roz adorabil stegosaurus din email lucios. Adaugă o notă jucăușă jachetei, ghiozdanului sau șepcii tale."
  },
  {
    id: "7",
    title: "Pin Metalic Love Reaction",
    price: 30,
    originalPrice: 40,
    discountPercentage: 25,
    badges: ["25%"],
    image: "/images/love_reaction_pin.png",
    category: "Magic & Potions",
    feeling: "Science",
    design: "Flask",
    color: "Roz",
    description: "Pțiune magică a iubirii într-un eprubetă de sticlă cu sclipici roz și detalii aurii realizate manual."
  },
  {
    id: "8",
    title: "Pin Metalic I don't do ordinary",
    price: 30,
    originalPrice: 40,
    discountPercentage: 25,
    badges: ["25%"],
    image: "/images/dont_do_ordinary_pin.png",
    category: "Animale",
    feeling: "Mood",
    design: "Funny",
    color: "Portocaliu",
    description: "Insignă cu pisică haioasă portocalie pentru cei care refuză banalul. Design original PinPin."
  }
];

export const CATEGORIES = [
  "Toate",
  "Imobiliare",
  "Auto",
  "Locuri de muncă",
  "Electronice",
  "Cazare",
  "Matrimoniale",
  "Animale",
  "Profesii",
  "Mystery",
  "Love & Valentine",
  "Magic & Potions"
];
export const FEELINGS = ["Toate", "Cute", "Mood", "Love", "Work", "Surprise", "Science"];
export const DESIGNS = ["Toate", "Special", "Cute", "Moon", "Medical", "Heart", "Dino", "Flask", "Funny"];
export const COLORS = ["Toate", "Multicolor", "Alb/Negru", "Galben/Negru", "Mov", "Roșu", "Roz", "Portocaliu"];
