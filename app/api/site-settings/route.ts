import { NextResponse } from "next/server";
import { getPublicSettings } from "@/lib/content-data";

export async function GET() {
  return NextResponse.json(await getPublicSettings());
}
