import React from "react";
import { Link } from "react-router-dom";
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
import { PetHeader } from "../profile/pet/petHeader";
import jwt_decode from "jwt-decode";

export const LandingPage = () => {
	//https://www.luiztools.com.br/post/tutorial-listagem-com-busca-em-reactjs/
	//<ListItem Name="Yasmini" bairro="Novo Osasco" />

	const token = localStorage.getItem('__user_JWT')
	const decoded = jwt_decode(token);
	console.log(decoded); 

	function handleKeyPress(inputValue, event, whenSearch) {
		if (event.key === 'Enter') {
		  event.preventDefault(); // evita a renderização da tela
		  localStorage.setItem("__Vet_Search", inputValue);
		  localStorage.setItem("__Vet_WhenSearch", whenSearch);
		  window.open("/home/searchProfessionals", "_self"); // abre uma nova aba
		}
	  }

	  localStorage.setItem("__Vet_Search", '');

	return (
		<section className="">
			<PetHeader />
			<div className="flex pt-10 sm:pt-20 md:pl-10 font-normal texto-2xl gap-5 p-10">
				<div className="flex w-full static mb-5">
					<div className="w-full static flex flex-row bg-white border rounded-lg border-black transition hover:border-green-200 p-5">
						<div className="flex flex-row gap-2 sm:gap-10 w-full">
							<img className="h-auto" src={Doctor} />
							<form className="w-full">
								<input onKeyPress={event => handleKeyPress(event.target.value, event, "userName")} className="w-full h-10 text-xl sm:text-2xl" placeholder="Pesquisar especialistas" />
							</form>
						</div>
					</div>
				</div>
				<div className="w-full static mb-5">
				<div className="static flex flex-row bg-white border rounded-lg border-black transition hover:border-green-200 p-5">
					<div className="flex flex-row gap-2 sm:gap-10 w-full">
					<img className="h-auto" src={Local} />
					<form className="w-full">
						<input onKeyPress={event => handleKeyPress(event.target.value, event, "city")} className="w-full h-10 text-xl sm:text-2xl" placeholder="Pesquisar veterinários próximos " />
					</form>
					</div>
				</div>
				</div>
			</div>
			<div className="flex flex-col md:flex-row justify-between items-center w-full md:h-4/5 ml-2 mt-5">
				<div className="flex flex-col justify-center items-center md:w-1/2 gap-10 md:pl-40 lg:pl-0">
					<h1 className="flex justify-center items-center font-bold text-3xl sm:text-4xl md:text-5xl xl:text-7xl w-full sm:h-20 xl:w-3/5 xl:basis-2/4">
						Agende suas consultas e forneça o melhor para o seu Pet!
					</h1>
					<Link className="flex text-center justify-center items-center border-2 rounded-xl border-[#9ED1B7] p-1 w-56 sm:w-96 h-full basis-1/6 text-xl md:text-3xl xl:basis-1/6 xl:h-20 transition hover:bg-[#9ED1B7] hover:text-white hover:shadow-xl hover:scale-110" to="/home/searchProfessionals">
						Procure um veterinário próximo!
					</Link>
				</div>
				<div className="flex justify-end content-center md:w-1/2 xl:w-1/2 xl:bg-none">
					<img className="mt-20 w-full md:w-5/6 xl:w-full" src={Dog} />
				</div>
			</div>
			<div>
				<img className="w-full mt-5 xl:w-2/4" src={Footprint} />
			</div>
		</section>


	// 	<section className="">
	// 		<PetHeader />
	// 		<div className=" flex flex-col pt-10 sm:pt-20 sm:ml-10 justify-center gap-5 pl-8 md:pl-10
    // xl:flex-row font-normal texto-2xl  md:flex-row ">
	// 			<div className="w-80 md:w-1/2 xl:w-1/4 static">
	// 				<div className="w-full static flex flex-col bg-white border rounded-lg border-black transition hover:border-green-200  p-5  ">
	// 					<div className="flex flex-row gap-2 sm:gap-10 w-full">
	// 						<img className="w-10" src={Doctor} />
	// 						<form className="w-full">
	// 							<input onKeyPress={event => handleKeyPress(event.target.value, event, "userName")} className="xl:w-full h-10 text-xl sm:text-2xl" placeholder="Pesquisar especialistas" />
	// 						</form>
	// 					</div>
	// 				</div>
	// 			</div>
	// 			<div className="static flex flex-row gap-5 bg-white border rounded-lg border-black transition hover:border-green-200 p-5 pl-5 w-80 md:w-1/2 xl:w-1/4">
	// 				<div className="flex flex-row gap-2 sm:gap-10 w-full">
	// 					<img className="w-10" src={Local} />
	// 					<form  className="w-full">
	// 						<input onKeyPress={event => handleKeyPress(event.target.value, event, "city")} className="xl:w-full h-10 text-xl sm:text-2xl" placeholder="Pesquisar veterinários próximos " />
	// 					</form>
	// 				</div>
	// 			</div>
	// 		</div>
	// 		<div className="flex flex-col md:flex-row justify-between items-center w-full md:h-4/5 ml-2 mt-5">
	// 			<div className="flex flex-col justify-center items-center md:w-1/2 gap-10 md:pl-40 lg:pl-0">
	// 				<h1 className="flex justify-center items-center font-bold text-3xl sm:text-4xl md:text-5xl xl:text-7xl w-full sm:h-20 xl:w-3/5 xl:basis-2/4">
	// 				Agende suas consultas e forneça o melhor para o seu Pet!
	// 				</h1>
	// 				<Link
	// 				className="flex text-center justify-center items-center border-2 rounded-xl border-[#9ED1B7] p-1 w-56 sm:w-96 h-full basis-1/6 text-xl md:text-3xl xl:basis-1/6 xl:h-20 transition hover:bg-[#9ED1B7] hover:text-white hover:shadow-xl hover:scale-110"
	// 				to="/home/searchProfessionals"
	// 				>
	// 				Procure um veterinário próximo!
	// 				</Link>
	// 			</div>
	// 			<div className="hidden xl:flex justify-end content-center basis-1/2 lg:bg-none">
	// 				<img className="mt-20 md:w-5/6" src={Dog} />
	// 			</div>
	// 		</div>


	// 		<div>
	// 			<img className="w-3/2 mt-5 xl:w-2/4" src={Footprint} />
	// 		</div>
	// 	</section>
		
	);
};
