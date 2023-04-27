import React from "react";
import { Link } from "react-router-dom";
import { HeaderWeb } from "./resource/HeaderWeb";
import Footprint from "../../assets/svg/petPaws.svg";
import Dog from "../../assets/svg/dogAndCat.svg";
import Doctor from "../../assets/svg/medico 1.svg";
import "./css/LandingPage.css";
import { ListItem } from "./resource/searchArea";
import { useEffect, useState } from 'react';
import { FilterByName } from "./filterName";
import Local from "../../assets/svg/localizacao.svg";
import { getUsers} from "../../services/integrations/filters";
import { useForm } from 'react-hook-form';

export const LandingPage = () => {
	//https://www.luiztools.com.br/post/tutorial-listagem-com-busca-em-reactjs/
	//<ListItem Name="Yasmini" bairro="Novo Osasco" />

	function handleKeyPress(inputValue, event, whenSearch) {
		if (event.key === 'Enter') {
		  event.preventDefault(); // evita a renderização da tela
		  localStorage.setItem("__Vet_Search", inputValue);
		  localStorage.setItem("__Vet_WhenSearch", whenSearch);
		  window.open("/home/searchProfessionals", "_self"); // abre uma nova aba
		}
	  }

	return (
		<section className="">
			<HeaderWeb />
			<div className=" flex flex-col pt-10 sm:pt-20 sm:ml-10 justify-center gap-5 pl-8 md:pl-10
    xl:flex-row font-normal texto-2xl  md:flex-row">
				<div className="w-80 md:w-1/2 xl:w-1/4 static">
					<div className="w-full static flex flex-col bg-white border rounded-lg border-black transition hover:border-green-200  p-5  ">
						<div className="flex flex-row gap-2 sm:gap-10 w-full">
							<img className="w-10" src={Doctor} />
							<form className="w-full">
								<input onKeyPress={event => handleKeyPress(event.target.value, event, "userName")} className="xl:w-full h-10 text-xl sm:text-2xl" placeholder="Pesquisar especialistas" />
							</form>
						</div>
					</div>
				</div>
				<div className="static flex flex-row gap-5 bg-white border rounded-lg border-black transition hover:border-green-200 p-5 pl-5 w-80 md:w-1/2 xl:w-1/4">
					<div className="flex flex-row gap-2 sm:gap-10 w-full">
						<img className="w-10" src={Local} />
						<form  className="w-full">
							<input onKeyPress={event => handleKeyPress(event.target.value, event, "city")} className="xl:w-full h-10 text-xl sm:text-2xl" placeholder="Pesquisar veterinários próximos " />
						</form>
					</div>
				</div>
			</div>
			<div className="flex flex-row justify-between content center w-auto h-4/5 mt-10 ml-10 ">

				<div className=" flex flex-col justify-center items-center w-50">
					<h1
						className="xl:basis-2/4 flex justify-center items-center font-bold text-3xl sm:h-20 w-full  xl:pl-60 pl-4 md:text-5xl xl:text-7xl ">Agende
						suas consultas e forneça o melhor para o seu Pet!</h1>
					<Link 
						className="flex text-center justify-center items-center border-2 rounded-xl border-[#9ED1B7] p-1 xl:basis-1-6 mt-10 xl:h-20 sm:w-96 w-56 h-20 basis-1/6 text-xl sm:text-3xl transition  hover:bg-[#9ED1B7] hover:text-white hover:shadow-xl hover:scale-110"
						to="/home/searchProfessionals ">Procure um veterinário próximo!</Link>
				</div>


				<div className="invisible md:flex justify-end content-center basis-1/2 lg:bg-none ">
					<img className="mt-10 invisible md:visible xl:visible xl:w-5/6" src={Dog} />
				</div>
			</div>

			<div>
				<img className=" w-3/2 mt-5 xl:w-2/4" src={Footprint} />
			</div>
		</section>
	);
};

