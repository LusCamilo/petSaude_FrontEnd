//import axios from 'axios'
const _BASE_URL = 'http://localhost:8080/'

export const login = async (loginInfos) => {

    const url = `${_BASE_URL}signup`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: loginInfos.email, password: loginInfos.password})
    })
    return await response.json()

}

export const signup = async (token) => {
    const url = `${_BASE_URL}auth`
    const response = await fetch(url, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${token}`
        }
    })
    return await response.json()
}


