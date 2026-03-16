import { NextResponse } from "next/server";
import { z } from "zod";
import { getWeatherBundle } from "@/lib/api/weather";

const citySchema = z.object({
  name: z.string(),
  country: z.string(),
  admin1: z.string().optional(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  timezone: z.string(),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  try {
    const city = citySchema.parse({
      name: searchParams.get("name"),
      country: searchParams.get("country"),
      admin1: searchParams.get("admin1") ?? undefined,
      latitude: searchParams.get("lat"),
      longitude: searchParams.get("lon"),
      timezone: searchParams.get("timezone"),
    });

    const bundle = await getWeatherBundle({
      id: `${city.name}-${city.latitude}-${city.longitude}`,
      ...city,
    });

    return NextResponse.json(bundle);
  } catch {
    return NextResponse.json(
      { message: "Unable to load weather data right now." },
      { status: 500 },
    );
  }
}
