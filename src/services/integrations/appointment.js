import {BASE_URL} from "../../lib/_base_url";


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

  const url = `${BASE_URL}id/veterinary?userID=${idPeople}`
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

export async function recusarAppointments(idAppointment) {

  const url = `${BASE_URL}appointment/${idAppointment}/validate?status=DECLINED`
  console.log(url);
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${token}`
      }
  })
  return await response.json()
}

export async function aceitadoAppointments(idAppointment) {

  const url = `${BASE_URL}appointment/${idAppointment}/validate?status=SCHEDULED`
  console.log(url);
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${token}`
      }
  })
  return await response.json()
}

export async function canceladoAppointments(idAppointment) {

  const url = `${BASE_URL}appointment/${idAppointment}/validate?status=CANCEL`
  console.log(url);
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${token}`
      }
  })
  return await response.json()
}


