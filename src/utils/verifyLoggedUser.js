import jwt_decode from "jwt-decode";

export default function verifyLoggedUser() {
	const jwt = localStorage.getItem('__user_JWT')
	if (!jwt || jwt === '' || !jwt_decode(jwt))
		document.location.href = '/login'
}