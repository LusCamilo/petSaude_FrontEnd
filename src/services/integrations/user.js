import {BASE_URL} from "../../lib/_base_url";

export async function registerUser(userInfos) {
    const url = `${BASE_URL}user`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfos)
    })
    return await response.json()
}

export async function createVeterinaryInfosIntoExistingUser(userID, vetInfos) {
    const url = `${BASE_URL}veterinarian/user?userId=${userID}`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(vetInfos)
    })

    return await response.json()
}

export async function getUser(id, token) {
    console.log(id);
    console.log(token);
    const url = `${BASE_URL}user/?userID=${id}`
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return fetch(url)
    .then(response => response.json())
    .catch(error => console.error(error));
    
}

export async function deleteUser(id,token) {

    const url = `${BASE_URL}user/${id}`
    const response = await fetch(url, {
        method: 'DELETE',
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })

    return await response.json()
    
}



