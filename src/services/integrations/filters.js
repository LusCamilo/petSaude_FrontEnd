import { BASE_URL } from "../../lib/_base_url";

export async function getUsers(search, searchIt) {
  if (search === null) {
    search = ''
  }
  console.log("Procurando");
  const url = `${BASE_URL}veterinary?${searchIt}=${search}`
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

export async function getAllVets() {
  const url = `${BASE_URL}veterinary`
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.error(error));
}

export async function getVet(idVet) {
  const url = `${BASE_URL}id/veterinary?userID=${idVet}`
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.error(error));
}
