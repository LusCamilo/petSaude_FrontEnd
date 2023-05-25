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
  const { register, handleSubmit } = useForm();
  const [vets, setVets] = useState([]);
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

  // async function filterVets(data, filtro = "city") {
  //   try {
  //     let filteredVets = [];

  //     if (filtro !== "city") {
  //       const response = await getUsers(data.search, filtro);
  //       if (
  //         response.response ==
  //           "Nenhum veterinário atende aos filtros de pesquisa" ||
  //         response == undefined
  //       ) {
  //         filteredVets = shuffleArray([]);
  //       } else {
  //         filteredVets = response.response;
  //       }
  //     } else {
  //       filteredVets = await getVetsByCity(data.search);
  //     }
  //     const vets = shuffleArray(filteredVets);
  //     setVets(vets);
  //   } catch (error) {
  //     console.error("Erro ao filtrar veterinários:", error);
  //   }
  // }

  // useEffect(() => {
  //   // Chamada inicial para carregar todos os veterinários
  //   filterVets({ search: '', filtro: '' }, '');
  // }, []);

  // function shuffleArray(array) {
  // 	for (let i = array.length - 1; i > 0; i--) {
  // 		const j = Math.floor(Math.random() * (i + 1));
  // 		[array[i], array[j]] = [array[j], array[i]];
  // 	}
  // 	return array;
  // }
  //     if(1 == 1){
  //       let json = Object.values(result);
  //       let arrayEmbaralhado = shuffleArray(json);
  //       setVets(arrayEmbaralhado);
  //     } else {
  //       if (filtro != "city") {
  //         let response = await getUsers(data.search, ondeProcurar);
  //         let result = response.response;
  //         let json;
  //         if (result === "Nenhum veterinário atende aos filtros de pesquisa") {
  //           json = [];
  //           showToastMessage();
  //         }
  //        }  else if (0 == 0) {
  //           json = result.filter(
  //             (item) =>
  //               item.personName
  //                 .toLowerCase()
  //                 .includes(data.search.toLowerCase()) ||
  //               item.userName.toLowerCase().includes(data.search.toLowerCase())
  //           );
  //         }
  //         setUmCorteRapidao("");
  //         let arrayEmbaralhado = shuffleArray(json);
  //         setVets(arrayEmbaralhado);
  //       } else {
  //         let response = await getAllVets();
  //         let procurarCidade = data.search;
  //         let result = response.response;
  //         let json = Object.values(result);
  //         if (procurarCidade == "") {
  //           setVets(response);
  //         } else {
  //           let jsonFinal = await Promise.all(
  //             json.map(async (item) => {
  //               let response = await axios.get(
  //                 `https://viacep.com.br/ws/${item.Address.cep}/json/`
  //               );
  //               let pessoa = response.data.localidade;
  //               return { item, pessoa };
  //             })
  //           );}
  //         }

  async function handleSearchChange(event) {
    const { value } = event.target
    setInputSearch(value)
  }




  //   "id": 1,
  //   "personName": "Deco Alves",
  //   "userName": "Dedeco",
  //   "cpf": "123.123.123-12",
  //   "rg": "12.345.678-90",
  //   "profilePhoto": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  //   "profileBannerPhoto": "https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  //   "email": "dedeco@gmail.com",
  //   "password": "$2b$10$bDg6EnMPn43UBH9pk8PGAOS9vBqsCSWGRpgSBjO4UTUnppa5q/S2K",
  //   "occupationArea": "Clínica",
  //   "formation": "Veterinário",
  //   "institution": "UNESP",
  //   "crmv": "1927",
  //   "formationDate": "2017-02-03T00:00:00.000Z",
  //   "startActingDate": "2017-04-03T00:00:00.000Z",
  //   "phoneNumber": "1234-5678",
  //   "cellphoneNumber": "(11) 23456-7890",
  //   "isVet": true,
  //   "biography": null,
  //   "addressId": 3,
  //   "Address": {
  //     "id": 3,
  //     "cep": "06126060",
  //     "complement": "Casa",
  //     "number": "undefined"
  //   },
  //   "VeterinaryEspecialities": [
  //     {
  //       "id": 1,
  //       "specialitiesId": 1,
  //       "veterinaryId": 1,
  //       "specialities": {
  //         "id": 1,
  //         "name": "Vacina"
  //       }
  //     }
  //   ],
  //   "PetSpecieVeterinary": [
  //     {
  //       "id": 1,
  //       "petSpecieId": 2,
  //       "veterinaryId": 1,
  //       "PetSpecie": {
  //         "id": 2,
  //         "name": "Gato"
  //       }
  //     },
  //     {
  //       "id": 26,
  //       "petSpecieId": 6,
  //       "veterinaryId": 1,
  //       "PetSpecie": {
  //         "id": 6,
  //         "name": "Mula"
  //       }
  //     },
  //     {
  //       "id": 27,
  //       "petSpecieId": 5,
  //       "veterinaryId": 1,
  //       "PetSpecie": {
  //         "id": 5,
  //         "name": "Planta"
  //       }
  //     },
  //     {
  //       "id": 45,
  //       "petSpecieId": 1,
  //       "veterinaryId": 1,
  //       "PetSpecie": {
  //         "id": 1,
  //         "name": "Cachorro"
  //       }
  //     }
  //   ],
  //   "Appointments": [
  //     {
  //       "id": 1,
  //       "description": "lorem ipsum",
  //       "status": "DECLINED",
  //       "date": "2023-05-14T00:00:00.000Z",
  //       "startsAt": "1970-01-01T13:00:00.000Z",
  //       "duration": 0,
  //       "price": "0",
  //       "clientId": 2,
  //       "veterinaryId": 1,
  //       "petId": 2
  //     },
  //     {
  //       "id": 16,
  //       "description": "Patinho ta com dor de barriga",
  //       "status": "SCHEDULED",
  //       "date": "2023-05-21T00:00:00.000Z",
  //       "startsAt": "1970-01-01T15:30:00.000Z",
  //       "duration": 90,
  //       "price": "5000",
  //       "clientId": 2,
  //       "veterinaryId": 1,
  //       "petId": 2
  //     },
  //     {
  //       "id": 24,
  //       "description": "dojhnirbhihuuedgsfuagfyekygeartjghfxgawfghre",
  //       "status": "DECLINED",
  //       "date": "2023-05-18T00:00:00.000Z",
  //       "startsAt": "1970-01-01T14:50:00.000Z",
  //       "duration": 0,
  //       "price": "0",
  //       "clientId": 2,
  //       "veterinaryId": 1,
  //       "petId": 2
  //     },
  //     {
  //       "id": 36,
  //       "description": "Picada de abelha",
  //       "status": "CONCLUDED",
  //       "date": "2023-05-19T00:00:00.000Z",
  //       "startsAt": "1970-01-01T12:30:00.000Z",
  //       "duration": 90,
  //       "price": "549.99",
  //       "clientId": 14,
  //       "veterinaryId": 1,
  //       "petId": 19
  //     },
  //     {
  //       "id": 65,
  //       "description": "k.hlkhlkhjklhkjhlkhlkhlkhljk",
  //       "status": "CONCLUDED",
  //       "date": "2023-06-03T00:00:00.000Z",
  //       "startsAt": "1970-01-01T13:50:00.000Z",
  //       "duration": 0,
  //       "price": "0",
  //       "clientId": 15,
  //       "veterinaryId": 1,
  //       "petId": 20
  //     },
  //     {
  //       "id": 66,
  //       "description": "dj",
  //       "status": "WAITING_CONFIRMATION",
  //       "date": "2113-06-09T00:00:00.000Z",
  //       "startsAt": "1970-01-01T13:50:00.000Z",
  //       "duration": null,
  //       "price": null,
  //       "clientId": 15,
  //       "veterinaryId": 1,
  //       "petId": 20
  //     },
  //     {
  //       "id": 67,
  //       "description": "É uma das músicas infantis mais polêmicas em português, já que incentiva os maus-tratos aos animais. Contudo, atualmente já é comum cantarem nas escolas e nos programas de TV uma versão revisada que diz: \"Não atire o pau no gato, porque isso não se faz!\".",
  //       "status": "SCHEDULED",
  //       "date": "2023-06-11T00:00:00.000Z",
  //       "startsAt": "1970-01-01T13:53:00.000Z",
  //       "duration": 760,
  //       "price": "100",
  //       "clientId": 15,
  //       "veterinaryId": 1,
  //       "petId": 20
  //     },
  //     {
  //       "id": 68,
  //       "description": "É uma das músicas infantis mais polêmicas em português, já que incentiva os maus-tratos aos animais. Contudo, atualmente já é comum cantarem nas escolas e nos programas de TV uma versão revisada que diz: \"Não atire o pau no gato, porque isso não se faz!\".",
  //       "status": "WAITING_CONFIRMATION",
  //       "date": "2023-05-27T00:00:00.000Z",
  //       "startsAt": "1970-01-01T10:50:00.000Z",
  //       "duration": null,
  //       "price": null,
  //       "clientId": 15,
  //       "veterinaryId": 1,
  //       "petId": 20
  //     }
  //   ]
  // },

  async function getVets() {



    const response = await getAllVets()
    setVets(response.response)



  }

  useEffect(() => {
    getVets()
  }, [])


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
              // onChange={handleSubmit(onSearch)}
              className="w-96 flex pt-3 items-center content-center align-middle"
            >
              <input
                className="xl:w-full h-14 text-2xl flex items-center content-center"
                placeholder="Pesquisar especialistas"
                defaultValue={inputSearch}
                onChange={handleSearchChange}
              />
            </form>
          </div>
          <div className="flex justify-center">
            <div
              className="flex justify-between my-5 w-full items-center"
              onClick={() => { }}
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
          {vets.map((vet) => (
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
          ))}
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
