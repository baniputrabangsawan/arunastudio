import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ContentManager } from "@/components/content-manager";
const resources=["leads","portfolio","services","pricing","faq","blog","availability","settings"] as const;
export function generateStaticParams(){return resources.map(resource=>({resource}))}
export default async function AdminResource({params}:{params:Promise<{resource:string}>}){const {resource}=await params;if(!resources.includes(resource as typeof resources[number]))notFound();return <main className="min-h-screen bg-[#eee9e4] pb-16 pt-28"><div className="container"><Link className="text-link" href="/admin"><ArrowLeft size={17}/> Dashboard</Link><div className="mb-8 mt-8"><p className="eyebrow">Content management</p><h1 className="font-display text-5xl capitalize">{resource}</h1></div><ContentManager resource={resource as typeof resources[number]}/></div></main>}
