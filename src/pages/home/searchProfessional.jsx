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
  const [inputSearch, setInputSearch] = useState(
    localStorage.getItem("__Vet_Search") || ""
  );

  const [ondeProcurar, setOndeProcurar] = useState(
    localStorage.getItem("__Vet_WhenSearch") || " "
  );
  const [selectedOption, setSelectedOption] = useState("userName");
  const [filtro, setFiltro] = useState("userName");

  const [umCorteRapidao, setUmCorteRapidao] = useState("");

  // Função para buscar veterinários com base no filtro de cidade
  const axios = require("axios");

  async function getVetsByCity(city) {
    try {
      const { response } = await getAllVets(); // Função que busca todos os veterinários

      const vetsWithCity = await Promise.all(
        response.map(async (vet) => {
          const cepResponse = await axios.get(
            `https://viacep.com.br/ws/${vet.Address.cep}/json/`
          );
          const vetCity = cepResponse.data.localidade;
          return { ...vet, cidade: vetCity };
        })
      );

      const filteredVets = vetsWithCity.filter((vet) =>
        vet.cidade.includes(city)
      );

      return filteredVets;
    } catch (error) {
      console.error("Erro ao buscar veterinários por cidade:", error);
      return [];
    }
  }

  function handleInputSearch(event) {
    const { value } = event.target
    setInputSearch(value)
    console.log(inputSearch);
  }

  async function getVets() {
    const response = await getUsers(inputSearch, filtro);
    setVets(response.response);
  }
  
  useEffect(() => {
    getVets();
  }, [getVets()]);
  
  

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
              <div className="flex items-center cursor-pointer border-2 w-72 h-10 p-7 justify-center rounded-lg">
                <label
                  className="w-full cursor-pointer flex items-center text-base justify-around"
                  htmlFor="r1"
                  onClick={() => {
                    console.log("teste");
                    setFiltro("userName");
                    console.log(filtro);
                  }}
                >
                  <div className="h-6 w-6 rounded-full border-gray-400 border-solid border hover:bg-black"></div>
                  Procurar por nome
                </label>
              </div>
              <div className="flex items-center cursor-pointer border-2 w-80 h-2 p-7 justify-center rounded-lg">
                <label
                  className="w-full cursor-pointer flex items-center text-base justify-around"
                  htmlFor="r2"
                  onClick={() => {
                    console.log("teste2");
                    setFiltro("city");
                    console.log(filtro);
                  }}
                >
                  <div className="h-6 w-6 rounded-full border-gray-400 border-solid border hover:bg-black"></div>
                  Procurar por cidade
                </label>
              </div>
              <div className="flex items-center cursor-pointer border-2 w-80 h-2 p-7 justify-center rounded-lg">
                <label
                  className="w-full cursor-pointer flex items-center text-base justify-around"
                  htmlFor="r3"
                  onClick={() => {
                    console.log("teste3");
                    setFiltro("specialities");
                    console.log(filtro);
                  }}
                >
                  <div className="h-6 w-6 rounded-full border-gray-400 border-solid border hover:bg-black"></div>
                  Procurar por Especialização
                </label>
              </div>
              <div className="flex items-center cursor-pointers border-2 w-80 h-2 p-7 justify-center rounded-lg">
                <label
                  className="w-full cursor-pointer flex items-center text-base justify-around"
                  htmlFor="r4"
                  onClick={() => {
                    console.log("teste4");
                    setFiltro("animal");
                    console.log(filtro);
                  }}
                >
                  <div className="h-6 w-6 rounded-full border-gray-400 border-solid border hover:bg-black"></div>
                  Procurar por animais
                </label>
              </div>
            </div>
          </div>
        </div>
        <div>
          {vets !== null && vets.length > 0 ? (
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
                umCorteRapido={umCorteRapidao}
              />
            ))
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
