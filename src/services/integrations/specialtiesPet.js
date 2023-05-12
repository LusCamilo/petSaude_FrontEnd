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

export async function deleteSpecialtiesPet(specialitiesPet) {

    const url = `${BASE_URL}veterinarian/attended-animals`
    const response = await fetch(url, {
        method: 'DELETE',
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: specialitiesPet
    })

    return await response.json()
    
}

export async function updateSpecialitiesPet(specialitiesPet) {
    const url = `${BASE_URL}veterinarian/attended-animals`
    const response = await fetch(url, {
        method: 'PUT',
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: specialitiesPet
    })

    return response.json();
    
}

