import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function middleware(req: Request) {
  const secret = new TextEncoder().encode(process.env.NEXT_JWT_SECRET);
  const cookie = cookies();
  const token = cookie.get("auth-token")?.value;

  //Si no hay token, redirigir al home
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    // Verificar el token usando jose
    await jwtVerify(token, secret);

    return NextResponse.next();
  } catch (error) {
    console.log("Error verifying token:", error);
    // En caso de error, redirigir al home
    return NextResponse.redirect(new URL("/", req.url));
  }
}

// Configuración del middleware
export const config = {
  matcher: ["/panel"],
  //matcher: ["/panel/:path*"],
};
