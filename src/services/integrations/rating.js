import { BASE_URL } from "../../lib/_base_url";

const token = localStorage.getItem('__user_JWT')


export async function getRatings(id) {
	const url = `${BASE_URL}/rating/veterinary/:${id}`
	const response = await fetch(url, {
		method: "GET",
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Authorization': `Bearer ${token}`
		}
	})
	return await response.json()
}