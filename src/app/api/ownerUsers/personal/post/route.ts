import { uploadPersonalImage } from "@/business/ownerUser/methods/firebase/personalImages/uploadPersonalImage";
import { ImagesI } from "@/business/users/interfaces/linkImagesInterface";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const secret = new TextEncoder().encode(process.env.NEXT_JWT_SECRET);

export async function POST(req: Request) {
  const body = await req.json();
  const { url, title = "", description = "", date = "" } = body;
  const cookie = cookies();

  const token = cookie.get("auth-token")?.value;
  const uid = cookie.get("uid")?.value;
  if (!token) {
    return NextResponse.json({ msg: "Token no encontrado" }, { status: 401 });
  }
  if (!uid) {
    return NextResponse.json({ msg: "UID no encontrado" }, { status: 401 });
  }
  try {
    const image: Omit<ImagesI, "id"> = {
      url,
      title,
      description,
      date,
    };

    const response = await uploadPersonalImage(token, image, uid);
    if (!response) {
      return NextResponse.json(
        { msg: "Ocurrió al intentar subir la imagen", status: 500 },
        { status: 500 }
      );
    }
    // Crear un nuevo JWT usando jose
    const newToken = await new SignJWT({ ...response })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("30d") // Expiración de 30 días
      .sign(secret);

    // Configurar la cookie con el nuevo token
    cookie.set({
      name: "auth-token",
      value: newToken,
      httpOnly: true,
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 30, // Expira en 30 días
    });

    return NextResponse.json(
      { msg: "Datos e imagen personal guardados correctamente", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error interno del servidor:", error);
    return NextResponse.json(
      { msg: "Error interno del servidor", status: 500 },
      { status: 500 }
    );
  }
}
