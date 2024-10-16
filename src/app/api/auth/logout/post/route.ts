import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookie = cookies();

  // Eliminar la cookie auth-token
  cookie.set({
    name: "auth-token",
    value: "",
    path: "/",
    expires: new Date(0), // Fecha en el pasado para eliminarla
  });

  // Retornar la respuesta
  return NextResponse.json({ message: "Logout successful" }, { status: 200 });
}
