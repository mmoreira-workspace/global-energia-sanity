import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug") || "/";
  const previewSecret = process.env.SANITY_PREVIEW_SECRET;

  if (!previewSecret || secret !== previewSecret) {
    return new NextResponse("Invalid secret", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();
  return NextResponse.redirect(new URL(slug, request.nextUrl.origin));
}
