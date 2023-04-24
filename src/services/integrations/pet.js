import {BASE_URL} from "../../lib/_base_url";

const token = localStorage.getItem('__user_JWT')

export const getAllPets = async (userId) => {
  const url = `${BASE_URL}pet/all?userID=${userId}`
  const response = await fetch(url)
  const pet = await response.json()
  const petArray = pet.message.pets
  return petArray
}

export async function petAdd(petInfos, userID) {
    const url = `${BASE_URL}pet?userID=${userID}`
    console.log(url)
    const response = await fetch(url, {
        method: 'POST',
        headers: {
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
      'Authorization': `Bearer ${token}`
    }
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