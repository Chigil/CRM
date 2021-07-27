import  $host from "./index";

export const createUser = async (body:any) =>{
    const {data} = await $host.post('api/users/create/user',body)
    return data
}

export const getAllUsers = async (query:any) =>{
    const {data} = await $host.get('api/users/get/users'+query)
    console.log(query)
    return data
}
