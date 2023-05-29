import jwt_decode from "jwt-decode";
import {getUser, getVeterinary} from "../services/integrations/user";

export default async function verifyIfUserHasUserName() {
	const jwt = localStorage.getItem('__user_JWT')
	const decodedJwt = jwt_decode(jwt)

	let apiReponse
	if (decodedJwt.isVet) apiReponse = await getVeterinary(decodedJwt.id)
	else apiReponse = await getUser(decodedJwt.id)
	const {user} = apiReponse.response

	return user.userName !== '';

}