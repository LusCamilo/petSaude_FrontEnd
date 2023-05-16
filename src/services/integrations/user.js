import { BASE_URL } from "../../lib/_base_url";

const token = localStorage.getItem('__user_JWT')

export async function registerUser(userInfos) {
    try {
        const url = `${BASE_URL}client`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfos)
        })

        return response.json()

    } catch (err) {
        console.log(err);
    }
}

export async function registerVet(vetInfos) {
    try {
        const url = `${BASE_URL}veterinary`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vetInfos)
        })
        return await response.json()
    } catch (err) {
        console.log(err.message);
    }
}
 
export async function createVeterinaryInfosIntoExistingUser(userID, vetInfos) {
    const url = `${BASE_URL}veterinarian/user?userId=${userID}`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vetInfos)
    })

    return await response.json()
}

export async function getUser(id) {

    const url = `${BASE_URL}client?userID=${id}`
    const response = await fetch(url, {
        method: "GET",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        }
    })
    return await response.json()

}
export async function getVeterinary(id) {

    const url = `${BASE_URL}id/veterinary?userID=${id}`
    const response = await fetch(url, {
        method: "GET",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        }
    })
    return await response.json()

}

export async function deleteClient(token) {

    const url = `${BASE_URL}client`
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        }
    })

    return await response.json()

}

export async function deleteVeterinary(id, token) {

    const url = `${BASE_URL}veterinary/${id}`
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        }
    })

    return await response.json()

}

export async function updateProfileInfosClient(infosProfile) {
    try {
        const url = `${BASE_URL}client/profile-infos`
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(infosProfile)
        })
        console.log(JSON.stringify(infosProfile));
        return await response.json()
    } catch (err) {
        console.log(err.message);
    }

}

export async function updatePersonalInfosClient(infosProfile) {
    try {
        const url = `${BASE_URL}client/personal-infos`
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(infosProfile)
        })
        return await response.json()
    } catch (err) {
        console.log(err.message);
    }
}

export async function updateProfileInfosVeterinary(infosProfile) {
    try {
        const url = `${BASE_URL}veterinary/profile-infos`
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(infosProfile)
        })
        return await response.json()
    } catch (err) {
        console.log(err.message);
    }

}

export async function updatePersonalInfosVeterinary(infosProfile) {
    try {
        const url = `${BASE_URL}veterinary/personal-infos`
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(infosProfile)
        })
        return await response.json()
    } catch (err) {
        console.log(err.message);
    }
}

export async function updateProfessionalInfos(id, body) {
    try {
        
        const url = `${BASE_URL}veterinary/professional/${id}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
        return await response.json()
    } catch (err) {
        console.log(err);
    }
}





