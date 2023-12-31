"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { postGroup, updateGroup } from '@/app/store/group';
import MultySelect from '@/components/select/multipleSelect';
export default function GroupForm({resC, data, isEdit}) {
  const router = useRouter()
  const [payload, setPayload] = useState(data? data : {})
  const [categories, setCategories] = useState(data? data.category:[])

  const updateCategory = (category)=>{
    const pCategory = category.map((item)=>{
      return item.id
    })
    setCategories(category)
    setPayload({
      ...payload,
      category: pCategory
    })
  }

  async function submitGroup(e){
    e.preventDefault()
    if(isEdit){
        try {
          const res = await updateGroup(data.id,payload)
          if(!res.ok){
            throw new Error("Failed to update group")
          }
          router.push('/admin/group')
          router.refresh()
        } catch (error) {
          console.log(error)  
        }
    }else{
      if(payload){
        try {
          const res = await postGroup(payload)
          if(!res.ok){
            throw new Error("Failed to create group")
          }
          router.push('/admin/group')
          router.refresh()
        } catch (error) {
          console.log(error)  
        }
      }
    }
  }

  return (
    <form onSubmit={submitGroup}>
    <div className="gap-2 mt-2 items-center text-base-content">
    
    <label className="label" for="group">
    <span className="label-text">
      Nama Group
    </span>
    </label> 
    <input 
      className="input form-control input-bordered input-primary w-full" 
      type="text" 
      name="group" 
      placeholder="Rumah Tangga"
      required
      onChange={(e)=>
        setPayload({
          ...payload,
          name: e.target.value
        })
      }
      value={payload.name ? payload.name : ''}
    />

    <label className="label" for="category">
    <span className="label-text">
      Kategori
    </span>
    </label> 
    <MultySelect
      options={resC? resC: []}
      selectedOptions={categories}
      setSelected={updateCategory}
    />

    </div> 
    <button type="submit" className="btn w-full mt-4 text-primary-content btn-primary">
    Simpan 
    </button>
    </form>
  )
}
