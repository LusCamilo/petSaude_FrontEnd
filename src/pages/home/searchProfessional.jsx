import React, { useState, useEffect } from "react";
import { CardProfessionals } from "./resource/CardProfessionals";
import { Footer } from "./resource/Footer";
import { HeaderInfo } from "./resource/HeaderInfo";
import { getUsers, getAllVets, getVet } from "../../services/integrations/filters";
import { useForm } from "react-hook-form";
import search from "../../assets/svg/lupa.svg";
import * as RadioGroup from "@radix-ui/react-radio-group";
import "./radixSearch.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notifications from "../../utils/Notifications";

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

	const [umCorteRapidao, setUmCorteRapidao] = useState('')


	// Função para buscar veterinários com base no filtro de cidade
	const axios = require('axios');


	async function getVetsByCity(city) {
		try {
			const { response } = await getAllVets(); // Função que busca todos os veterinários

			const vetsWithCity = await Promise.all(response.map(async (vet) => {
				const cepResponse = await axios.get(`https://viacep.com.br/ws/${vet.Address.cep}/json/`);
				const vetCity = cepResponse.data.localidade;
				return { ...vet, cidade: vetCity };
			}));

			const filteredVets = vetsWithCity.filter(vet => vet.cidade.includes(city));

			return filteredVets;
		} catch (error) {
			console.error('Erro ao buscar veterinários por cidade:', error);
			return [];
		}
	}

	async function filterVets(data, filtro = "city") {
		try {
			let filteredVets = [];

			if (filtro !== 'city') {
				const response = await getUsers(data.search, filtro);
				if (response.response == 'Nenhum veterinário atende aos filtros de pesquisa' || response == undefined) {
					filteredVets = shuffleArray([]);
				} else {
					filteredVets = response.response;
				}
			} else {
				filteredVets = await getVetsByCity(data.search); 
			}
			const vets = shuffleArray(filteredVets)
			setVets(vets);
		} catch (error) {
			console.error('Erro ao filtrar veterinários:', error);
		}
	}

	const onSearch = async (data) => {
		localStorage.setItem("__Vet_Search", data.search);
		try {
			await filterVets(data, filtro)
		} catch (error) {
			console.error(error);
		}
	};

	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	useEffect(() => {
		onSearch({ search: inputSearch });
	}, []);

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
							onChange={handleSubmit(onSearch)}
							className="w-96 flex pt-3 items-center content-center align-middle"
						>
							<input
								className="xl:w-full h-14 text-2xl flex items-center content-center"
								placeholder="Pesquisar especialistas"
								defaultValue={inputSearch}
								onChange={(e) => setInputSearch(e.target.value)}
								{...register("search")}
							/>
						</form>
					</div>
					<div className="flex justify-center">
						<div className="flex justify-between my-5 w-full items-center" onClick={() => {

						}}>
							<div className="flex items-center cursor-pointer border-2 w-72 h-10 p-7 justify-center rounded-lg">
								<label className="w-full cursor-pointer flex items-center text-base justify-around" htmlFor="r1" onClick={() => {
									console.log('teste');
									setFiltro('userName')
									console.log(filtro);
								}}>
									<div className="h-6 w-6 rounded-full border-gray-400 border-solid border hover:bg-black"></div>
									Procurar por nome
								</label>
							</div>
							<div className="flex items-center cursor-pointer border-2 w-80 h-2 p-7 justify-center rounded-lg" >
								<label className="w-full cursor-pointer flex items-center text-base justify-around" htmlFor="r2" onClick={() => {
									console.log('teste2');
									setFiltro('city')
									console.log(filtro);
								}}>
									<div className="h-6 w-6 rounded-full border-gray-400 border-solid border hover:bg-black"></div>
									Procurar por cidade
								</label>
							</div>
							<div className="flex items-center cursor-pointer border-2 w-80 h-2 p-7 justify-center rounded-lg">
								<label className="w-full cursor-pointer flex items-center text-base justify-around" htmlFor="r3" onClick={() => {
									console.log('teste3');
									setFiltro('specialities')
									console.log(filtro);

								}}>
									<div className="h-6 w-6 rounded-full border-gray-400 border-solid border hover:bg-black"></div>
									Procurar por Especialização
								</label>
							</div>
							<div className="flex items-center cursor-pointers border-2 w-80 h-2 p-7 justify-center rounded-lg">
								<label className="w-full cursor-pointer flex items-center text-base justify-around" htmlFor="r4" onClick={() => {
									console.log('teste4');
									setFiltro('animal')
									console.log(filtro);
								}}>
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
}
