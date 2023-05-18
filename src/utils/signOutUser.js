export default function signOutUser() {
	localStorage.removeItem('__pet_id');
	localStorage.removeItem('__user_register_infos');
	localStorage.removeItem('__user_id');
	localStorage.removeItem('__user_isVet');
	localStorage.removeItem('__register_type');
	localStorage.removeItem('__user_JWT');

	document.location.href = "/login"
}