import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db, firebaseReady } from "../lib/firebase";

/**
 * Membaca koleksi "products" dari Firestore secara real-time. Ini murni
 * read-only, dipakai di situs publik. Menulis/mengubah data produk
 * dilakukan lewat aplikasi backoffice terpisah (brownpage-admin).
 *
 * status bisa berupa: "not-configured" (VITE_FIREBASE_* belum diisi),
 * "loading", "error", atau "ready".
 */
export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState(firebaseReady ? "loading" : "not-configured");

  useEffect(() => {
    if (!firebaseReady) return;

    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setProducts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setStatus("ready");
      },
      (err) => {
        console.error("Gagal memuat produk dari Firestore:", err);
        setStatus("error");
      }
    );

    return unsubscribe;
  }, []);

  return { products, status };
}
