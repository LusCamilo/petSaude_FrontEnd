import React, { useState, useEffect } from "react";
import { CardProfessionals } from "./resource/CardProfessionals";
import { Footer } from "./resource/Footer";
import { HeaderInfo } from "./resource/HeaderInfo";
import search from "../../assets/svg/lupa.svg";
import {
  getUsers,
  getAllVets,
  getVet,
} from "../../services/integrations/filters";
import { useForm } from "react-hook-form";
import "./radixSearch.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SearchProfessional = () => {
  const [vets, setVets] = useState(null);
  const [inputSearch, setInputSearch] = useState(localStorage.getItem("__Vet_Search") || "");
  const [filter, setFilter] = useState(localStorage.getItem("__Vet_WhenSearch") || " ");

  async function getVetsByCity(city) {
    try {



    } catch (error) {
      console.error("Erro ao buscar veterinários por cidade:", error);
      return [];
    }
  }

  async function handleInputSearch(event) {
    const { value } = event.target;
    setInputSearch(value);
    localStorage.setItem("__Vet_Search", value)
    await getVets(value);
  }

  async function getVets(searchValue) {
    const response = await getUsers(searchValue, filter);
    setVets(response.response);
  }

  useEffect(() => {
    const initialSearch = localStorage.getItem("__Vet_Search") || "";
    setInputSearch(initialSearch);
    getVets(initialSearch);
  }, [filter]);



  return (
    <>
      <HeaderInfo
        title="Profissionais"
        description="Temos os melhores e mais confiaveis profissionais em nosso site."
      />
      <div className={`p-2 md:p-20 container mx-auto px-4 gap-10 min-h-screen`}>
        <div className="flex flex-col w-full pr-5">
          <div className="flex flex-row gap-2 w-full border-2 border-black rounded-lg items-center align-middle content-center">
            <img className="pl-2 w-12 text-center" src={search} />
            <form
              className="w-96 flex pt-3 items-center content-center align-middle"
            >
              <input
                className="xl:w-full h-14 text-2xl flex items-center content-center"
                placeholder="Pesquisar especialistas"
                defaultValue={inputSearch}
                onChange={handleInputSearch}
              />
            </form>
          </div>
          <div className="flex justify-center">
            <div
              className="flex justify-between my-5 w-full items-center"
            >
              <div className="flex items-center cursor-pointer border-2 w-72 h-10 p-7 justify-center rounded-lg" onClick={() => {
                setFilter("userName");
                localStorage.setItem("__Vet_WhenSearch", "userName")
              }}>
                <label
                  className="w-full cursor-pointer flex items-center text-base justify-around"
                  htmlFor="r1"
                >
                  <div className="h-6 w-6 rounded-full border-gray-400 border-solid border hover:bg-black"></div>
                  Procurar por nome
                </label>
              </div>
              <div className="flex items-center cursor-pointer border-2 w-80 h-2 p-7 justify-center rounded-lg" onClick={() => {
                setFilter("city");
                localStorage.setItem("__Vet_WhenSearch", "city")
              }}>
                <label
                  className="w-full cursor-pointer flex items-center text-base justify-around"
                  htmlFor="r2"
                >
                  <div className="h-6 w-6 rounded-full border-gray-400 border-solid border hover:bg-black"></div>
                  Procurar por cidade
                </label>
              </div>
              <div className="flex items-center cursor-pointer border-2 w-80 h-2 p-7 justify-center rounded-lg" onClick={() => {
                setFilter("speciality");
                localStorage.setItem("__Vet_WhenSearch", "speciality")
              }}>
                <label
                  className="w-full cursor-pointer flex items-center text-base justify-around"
                  htmlFor="r3"
                >
                  <div className="h-6 w-6 rounded-full border-gray-400 border-solid border hover:bg-black"></div>
                  Procurar por Especialização
                </label>
              </div>
              <div className="flex items-center cursor-pointers border-2 w-80 h-2 p-7 justify-center rounded-lg" onClick={() => {
                setFilter("animal");
                localStorage.setItem("__Vet_WhenSearch", "animal")
              }}>
                <label
                  className="w-full cursor-pointer flex items-center text-base justify-around"
                  htmlFor="r4"
                >
                  <div className="h-6 w-6 rounded-full border-gray-400 border-solid border hover:bg-black"></div>
                  Procurar por animais
                </label>
              </div>
            </div>
          </div>
        </div>
        <div>
          {vets !== null ? (
            vets != 'Nenhum veterinário atende aos filtros de pesquisa' ? (
              vets.map((vet) => (
                <CardProfessionals
                  key={vet.id}
                  id={vet.id}
                  userName={vet.userName}
                  nome={vet.personName}
                  cep={vet.Address.cep}
                  formacao={vet.formation}
                  instituicao={vet.institution}
                  image={vet.profilePhoto}
                  dateStart={vet.startActingDate}
                  animal = {vet.PetSpecieVeterinary}
                  specialties = {vet.VeterinaryEspecialities}
                />
              ))
            ) : (
              <span>Nenhum veterinário encontrado.</span>
            )
          ) : (
            <span>Carregando...</span>
          )}
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};
