export async function useApi(data: any, url:string, type:string):Promise<any> {
  if(type.toUpperCase() === "GET") {
  }

  if(type.toUpperCase() === "POST"){

    const response = await fetch(url,{
      method: type.toUpperCase(),
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  
    if(!response.ok) throw new Error('Failed to fetch data');
    
    const result = await response.json();
    
    return result;
  }
}