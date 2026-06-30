import crypto from "node:crypto";
import type { RecentlyPlayedTrack } from "@/types/youtube-music";

const YTM_BROWSE_URL = "https://music.youtube.com/youtubei/v1/browse";
// Public, well-known web client key used by music.youtube.com itself (not a secret).
const YTM_API_KEY = "AIzaSyC9XL3ZjWddXya6X74dJoCTL47NlEYVU8Q";
const ORIGIN = "https://music.youtube.com";

function getCookieValue(cookie: string, name: string): string | null {
  const match = cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? match[1] : null;
}

// Mirrors Google's SAPISIDHASH auth scheme used by ytmusicapi for
// cookie-authenticated requests to internal (undocumented) endpoints.
function generateSapisidHash(cookie: string): string {
  const sapisid =
    getCookieValue(cookie, "SAPISID") ?? getCookieValue(cookie, "__Secure-3PAPISID");

  if (!sapisid) {
    throw new Error(
      "Missing SAPISID/__Secure-3PAPISID cookie in YTMUSIC_COOKIE"
    );
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const hash = crypto
    .createHash("sha1")
    .update(`${timestamp} ${sapisid} ${ORIGIN}`)
    .digest("hex");

  return `SAPISIDHASH ${timestamp}_${hash}`;
}

function findFirstHistoryItem(node: unknown): RecentlyPlayedTrack | null {
  if (!node || typeof node !== "object") return null;

  const renderer = (node as Record<string, unknown>)
    .musicResponsiveListItemRenderer as Record<string, unknown> | undefined;

  if (renderer) {
    const columns = renderer.flexColumns as Array<Record<string, unknown>> | undefined;

    const nameRuns = (
      columns?.[0]?.musicResponsiveListItemFlexColumnRenderer as
        | Record<string, unknown>
        | undefined
    )?.text as { runs?: Array<{ text: string }> } | undefined;

    const artistRuns = (
      columns?.[1]?.musicResponsiveListItemFlexColumnRenderer as
        | Record<string, unknown>
        | undefined
    )?.text as { runs?: Array<{ text: string }> } | undefined;

    const name = nameRuns?.runs?.[0]?.text;
    const artist = artistRuns?.runs
      ?.map((r) => r.text)
      .filter((t) => t !== " • " && t !== "•")
      .join("");

    const thumbnails = (
      (
        (renderer.thumbnail as Record<string, unknown> | undefined)
          ?.musicThumbnailRenderer as Record<string, unknown> | undefined
      )?.thumbnail as Record<string, unknown> | undefined
    )?.thumbnails as Array<{ url: string }> | undefined;

    const albumArt = thumbnails?.[thumbnails.length - 1]?.url;

    const videoId =
      (renderer.playlistItemData as Record<string, unknown> | undefined)
        ?.videoId ??
      (
        (
          (
            (renderer.overlay as Record<string, unknown> | undefined)
              ?.musicItemThumbnailOverlayRenderer as
              | Record<string, unknown>
              | undefined
          )?.content as Record<string, unknown> | undefined
        )?.musicPlayButtonRenderer as Record<string, unknown> | undefined
      )?.playNavigationEndpoint as Record<string, unknown> | undefined;

    const resolvedVideoId =
      typeof videoId === "string"
        ? videoId
        : ((videoId as Record<string, unknown> | undefined)?.watchEndpoint as
            | Record<string, unknown>
            | undefined)?.videoId;

    if (name) {
      return {
        name,
        artist: artist || "Unknown artist",
        albumArt: albumArt || "",
        url:
          typeof resolvedVideoId === "string"
            ? `https://music.youtube.com/watch?v=${resolvedVideoId}`
            : ORIGIN,
      };
    }
  }

  for (const value of Object.values(node as Record<string, unknown>)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        const found = findFirstHistoryItem(item);
        if (found) return found;
      }
    } else if (value && typeof value === "object") {
      const found = findFirstHistoryItem(value);
      if (found) return found;
    }
  }

  return null;
}

export async function getRecentlyPlayed(): Promise<RecentlyPlayedTrack> {
  const cookie = process.env.YTMUSIC_COOKIE;
  if (!cookie) {
    throw new Error("Missing YTMUSIC_COOKIE environment variable");
  }

  const response = await fetch(`${YTM_BROWSE_URL}?key=${YTM_API_KEY}&prettyPrint=false`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
      Authorization: generateSapisidHash(cookie),
      "X-Origin": ORIGIN,
      Origin: ORIGIN,
      Referer: ORIGIN,
      "X-Goog-AuthUser": "0",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    },
    body: JSON.stringify({
      context: {
        client: {
          clientName: "WEB_REMIX",
          clientVersion: "1.20240101.01.00",
          hl: "en",
        },
      },
      browseId: "FEmusic_history",
    }),
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`YouTube Music API error: ${response.status}`);
  }

  const data = await response.json();
  const track = findFirstHistoryItem(data);

  if (!track) {
    throw new Error("No recently played tracks found");
  }

  return track;
}
