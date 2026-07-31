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
 * Save new listing to Firebase Firestore cloud database
 */
export async function saveListingToFirebase(product: Product) {
  try {
    const docRef = await addDoc(collection(db, "listings"), {
      ...product,
      createdAt: new Date().toISOString()
    });
    console.log("Listing saved to Firebase with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document to Firebase: ", e);
  }
}

/**
 * Fetch all listings from Firebase Firestore
 */
export async function fetchListingsFromFirebase(): Promise<Product[]> {
  try {
    const q = query(collection(db, "listings"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const listings: Product[] = [];
    querySnapshot.forEach((doc) => {
      listings.push({ id: doc.id, ...doc.data() } as Product);
    });
    return listings;
  } catch (e) {
    console.error("Error fetching listings from Firebase: ", e);
    return [];
  }
}
