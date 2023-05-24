import { BASE_URL } from "../../lib/_base_url";

export async function getUsers(search, searchIt) {
<<<<<<< HEAD
  console.log(search);
  console.log(searchIt);
  if (search == null) {
    search = "";
=======
  if (search === null) {
    search = ''
>>>>>>> e899594aa9cd5aa440958be4f5221cc98de1133f
  }
  const url = `${BASE_URL}veterinary?${searchIt}=${search}`;
  return await fetch(url, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })
<<<<<<< HEAD
    .then((response) => console.log(response.json()))
    .catch((error) => console.log("Error Procurar veterinários"));
=======
    .then(response => response.json())
    .catch(error => console.log('Error Procurar veterinários'));
>>>>>>> e899594aa9cd5aa440958be4f5221cc98de1133f
}

export async function getAllVets() {
  const url = `${BASE_URL}veterinary`;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export async function getVet(idVet) {
  const url = `${BASE_URL}id/veterinary?userID=${idVet}`;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}
