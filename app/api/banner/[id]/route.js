import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from 'next/cache';

export async function DELETE(request,{params}) {
  const path = request.nextUrl.searchParams.get('path') || 'admin';
  const collection = request.nextUrl.searchParams.get('banner') || 'banner';
  revalidatePath(path);
  revalidateTag(collection);
  const id = parseInt(params.id)
  const data = await prisma.banner.delete({
    where: {
      id
    } 
  }) 
  return NextResponse.json({ data });
}
