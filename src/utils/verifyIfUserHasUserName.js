import jwt_decode from "jwt-decode";

export default function verifyIfUserHasUserName() {
	const jwt = localStorage.getItem('__user_JWT')
	const {userName} = jwt_decode(jwt)
	if (userName === '')
		if(!document.location.href === '/profile/edit-profile') {
			return {status: false, popUp: false}
		} else return {status: false, popUp: true}
	return {status: true, popUp: false}
}