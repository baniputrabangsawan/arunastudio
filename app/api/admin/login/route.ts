import { NextResponse } from "next/server";
import { z } from "zod";
const login=z.object({token:z.string().min(1).max(500)});
export async function POST(req:Request){const parsed=login.safeParse(await req.json().catch(()=>null));const secret=process.env.AUTH_SECRET;if(!parsed.success||!secret||parsed.data.token!==secret)return NextResponse.json({message:"Unauthorized"},{status:401});const res=NextResponse.json({ok:true});res.cookies.set("aruna_admin",secret,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",path:"/",maxAge:60*60*8});return res}
