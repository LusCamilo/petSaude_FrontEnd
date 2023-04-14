import {BASE_URL} from "../../lib/_base_url";

export async function updateSpecialties(body,token) {

    const url = `${BASE_URL}/veterinarian/user/`
    const response = await fetch(url, {
        method: 'PUT',
        body: body,
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })

    return await response.json()
    
}
export async function deleteSpecialties(id,token) {

    const url = `${BASE_URL}veterinary/user/${id}`
    const response = await fetch(url, {
        method: 'DELETE',
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })

    return await response.json()
    
}