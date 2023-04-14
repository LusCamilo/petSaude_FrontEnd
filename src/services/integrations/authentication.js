//import axios from 'axios'
const _BASE_URL = 'http://localhost:8080/'

export const login = async (loginInfos) => {

    // const api = axios.create({
    //     baseURL: _BASE_URL
    // })

    // api.post(
    //  "signup", {
    //     email: loginInfos.email, 
    //     password: loginInfos.password
    //  }
    // ).then((response)=>{
    //     console.log(response)
    // })

    const url = `${_BASE_URL}signup`
    const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
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
            Authorization: `Bearer ${token}`
        }
    })
    return await response.json()
}


