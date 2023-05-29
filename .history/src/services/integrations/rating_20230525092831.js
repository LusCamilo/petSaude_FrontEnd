import { BASE_URL } from "../../lib/_base_url";

const token = localStorage.getItem('__user_JWT')


export async function getRatings(vetId) {
	const url = `${BASE_URL}/rating/veterinary/:${vetId}`
	const response = await fetch(url, {
		method: "GET",
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Authorization': `Bearer ${token}`
		}
	})
	return await response.json()
}

export async function ratingAdd(infosRating) {
	const url = `${BASE_URL}rating`
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`

		},
		body: JSON.stringify(infosRating)
	})
	return await response.json()
}

export async function deleteRating(idRating) {
	const url = `${BASE_URL}rating/${idRating}`
	const response = await fetch(url, {
		method: 'DELETE',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Authorization': `Bearer ${token}`
		}
	})
	return await response.json()
}