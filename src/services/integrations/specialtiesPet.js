import {BASE_URL} from "../../lib/_base_url";

export async function updateSpecialtiesPet(body,token) {

    const url = `${BASE_URL}/veterinarian/user/pet`
    const response = await fetch(url, {
        method: 'PUT',
        body: body,
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        }
    })

    return await response.json()
    
}
export async function deleteSpecialtiesPet(id,token) {

    const url = `${BASE_URL}veterinarian/user/pet/${id}`
    const response = await fetch(url, {
        method: 'DELETE',
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        }
    })

    return await response.json()
    
}