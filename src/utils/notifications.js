import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";

class Notifications {
	constructor() {
		this.swal = withReactContent(Swal)
	}

	async error(message) {
		await this.swal.fire({
			timer: 1500,
			icon: "error",
			title: <p>{message}</p>,
			timerProgressBar: true,
			showConfirmButton: false,
			buttonsStyling: false,
		})
	}
	async success(message) {
		await this.swal.fire({
			timer: 1500,
			icon: "success",
			title: <p>{message}</p>,
			timerProgressBar: true,
			showConfirmButton: false,
			buttonsStyling: false,
		})
	}

}

export default new Notifications()
