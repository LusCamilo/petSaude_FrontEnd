import {BASE_URL} from "../../lib/_base_url";

const token = localStorage.getItem('__user_JWT')

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

export async function deleteSpecialties(specialities) {

	const url = `${BASE_URL}veterinarian/specialities`
	const response = await fetch(url, {
		method: 'DELETE',
		headers:{
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: specialities
	})

	return await response.json()

}

export async function updateSpecialities(specialities) {
    const url = `${BASE_URL}veterinarian/specialities`
    const response = await fetch(url, {
        method: 'PUT',
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: specialities
    })

	return response.json();
}
