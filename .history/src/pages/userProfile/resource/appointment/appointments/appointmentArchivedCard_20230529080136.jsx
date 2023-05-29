import React, { useState, useEffect } from "react";
import { Rating } from 'react-simple-star-rating'
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { ratingAdd } from "../../../../../services/integrations/rating";



const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "4px solid #9ED1B7",
      borderRadius: "10px",
      width: "40vw",
      height: "75vh",
      display: "flex",
      justifyContent: "center",
    },
    overlay: {
      backgroundColor: "#0000",
    },
  };

export const AppointmentArchivedCard = (props) => {

    const { register, handleSubmit, formState: errors, setValue } = useForm();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [description, setRDescription] = useState("");

    function openModal() {
    setIsOpen(true);
    }

    function closeModal() {
    setIsOpen(false);
    }
    
    const submitForm = async () => {
        let allInfos;
        allInfos = {
          score: rating, 
          description: description.target.value,
          veterinaryId: props.vetId
        };

        let rating = await ratingAdd(allInfos)
        
        closeModal();
        
      };

      const handleRating = (rate) => {
        console.log(rate);
        setRating(rate);
      }

    return(
        <div
        className={`${props.cor} border-none sm:border-solid border h-1/6 rounded-3xl border-black flex flex-col gap-0 p-14 `}
      >
        <div className="flex flex-row items-center content-center text-center text-6xl gap-4">
          <img
            className="PetImage"
            src={props.imagemPet}
            alt="Imagem do pet"
          />
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
            class="bg-yellow-500 hover:bg-yellow-600 text-white w-1/6 font-bold py-2 px-4 rounded"
            onClick={openModal}
          >
            Avaliar consulta
          </button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <form onSubmit={() => {
                handleSubmit(submitForm)
              }}>
              <div className="bg-white w-full ">
              <div>
                <label
                htmlFor="comment"
                className="text-gray-700 font-bold mb-2 "
                >
                Quão bom foi o atendimento?
                <div className="flex flex-row">
                  <Rating 
                  onClick={handleRating} 
                  transition 
                  size={25} />
                </div>
                  {rating}
                </label>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="comment"
                  className="block text-gray-700 font-bold mb-2"
                >
                Assunto do comentário
                </label>
                <textarea
                  id="comment"
                  rows={3}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onBlurCapture={(e)=>setRDescription(e)}
                />
              </div>
              <div className="flex justify-between">
                <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={props.onClose}
                >
                Fechar
                </button>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={()=>{
                    submitForm()
                  }}
                >
                Enviar
                </button>
              </div>
              </div>
	</form>
          </Modal>
        </div>
      </div>
    )


} 