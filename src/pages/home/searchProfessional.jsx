import React, { useState, useEffect } from "react";
import { CardProfessionals } from "./resource/CardProfessionals";
import { Footer } from "./resource/Footer";
import { HeaderInfo } from "./resource/HeaderInfo";
import { getUsers, getAllVets } from "../../services/integrations/filters";
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

	function citySearch() {
		setFiltro("city");
		setOndeProcurar("value");
		onSearchIt({ search: inputSearch });
	}

	const setMudarFiltro = (value) => {
		setOndeProcurar(value)
		onSearchIt({ search:  inputSearch, searchIt: value})
	};

	function citySearch() {
		setFiltro("city");
		setOndeProcurar("value")
		onSearchIt({ search:  inputSearch})
	}

	const [umCorteRapidao, setUmCorteRapidao] = useState('')


	const onSearch = async (data) => {
		localStorage.setItem("__Vet_Search", data.search);
		try {
			if (data.search === "") {
				let response = await getAllVets();
				let result = response.response;
				let json = Object.values(result);
				setVets(json);
			} else {
				if (filtro !== "city") {
					let response = await getUsers(data.search, ondeProcurar);
					let result = response.response;
					let json;
					if (result === "Nenhum veterinário atende aos filtros de pesquisa") {
						json = [];
						showToastMessage();
					} else {
						json = result.filter(
							(item) =>
								item.personName
									.toLowerCase()
									.includes(data.search.toLowerCase()) ||
								item.userName.toLowerCase().includes(data.search.toLowerCase())
						);
					}
					setUmCorteRapidao("");
					setVets(json);
				} else {
					//Pedir ajuda ajuda pro Rafael
					let response = await getAllVets();
					let procurarCidade = data.search;
					let result = response.response;
					let json = Object.values(result);
					if (procurarCidade === "") {
						setVets(response);
					} else {
						let jsonFinal = json.filter(async (item) => {
							const response = await axios.get(
								`https://viacep.com.br/ws/${item.Address.cep}/json/`
							);
							let pessoa = response.data.localidade;
							return pessoa
								.toLowerCase()
								.includes(procurarCidade.toLowerCase());
						});
						if (jsonFinal === []) {
							showToastMessage();
						}
						setVets(jsonFinal);
					}
				}
			}
		} catch (error) {
			console.error(error);
		}
	};

	const showToastMessage = () => {
		toast.error("Nenhum Veterinário encontrado", {
			position: "top-right",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			//progress: undefined,
			theme: "light",
		});
	};

	const onSearchIt = async (data) => {
		try {
			if (data.search === "") {
				let response = await getAllVets();
				let result = response.response;
				let json = Object.values(result);
				setVets(json);
			} else {
				let json;
				if (filtro !== "city") {
					localStorage.setItem("__Vet_Search", data.search);
					let response = await getUsers(data.search, data.searchIt);
					let result = response.response;
					if (result === "Nenhum veterinário atende aos filtros de pesquisa") {
						showToastMessage();
						json = [];
					} else {
						json = result.filter(
							(item) =>
								item.personName
									.toLowerCase()
									.includes(data.search.toLowerCase()) ||
								item.userName.toLowerCase().includes(data.search.toLowerCase())
						);
					}
					setVets(json);
				} else {
					let response = await getAllVets();
					let result = response.response;
					let json = Object.values(result);
					json = result.filter(
						(item) =>
							item.personName
								.toLowerCase()
								.includes(data.search.toLowerCase()) ||
							item.userName.toLowerCase().includes(data.search.toLowerCase())
					);
					setUmCorteRapidao(inputSearch)
					if (json === []) {
						showToastMessage()
					}
					setVets(json);
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
		setFiltro(value);
	};

	return (
		<>
			<HeaderInfo
				title="Profissionais"
				description="Temos os melhores e mais confiaveis profissionais em nosso site."
			/>
			<div className={`p-2 md:p-20 container mx-auto px-4 gap-10 min-h-screen`}>
				<div className="flex flex-col w-full pr-5">
					<div className="flex flex-row gap-2 w-full border-2 border-black rounded-lg items-center align-middle  content-center mr-4 ml-0 md:ml-5 ">
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
						<form className="m-2 md:m-10 items-center flex flex-row">
							<RadioGroup.Root
								className="RadioGroupRoot"
								value={filtro}
								onChange={handleRadioChange}
								defaultValue="userName"
								aria-label="View density"
							>
								<div className="flex flex-col md:flex-row w-full items-center">
									<div className="flex flex-row gap-10 ">
										<div
											className="border-2 w-72 h-10 p-7 ml-10 rounded-lg items-center"
											style={{ display: "flex", alignItems: "center" }}
										>
											<RadioGroup.Item
												className="RadioGroupItem"
												onClick={() => setMudarFiltro("userName")}
												name="userName"
												defaultValue="userName"
												id="r1"
											>
												<RadioGroup.Indicator className="RadioGroupIndicator" />
											</RadioGroup.Item>
											<label className="Label" htmlFor="r1">
												Procurar por nome
											</label>
										</div>
										<div
											className="border-2 w-80 h-2 p-7 rounded-lg mr-8"
											style={{ display: "flex", alignItems: "center" }}
										>
											<RadioGroup.Item
												className="RadioGroupItem"
												onClick={() => citySearch()}
												name="city"
												defaultValue="city"
												id="r2"
											>
												<RadioGroup.Indicator className="RadioGroupIndicator" />
											</RadioGroup.Item>
											<label className="Label" htmlFor="r2">
												Procurar por cidade
											</label>
										</div>
									</div>
									<div className="flex flex-row gap-10">
										<div
											className="border-2 w-80 h-2 p-7 rounded-lg"
											style={{ display: "flex", alignItems: "center" }}
										>
											<RadioGroup.Item
												className="RadioGroupItem"
												onClick={() => setMudarFiltro("speciality")}
												name="speciality"
												defaultValue="speciality"
												id="r3"
											>
												<RadioGroup.Indicator className="RadioGroupIndicator" />
											</RadioGroup.Item>
											<label className="Label" htmlFor="r3">
												Procurar por Especialização
											</label>
										</div>
										<div
											className="border-2 w-80 h-2 p-7 rounded-lg"
											style={{ display: "flex", alignItems: "center" }}
										>
											<RadioGroup.Item
												className="RadioGroupItem"
												onClick={() => setMudarFiltro("animal")}
												name="animal"
												defaultValue="animal"
												id="r4"
											>
												<RadioGroup.Indicator className="RadioGroupIndicator" />
											</RadioGroup.Item>
											<label className="Label" htmlFor="r4">
												Procurar por animais
											</label>
										</div>
									</div>
								</div>
							</RadioGroup.Root>
						</form>
					</div>
				</div>
				<div>
					{vets.map((vet) => {
						console.log(vet);
						if (vet.id != undefined) {
							return (
								<CardProfessionals
									key={vet.id}
									id={vet.id}
									userName={vet.userName}
									nome={vet.personName}
									cep={vet.Address.cep}
									formacao={vet.formation}
									instituicao={vet.institution}
									//especializacao={vet.VeterinaryEspecialities[0].specialities.name}
									image={vet.profilePhoto}
									dateStart={vet.startActingDate}
									umCorteRapido={umCorteRapidao}
								/>
							);
						}
					})}
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
