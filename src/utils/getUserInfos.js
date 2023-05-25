import jwt_decode from "jwt-decode";
import {getUser, getVeterinary} from "../services/integrations/user";

export default async function getUserInfos () {
	const token = localStorage.getItem('__user_JWT')
	const decoded = jwt_decode(token);
	let apiResponse
	if (!decoded.isVet) apiResponse = await getUser(decoded.id)
	else apiResponse = await getVeterinary(decoded.id)

	const {response} = apiResponse

	return {
		id: response.user.id,
		userName: response.user.userName,
		personName: response.user.personName,
		profilePhoto: response.user.profilePhoto,
		profileBannerPhoto: response.user.profileBannerPhoto,
		email: response.user.email,
		password: response.user.password,
		isVet: response.user.isVet,
		bio: response.user.biography
	}
}