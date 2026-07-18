import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Nilai-nilai ini diisi lewat file .env (lihat .env.example), bukan
// di-hardcode di sini. Kalau .env belum diisi, firebaseReady akan false
// dan bagian yang butuh Firebase (ToolsPage) akan menampilkan produk
// contoh statis alih-alih Firestore yang belum tersambung.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const firebaseReady = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

let app = null;
if (firebaseReady && !getApps().length) {
  app = initializeApp(firebaseConfig);
}

export const db = firebaseReady ? getFirestore(app) : null;
