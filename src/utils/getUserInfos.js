import jwt_decode from "jwt-decode";
import {getUser, getVeterinary} from "../services/integrations/user";

export default async function getUserInfos () {
	let apiResponse
	if(localStorage.getItem("profileUser") && localStorage.getItem("profileUser").split("-")[1] == "true"){
		let infos = localStorage.getItem("profileUser").split("-")
		if(localStorage.getItem("profileUser") && localStorage.getItem("profileUser").split("/")[0] != "Professional") {
			const userId = infos[0].split("/")[1]
			apiResponse = await getUser(userId)
		}
		else apiResponse = await getVeterinary(infos[0].split("/")[1])
		localStorage.setItem("profileUser", `${localStorage.getItem("-")}-false`)
	} else {
		const token = localStorage.getItem('__user_JWT')
		const decoded = jwt_decode(token);

		if (!decoded.isVet) apiResponse = await getUser(decoded.id)
		else apiResponse = await getVeterinary(decoded.id)
	}

	const {response} = apiResponse
	return {
		id: response.user.id,
		userName: response.user.userName, 
		personName: response.user.personName,
		cep: response.user.Address.cep,
		profilePhoto: response.user.profilePhoto,
		profileBannerPhoto: response.user.profileBannerPhoto,
		email: response.user.email,
		password: response.user.password,
		isVet: response.user.isVet,
		bio: response.user.biography, 
		appointments: response?.Appointments || [],
		formacao: response.user?.formation,
		dataFormacao: response.user?.formationDate,
		instituicao: response.user?.institution,
		carreiraInicio: response.user?.startActingDate,
	}
}