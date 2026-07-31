import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { Product } from "../data/products";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5v5EZs0ria817zFBzitdxQ7u4D5MxkaU",
  authDomain: "pipi-5da88.firebaseapp.com",
  projectId: "pipi-5da88",
  storageBucket: "pipi-5da88.firebasestorage.app",
  messagingSenderId: "566813605208",
  appId: "1:566813605208:web:7aa8f41782936b8651392d",
  measurementId: "G-S1LWR5C5R5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore & Storage
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics conditionally
export const analyticsPromise = isSupported().then(yes => yes ? getAnalytics(app) : null);

/**
 * Save new listing to Firebase Firestore cloud database safely
 */
export async function saveListingToFirebase(product: Product) {
  try {
    // Firebase doesn't accept undefined values, so we strip them via JSON serialization
    const safeProduct = JSON.parse(JSON.stringify(product));
    
    const savePromise = addDoc(collection(db, "listings"), {
      ...safeProduct,
      createdAt: new Date().toISOString()
    });

    // Timeout race (3 seconds) to prevent hanging UI on CORS/network block
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Firestore save timeout")), 3000)
    );

    const docRef = (await Promise.race([savePromise, timeoutPromise])) as any;
    console.log("Listing saved to Firebase with ID: ", docRef?.id);
    return docRef?.id;
  } catch (e) {
    console.warn("Firestore save warning (persisted locally): ", e);
    return null;
  }
}

/**
 * Fetch all listings from Firebase Firestore (including imoob collections: anuncios, anuncios_auto, anuncios_jobs, anuncios_ambarcatiuni)
 */
export async function fetchListingsFromFirebase(): Promise<Product[]> {
  try {
    const collectionsToFetch = ['listings', 'anuncios', 'anuncios_auto', 'anuncios_jobs', 'anuncios_ambarcatiuni'];
    const allProducts: Product[] = [];

    for (const colName of collectionsToFetch) {
      try {
        const q = query(collection(db, colName));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          const categoryName = data.category || (colName === 'anuncios_auto' ? 'Auto' : colName === 'anuncios_jobs' ? 'Locuri de muncă' : colName === 'anuncios_ambarcatiuni' ? 'Ambarcațiuni' : 'Imobiliare');
          const titleText = data.title || data.titlu || `${data.marca || ''} ${data.model || ''}`.trim() || 'Anunț fără titlu';
          const numericPrice = typeof data.price === 'number' ? data.price : parseFloat(data.price || data.pret || '0');

          const mappedProduct: Product = {
            id: docSnap.id,
            title: titleText,
            price: numericPrice || 0,
            originalPrice: data.originalPrice || Math.round((numericPrice || 100) * 1.15),
            image: data.image || (data.images && data.images.length > 0 ? data.images[0] : '/images/coches.png'),
            category: categoryName,
            feeling: 'Work',
            design: 'Special',
            color: 'Multicolor',
            description: data.description || data.descriere || `Anunț din ${categoryName}`,
            badges: data.badges || (data.isPromoted ? ['PRO', 'VERIFICAT'] : ['NOU']),
            createdAt: data.createdAt || new Date(Date.now() - 86400000 * Math.floor(Math.random() * 5 + 1)).toISOString(),
            specs: data.specs || {
              year: data.an || data.year,
              mileage: data.rulaj || data.mileage,
              fuel: data.combustibil || data.fuel,
              gearbox: data.transmisie || data.gearbox,
              caroserie: data.caroserie,
              brand: data.marca || data.brand,
              modelName: data.model || data.modelName
            }
          };
          allProducts.push(mappedProduct);
        });
      } catch (colErr) {
        console.warn(`Collection ${colName} fetch skip:`, colErr);
      }
    }

    return allProducts;
  } catch (e) {
    console.warn("Firestore fetch warning: ", e);
    return [];
  }
}
