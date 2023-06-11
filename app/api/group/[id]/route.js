import prisma from "@/prisma/prismaClient";
import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function DELETE(request,{params}) {
  const path = request.nextUrl.searchParams.get('path') || '/admin/group';
  const collection = request.nextUrl.searchParams.get('group') || 'group';
  revalidatePath(path);
  revalidateTag(collection);
  const id = parseInt(params.id)
  const data = await prisma.group.delete({
    where: {
      id
    } 
  }) 
  return NextResponse.json({ data });
}

export async function GET(request,{params}) {
  const path = request.nextUrl.searchParams.get('path') || '/admin/group';
  const collection = request.nextUrl.searchParams.get('group') || 'group';
  revalidatePath(path);
  revalidateTag(collection);
  revalidatePath('/api/group/'+params.id);
  const id = parseInt(params.id)
  const data = await prisma.group.findFirst({
    where: {
      id
    },
    include:{
      category:true
    }
  }) 
  return NextResponse.json({ data });
}

export async function PUT(request, {params}) {
  const path = request.nextUrl.searchParams.get('path') || '/admin/category';
  const collection = request.nextUrl.searchParams.get('group') || 'group';
  revalidatePath(path);
  revalidatePath('/api/group/'+params.id);
  revalidateTag(collection);
  const id = parseInt(params.id)
  const res = await request.json()
  let data ={}
  if(res.category){
  const ids = await res.category.map((cId)=>{
    if(cId){
      return {id: cId.id? cId.id : cId}
    }
  })
  if(!ids){
    throw new Response(JSON.stringify({"message": "Category Cant Be Found"}),{status: 400})
  }
    data = {
      ...res,
      category:{
        connect:[...ids]
      }
    }
  }else{
    data ={
      ...res
    }
  }
  await prisma.group.update({
    data:{
      category:{
        set:[]
      }
    },
    where: {
      id
    }
  }) 
  const req = await prisma.group.update({
    data,
    where: {
      id
    }
  }) 
  return NextResponse.json({ data:req });
}
