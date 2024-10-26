import { ImagesI } from "@/business/users/interfaces/linkImagesInterface";
import db from "@/service/firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { jwtVerify } from "jose";
export async function updateImageData(
  token: string,
  props: Partial<Omit<ImagesI, "url">>
) {
  const { title = "", description = "", date = "", id } = props;
  try {
    // Verificar el token JWT usando 'jose'
    const secretKey = new TextEncoder().encode(process.env.NEXT_JWT_SECRET); // Convertir la clave secreta a Uint8Array
    const { payload } = await jwtVerify(token, secretKey); // Verificar el token y obtener el payload

    let email = "";
    if (payload && typeof payload === "object" && "email" in payload) {
      email = payload.email as string; // Obtener el email desde el token
    }

    if (!id) {
      throw new Error("ID del documento no proporcionado.");
    }

    // Referencia al documento que queremos actualizar
    const imageDocRef = doc(db, "linkImages", id);

    // Crear un objeto con los campos que deseas actualizar
    const updatedData: Partial<Omit<ImagesI, "id" | "url">> = {
      title,
      description,
      date,
    };

    // Actualizar el documento en Firestore
    await updateDoc(imageDocRef, updatedData);

    return { success: true, message: "Imagen actualizada exitosamente" };
  } catch (error) {
    console.error("Error al actualizar la imagen:", error);
    return { success: false, message: "Error al actualizar la imagen" };
  }
}
