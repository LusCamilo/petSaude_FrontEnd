import {BASE_URL} from "../../lib/_base_url";

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