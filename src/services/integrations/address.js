import {BASE_URL} from "../../lib/_base_url";

const token = localStorage.getItem('__user_JWT')

export async function updateAddress(address, addressID) {
    try {
        const url = `${BASE_URL}address?addressID=${addressID}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(address)
        })
        return await response.json()    
    } catch (err) {
        console.log(err.message);
    }
}