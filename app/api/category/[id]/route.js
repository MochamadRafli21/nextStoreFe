import prisma from "@/prisma/prismaClient";
import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function DELETE(request,{params}) {
  const path = request.nextUrl.searchParams.get('path') || '/admin/category';
  const collection = request.nextUrl.searchParams.get('category') || 'category';
  revalidatePath(path);
  revalidateTag(collection);
  const id = parseInt(params.id)
  const data = await prisma.category.delete({
    where: {
      id
    } 
  }) 
  return NextResponse.json({ data });
}

export async function GET(request,{params}) {
  const path = request.nextUrl.searchParams.get('path') || '/admin/category';
  const collection = request.nextUrl.searchParams.get('category') || 'category';
  revalidatePath(path);
  revalidateTag(collection);
  revalidatePath('/api/category/'+params.id);
  const id = parseInt(params.id)
  const data = await prisma.category.findFirst({
    where: {
      id
    },
    include:{
      product:true
    }
  }) 
  return NextResponse.json({ data });
}

export async function PUT(request, {params}) {
  const path = request.nextUrl.searchParams.get('path') || '/admin/category';
  const collection = request.nextUrl.searchParams.get('category') || 'category';
  revalidatePath(path);
  revalidatePath('/api/category/'+params.id);
  revalidateTag(collection);
  const id = parseInt(params.id)
  const res = await request.json()
  let productList = []
  if(res.product){
    const products = res.product
    const ids = products.map((item)=>{
      return {id:item.id? item.id: item}
    })
    productList = ids
  }
  const req = await prisma.category.update({
    data:{
      name: res.name,
      image: res.image,
      isHighlight: res.isHighlight,
      product:{
        connect: productList
      }
    },
    where: {
      id
    }
  }) 
  return NextResponse.json({ data:req });
}
