import { getPersonalImages } from "@/business/users/methods/getPersonalImages";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("lastId") || "";
    const limit = searchParams.get("limit");
    const uid = searchParams.get("uid");

    if (!limit || isNaN(Number(limit))) {
      return NextResponse.json(
        { success: false, error: "Parámetro 'limit' no válido" },
        { status: 400 }
      );
    }

    if (id === null || limit === null || uid === null) {
      return NextResponse.json(
        { msg: "no se encontró la propiedad id, limit, uid" },
        { status: 200 }
      );
    }

    console.log("Fetching images with id:", id, "and limit:", limit, "uid", uid);
    const imagesData = await getPersonalImages(uid, id, limit);

    const hasMore =
      imagesData.length === parseInt(limit, 10) && imagesData.length > 0;
    if (imagesData.length < parseInt(limit, 10)) {
      return NextResponse.json({ imagesData, hasMore: false }, { status: 200 });
    }

    if (imagesData.length === 0) {
      return NextResponse.json(
        { success: false, error: "Not found data" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { imagesData, hasMore, msg: "More data images" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching images data:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
