import { ART_IDS, artworkSvg } from "@/lib/artwork";

export function generateStaticParams() {
  return ART_IDS.map((id) => ({ id: `${id}.svg` }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  // Route serves /art/obj001.svg — strip the extension.
  const key = id.toLowerCase().endsWith(".svg") ? id.slice(0, -4) : id;
  const svg = artworkSvg(key);
  if (!svg) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
