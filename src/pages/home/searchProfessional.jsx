import React, { useState, useEffect } from "react";
import { CardProfessionals } from "./resource/CardProfessionals";
import { Footer } from "./resource/Footer";
import { HeaderInfo } from "./resource/HeaderInfo";
import search from "../../assets/svg/lupa.svg";
import {
  getUsers,
  getAllVets,

} from "../../services/integrations/filters";
import "./radixSearch.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SearchProfessional = () => {
  const [vets, setVets] = useState(null);
  const [inputSearch, setInputSearch] = useState(localStorage.getItem("__Vet_Search") || "");
  const [filter, setFilter] = useState(localStorage.getItem("__Vet_WhenSearch") || " ");

  async function handleInputSearch(event) {
    const { value } = event.target;
    setInputSearch(value);
    localStorage.setItem("__Vet_Search", value)
    await getVets(value);
  }

  async function getVets(searchValue) {
    if (filter !== "city") {
      const response = await getUsers(searchValue, filter);
      setVets(response.response);
    } else {
      const response = await getAllVets();
      const vets = response.response;
      if (searchValue === "") {
        setVets(vets);
      } else {
        const filteredVets = await Promise.all(
          vets.map(async (vet) => {
            const address = await fetch(`https://viacep.com.br/ws/${vet.Address.cep}/json/`);
            const localidade = await address.json();
            if (localidade.localidade && localidade.localidade.indexOf(searchValue) > -1) {
              return vet;
            }
            return null;
          })
        );

        const filteredVetsArray = filteredVets.filter((vet) => vet !== null);

        setVets(filteredVetsArray.length > 0 ? filteredVetsArray : 'Nenhum veterinário atende aos filtros de pesquisa');
      }
    }
  }


  useEffect(() => {
    const initialSearch = localStorage.getItem("__Vet_Search") || "";
    setInputSearch(initialSearch);
    async function fetchData() {
      await getVets(initialSearch)

    }
    fetchData()


  }, [filter]);

  const renderVets = () => {
    if (vets === null) {
      return <span>Carregando...</span>;
    } else if (vets === 'Nenhum veterinário atende aos filtros de pesquisa') {
      return <span>Nenhum veterinário encontrado.</span>;
    } else {
      const vetIds = new Set();
      const uniqueVets = vets.filter((vet) => {
        if (vetIds.has(vet.id)) {
          return false;
        }
        vetIds.add(vet.id);
        return true;
      });

      return uniqueVets.map((vet) => (
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
          animal={vet.PetSpecieVeterinary}
          specialties={vet.VeterinaryEspecialities}
        />
      ));
    }
  };



  return (
    <>
      <HeaderInfo
        title="Profissionais"
        description="Temos os melhores e mais confiaveis profissionais em nosso site."
      />
      <div className={`p-2 md:p-20 container mx-auto px-4 gap-10 min-h-screen`}>
        <div className="flex flex-col w-full pr-5">
          <div className="flex flex-row gap-2 w-full border-2 border-black rounded-lg items-center align-middle content-center">
            <img className="pl-2 w-12 text-center" src={search} alt={'Search'} />
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
            <div className="flex justify-between my-5 w-full items-center">
              <div
                className={`flex items-center cursor-pointer border-2 w-72 h-10 p-7 justify-center rounded-lg`}
                onClick={() => {
                  setFilter("userName");
                  localStorage.setItem("__Vet_WhenSearch", "userName");
                }}
              >
                <label className="w-full cursor-pointer flex items-center text-base justify-around">
                  <div
                    className={`h-6 w-6 rounded-full border-gray-400 border-solid border hover:bg-black ${filter === "userName" ? "bg-black" : ""
                      }`}
                  ></div>
                  Procurar por nome
                </label>
              </div>
              <div
                className={`flex items-center cursor-pointer border-2 w-80 h-2 p-7 justify-center rounded-lg`}
                onClick={() => {
                  setFilter("city");
                  localStorage.setItem("__Vet_WhenSearch", "city");
                }}
              >
                <label className="w-full cursor-pointer flex items-center text-base justify-around">
                  <div
                    className={`h-6 w-6 rounded-full border-gray-400 border-solid border hover:bg-black ${filter === "city" ? "bg-black" : ""
                      }`}
                  ></div>
                  Procurar por cidade
                </label>
              </div>
              <div
                className={`flex items-center cursor-pointer border-2 w-80 h-2 p-7 justify-center rounded-lg`}
                onClick={() => {
                  setFilter("speciality");
                  localStorage.setItem("__Vet_WhenSearch", "speciality");
                }}
              >
                <label className="w-full cursor-pointer flex items-center text-base justify-around">
                  <div
                    className={`h-6 w-6 rounded-full border-gray-400 border-solid border hover:bg-black ${filter === "speciality" ? "bg-black" : ""
                      }`}
                  ></div>
                  Procurar por Especialização
                </label>
              </div>
              <div
                className={`flex items-center cursor-pointers border-2 w-80 h-2 p-7 justify-center rounded-lg`}
                onClick={() => {
                  setFilter("animal");
                  localStorage.setItem("__Vet_WhenSearch", "animal");
                }}
              >
                <label className="w-full cursor-pointer flex items-center text-base justify-around">
                  <div
                    className={`h-6 w-6 rounded-full border-gray-400 border-solid border hover:bg-black ${filter === "animal" ? "bg-black" : ""
                      }`}
                  ></div>
                  Procurar por animais
                </label>
              </div>
            </div>
          </div>
        </div>
        <div>
          {renderVets()}
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
