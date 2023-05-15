import {BASE_URL, LOCAL_URL} from "../../lib/_base_url";

const token = localStorage.getItem('__user_JWT')


export async function appointmentAdd(appointmentInfos) {
    const url = `${BASE_URL}appointment`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`

        },
        body: JSON.stringify(appointmentInfos)
    })

    return await response.json()
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

export async function recusarAppointments(idAppointment, jsonAppointment) {

  const url = `${BASE_URL}appointment/${idAppointment}/validate?status=DECLINED`
  console.log(url);
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(jsonAppointment)
  })
  return await response.json()
}

export async function aceitadoAppointments(idAppointment, jsonAppointment) {

  const url = `${BASE_URL}appointment/${idAppointment}/validate?status=SCHEDULED`
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(jsonAppointment)
  })
  return await response.json()
}

export async function canceladoAppointments(idAppointment) {

  const url = `${BASE_URL}appointment/${idAppointment}/status/CANCELED`
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

export async function finalizadoAppointments(idAppointment) {

  const url = `${BASE_URL}appointment/${idAppointment}/status/CONCLUDED`
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