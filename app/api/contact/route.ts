import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
const schema=z.object({name:z.string().min(2).max(100),email:z.email(),message:z.string().min(10).max(3000)});
export async function POST(request:Request){const parsed=schema.safeParse(await request.json().catch(()=>null));if(!parsed.success)return NextResponse.json({message:"Lengkapi nama, email, dan pesan."},{status:400});try{if(process.env.DATABASE_URL)await prisma.lead.create({data:{name:parsed.data.name,email:parsed.data.email,whatsapp:"Belum diberikan",source:"contact-form",notes:parsed.data.message}});return NextResponse.json({ok:true,status:process.env.DATABASE_URL?"stored":"accepted-demo"},{status:201})}catch{return NextResponse.json({message:"Pesan belum dapat disimpan. Silakan coba kembali."},{status:503})}}
