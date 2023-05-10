import {BASE_URL} from "../../lib/_base_url";

const token = localStorage.getItem('__user_JWT')

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

export async function deleteSpecialtiesPet(id) {

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

export async function updateSpecialities(specialitiesPet) {
    const url = `${BASE_URL}veterinarian/attended-animals`
    const response = await fetch(url, {
        method: 'PUT',
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(specialitiesPet)
    })

    return await response.json()
    
}

