import {BASE_URL} from "../../lib/_base_url";
import {HELP_URL} from "../../lib/_base_url";

const token = localStorage.getItem('__user_JWT')


export async function appointmentAdd(appointmentInfos) {
    const url = `${BASE_URL}appointment`
    console.log(url)
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`

        },
        body: JSON.stringify(appointmentInfos)
    })
    console.log(await response.json());
    return await response
}

export async function getAppointments(idPeople) {

  const url = `${HELP_URL}getAppointments?userID=${idPeople}`
  console.log(url);
  return await fetch(url, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  })
    .then(response => response.json())
    .catch(error => console.log('Error Procurar veterinários'));
}


