import { NextResponse } from "next/server";
import { z } from "zod";
import { reverseGeocode } from "@/lib/api/geocoding";

const querySchema = z.object({
  lat: z.coerce.number(),
  lon: z.coerce.number(),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  try {
    const query = querySchema.parse({
      lat: searchParams.get("lat"),
      lon: searchParams.get("lon"),
    });

    const result = await reverseGeocode(query.lat, query.lon);

    if (!result) {
      return NextResponse.json(
        { message: "No city was found for the current location." },
        { status: 404 },
      );
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { message: "Unable to resolve the current location right now." },
      { status: 500 },
    );
  }
}
