import getAccessToken from "@/business/ownerUser/methods/spotify/getAccessToken";
import getUserProfile from "@/business/ownerUser/methods/spotify/getUserProfile";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  const SPOTIFY_CLIENT_ID_ARIANO = process.env
    .SPOTIFY_CLIENT_ID_ARIANO as string;
  const SPOTIFY_SECRET_CLIENT_ID_ARIANO = process.env
    .SPOTIFY_SECRET_CLIENT_ID_ARIANO as string;

  if (!userId) {
    return NextResponse.json(
      { error: "User ID is required", status: 400 },
      { status: 400 }
    );
  }

  if (!SPOTIFY_CLIENT_ID_ARIANO || !SPOTIFY_SECRET_CLIENT_ID_ARIANO) {
    return NextResponse.json(
      { error: "Spotify client ID and secret are required", status: 500 },
      { status: 500 }
    );
  }

  try {
    // Obtén el token de acceso
    const token = await getAccessToken({
      client_id: SPOTIFY_CLIENT_ID_ARIANO,
      client_secret: SPOTIFY_SECRET_CLIENT_ID_ARIANO,
    });

    // Obtén el perfil del usuario
    const userProfile = await getUserProfile({ userId, token });

    // Devuelve los datos del perfil
    return NextResponse.json(
      { succes: true, userProfile, status: 200 },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch user profile", details: error.message },
      { status: 500 }
    );
  }
}
