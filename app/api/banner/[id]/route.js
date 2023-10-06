import { NextResponse } from "next/server";
import prisma from "@/prisma/prismaClient";
import { revalidatePath } from 'next/cache';

export async function DELETE(_,{params}) {
  revalidatePath('/admin/banner');
  const id = parseInt(params.id)
  const data = await prisma.banner.delete({
    where: {
      id
    } 
  }) 
  return NextResponse.json({ data });
}
