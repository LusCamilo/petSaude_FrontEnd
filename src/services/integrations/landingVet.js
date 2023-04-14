// import {BASE_URL} from "../../lib/_base_url";

// export async function registerUser(userInfos) {
//     const url = `${BASE_URL}user`
//     const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(userInfos)
//     })
//     return await response.json()
// }

// export async function createVeterinaryInfosIntoExistingUser(userID, vetInfos) {
//     const url = `${BASE_URL}veterinarian/user?userId=${userID}`
//     const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(vetInfos)
//     })

//     return await response.json()
// }