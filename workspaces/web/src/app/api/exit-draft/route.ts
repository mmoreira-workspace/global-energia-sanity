import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const draft = await draftMode();
  draft.disable();
  const redirectUrl = request.nextUrl.searchParams.get("slug") || "/";
  return NextResponse.redirect(new URL(redirectUrl, request.nextUrl.origin));
}
