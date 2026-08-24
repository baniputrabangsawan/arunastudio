import { NextResponse } from "next/server";
import { getPublicAvailability } from "@/lib/content-data";

export const revalidate = 60;

export async function GET() {
  return NextResponse.json(await getPublicAvailability());
}
