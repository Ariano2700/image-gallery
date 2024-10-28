import db from "@/service/firebase/firestore";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { ImagesI } from "../interfaces/linkImagesInterface";
export async function getPersonalImages(
  uid: string,
  id: string,
  lmt: string
): Promise<ImagesI[]> {
  try {
    let q = null;
    const numDoc = Number(lmt);
    const providersRef = collection(db, "users", uid, "images");

    if (id.length === 0) {
      q = query(providersRef, where("url", "!=", null), limit(numDoc));
    } else {
      const lastDocRef = doc(db, "users", uid, "images", id);
      const lastDocSnapshot = await getDoc(lastDocRef);

      if (!lastDocSnapshot.exists()) {
        throw new Error("ID del documento no válido");
      }

      // Obtener documentos a partir del documento especificado
      q = query(
        providersRef,
        where("url", "!=", null),
        limit(numDoc),
        startAfter(lastDocSnapshot)
      );
    }
    const querySnapshot = await getDocs(q);

    const image: ImagesI[] = querySnapshot.docs.map((img) => ({
      id: img.id,
      url: img.data().url,
      date: img.data().date,
      description: img.data().description,
      title: img.data().title,
    }));
    return image;
  } catch (error) {
    console.error("Error al obtener las imágenes:", error);
    throw new Error("Internal Server Error");
  }
}
