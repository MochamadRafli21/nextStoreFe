export async function getCategory(query) {
  let url = `${process.env.HOST}api/category`
  if(query){
    const {isHighlight}=query
    if(isHighlight){
      url += `?isHighlight=${isHighlight}`
    }
  }
  try{
    const res = await fetch(url,{
        next:{
          revalidated:60, 
        }
    });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  }catch(error){
    console.log(error)
  }
}

export async function getCategoryDetail(id) {
  if(!id){
    throw new Error("Id is missing")
  }
  try{
    const res = await fetch(`${process.env.HOST}api/category/${id}`,
      {
        next:{
          revalidated:60, 
        }
      });
    if (!res.ok) {
    throw new Error('Failed to fetch data');
    }
    return res.json();
  }catch(error){
    console.log(error)
  }
}

export async function postCategory(payload) {
  try{
    const res = await fetch(
      `/api/category`,
      {
        method:"POST",
        body: JSON.stringify(payload),
        next:{
          revalidated:60, 
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

export async function deleteCategory(id) {
  if(!id){
    throw new Error("Id is missing")
  }
  try{
    const res = await fetch(`/api/category/${id}`,
      {
        method: "DELETE",
        next:{
          revalidated:60, 
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

export async function updateCategory(id, body){
  try{
    const res = await fetch(`/api/category/${parseInt(id)}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      next:{
          revalidated:60, 
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
