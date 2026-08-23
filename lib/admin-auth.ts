import { cookies } from "next/headers";

export async function isAdmin() {
  const secret = process.env.AUTH_SECRET;
  return Boolean(secret && (await cookies()).get("aruna_admin")?.value === secret);
}
