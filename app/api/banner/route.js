import prisma from "@/prisma/prismaClient";
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET() {
  const banner = await prisma.banner.findMany({})
  return NextResponse.json({ data: banner });
}

export async function POST(request) {
  const res = await request.json()
  if(!res.url){
    return new Response("Url cant be empty", {status:400})
  }
  const data = await prisma.banner.create({
    data:{
      image: res.url,
    },
  })
  revalidatePath('/admin/banner');
  return NextResponse.json({ data });
}
