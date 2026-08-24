import { NextResponse } from "next/server";
import { getPublicSettings } from "@/lib/content-data";

export const revalidate = 300;

export async function GET() {
  return NextResponse.json(await getPublicSettings());
}
