import { NextResponse } from "next/server";
import type { YouTubeMusicApiResponse } from "@/types/youtube-music";

export const dynamic = "force-static";

export function GET() {
  const response: YouTubeMusicApiResponse = {
    success: false,
    error: "Live YouTube Music data is unavailable on the static GitHub Pages deployment.",
  };

  return NextResponse.json(response);
}
