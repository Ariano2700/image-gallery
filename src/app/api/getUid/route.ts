import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookie = cookies();
  // Obtener el 'uid' de la cookie
  const uid = cookie.get("uid")?.value;
  // Si no se encuentra el 'uid', retornar un mensaje de error
  if (!uid) {
    return NextResponse.json({ msg: "UID no encontrado" }, { status: 401 });
  }

  // Si se encuentra el 'uid', retornarlo
  return NextResponse.json({ uid }, { status: 200 });
}
