// Função que faz a requisição GET e recebe um JSON
import {BASE_URL} from "../../lib/_base_url";

export async function getUsers(search, searchIt) {
    const url = `${BASE_URL}veterinary?${searchIt}=${search}`
    console.log(url);
    return fetch(url)
    .then(response => response.json())
    .catch(error => console.error(error));
  }
  
  // Exemplo de uso da função