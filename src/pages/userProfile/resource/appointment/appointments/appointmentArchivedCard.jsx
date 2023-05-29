import React, { useState, useEffect } from "react";
import Notifications from "../../../../../utils/Notifications";
import { Review } from "../reviews/reviews";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "3px solid #9ED1B7",
    borderRadius: "40px",
    width: "32vw",
    height: "70vh",
    display: "flex",
    justifyContent: "center",
  },
  overlay: {
    backgroundColor: "#0000",
  },
};

async function openRatingAvaliation() {
  await Notifications.ratingAvaliation(null, null, (result) => {
    if (result.isConfirmed) {
      // TODO: IMPLEMENTAR a logica...
    }
  });
}

export const AppointmentArchivedCard = (props) => {

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
      <div className={`${props.isVet}`}>
        <button
          class="bg-yellow-500 hover:bg-yellow-600 text-white w-1/6 font-bold py-2 px-4 rounded mt-2"
          onClick={openRatingAvaliation}
        >
          Avaliar consulta
        </button>

        {/* <button
          class="bg-yellow-500 hover:bg-yellow-600 text-white w-1/6 font-bold py-2 px-4 rounded"
          onClick={openModal}
        >
          Avaliar consulta
        </button> */}

        {/* <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <form
            className="w-full"
            onSubmit={() => {
              handleSubmit(submitForm);
            }}
          >
            <div className="flex justify-end text-5xl w-full">
              <AiOutlineClose
                className="cursor-pointer"
                onClick={props.onClose}
              />
            </div>
            <div className="bg-white w-full">
              <div>
                <label
                  htmlFor="comment"
                  className="text-gray-700 font-bold mb-2 flex flex-col justify-center w-full"
                >
                  <h2 className="flex justify-center text-3xl">
                    {" "}
                    Avaliação de Veterinário
                  </h2>
                  <p className="flex justify-center text-2xl text-[#A9A9A9]">
                    Opinão referente a consulta
                  </p>
                  <div className="justify-center inline pt-5 ">
                    <Rating onClick={handleRating} transition size={25} />
                  </div>
                  {rating}
                </label>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="comment"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Comentários adicionais
                </label>
                <textarea
                  id="comment"
                  rows={3}
                  className="shadow appearance-none border border-black rounded w-full h-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pt-2"
                  onBlurCapture={(e) => setRDescription(e)}
                />
                <p className="flex justify-end text-2xl p-2  text-[#A9A9A9]">
                  Resposta opcional
                </p>
              </div>
              <div className="flex justify-center pt-20 lg-40">
                <button
                  className=" bg-[#9ED1B7] hover:shadow-xl hover:scale-105 text-[#41564B] font-semibold py-2 px-4 ml-2 rounded-2xl focus:outline-none focus:shadow-outline w-56 h-8 text-center text-xl"
                  type="button"
                  onClick={() => {
                    submitForm();
                  }}
                >
                  Concluir avaliação
                </button>
              </div>
            </div>
          </form>
        </Modal> */}
      </div>
    </div>
  );
};
