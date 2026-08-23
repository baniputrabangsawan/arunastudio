import type { MetadataRoute } from "next";
import { getPublishedPosts, getPublishedServices } from "@/lib/content-data";
import { getPublishedProjects } from "@/lib/portfolio-data";
import { siteUrl } from "@/lib/utils";
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const [projects,services,posts]=await Promise.all([getPublishedProjects(),getPublishedServices(),getPublishedPosts()]);const paths=["","/layanan","/portfolio","/harga","/simulasi","/estimasi","/mulai-project","/blog","/kontak","/privacy","/terms"];return [...paths.map(path=>({url:siteUrl(path),lastModified:new Date(),changeFrequency:"monthly" as const,priority:path===""?1:.7})),...services.map(s=>({url:siteUrl(`/layanan/${s.slug}`),lastModified:new Date()})),...projects.map(p=>({url:siteUrl(`/portfolio/${p.slug}`),lastModified:new Date()})),...posts.map(p=>({url:siteUrl(`/blog/${p.slug}`),lastModified:new Date()}))]}
