import React, { useState, useEffect } from "react";
import "./styleAppointment.css";
import jwt_decode from "jwt-decode";
import { getAppointments } from "../../../../../services/integrations/appointment";
import {
  getUser,
  getVeterinary,
} from "../../../../../services/integrations/user";
import {
  recusarAppointments,
  aceitadoAppointments,
} from "../../../../../services/integrations/appointment";
import "react-toastify/dist/ReactToastify.css";
import Notifications from "../../../../../utils/Notifications";

export const AppointmentAsk = () => {
  const [pedidos, setPedido] = useState([]);

  const [tutorStatus, setTutorStatus] = useState("hidden");
  const [buttonStatus, setButtonStatus] = useState("flex");
  const [buttonAceitar, setButtonAceitar] = useState("flex");

  const [showVet, setShowVet] = useState("hidden");
  const [showClient, setShowClient] = useState("flex");

  const [divNothing, setDivNothing] = useState("hidden");
  const [duracao, setDuracao] = useState(0);
  const [preco, setPreco] = useState(0.0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("__user_JWT");
        const decoded = jwt_decode(token);
        let appoint = await getappo(decoded.id);
        if (appoint !== undefined && appoint != null) {
          let filteredAppointments = appoint.filter(
            (appointment) => appointment.status == "WAITING_CONFIRMATION"
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

              if (
                typeof idadeEmAnos === "number" &&
                Number.isInteger(idadeEmAnos)
              ) {
                let anosIdade = idadeEmAnos.toString();
                if (anosIdade == -1) idadeString = 0 + " anos";
              } else {
                const idadeEmMeses = idadeEmAnos * 12;
                idadeString = idadeEmMeses.toString() + " meses";
              }

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
                idade: idadeString ? idadeString : "Não possui idade",
                dataConsulta: consultaDataFormatada,
                horario: horario,
                descricao: app.description,
                vetName: vet.personName,
                vetPhone: vet.cellphoneNumber,
                vetPhoto: vet.profilePhoto,
              };

              return finalArray;
            })
          );
          setDivNothing("hidden");
          setPedido(appoints.reverse());
        } else {
          setDivNothing("flex");
          setPedido([]);
        }
        if (!decoded.isVet) {
          setButtonAceitar("hidden");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const getPet = async (idPet, arrayPet) => {
    const filteredPets = arrayPet.filter((pet) => pet.id === idPet);
    return filteredPets[0];
  };

  const recusarAppointment = async (idAppointment) => {
    await Notifications.confirmOrCancel(
      "Deseja mesmo recusar a consulta?",
      async (result) => {
        if (result.isConfirmed) {
          const jsonNothing = {
            duration: 0,
            price: 0.0,
          };

          const { response } = await recusarAppointments(
            idAppointment,
            jsonNothing
          );
          if (response.message === "Consulta recusada") {
            await Notifications.success("Consulta recusada");
          } else if (
            response.error ===
            "Você não tem permissão para fazer essa alteração"
          ) {
            await Notifications.error(response.error);
          } else {
            await Notifications.error(
              "Não foi possível realizar a ação",
              "Tente novamente"
            );
          }
          window.location.reload();
          return response;
        }
      }
    );
  };

  const marcarAppointment = async (idAppointment) => {
    await Notifications.confirmOrCancel(
      "Deseja marcar a consulta?",
      async (result) => {
        if (result.isConfirmed) {
          const jsonAppointment = {
            duration: parseFloat(duracao),
            price: parseFloat(preco),
          };
          const { response } = await aceitadoAppointments(
            idAppointment,
            jsonAppointment
          );
          if (response.message == "Consulta aceita") {
            await Notifications.success("Consulta aceita");
          } else {
            await Notifications.error(
              "Não foi possível realizar a ação",
              "Tente novamente"
            );
          }
          window.location.reload();
          return response;
        }
      }
    );
  };

  const getappo = async (idPerson) => {
    const token = localStorage.getItem("__user_JWT");
    const decoded = jwt_decode(token);
    let allAboutIt;
    if (decoded.isVet) {
      allAboutIt = await getAppointments(idPerson);
    } else {
      let person = await getUser(idPerson);
      allAboutIt = person;
    }
    if (
      allAboutIt.response ===
      "Não foram encontrados registros no Banco de Dados"
    ) {
      return [];
    } else {
      return allAboutIt.response.user.Appointments;
    }
  };

  const getclient = async (idPerson) => {
    let allAboutIt = await getUser(idPerson);
    if (
      allAboutIt.response ===
      "Não foram encontrados registros no Banco de Dados"
    ) {
      return [];
    } else {
      return allAboutIt.response.user;
    }
  };

  const getvet = async (idPerson) => {
    let allAboutIt = await getVeterinary(idPerson);
    if (
      allAboutIt.response ===
      "Não foram encontrados registros no Banco de Dados"
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

  const handleClick = () => {
    setTutorStatus("flex");
    setButtonStatus("hidden");
  };

  const handleClickAgain = () => {
    setTutorStatus("hidden");
    setButtonStatus("flex");
  };

  function formatarPreco(event) {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/[^0-9.,]/g, "");
    if (inputValue.length > 6) inputValue = inputValue.substr(0, 6);
    if (!inputValue.includes(",") && !inputValue.includes(".")) {
      inputValue = inputValue.replace(/(\d{3})(\d{2})/, "$1,$2");
    }

    setPreco(inputValue);
  }

  useEffect(() => {
    const token = localStorage.getItem("__user_JWT");
    const decoded = jwt_decode(token);

    if (decoded.isVet) {
      setShowVet("hidden");
      setShowClient("flex");
    } else {
      setShowVet("flex");
      setShowClient("hidden");
    }
    // setPedido([
    //     {
    //       imagemPet: "https://i.pinimg.com/564x/d6/f8/50/d6f850459ccd0a00dd65ca3309cb3d7c.jpg",
    //       donoImg: "https://www.portaldoanimal.org/wp-content/uploads/2019/02/gatinha-pastor-alemao2-6.jpg",
    //       dono: "algebra",
    //       telefone: "0114002-8922",
    //       nomePet: "Rex",
    //       sexo: "Masculino",
    //       especie: "Cachorro",
    //       tamanho: "Médio",
    //       idade: "4 anos",
    //       dataConsulta: "2023-05-10",
    //       horario: "14:00",
    //       descricao: "Exame de rotina",
    //     }
    //   ]);
  }, []);

  return (
    <section>
      <div className="w-full flex flex-col gap-3">
        <div className={`${divNothing}`}>Nenhuma consulta a ser aceita</div>
        {pedidos.map((pedido) => {
          return (
            <div
              key={pedido.id}
              className="border-none sm:border-solid border w-full rounded-3xl border-black flex flex-col p-10"
            >
              <div className="flex flex-row items-center md:content-center md:text-center text-4xl gap-4">
                <img
                  className="PetImage"
                  src={pedido.imagemPet}
                  alt="Imagem do pet"
                />
                <h2 className="font-normal flex md:justify-center sm:justify-start font-sans">
                  {pedido.nomePet}
                </h2>
              </div>
              <div className="flex md:justify-between pt-3 mb-8">
                <div className="flex flex-col justify-start w-full h-fit sm:w-1/3 gap-2">
                  <div>
                    <label className="flex flex-col text-2xl text-[#A9A9A9]">
                      Nome
                      <input
                        type="text"
                        disabled
                        placeholder={pedido.nomePet}
                        className="bg-transparent placeholder:text-gray-400  h-fit placeholder:text-3xl border-none text-3xl "
                      />
                    </label>
                  </div>

                  <div>
                    <label className="flex flex-col text-2xl text-[#A9A9A9]">
                      Tamanho
                      <input
                        type="text"
                        disabled
                        placeholder={
                          pedido.tamanho == "BIG"
                            ? "Grande"
                            : pedido.tamanho == "SMALL"
                            ? "Pequeno"
                            : "Médio"
                        }
                        className="bg-transparent placeholder:text-gray-400 h-fit placeholder:text-3xl border-none text-3xl "
                      />
                    </label>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-col justify-start content-center w-full gap-2 h-fit sm:w-1/3">
                  <div className="w-full">
                    <label className="flex flex-col text-2xl text-[#A9A9A9]">
                      Sexo
                      <input
                        type="text"
                        disabled
                        placeholder={pedido.sexo}
                        className="bg-transparent placeholder:text-gray-400 h-fit placeholder:text-3xl border-none text-3xl "
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
                        className="bg-transparent placeholder:text-gray-400 h-fit placeholder:text-3xl border-none text-3xl "
                      />
                    </label>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-col justify-start content-center w-full sm:w-1/3">
                  <div className="w-full">
                    <label className="flex flex-col text-2xl text-[#A9A9A9]">
                      Espécie
                      <input
                        type="text"
                        disabled
                        placeholder={pedido.especie}
                        className="bg-transparent placeholder:text-gray-400 h-fit placeholder:text-3xl border-none text-3xl "
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className={`${showClient} flex-col`}>
                <div
                  className={`${tutorStatus} flex-row items-center content-center text-center text-5xl gap-4`}
                >
                  <img
                    className="PetImage"
                    src={pedido.donoImg}
                    alt="Imagem do pet"
                  />
                  <h2 className="font-norma flex justify-center sm:justify-start font-sans">
                    {pedido.dono}
                  </h2>
                </div>
                <div className="flex flex-col sm:flex-row justify-between pr-20 ">
                  <div
                    className={`${tutorStatus} flex-row justify-start w-full`}
                  >
                    <div>
                      <label className="flex flex-col text-2xl text-[#A9A9A9]">
                        Nome
                        <input
                          type="text"
                          disabled
                          placeholder={pedido.dono}
                          className="bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl "
                        />
                      </label>
                    </div>

                    <div>
                      <label className="flex flex-col text-2xl text-[#A9A9A9]">
                        Telefone
                        <input
                          type="text"
                          disabled
                          placeholder={pedido.telefone}
                          className="bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl "
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${showVet} flex-col`}>
                <div
                  className={`${tutorStatus} flex-row items-center content-center text-center text-4xl gap-4`}
                >
                  <img
                    className="PetImage"
                    src={pedido.vetPhoto}
                    alt="Imagem do pet"
                  />
                  <h2 className="font-normal flex justify-center sm:justify-start font-sans ">
                    {pedido.vetName}
                  </h2>
                </div>
                <div className="flex flex-col sm:flex-row justify-between pt-3 pb-8">
                  <div
                    className={`${tutorStatus} flex-row justify-start w-full`}
                  >
                    <div>
                      <label className="flex flex-col text-2xl text-[#A9A9A9]">
                        Nome
                        <input
                          type="text"
                          disabled
                          placeholder={pedido.vetName}
                          className="bg-transparent placeholder:text-gray-400 h-fit placeholder:text-3xl border-none text-3xl "
                        />
                      </label>
                    </div>

                    <div>
                      <label className="flex flex-col text-2xl text-[#A9A9A9]">
                        Telefone
                        <input
                          type="text"
                          disabled
                          placeholder={pedido.vetPhone}
                          className="bg-transparent placeholder:text-gray-400 h-fit placeholder:text-3xl border-none text-3xl "
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="font-normal  flex justify-center sm:justify-start font-sans text-3xl mb-3 ">
                Informações da consulta{" "}
              </h2>
              <div className="flex flex-col gap-2 justify-between">
                <div className="flex flex-row justify-start w-full sm:w-full ">
                  <div className="w-1/2">
                    <label className="flex flex-col text-2xl text-[#A9A9A9] gap-0">
                      Data
                      <input
                        type="text"
                        disabled
                        placeholder={pedido.dataConsulta}
                        className="bg-transparent placeholder:text-gray-400 w-full h-fit placeholder:text-3xl border-none text-3xl "
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
                        className="bg-transparent placeholder:text-gray-400 h-fit placeholder:text-3xl border-none text-3xl "
                      />
                    </label>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col justify-start content-center w-full">
                  <div>
                    <label className="flex flex-col text-2xl text-[#A9A9A9]">
                      Descrição
                      <p className="bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-2xl ">
                        {pedido.descricao}
                      </p>
                    </label>
                  </div>
                </div>
              </div>
              <span className={`${buttonAceitar} justify-center w-full pl-4`}>
                <div className={`${tutorStatus} flex-col mb-2 text-3xl pt-5`}>
                  <h2>Confirmar consulta</h2>
                  <div className="w-full flex justify-center gap-5 flex-col">
                    <label className="flex flex-col justify-center text-xl text-[#A9A9A9] w-full pt-5">
                      Duração
                      <input
                        type="time"
                        id="duracao"
                        name="duracao"
                        min="00:01"
                        className="w-full text-2xl pl-2"
                        defaultValue={duracao}
                        onChange={(e) => {
                          const time = e.target.value.split(":");
                          const hours = parseInt(time[0]);
                          const minutes = parseInt(time[1]);
                          const totalMinutes = hours * 60 + minutes;
                          setDuracao(totalMinutes);
                        }}
                      />
                    </label>
                    <label className="flex flex-col justify-center text-xl text-[#A9A9A9] w-full">
                      Valor
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-2xl align-bottom ">R$</span>
                        <input
                          type="text"
                          className="min-w-full text-2xl mr-8 "
                          id="preco"
                          value={preco}
                          onChange={formatarPreco}
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </span>
              <div className="flex flex-row justify-between pt-5">
                <span className={`flex justify-start`}>
                  <button
                    className={`bg-[#F9DEDC] ${buttonStatus} justify-center items-center content-center text-[#410E0B] text-center first-letter w-40 md:w-56 h-14 border rounded-full text-xl font-normal mr-20`}
                    onClick={() => recusarAppointment(pedido.idAppoint)}
                  >
                    Recusar
                  </button>

                  <button
                    className={`bg-[#F9DEDC] ${tutorStatus} justify-center items-center content-center text-[#410E0B] text-center w-40 md:w-56 h-14 mt-10 pl-3 pr-3 border rounded-full text-xl font-normal mr-20`}
                    onClick={handleClickAgain}
                  >
                    Ver menos informações
                  </button>
                </span>

                <span className={`flex justify-end`}>
                  <button
                    className={`bg-[#9ED1B7] ${buttonStatus} justify-center items-center content-center text-[#41564B] text-center w-40 md:w-60 h-14 border rounded-full text-xl font-normal `}
                    onClick={handleClick}
                  >
                    Ver mais informações
                  </button>

                  <span className={`${buttonAceitar}`}>
                    <button
                      className={`bg-[#9ED1B7] ${tutorStatus} justify-center items-center content-center text-[#41564B] text-center w-40 md:w-56 h-14 mt-10 border rounded-full text-xl font-normal mr-20`}
                      onClick={() => marcarAppointment(pedido.idAppoint)}
                    >
                      Marcar
                    </button>
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
