import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./styleAppointment.css";
import * as Dialog from "@radix-ui/react-dialog";
import jwt_decode from "jwt-decode";
import { getAppointments } from "../../../../../services/integrations/appointment";
import {
  getUser,
  getVeterinary,
} from "../../../../../services/integrations/user";
import {
  canceladoAppointments,
  finalizadoAppointments,
} from "../../../../../services/integrations/appointment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import { WarnRequest } from "../../../pet/cards/warnTwo";
import { PetAddSucess } from "../../../pet/cards/sucess";

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

export const AppointmentArchived = (props) => {
  const { register, handleSubmit, formState: errors, setValue } = useForm();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [pedidos, setPedido] = useState([]);
  const [quant, setQuant] = useState({ Finalizado: 0, Cancelado: 0 });
  const [showModal, setShowModal] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }
  const [isVet, setisVet] = useState("hidden");
  const [buttonAceitar, setButtonAceitar] = useState("flex");
  const [divNothing, setDivNothing] = useState("hidden");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("__user_JWT");
        const decoded = jwt_decode(token);
        let appoint = await getappo(decoded.id);
        if (decoded.isVet == false) {
          setisVet("flex");
        }
        if (appoint != undefined && appoint != null) {
          let filteredAppointments = appoint.filter(
            (appointment) =>
              appointment.status == "CANCELED" ||
              appointment.status == "CONCLUDED"
          );

          let appoints = await Promise.all(
            filteredAppointments.map(async (app) => {
              let client = await getclient(app.clientId);
              let arrayPet = await getPet(app.petId, client.Pet);
              let vet = await getvet(app.veterinaryId);
              const consultaDataSplit = app.date.split("T");
              const consultaDataPrimeiraMetade = consultaDataSplit[0];
              const consultaDataFormatada = consultaDataPrimeiraMetade
                .split("-")
                .reverse()
                .join("/");

              const horarioSplit = app.startsAt.split("T");
              const horarioSegundaMetade = horarioSplit[1];
              const horarioSplit2 = horarioSegundaMetade.split(":00.000Z");
              const horario = horarioSplit2[0];

              const dataDeNascimento = new Date(arrayPet.birthDate);
              const dataAtual = new Date();

              const diferencaEmMilissegundos = dataAtual - dataDeNascimento;
              const idadeEmAnos = Math.floor(
                diferencaEmMilissegundos / (1000 * 60 * 60 * 24 * 365)
              );

              let idadeString;

              let statusTraduzido;
              if (app.status == "CONCLUDED") statusTraduzido = "Finalizado";
              else statusTraduzido = "Cancelado";

              if (
                typeof idadeEmAnos === "number" &&
                Number.isInteger(idadeEmAnos)
              ) {
                idadeString = idadeEmAnos.toString() + " anos";
              } else {
                const idadeEmMeses = idadeEmAnos * 12;
                idadeString = idadeEmMeses.toString() + " meses";
              }

              const formattedDuration = formatDuration(app.duration);

              const finalArray = {
                idAppoint: app.id,
                imagemPet: arrayPet.photo,
                donoImg: client.profilePhoto,
                dono: client.personName,
                telefone: client.cellphoneNumber,
                nomePet: arrayPet.name,
                sexo: arrayPet.petGender,
                especie: arrayPet.petSpecie.name,
                tamanho: arrayPet.petSize,
                idade: idadeString,
                dataConsulta: consultaDataFormatada,
                horario: horario,
                descricao: app.description,
                duration: formattedDuration,
                vetId: vet.id,
                vetName: vet.personName,
                vetPhone: vet.cellphoneNumber,
                vetPhoto: vet.profilePhoto,
                estado: app.status,
                status: statusTraduzido,
              };

              return finalArray;
            })
          );
          setDivNothing("hidden");
          setPedido(appoints);
        } else {
          setDivNothing("flex");
          setPedido([]);
        }

        if (decoded.isVet == false) {
          setButtonAceitar("hidden");
        }
      } catch (error) {}
    };
    fetchData();
  }, []);

  const submitForm = async (data) => {
    let allInfos;

    allInfos = {
      score: data.score,
      description: data.description,
      veterinaryId: data.vetId,
    };
    console.log(allInfos);

    closeModal();
  };

  function formatDuration(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}h${formattedMinutes}min`;
  }

  const getPet = async (idPet, arrayPet) => {
    const filteredPets = arrayPet.filter((pet) => pet.id === idPet);
    return filteredPets[0];
  };

  const getappo = async (idPerson) => {
    const token = localStorage.getItem("__user_JWT");
    const decoded = jwt_decode(token);
    let allAboutIt;
    if (decoded.isVet == true) {
      allAboutIt = await getAppointments(idPerson);
    } else {
      let person = await getUser(idPerson);
      allAboutIt = person;
    }

    if (
      allAboutIt.response == "Não foram encontrados registros no Banco de Dados"
    ) {
      return [];
    } else {
      return allAboutIt.response.user.Appointments;
    }
  };

  const getclient = async (idPerson) => {
    let allAboutIt = await getUser(idPerson);
    if (
      allAboutIt.response == "Não foram encontrados registros no Banco de Dados"
    ) {
      return [];
    } else {
      return allAboutIt.response.user;
    }
  };

  const getvet = async (idPerson) => {
    let allAboutIt = await getVeterinary(idPerson);
    if (
      allAboutIt.response == "Não foram encontrados registros no Banco de Dados"
    ) {
      return [];
    } else {
      return allAboutIt.response.user;
    }
  };

  function formatPrice(input) {
    let value = input.value.replace(/[^0-9\.]/g, "");

    let decimalCount = value.split(".").length - 1;
    if (decimalCount > 1) {
      value = value.slice(0, -1);
    }

    input.value = parseFloat(value).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    });
  }

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    let cancelada = 0;
    let finalizar = 0;

    pedidos.forEach((pedir) => {
      if (pedir.estado == "CANCELED") {
        cancelada += 1;
      } else if (pedir.estado == "CONCLUDED") {
        finalizar += 1;
      }
    });

    setQuant((prevQuant) => ({
      ...prevQuant,
      Finalizado: finalizar,
      Cancelado: cancelada,
    }));
  }, [pedidos]);

  const [rating, setRating] = useState(0);

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  return (
    <section>
      <div className="flex flex-row gap-3 justify-between">
        <div className="flex flex-col items-center">
          <div className="flex flex-row gap-2">
            <h2>Consultas Finalizadas</h2>{" "}
            <div class=" w-10 h-10 rounded-md bg-[#09738A]"></div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="text-[#A9A9A9] text-base">Quantidade:</div>{" "}
            <div>{quant.Finalizado}</div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row gap-2">
            <h2>Consultas Canceladas</h2>{" "}
            <div class="w-10 h-10 rounded-md bg-[#F1EAC6]"></div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="text-[#A9A9A9] text-base">Quantidade:</div>{" "}
            <div>{quant.Cancelado}</div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-3 mr-2">
        {pedidos.map((pedido) => {
          const cor =
            pedido.estado == "CONCLUDED" ? "bg-[#09738A]" : "bg-[#F1EAC6]";
          return (
            <div
              className={`${cor} border-none sm:border-solid border h-1/6 rounded-3xl border-black flex flex-col gap-0 p-14 `}
            >
              <div className="flex flex-row items-center content-center text-center text-6xl gap-4">
                <img
                  className="PetImage"
                  src={pedido.imagemPet}
                  alt="Imagem do pet"
                />
                <h2 className="font-normal flex justify-center sm:justify-start font-sans">
                  {pedido.nomePet}
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
                        placeholder={pedido.nomePet}
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
                        placeholder={pedido.tamanho}
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
                        placeholder={pedido.sexo}
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
                        placeholder={pedido.idade}
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
                        placeholder={pedido.especie}
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
                        placeholder={pedido.dataConsulta}
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
                        placeholder={pedido.horario}
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
                        placeholder={pedido.descricao}
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
                  {pedido.status}
                </div>
              </div>
              <div className={`${isVet}`}>
                <button
                  class="bg-yellow-500 hover:bg-yellow-600 text-white w-1/6 font-bold py-2 px-4 rounded"
                  onClick={openModal}
                >
                  Avaliar consulta
                </button>
                <Modal
                  isOpen={modalIsOpen}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <form onSubmit={handleSubmit(submitForm)}>
                    <div className="bg-white w-full ">
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
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="comment"
                          className="block text-gray-700 font-bold mb-2"
                        >
                          De 1 a 5, quão bom foi o atendimento?
                          <div className="p-4 flex justify-center flex-row ">
                            <div className="flex items-center mb-4">
                              <input
                                type="radio"
                                id="rating1"
                                name="rating"
                                value="1"
                                checked={rating === "1"}
                                onChange={handleRatingChange}
                                className="mr-2 w-2 h-2"
                              />
                              <label htmlFor="rating1">1</label>
                            </div>
                            <div className="flex items-center mb-4">
                              <input
                                type="radio"
                                id="rating2"
                                name="rating"
                                value="2"
                                checked={rating === "2"}
                                onChange={handleRatingChange}
                                className="mr-2 w-2 h-2"
                              />
                              <label htmlFor="rating2">2</label>
                            </div>
                            <div className="flex items-center mb-4">
                              <input
                                type="radio"
                                id="rating3"
                                name="rating"
                                value="3"
                                checked={rating === "3"}
                                onChange={handleRatingChange}
                                className="mr-2 w-2 h-2"
                              />
                              <label htmlFor="rating3">3</label>
                            </div>
                            <div className="flex items-center mb-4">
                              <input
                                type="radio"
                                id="rating4"
                                name="rating"
                                value="4"
                                checked={rating === "4"}
                                onChange={handleRatingChange}
                                className="mr-2 w-2 h-2"
                              />
                              <label htmlFor="rating4">4</label>
                            </div>
                            <div className="flex items-center mb-4">
                              <input
                                type="radio"
                                id="rating5"
                                name="rating"
                                value="5"
                                checked={rating === "5"}
                                onChange={handleRatingChange}
                                className="mr-2 w-2 h-2"
                              />
                              <label htmlFor="rating5">5</label>
                            </div>
                          </div>
                        </label>
                      </div>
                      <div className="flex justify-between">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="button"
                          onClick={closeModal}
                        >
                          Fechar
                        </button>
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline"
                          type="submit"
                          onClick={submitForm}
                        >
                          Enviar
                        </button>
                      </div>
                    </div>
                  </form>
                </Modal>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
