import db from "@/service/firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { jwtVerify } from "jose";

export async function deleteImage(token: string, id: string) {
  try {
    // Verificar el token JWT usando 'jose'
    const secretKey = new TextEncoder().encode(process.env.NEXT_JWT_SECRET);
    const { payload } = await jwtVerify(token, secretKey);

    // Verificar que el token tenga el campo "email"
    let email = "";
    if (payload && typeof payload === "object" && "email" in payload) {
      email = payload.email as string;
    }

    if (!id) {
      throw new Error("ID de la imagen no proporcionado.");
    }

    // Referencia al documento en Firestore usando el ID
    const imageDocRef = doc(db, "linkImages", id);

    // Eliminar el documento de Firestore
    await deleteDoc(imageDocRef);

    return { success: true, message: "Imagen eliminada exitosamente" };
  } catch (error) {
    console.error("Error al eliminar la imagen:", error);
    return { success: false, message: "Error al eliminar la imagen" };
  }
}
