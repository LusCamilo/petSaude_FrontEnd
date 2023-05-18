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

	async warning(message) {
		await this.swal.fire({
			timer: 1500,
			icon: "info",
			title: <p>{message}</p>,
			timerProgressBar: true,
			showConfirmButton: false,
			buttonsStyling: false,
		})
	}

	async confirmOrCancel(message, callback) {
		await this.swal.fire({
			icon: "question",
			title: <p>{message}</p>,
			timerProgressBar: false,
			showConfirmButton: true,
			showCancelButton: true,
		}).then(callback)
	}
}

export default new Notifications()
