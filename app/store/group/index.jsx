export async function getGroup() {
  let url = `${process.env.HOST}api/group`

  try{
    const res = await fetch(url,
      {
        next:{
          revalidated:60, 
          tags:['group'],
          url:['/admin/group','/']
        }
      }
    );
    if (!res.ok) {
    throw new Error('Failed to fetch data');
    }
    return res.json();
  }catch(error){
    console.log(error)
  }
}

export async function deleteGroup(id) {
  if(!id){
    throw new Error("Id is missing")
  }
  try{
    const res = await fetch(`/api/group/${id}`,
      {
        method: "DELETE",
        next:{
          revalidated:60, 
          tags:['group'],
          url:['/admin/group','/']
        }
      }
    );
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res;
  }catch(error){
    console.log(error)
  }
}

export async function postGroup(payload) {
  try{
    const res = await fetch(
      `/api/group`,
      {
        method:"POST",
        next:{
          revalidated:60, 
          tags:['group'],
          url:['/admin/group','/']
        },
        body: JSON.stringify(payload)
      }
    );
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res;
  }catch(error){
    console.log(error)
  }
}

export async function getGroupDetail(id) {
  try{
    const res = await fetch(`${process.env.HOST}api/group/${parseInt(id)}`,
      {
        next:{
          revalidated:60, 
          tags:['group'],
          url:['/admin/group','/']
        }
      }
    );
    if (!res.ok) {
    throw new Error('Failed to fetch data');
    }
    return res.json();
  }catch(error){
    console.log(error)
  }
}

export async function updateGroup(id, body){
  try{
    const res = await fetch(`/api/group/${parseInt(id)}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      next:{
          revalidated:60, 
          tags:['group'],
          url:['/admin/group','/']
        }
    });
    if (!res.ok) {
    throw new Error('Failed to fetch data');
    }
    return res;
  }catch(error){
    console.log(error)
  }

}
