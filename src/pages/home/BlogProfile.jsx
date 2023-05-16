import React, { useState, useEffect } from "react";
import { CardProfessionals } from "./resource/CardProfessionals";
import { Footer } from "./resource/Footer";
import { HeaderInfo } from "./resource/HeaderInfo";
import { getUsers, getAllVets } from "../../services/integrations/filters";
import { useForm } from "react-hook-form";
import search from "../../assets/svg/lupa.svg";
import axios from "axios";
import './radixSearch.css'


export const BlogProfile = () => {
	const { register, handleSubmit, formState: { errors } } = useForm();
	const [vets, setVets] = useState([]);
	const [cidadeProcurar, setCidadeProcurar] = useState("");
	const [inputSearch, setInputSearch] = useState(
		localStorage.getItem("__Vet_Search") || ""
	);

	const [ondeProcurar, setOndeProcurar] = useState(localStorage.getItem("__Vet_WhenSearch") || " ");
	const [selectedOption, setSelectedOption] = useState("userName");
	const [filtro, setFiltro] = useState("userName");

	const setMudarFiltro = (value) => {
		setOndeProcurar(value)

		onSearchIt({ search:  inputSearch, searchIt: value})
	};

	function citySearch() {
		setFiltro("city");
		setVets([]);
		// onSearchIt({ search:  inputSearch})
	}

	const [umCorteRapidao, setUmCorteRapidao] = useState('')

//const [filtro, setFiltro] = useState("userName");
	const onSearch = async (data) => {
		localStorage.setItem("__Vet_Search", data.search)
		console.log(ondeProcurar);
		try {
			if (data.search === "") {
				let response = await getAllVets();
				let result = response.response;
				let json = Object.values(result);
				setVets(json);
			} else {
				console.log(ondeProcurar);
				if (ondeProcurar !== "city") {
					let response = await getUsers(data.search, ondeProcurar);
					let result = response.response;
					let json
					if (result === "Nenhum veterinário atende aos filtros de pesquisa" ) {
						json = []
					} else {
						json = result.filter(
							(item) =>
								item.personName.toLowerCase().includes(data.search.toLowerCase()) ||
								item.userName.toLowerCase().includes(data.search.toLowerCase())
						);
					}
					setUmCorteRapidao('')
					setVets(json);
				} else {
					console.log("abecedario");
					let response = await getAllVets();

					let result = response.response;
					let json = Object.values(result);
					setUmCorteRapidao(inputSearch)
					let jsonFinal = await Promise.all(json.filter(async (item) =>
						item.city.toLowerCase().includes((await axios.get(
							`https://viacep.com.br/ws/${data.search}/json/`
						)).data.toLowerCase())
					));
					setVets(jsonFinal);
				}
			}
		} catch (error) {
			console.error(error);
		}
	};



	const onSearchIt = async (data) => {
		try {
			if (data.search === "") {
				let response = await getAllVets();
				let result = response.response;
				let json = Object.values(result);
				setVets(json);
			} else {
				console.log(ondeProcurar);
				if (ondeProcurar !== "city") {
					let response = await getUsers(data.search, ondeProcurar);
					let result = response.response;
					let json
					if (result === "Nenhum veterinário atende aos filtros de pesquisa" ) {
						json = []
					} else {
						json = result.filter(
							(item) =>
								item.personName.toLowerCase().includes(data.search.toLowerCase()) ||
								item.userName.toLowerCase().includes(data.search.toLowerCase())
						);
					}
					setUmCorteRapidao('')
					setVets(json);
				} else {
					console.log("abecedario");
					let response = await getAllVets();

					let result = response.response;
					let json = Object.values(result);
					setUmCorteRapidao(inputSearch)
					let jsonFinal = await Promise.all(json.filter(async (item) =>
						item.city.toLowerCase().includes((await axios.get(
							`https://viacep.com.br/ws/${data.search}/json/`
						)).data.toLowerCase())
					));
					setVets(jsonFinal);
				}
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		onSearch({ search: inputSearch });
	}, []);

	const handleRadioChange = (value) => {
		setSelectedOption(value);
		setFiltro(value)
	};

	return (
		<>
			<HeaderInfo
				title="Blog"
				description="Tudo o que você precisa saber sobre os cuidados com seu animal de estimação e curiosidas interressantes "
			/>
			<div className={`p-20 container mx-auto px-4 flex flex-col gap-10 min-h-screen`}>
				<div className="flex flex-col items-center md:flex-row w-full" >
					<div className="flex flex-row gap-2 w-full border-4 border-black rounded-lg items-center align-middle  content-center mr-4">
						<img className="w-10" src={search} alt='Magnifier icon to search' />
						<form
							onChange={handleSubmit(onSearch)}
							className="w-full flex pt-3 items-center content-center align-middle"
						>
							<input
								className="xl:w-full h-10 text-2xl flex items-center content-center"
								placeholder="Pesquisar especialistas"
								defaultValue={inputSearch}
								onChange={(e) => setInputSearch(e.target.value)}
								{...register("search")}
							/>
						</form>
					</div>
				</div>
				<div>
					{vets.map((vet) => {
						if (vet.id !== undefined)
							return (
								<CardProfessionals
									key={vet.id}
									id={vet.id}
									userName={vet.userName}
									nome={vet.personName}
									cep={vet.Address.cep}
									formacao={vet.formation}
									instituicao={vet.institution}
									especializacao={""}
									image={vet.profilePhoto}
									dateStart = {vet.startActingDate}
									umCorteRapido={umCorteRapidao}
								/>
							);
					})}
				</div>
			</div>
			<Footer />
		</>
	);
};