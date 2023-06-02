import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Notifications from "../../../../../utils/Notifications";
import { Review } from "../reviews/reviews";
import { ratingAdd } from "../../../../../services/integrations/rating";
import { toast } from "react-toastify";

const showToastMessage = (message) => {
  toast(`${message}`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};


export const AppointmentArchivedCard = (props) => {

  const [ratingModal, setRatingModal] = useState("hidden");
  const [idVet, setIdVet] = useState()

  async function openRatingAvaliation() {
    await Notifications.ratingAvaliation(showToastMessage, handleClick, async result => {
      if (result.isConfirmed) {
        const json = JSON.parse(sessionStorage.getItem("ratingUser"))
        json.veterinaryId = props.vetId
        await ratingAdd(json).then(response => console.log(response))
      }
      sessionStorage.removeItem("ratingUser")
    });
  }

  

	function handleClick() {
    if (ratingModal == "hidden") {
      setRatingModal("flex")
      console.log(ratingModal);
    } else {
      setRatingModal("hidden")
      console.log(ratingModal);
    }

	}

  return (
    <div
      className={`${props.cor} border-none sm:border-solid border h-1/6 rounded-3xl border-black flex flex-col gap-0 p-14`}
    >
      <div className="flex flex-row items-center content-center text-center text-6xl gap-4">
        <img className="PetImage" src={props.imagemPet} alt="Imagem do pet" />
        <h2 className="font-normal flex justify-center sm:justify-start font-sans">
          {props.nomePet}
        </h2>
      </div>
      <div className="flex flex-col sm:flex-row justify-between pr-10 pt-5">
        <div className="flex flex-col justify-start w-full sm:w-1/3 mr-5">
          <div>
            <label className="flex flex-col text-2xl text-[#A9A9A9]">
              Nome
              <input
                type="text"
                disabled
                placeholder={props.nomePet}
                className="bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl "
              />
            </label>
          </div>

          <div>
            <label className="flex flex-col text-2xl text-[#A9A9A9]">
              Tamanho
              <input
                type="text"
                disabled
                placeholder={props.tamanho}
                className="bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl "
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col sm:flex-col justify-start content-center w-full sm:w-1/3 mr-5">
          <div className="w-full">
            <label className="flex flex-col text-2xl text-[#A9A9A9]">
              Sexo
              <input
                type="text"
                disabled
                placeholder={props.sexo}
                className="bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl "
              />
            </label>
          </div>
          <div className="w-full">
            <label className="flex flex-col text-2xl text-[#A9A9A9]">
              Idade
              <input
                type="text"
                disabled
                placeholder={props.idade}
                className="bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl "
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col sm:flex-col justify-start content-center w-full sm:w-1/3 mr-20">
          <div className="w-full">
            <label className="flex flex-col text-2xl text-[#A9A9A9]">
              Espécie
              <input
                type="text"
                disabled
                placeholder={props.especie}
                className="bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl"
              />
            </label>
          </div>
        </div>
      </div>
      <h2 className="font-normal flex justify-center sm:justify-start font-sans text-3xl pt-5">
        Informações de consulta{" "}
      </h2>
      <div className="flex flex-col justify-between pr-5 pt-5">
        <div className="flex flex-row justify-start w-full sm:w-full pt-5">
          <div className="mr-24">
            <label className="flex flex-col text-2xl text-[#A9A9A9] gap-0">
              Data
              <input
                type="text"
                disabled
                placeholder={props.dataConsulta}
                className="bg-transparent placeholder:text-gray-400 w-full placeholder:text-3xl border-none text-3xl "
              />
            </label>
          </div>
          <div className="w-full">
            <label className="flex flex-col text-2xl text-[#A9A9A9] gap-0">
              Horário
              <input
                type="text"
                disabled
                placeholder={props.horario}
                className="bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl "
              />
            </label>
          </div>
        </div>
        <div className="flex flex-row sm:flex-col justify-start content-center w-full ">
          <div>
            <label className="flex flex-col text-2xl text-[#A9A9A9]">
              Descrição
              <input
                type="text"
                disabled
                placeholder={props.descricao}
                className="bg-transparent placeholder:text-gray-400 w-full placeholder:text-3xl border-none text-3xl "
              />
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center content-center text-bottom gap-3 pt-5 text-3xl">
        <h2 className="font-normal flex justify-center sm:justify-start font-sans ">
          Status:
        </h2>
        <div className="text-[#49454F] font-normal  font-sans">
          {props.status}
        </div>
      </div>
      <div className={`flex`}>
      {/* ${props.isVet == "flex" && props.status == "Finalizado" ? "flex" : "hidden"} */}
        <button
          class={`bg-yellow-500 hover:bg-yellow-600 text-white w-1/6 font-bold py-2 px-4 rounded mt-2 ${props.isVet == "flex" && props.estado == "bg-[#09738A]" ? "hidden" : "flex"}`}
          onClick={openRatingAvaliation}
        >
          Avaliar consulta
        </button>
      </div>
    </div>
  );
};
