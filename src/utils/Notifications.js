import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Appointment } from "../pages/userProfile/resource/appointment/appointment";
import { AppointmentArchivedCard } from "../pages/userProfile/resource/appointment/appointments/appointmentArchivedCard";
import { Review } from "../pages/userProfile/resource/appointment/reviews/reviews";

class Notifications {
  constructor() {
    this.swal = withReactContent(Swal);
  }

  async error(message, subtitle = null) {
    await this.swal.fire({
      timer: 1500,
      icon: "error",
      title: <p>{message}</p>,
      text: subtitle,
      timerProgressBar: true,
      showConfirmButton: false,
      buttonsStyling: false,
    });
  }
  async success(message) {
    await this.swal.fire({
      timer: 1500,
      icon: "success",
      title: <p>{message}</p>,
      timerProgressBar: true,
      showConfirmButton: false,
      buttonsStyling: false,
    });
  }

  async warning(message) {
    await this.swal.fire({
      timer: 1500,
      icon: "info",
      title: <p>{message}</p>,
      timerProgressBar: true,
      showConfirmButton: false,
      buttonsStyling: false,
    });
  }

  async confirmOrCancel(message, callback) {
    await this.swal
      .fire({
        icon: "question",
        title: <p>{message}</p>,
        timerProgressBar: false,
        showConfirmButton: true,
        showCancelButton: true,
      })
      .then(callback);
  }

  async warningConfirmOrCancel(title, message, callback) {
    await this.swal
      .fire({
        icon: "warning",
        title: <p>{title}</p>,
        text: message,
        timerProgressBar: false,
        showConfirmButton: true,
        showCancelButton: true,
      })
      .then(callback);
  }

  async appointment(onCancel, onToast) {
    await this.swal.fire({
      showCancelButton: false,
      showConfirmButton: false,
      html: <Appointment onCancel={onCancel} onToast={onToast} />,
      heightAuto: true,
      width: "60%",
    });
  }

  async ratingAvaliation(onConfirm, onCancel, callback) {
    await this.swal.fire({
        html: <Review onConfirm={onConfirm} onCancel={onCancel} />,
        showCancelButton: true,
        showConfirmButton: true,
      })
      .then(callback);
  }
}

export default new Notifications();
