import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

// Cloudflare R2 Bucket Endpoint
export const CLOUDFLARE_R2_CONFIG = {
  bucketName: "pinpin-photos",
  publicDomain: "https://photos.pinpin.ro",
  workerEndpoint: "https://r2-upload.pinpin.workers.dev/upload"
};

/**
 * Upload image File directly to Cloudflare R2 / Object Storage
 * Returns public image URL for Firestore database
 */
export async function uploadImageFile(file: File): Promise<string> {
  // 1. Try Cloudflare R2 Upload Endpoint first
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(CLOUDFLARE_R2_CONFIG.workerEndpoint, {
      method: "POST",
      body: formData
    });

    if (res.ok) {
      const data = await res.json();
      if (data.url) {
        console.log("Image uploaded to Cloudflare R2:", data.url);
        return data.url;
      }
    }
  } catch (r2Err) {
    console.warn("Cloudflare R2 endpoint pending, using Firebase/R2 Storage bucket:", r2Err);
  }

  // 2. Primary Cloud Storage Bucket Upload
  try {
    const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const path = `photos/${Date.now()}_${cleanName}`;
    const storageRef = ref(storage, path);
    
    const snapshot = await uploadBytes(storageRef, file);
    const publicUrl = await getDownloadURL(snapshot.ref);
    return publicUrl;
  } catch (error) {
    console.warn("Using base64 image encoding fallback:", error);
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }
}
