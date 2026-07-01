import { NextResponse } from "next/server";
import type { SpotifyApiResponse } from "@/types/spotify";

export function GET() {
  const response: SpotifyApiResponse = {
    success: false,
    error: "Live Spotify data is unavailable on the static GitHub Pages deployment.",
  };

  return NextResponse.json(response);
}
