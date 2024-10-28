import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SignJWT } from "jose";

// Clave secreta para firmar el token (debe estar definida en las variables de entorno)
const secret = new TextEncoder().encode(process.env.NEXT_JWT_SECRET);

export async function POST(req: Request) {
  const body = await req.json();

  // Desestructuración del body
  const { email, uid } = body;

  const cookie = cookies();

  try {
    // Crear payload del token
    const tokenPayload = { email, id: "" };

    // Firmar el token usando jose
    const token = await new SignJWT(tokenPayload)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("30d")
      .sign(secret);

    // Configurar la cookie con el token
    cookie.set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 días
    });

    cookie.set({
      name: "uid",
      value: uid,
      path: "/",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
    // Retornar la respuesta con la información del usuario
    return NextResponse.json(
      {
        email,
        msg: "access successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  }
}
