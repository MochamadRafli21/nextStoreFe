import prisma from "@/prisma/prismaClient";
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function DELETE(request,{params}) {
  const path = request.nextUrl.searchParams.get('path') || '/admin/order';
  const collection = request.nextUrl.searchParams.get('order') || 'order';
  revalidatePath(path);
  revalidateTag(collection);
  const id = parseInt(params.id)
  const data = await prisma.order.delete({
    where: {
      id
    } 
  }) 
  return NextResponse.json({ data });
}

export async function GET(request,{params}) {
  const path = request.nextUrl.searchParams.get('path') || '/admin/order';
  const collection = request.nextUrl.searchParams.get('order') || 'order';
  revalidatePath(path);
  revalidatePath('/api/order/'+params.id);
  revalidateTag(collection);
  const id = parseInt(params.id)
  const data = await prisma.order.findFirst({
    where: {
      id
    }
  }) 
  return NextResponse.json({ data });
}

export async function PUT(request, {params}) {
  const path = request.nextUrl.searchParams.get('path') || '/admin/order';
  const collection = request.nextUrl.searchParams.get('order') || 'order';
  revalidatePath(path);
  revalidatePath('/api/order/'+params.id);
  revalidateTag(collection);
  const id = parseInt(params.id)
  const res = await request.json()
  if(!res.product){
    throw new Response(JSON.stringify({"message": "Product Is Missing"}),{status: 400})
  }
  const product = await prisma.product.findFirst({where:{id: parseInt(res.product)}})
  if(!product){
    throw new Response(JSON.stringify({"message": "Product Is Missing"}),{status: 400})
  }
  if(res.price < 0){
    throw new Response(JSON.stringify({"message": "Price cant be negative"}), {status: 400})
  }
  let data ={}
  if(res.product){
    data = {
      ...res,
      product:{
        connect:{
          id: product.id
        }
      },
      product_name: product.name,
      price: product.price
    }
  }else{
    data ={
      ...res
    }
  }
  const req = await prisma.order.update({
    data,
    where: {
      id
    }
  }) 
  return NextResponse.json({ data:req });
}
