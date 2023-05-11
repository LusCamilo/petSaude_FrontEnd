import React from "react";
import { Link } from "react-router-dom";
import Footprint from "../../assets/svg/petPaws.svg";
import Dog from "../../assets/svg/dogAndCat.svg";
import Doctor from "../../assets/svg/medico 1.svg";
import "./css/LandingPage.css";
import Local from "../../assets/svg/localizacao.svg";
import { PetHeader } from "../userProfile/pet/petHeader";
import { FaUserNurse } from "react-icons/fa";
import { GoLocation } from "react-icons/go";

export const LandingPage = () => {
  function handleKeyPress(inputValue, event, whenSearch) {
    if (event.key === "Enter") {
      event.preventDefault(); // evita a renderização da tela
      localStorage.setItem("__Vet_Search", inputValue);
      localStorage.setItem("__Vet_WhenSearch", whenSearch);
      window.open("/home/searchProfessionals", "_self"); // abre uma nova aba
    }
  }

  localStorage.setItem("__Vet_Search", "");

  return (
    <section className="h-screen flex flex-col justify-between overflow-hidden">
      <PetHeader />
      <div className="flex md:flex-row flex-col w-full p-10 md:gap-5 gap-2">
        <label className="relative flex items-center gap-2 border-solid border-black border-[1px] md:py-2 py-1 md:px-4 px-2 rounded-lg md:w-1/2 w-full">
          <FaUserNurse className=" text-black text-4xl" />
          <input
            type="text"
            name="search-vet-username"
            id="search-vet-username"
            className="text-3xl text-black outline-none border-none"
            placeholder="Pesquisar especialista"
            onKeyPress={(event) =>
              handleKeyPress(event.target.value, event, "userName")
            }
          />
        </label>
        <label className="relative flex items-center gap-2 border-solid border-black border-[1px] md:py-2 py-1 md:px-4 px-2  rounded-lg md:w-1/2 w-full">
          <GoLocation className=" text-black text-4xl" />
          <input
            type="text"
            name="search-vet-username"
            id="search-vet-username"
            className="text-3xl text-black outline-none border-none"
            placeholder="Pesquisar veteriários próximos"
            onKeyPress={(event) =>
              handleKeyPress(event.target.value, event, "city")
            }
          />
        </label>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center w-full p-10 relative">
        <div className="flex flex-col justify-center items-center md:w-1/2 gap-10">
          <h1 className="md:mt-14 font-bold text-3xl sm:text-4xl md:text-6xl w-full xl:w-3/5 md:text-left text-center">
            Agende suas consultas e forneça o melhor para o seu Pet!
          </h1>
          <Link
            className="flex text-center justify-center items-center border-2 rounded-xl border-[#9ED1B7] p-1 w-56 sm:w-96 h-full basis-1/6 text-xl md:text-3xl xl:basis-1/6 xl:h-20 transition hover:bg-[#9ED1B7] hover:text-white hover:shadow-xl hover:scale-105"
            to="/home/searchProfessionals"
          >
            Procure um veterinário próximo!
          </Link>
        </div>
        <div className="md:flex hidden justify-end content-center lg:w-2/5 w-1/2 lg:bg-none absolute right-0 z-0">
          <img className="mt-32 xl:mt-80 w-full md:w-5/6 xl:w-full" src={Dog} />
        </div>
      </div>
      <div>
        <img className="w-full md:w-1/2" src={Footprint} />
      </div>
    </section>
  );
};
