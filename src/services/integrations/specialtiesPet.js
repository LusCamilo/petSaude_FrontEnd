import {BASE_URL} from "../../lib/_base_url";

export async function getSpecialtiesPet() {
    const url = `${BASE_URL}attended-animals`
    const response = await fetch(url, {
        method:'GET',
        headers:{
            'Access-Control-Allow-Origin': '*',
        }
    })

    return await response.json()
}

export async function getSpecialtiesPetById(id) {
    const url = `${BASE_URL}attended-animals/${id}`
    const response = await fetch(url, {
        method:'GET',
        headers:{
            'Access-Control-Allow-Origin': '*',
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

