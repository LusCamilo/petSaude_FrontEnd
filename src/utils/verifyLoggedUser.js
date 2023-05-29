import jwt_decode from "jwt-decode";
import {signup} from "../services/integrations/authentication";

export default async function verifyLoggedUser() {
	const jwt = localStorage.getItem('__user_JWT')
	const isSignedUser = await signup(jwt)

	return !(!jwt || jwt === '' || !jwt_decode(jwt) || isSignedUser.statusCode === 401);
}
