'use client'
import React from 'react'
import { deleteBanner } from '@/app/store'
import { useRouter } from 'next/navigation'
export default function BannerDelete(props) {
  const id = props.id
  const router = useRouter()
  async function submitDelete(){
    const res = await deleteBanner(id)
    if(!res.ok){
      throw new Error("Tidak dapat menghapus gambar")
    }
    router.refresh()
  }
  return (
      <>
        <button
          onClick={submitDelete}
          className='w-full mt-2 btn btn-error text-error-content'
        >
        Hapus
        </button>
      </>
  )
}

