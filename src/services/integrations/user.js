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

<<<<<<< HEAD
export async function getUser(id, token) {
    const url = `${BASE_URL}user/?userID=${id}`
=======
export async function getUser(id) {

    const url = `${BASE_URL}client?userID=${id}`
    const response = await fetch(url)//, {
        // headers: {
        //     'Authorization': `Bearer ${token}`
        // }
    //})
    return await response.json()
    
}

export async function deleteClient(token) {

    const url = `${BASE_URL}client`
>>>>>>> 2c1a2e86f570e1db809e64d4b5a9613668946f2c
    const response = await fetch(url, {
        method: 'DELETE',
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })

    return await response.json()
    
}

export async function deleteVeterinary(id,token) {

    const url = `${BASE_URL}veterinary/${id}`
    const response = await fetch(url, {
        method: 'DELETE',
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })

    return await response.json()
    
}



