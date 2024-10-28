import { ImagesI } from "@/business/users/interfaces/linkImagesInterface";
import db from "@/service/firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import { jwtVerify } from "jose";

export async function uploadPersonalImage(
  token: string,
  props: Omit<ImagesI, "id">,
  uid: string
) {
  const { url, title = "", description = "", date = "" } = props;
  try {
    // Verificar el token JWT usando 'jose'
    const secretKey = new TextEncoder().encode(process.env.NEXT_JWT_SECRET); // Convertir la clave secreta a Uint8Array
    const { payload } = await jwtVerify(token, secretKey); // Verificar el token y obtener el payload

    let email = "";
    if (
      payload &&
      typeof payload === "object" &&
      "email" in payload &&
      "id" in payload
    ) {
      email = payload.email as string;
    }

    // Crear el objeto Vendor sin el campo 'id'
    const image: Omit<ImagesI, "id"> = {
      url,
      title,
      description,
      date,
    };

    // Agregar un documento a la colección "vendors" en Firestore
    const docRef = await addDoc(collection(db, "users", uid, "images"), image);

    const documentId = docRef.id;

    // Crear un nuevo payload para el token que incluye el nuevo ID del documento
    const newTokenPayload = {
      email,
      id: documentId,
    };

    return newTokenPayload;
  } catch (error) {
    console.error("Error al crear el vendor:", error);
    return false;
  }
}
