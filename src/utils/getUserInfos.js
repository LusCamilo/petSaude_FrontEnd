import jwt_decode from "jwt-decode";
import {getUser, getVeterinary} from "../services/integrations/user";

export default async function getUserInfos () {
	const token = localStorage.getItem('__user_JWT')
	const decoded = jwt_decode(token);
	if (decoded.isVet === false) {
		const response = await getUser(decoded.id)
		return {
			id: response.response.user.id,
			userName: response.response.user.userName,
			personName: response.response.user.personName,
			profilePhoto: response.response.user.profilePhoto,
			profileBannerPhoto: response.response.user.profileBannerPhoto,
			email: response.response.user.email,
			password: response.response.user.password,
		}
	} else {
		const response = await getVeterinary(decoded.id)
		return {
			id: response.response.user.id,
			userName: response.response.user.userName,
			personName: response.response.user.personName,
			profilePhoto: response.response.user.profilePhoto,
			profileBannerPhoto: response.response.user.profileBannerPhoto,
			email: response.response.user.email,
			password: response.response.user.password,
		}
	}
}