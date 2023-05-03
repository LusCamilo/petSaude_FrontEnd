//import axios from 'axios'
const _BASE_URL = 'http://localhost:3000/'

export const login = async (loginInfos) => {

    const url = `${_BASE_URL}signup`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
<<<<<<< HEAD
            'Access-Control-Allow-Origin': '*',
=======
            'access-allow-control-origin': '*',
>>>>>>> d028746e918ade7355341589c7a70238cdccc926
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
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${token}`
        }
    })
    return await response.json()
}


