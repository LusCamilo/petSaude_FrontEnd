import {BASE_URL} from "../../lib/_base_url";

const token = localStorage.getItem('__user_JWT')


export async function appointmentAdd(appointmentInfos) {
    const url = `${BASE_URL}appointment`
    console.log(url)
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`

        },
        body: JSON.stringify(appointmentInfos)
    })
    console.log(response);
    return await response.json()
}