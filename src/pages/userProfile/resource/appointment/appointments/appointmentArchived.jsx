import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./styleAppointment.css";
import jwt_decode from "jwt-decode";
import { getAppointments } from "../../../../../services/integrations/appointment";
import {
  getUser,
  getVeterinary,
} from "../../../../../services/integrations/user";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import { AppointmentArchivedCard } from "./appointmentArchivedCard";

export const AppointmentArchived = (props) => {
  const [pedidos, setPedido] = useState([]);
  const [quant, setQuant] = useState({ Finalizado: 0, Cancelado: 0, Recusadas: 0 });
  const [isVet, setisVet] = useState("hidden");
  const [buttonAceitar, setButtonAceitar] = useState("flex");
  const [divNothing, setDivNothing] = useState("hidden");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("__user_JWT");
        const decoded = jwt_decode(token);
        let appoint = await getappo(decoded.id);
        if (!decoded.isVet) {
          setisVet("flex");
        }
        if (appoint !== undefined && appoint !== null) {
          let filteredAppointments = appoint.filter(
            (appointment) =>
              appointment.status == "CANCELED" ||
              appointment.status == "CONCLUDED" ||
              appointment.status == "DECLINED"
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

              let statusTraduzido;
              if (app.status == "CONCLUDED") statusTraduzido = "Finalizado";
              else if (app.status == "DECLINED") statusTraduzido = "Recusado"
              else statusTraduzido = "Cancelado";

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
                idadeString = idadeEmAnos.toString() + " anos";
              } else {
                const idadeEmMeses = idadeEmAnos * 12;
                idadeString = idadeEmMeses.toString() + " meses";
              }

              const formattedDuration = formatDuration(app.duration);
              let height
              if (arrayPet.petSize == "BIG") {
                height = "Grande"
              } else if (arrayPet.petSize == "SMALL") {
                height = "Pequeno"
              } else {
                height = "Médio";
              }

              const finalArray = {
                idAppoint: app.id,
                imagemPet: arrayPet.photo,
                donoImg: client.profilePhoto,
                dono: client.personName,
                donoId: client.id,
                telefone: client.cellphoneNumber,
                nomePet: arrayPet.name,
                sexo: arrayPet.petGender,
                especie: arrayPet.petSpecie.name,
                tamanho: height,
                idade: idadeString ? idadeString : "Não possui idade",
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

        if (!decoded.isVet) {
          setButtonAceitar("hidden");
        }
      } catch (error) { }
    };
    fetchData();
  }, []);

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
    if (decoded.isVet === true) {
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

  useEffect(() => {
    let cancelada = 0;
    let finalizar = 0;
    let recusada = 0;

    pedidos.forEach((pedir) => {
      if (pedir.estado == "CANCELED") {
        cancelada += 1;
      } else if (pedir.estado == "CONCLUDED") {
        finalizar += 1;
      } else if (pedir.estado == "DECLINED"){
        recusada += 1;
      }
    });

    setQuant((prevQuant) => ({
      ...prevQuant,
      Finalizado: finalizar,
      Cancelado: cancelada,
      Recusadas: recusada
    }));
  }, [pedidos]);

  return (
    <section className="w-full">
      <div className="flex flex-row gap-3 justify-between">
        <div className="flex flex-col items-center">
          <div className="flex flex-row gap-2">
            <div className=" w-10 h-10 rounded-md bg-[#09738A66]"></div>
            <h2>Consultas Finalizadas</h2>{" "}
          </div>
          <div className="flex flex-row gap-2">
            <div className="text-[#A9A9A9] text-base">Quantidade:</div>{" "}
            <div>{quant.Finalizado}</div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-row gap-2">
            <div className="w-10 h-10 rounded-md bg-[#F1EAC6]"></div>
            <h2>Consultas Canceladas</h2>{" "}
          </div>
          <div className="flex flex-row gap-2">
            <div className="text-[1#A9A9A9] text-base">Quantidade:</div>{" "}
            <div>{quant.Cancelado}</div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-row gap-2">
            <h2>Consultas Recusadas</h2>{" "}
            <div className="w-10 h-10 rounded-md bg-[#F9DEDC]"></div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="text-[#A9A9A9] text-base">Quantidade:</div>{" "}
            <div>{quant.Recusadas}</div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-3">
      {/* 09738A66 */}
        {pedidos.map((pedido) => {
          const cor =
            pedido.estado == "CONCLUDED" ? "bg-[#09738A66]" : 
            pedido.estado == "DECLINED" ? "bg-[#F9DEDC]" :
            "bg-[#F1EAC6]";
           // pedido.estado === "CONCLUDED" ? "bg-[#09738A66]" : "bg-[#F1EAC6]";
          return (
            <AppointmentArchivedCard
              key={pedido.idAppoint}
              idAppoint={pedido.idAppoint}
              cor={cor}
              imagemPet={pedido.imagemPet}
              donoImg={pedido.donoImg}
              donoId={pedido.donoId}
              telefone={pedido.telefone}
              nomePet={pedido.nomePet}
              sexo={pedido.sexo}
              especie={pedido.especie}
              tamanho={pedido.tamanho}
              idade={pedido.idade}
              dataConsulta={pedido.dataConsulta}
              horario={pedido.horario}
              descricao={pedido.descricao}
              durationor={pedido.duration}
              vetId={pedido.vetId}
              vetName={pedido.vetName}
              vetPhone={pedido.vetPhone}
              vetPhoto={pedido.vetPhoto}
              estado={pedido.estado}
              status={pedido.status}
              isVet={isVet}
            />
          );
        })}
      </div>
    </section>
  );
};
