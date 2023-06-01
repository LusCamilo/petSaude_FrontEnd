import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Appointment } from "../pages/userProfile/resource/appointment/appointment";
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
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.swal.fire({
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: "Marcar",
          confirmButtonColor: "#9ED1B7",
          cancelButtonText: "Cancelar",
          cancelButtonColor: "#F9DEDC",
          buttonsStyling: false,
          customClass: {
            cancelButton: "p-2 md:w-40 md:text-center md:h-12 border rounded-full bg-[#F9DEDC] text-red-950 font-semibold text-2xl origin-center",
            confirmButton: "p-2 md:w-40 md:h-12 text-center border rounded-full bg-[#9ED1B7] text-[#41564B] font-semibold text-2xl",
            actions: "flex flex-row-reverse w-full h-full mt-[-80px] justify-between px-14"
          },
          html: <Appointment onCancel={onCancel} onToast={onToast} />,
          heightAuto: true,
          width: '60%',
        });
  
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  async ratingAvaliation(onConfirm, onCancel, callback) {
    await this.swal.fire({
      html: <Review onConfirm={onConfirm} onCancel={onCancel} />,
      //showCancelButton: true,
      //showConfirmButton: true,
      // html: <Review onConfirm={onConfirm} onCancel={onCancel} />,
      showCancelButton: true,
      showConfirmButton: true,
    })
      .then(callback);
  }
}

export default new Notifications();
