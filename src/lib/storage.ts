import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

/**
 * Upload image File to Cloud Storage (Firebase Storage / Cloudflare R2 compatible)
 * Returns public image URL for Firestore database
 */
export async function uploadImageFile(file: File): Promise<string> {
  try {
    const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const path = `photos/${Date.now()}_${cleanName}`;
    const storageRef = ref(storage, path);
    
    // Upload bytes
    const snapshot = await uploadBytes(storageRef, file);
    const publicUrl = await getDownloadURL(snapshot.ref);
    return publicUrl;
  } catch (error) {
    console.warn("Using base64 image encoding fallback: ", error);
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }
}
