import { revalidatePath, revalidateTag } from 'next/cache';
import prisma from "@/prisma/prismaClient";
import { NextResponse } from 'next/server';
import Makeid from "@/utils/shortuid";

export async function GET(request) {
  const path = request.nextUrl.searchParams.get('path') || '/admin/order';
  const collection = request.nextUrl.searchParams.get('order') || 'order';
  revalidatePath(path);
  revalidateTag(collection);
  const data = await prisma.order.findMany(
    {
      orderBy: {
        updatedAt: 'desc'
      },
      include: {
        product:true
      }
    }
  )
  return NextResponse.json({ data });
}

export async function POST(request) {
  const path = request.nextUrl.searchParams.get('path') || '/admin/order';
  const collection = request.nextUrl.searchParams.get('order') || 'order';
  revalidatePath(path);
  revalidateTag(collection);
  const res = await request.json()
  const date = new Date()
  const uuid = date.getUTCFullYear().toString() + date.getUTCMonth().toString() + date.getUTCDay().toString() + Makeid(4)
  if(!res.product){
    throw new Response(JSON.stringify({"message": "Product Is Missing"}),{status: 400})
  }
  const product = await prisma.product.findFirst({where:{id: parseInt(res.product)}})
  if(!product){
    throw new Response(JSON.stringify({"message": "Product Is Missing"}),{status: 400})
  }
  try {
  const data = await prisma.order.create({
    data:{
      uuid,
      name: res.name,
      address: res.address,
      phone: res.phone,
      notes: res.notes,
      product_name: product.name,
      price: parseInt(product.price),
      product: {
        connect:{
          id: product.id
        }
      }
    }
  })
  return NextResponse.json({ data });
  } catch (error) {
    console.log(error)
    throw new Response(JSON.stringify({"message": error}), {status: 400})  
  }
}
