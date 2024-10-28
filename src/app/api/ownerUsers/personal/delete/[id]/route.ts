import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { deletePersonalImage } from "@/business/ownerUser/methods/firebase/personalImages/deletePersonalImage";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

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
    const secretKey = new TextEncoder().encode(process.env.NEXT_JWT_SECRET);
    const { payload } = await jwtVerify(token, secretKey); // Verificar el token

    if (!payload || !payload.email) {
      return NextResponse.json({ msg: "Token inválido" }, { status: 401 });
    }

    // Aquí llamas a la función para eliminar la imagen
    const response = await deletePersonalImage(token, id, uid);
    if (!response) {
      return NextResponse.json(
        { msg: "Error al eliminar la imagen personal" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { msg: "Imagen personal eliminada correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en el servidor:", error);
    return NextResponse.json(
      { msg: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
