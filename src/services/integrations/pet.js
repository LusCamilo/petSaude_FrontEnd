import {BASE_URL} from "../../lib/_base_url";

const token = localStorage.getItem('__user_JWT')

export const getAllPets = async (userId) => {
  const url = `${BASE_URL}pet/all?userID=${userId}`
  const response = await fetch(url,{
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  })
  const pet = await response.json()
  const petArray = pet.message.pets
  return petArray
}

export const getPet = async (petID) => {
  const url = `${BASE_URL}pet?petID=${petID}`
  const response = await fetch(url,{
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  })
  const pet = await response.json()
  return pet.message.pet
}

export async function petAdd(petInfos, userID) {
    const url = `${BASE_URL}pet?userID=${userID}`
    console.log(url)
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`

        },
        body: JSON.stringify(petInfos)
    })
    console.log(response);
    return await response.json()
}

export async function petDelete(idPet) {
  const url = `${BASE_URL}pet?petID=${idPet}`
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token}`
    }
  })
  console.log(response);
  return await response.json()
}

export async function petUpdate(idPet, petInfos) {
  const url = `${BASE_URL}pet?petID=${idPet}`
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(petInfos)
  })
  console.log(response);
  return await response.json()
}



/*
	const bodyParams = z.object({
			name: z.string(),
			birthDate: z.string(),
			photo: z.string(),
			microship: z.boolean(),
			size: z.string(),
			gender: z.string(),
			specie: z.string(),
		});
*/