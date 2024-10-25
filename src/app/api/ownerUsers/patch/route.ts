import { updateImageData } from "@/business/ownerUser/methods/updateImageData"; // Método para actualizar
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const secret = new TextEncoder().encode(process.env.NEXT_JWT_SECRET);

export async function PATCH(req: Request) {
  const body = await req.json();
  const { id, title, description, date } = body; // Nuevos datos para actualizar
  const cookie = cookies();

  const token = cookie.get("auth-token")?.value;
  if (!token) {
    return NextResponse.json({ msg: "Token no encontrado" }, { status: 401 });
  }

  try {
    // Verificar el token JWT para obtener el 'id' del documento (la imagen que se quiere actualizar)
    const { payload } = await jwtVerify(token, secret);
    if (!id) {
      return NextResponse.json(
        { msg: "ID de imagen no proporcionado" },
        { status: 400 }
      );
    }
    const response = await updateImageData(token, {
      id,
      title,
      description,
      date,
    });

    if (!response.success) {
      return NextResponse.json(
        { msg: "Ocurrió un error al actualizar los datos", status: 500 },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { msg: "Imagen actualizada correctamente", status: 200 },
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
