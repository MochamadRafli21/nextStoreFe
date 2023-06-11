import prisma from "@/prisma/prismaClient";
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function PUT(request, {params}) {
  const path = request.nextUrl.searchParams.get('path') || '/admin/order';
  const collection = request.nextUrl.searchParams.get('order') || 'order';
  revalidatePath(path);
  revalidateTag(collection);
  const id = parseInt(params.id)
  const res = await request.json()
  if(!res.status){
    throw new Response(JSON.stringify({"message": "status is required"}),{status: 400})
  }
  const req = await prisma.order.update({
    data:{
      status: res.status
    },
    where: {
      id
    }
  }) 
  return NextResponse.json({ data:req });
}
