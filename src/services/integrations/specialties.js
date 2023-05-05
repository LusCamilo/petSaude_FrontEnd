import {BASE_URL} from "../../lib/_base_url";

export async function updateSpecialties(body,token) {

    const url = `${BASE_URL}/veterinarian/user/`
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
export async function deleteSpecialties(id,token) {

    const url = `${BASE_URL}veterinary/user/${id}`
    const response = await fetch(url, {
        method: 'DELETE',
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        }
    })

    return await response.json()
    
}

export async function getSpecialties() {
    const url = `${BASE_URL}specialities`
    const response = await fetch(url, {
        method:'GET',
        headers:{
            'Access-Control-Allow-Origin': '*',
        }
    })

    return await response.json()
}
export async function getSpecialtiesById(id) {
    const url = `${BASE_URL}specialities/${id}`
    const response = await fetch(url, {
        method:'GET',
        headers:{
            'Access-Control-Allow-Origin': '*',
        }
    })

    return await response.json()
}