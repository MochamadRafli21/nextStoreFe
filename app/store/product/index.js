
export async function getProduct(query) {
  let url = `/api/product`
  if(query){
    const {q , category}=query
    if(q){
      url += `?q=${q}`
    }
    if(category){
      url += `?category=${category}`
    }
  }

  try{
    const res = await fetch(url,
      {
        next:{
          revalidate:60,
          tags:['product'],
          url:['/admin/product', '/']
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

export async function getProductServer(query) {
  let url = `${process.env.HOST}api/product`
  if(query){
    const {q , category}=query
    if(q){
      url += `?q=${q}`
    }
    if(category){
      url += `?category=${category}`
    }
  }

  try{
    const res = await fetch(url,
      {
        next:{
          revalidate:60,
          tags:['product'],
          url:['/admin/product', '/']
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

export async function getProductDetail(id) {
  try{
    const res = await fetch(`${process.env.HOST}api/product/${parseInt(id)}`,
      {
        next:{
          revalidate:60,
          tags:['product'],
          url:['/admin/product', '/']
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

export async function postProduct(payload) {
  try{
    const res = await fetch(
      `/api/product`,
      {
        method:"POST",
        body: JSON.stringify(payload),
        next:{
          revalidate:60,
          tags:['product'],
          url:['/admin/product', '/']
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

export async function deleteProduct(id) {
  if(!id){
    throw new Error("Id is missing")
  }
  try{
    const res = await fetch(`/api/product/${id}`,
      {
        method: "DELETE",
        next:{
          revalidate:60,
          tags:['product'],
          url:['/admin/product', '/']
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
