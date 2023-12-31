import prisma from "@/prisma/prismaClient";
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function DELETE(_,{params}) {
  revalidatePath('/admin/category');
  const id = parseInt(params.id)
  const data = await prisma.category.delete({
    where: {
      id
    } 
  }) 
  return NextResponse.json({ data });
}

export async function GET(_,{params}) {
  revalidatePath('/admin/category');
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

export async function PUT(_, {params}) {
  revalidatePath('/admin/category');
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
