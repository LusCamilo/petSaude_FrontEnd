import { BASE_URL } from "../../lib/_base_url";

export const login = async (loginInfos) => {

    const url = `${BASE_URL}signup`

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'access-allow-control-origin': '*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: loginInfos.email, password: loginInfos.password})
        
    })
    
    return await response.json()
        // .then(response => response.json())
        // .then(data => data.token)
        // .then(token => localStorage.setItem('__user_JWT', token))
        // .then(token => token)
        // .catch(err => alert(err))
}

export const signup = async (token) => {
    const url = `${BASE_URL}auth`
    const response = await fetch(url, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${token}`
        }
    })
    return await response.json()
}


