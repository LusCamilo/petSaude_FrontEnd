//import axios from 'axios'
const _BASE_URL = 'http://localhost:3000/'

export const login = async (loginInfos) => {

    const url = `${_BASE_URL}signup`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'access-allow-control-origin': '*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: loginInfos.email, password: loginInfos.password})
    })
        .then(response => response.json())
        .then(data => data.token)
        .then(token => localStorage.setItem('__user_JWT', token))
        .then(token => token)
        .catch(err => alert(err))
}

export const signup = async (token) => {
    const url = `${_BASE_URL}auth`
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return await response.json()
}


