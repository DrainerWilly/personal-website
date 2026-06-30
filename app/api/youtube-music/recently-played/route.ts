import { NextResponse } from "next/server";
import { getRecentlyPlayed } from "@/lib/youtube-music";
import type { YouTubeMusicApiResponse } from "@/types/youtube-music";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const track = await getRecentlyPlayed();

    const response: YouTubeMusicApiResponse = {
      success: true,
      data: track,
    };

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    });
  } catch (error) {
    console.error("Error fetching YouTube Music recently played:", error);

    const response: YouTubeMusicApiResponse = {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch recently played track",
    };

    return NextResponse.json(response, {
      status: 500,
      headers: {
        "Cache-Control": "no-cache",
      },
    });
  }
}
