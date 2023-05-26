import React, {useState, useEffect} from "react";
import "./styleAppointment.css";
import jwt_decode from "jwt-decode";
import {getAppointments} from "../../../../../services/integrations/appointment";
import {
	getUser,
	getVeterinary,
} from "../../../../../services/integrations/user";
import {
	canceladoAppointments,
	finalizadoAppointments,
} from "../../../../../services/integrations/appointment";
import "react-toastify/dist/ReactToastify.css";
import Notifications from "../../../../../utils/Notifications";

export const AppointmentPeding = (props) => {
	const [pedidos, setPedido] = useState([]);
	const [buttonAceitar, setButtonAceitar] = useState("flex");
	const [showVet, setShowVet] = useState("hidden");
	const [showClient, setShowClient] = useState("flex");
	const [divNothing, setDivNothing] = useState("hidden");
	const [duracao, setDuracao] = useState(0);
	const [preco, setPreco] = useState(0.0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const token = localStorage.getItem("__user_JWT");
				const decoded = jwt_decode(token);
				let appoint = await getappo(decoded.id);

				if (appoint !== undefined && appoint !== null) {
					let filteredAppointments = appoint.filter(
						(appointment) => appointment.status === "SCHEDULED"
					);

					let appoints = await Promise.all(
						filteredAppointments.map(async (app) => {
							let client = await getclient(app.clientId);
							let arrayPet = await getPet(app.petId, client.Pet);
							let vet = await getvet(app.veterinaryId);
							const consultaDataSplit = app.date.split("T");
							const consultaDataPrimeiraMetade = consultaDataSplit[0];
							const consultaDataFormatada = consultaDataPrimeiraMetade
								.split("-")
								.reverse()
								.join("/");

							const horarioSplit = app.startsAt.split("T");
							const horarioSegundaMetade = horarioSplit[1];
							const horarioSplit2 = horarioSegundaMetade.split(":00.000Z");
							const horario = horarioSplit2[0];

							const dataDeNascimento = new Date(arrayPet.birthDate);
							const dataAtual = new Date();

							const diferencaEmMilissegundos = dataAtual - dataDeNascimento;
							const idadeEmAnos = Math.floor(
								diferencaEmMilissegundos / (1000 * 60 * 60 * 24 * 365)
							);

							let idadeString;

							if (
								typeof idadeEmAnos === "number" &&
								Number.isInteger(idadeEmAnos)
							) {
								let anos = idadeEmAnos.toString();
								if (anos == -1) idadeString = 0 + " anos";
							} else {
								const idadeEmMeses = idadeEmAnos * 12;
								idadeString = idadeEmMeses.toString() + " meses";
							}

							const formattedDuration = formatDuration(app.duration);

							const finalArray = {
								idAppoint: app.id,
								imagemPet: arrayPet.photo,
								donoImg: client.profilePhoto,
								dono: client.personName,
								telefone: client.cellphoneNumber,
								nomePet: arrayPet.name,
								sexo: arrayPet.petGender,
								especie: arrayPet.petSpecie.name,
								tamanho: arrayPet.petSize,
								idade: idadeString,
								dataConsulta: consultaDataFormatada,
								horario: horario,
								descricao: app.description,
								duration: formattedDuration,
								vetName: vet.personName,
								vetPhone: vet.cellphoneNumber,
								vetPhoto: vet.profilePhoto,
							};

							return finalArray;
						})
					);
					setDivNothing("hidden");
					setPedido(appoints);
				} else {
					setDivNothing("flex");
					setPedido([]);
				}

				if (decoded.isVet === false) {
					setButtonAceitar("hidden");
				}
			} catch (error) {
			}
		};
		fetchData();
	}, []);

	function formatDuration(duration) {
		const hours = Math.floor(duration / 60);
		const minutes = duration % 60;
		const formattedHours = hours.toString().padStart(2, "0");
		const formattedMinutes = minutes.toString().padStart(2, "0");
		return `${formattedHours}h${formattedMinutes}min`;
	}

	const getPet = async (idPet, arrayPet) => {
		const filteredPets = arrayPet.filter((pet) => pet.id === idPet);
		return filteredPets[0];
	};

	const cancelarAppointment = async (idAppointment) => {
		await Notifications.confirmOrCancel('Deseja cancelar a consulta?', async result => {
			if (result.isConfirmed) {
				const {response} = await canceladoAppointments(idAppointment);
				if (response.message === "Consulta cancelada") {
					await Notifications.success('Consulta cancelada com sucesso')
					window.location.reload()
				} else {
					await Notifications.error('Não foi possível realizar a ação')
					window.location.reload()
				}
				return response;
			}
		})
	};

	const finalizarAppointment = async (idAppointment) => {
		await Notifications.confirmOrCancel('Deseja concluir a consulta?', async result => {
			if (result.isConfirmed) {
				console.log(idAppointment)
				const {response} = await finalizadoAppointments(idAppointment);
				console.log(response)
				if (response.message === "Consulta concluída") {
					await Notifications.success('Consulta concluída com sucesso')
					window.location.reload()
				} else {
					await Notifications.error('Não foi possível realizar a ação')
					window.location.reload()
				}
				return response;
			}
		})
	};

	const getappo = async (idPerson) => {
		const token = localStorage.getItem("__user_JWT");
		const decoded = jwt_decode(token);
		let allAboutIt;
		if (decoded.isVet == true) {
			allAboutIt = await getAppointments(idPerson);
		} else {
			let person = await getUser(idPerson);
			allAboutIt = person;
		}
		if (
			allAboutIt.response == "Não foram encontrados registros no Banco de Dados"
		) {
			return [];
		} else {
			return allAboutIt.response.user.Appointments;
		}
	};

	const getclient = async (idPerson) => {
		let allAboutIt = await getUser(idPerson);
		if (
			allAboutIt.response ===
			"Não foram encontrados registros no Banco de Dados"
		) {
			return [];
		} else {
			return allAboutIt.response.user;
		}
	};

	const getvet = async (idPerson) => {
		let allAboutIt = await getVeterinary(idPerson);
		if (
			allAboutIt.response ===
			"Não foram encontrados registros no Banco de Dados"
		) {
			return [];
		} else {
			return allAboutIt.response.user;
		}
	};

	function formatPrice(input) {
		let value = input.value.replace(/[^0-9.]/g, "");

		let decimalCount = value.split(".").length - 1;
		if (decimalCount > 1) {
			value = value.slice(0, -1);
		}

		input.value = parseFloat(value).toLocaleString("pt-BR", {
			minimumFractionDigits: 2,
		});
	}

	useEffect(() => {
		const token = localStorage.getItem("__user_JWT");
		const decoded = jwt_decode(token);

		if (decoded.isVet) {
			setShowVet("hidden");
			setShowClient("flex");
		} else {
			setShowVet("flex");
			setShowClient("hidden");
		}
	}, []);

	return (
		<section className={"w-full"}>
			<div className="w-full flex flex-col gap-3 mr-2">
				<div className={`${divNothing}`}>Nenhuma consulta a ser aceita</div>
				{pedidos.map((pedido) => {
					return (
						<div
							key={pedido.id}
							className="border-none sm:border-solid border w-2/4 rounded-3xl border-black flex flex-col gap-0 p-14"
						>
							<div className="flex flex-col sm:flex-row justify-between pr-10 pt-5">
								<div className="flex flex-col justify-start w-full sm:w-1/3 mr-5">
									<div>
										<label className="flex flex-col text-2xl text-[#A9A9A9]">
											Nome
											<input
												type="text"
												disabled
												placeholder={pedido.nomePet}
												className="bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl "
											/>
										</label>
									</div>

									<div>
										<label className="flex flex-col text-2xl text-[#A9A9A9]">
											Tamanho
											<input
												type="text"
												disabled
												placeholder={pedido.tamanho}
												className="bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl "
											/>
										</label>
									</div>
								</div>
								<div className="flex flex-col sm:flex-col justify-start content-center w-full sm:w-1/3 mr-5">
									<div className="w-full">
										<label className="flex flex-col text-2xl text-[#A9A9A9]">
											Sexo
											<input
												type="text"
												disabled
												placeholder={pedido.sexo}
												className="bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl "
											/>
										</label>
									</div>
									<div className="w-full">
										<label className="flex flex-col text-2xl text-[#A9A9A9]">
											Idade
											<input
												type="text"
												disabled
												placeholder={pedido.idade}
												className="bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl "
											/>
										</label>
									</div>
								</div>
								<div className="flex flex-col sm:flex-col justify-start content-start w-full sm:w-1/3 mt-0 pt-0">
									<div className="w-full">
										<label className="flex flex-col text-2xl text-[#A9A9A9]">
											Espécie
											<input
												type="text"
												disabled
												placeholder={pedido.especie}
												className="bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl"
											/>
										</label>
									</div>
								</div>
							</div>

							<div
								className={`${showVet} flex-row items-center content-center text-center text-6xl gap-4`}
							>
								<img
									className="PetImage"
									src={pedido.vetPhoto}
									alt="Imagem do pet"
								/>
								<h2 className="font-normal flex justify-center sm:justify-start font-sans">
									{pedido.vetName}
								</h2>
							</div>
							<div className="flex flex-col sm:flex-row justify-between pr-20">
								<div className={`${showVet} flex-row justify-start w-full`}>
									<div>
										<label className="flex flex-col text-2xl text-[#A9A9A9]">
											Nome
											<input
												type="text"
												disabled
												placeholder={pedido.vetName}
												className="bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl "
											/>
										</label>
									</div>

									<div>
										<label className="flex flex-col text-2xl text-[#A9A9A9]">
											Telefone
											<input
												type="text"
												disabled
												placeholder={pedido.vetPhone}
												className="bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl "
											/>
										</label>
									</div>
								</div>
							</div>
							<h2 className="font-normal  flex justify-center sm:justify-start font-sans text-3xl pb-5 ">
								Informações de consulta{" "}
							</h2>
							<div className="flex flex-col justify-between pr-20">
								<div className="flex flex-row justify-start w-full sm:w-full ">
									<div className="w-1/3">
										<label className="flex flex-col text-2xl text-[#A9A9A9] gap-0">
											Data
											<input
												type="text"
												disabled
												placeholder={pedido.dataConsulta}
												className="bg-transparent placeholder:text-gray-400 w-full placeholder:text-3xl border-none text-3xl "
											/>
										</label>
									</div>
									<div className="w-1/3">
										<label className="flex flex-col text-2xl text-[#A9A9A9] gap-0">
											Horário
											<input
												type="text"
												disabled
												placeholder={pedido.horario}
												className="bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl "
											/>
										</label>
									</div>
									<div className="w-1/3">
										<label className="flex flex-col text-2xl text-[#A9A9A9] gap-0">
											Duração
											<input
												type="text"
												disabled
												placeholder={pedido.duration}
												className="bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl "
											/>
										</label>
									</div>
								</div>
								<div className="flex flex-row sm:flex-col justify-start content-center w-full ">
									<div>
										<label className="flex flex-col text-2xl text-[#A9A9A9]">
											Descrição
											<p
												className="bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-2xl ">
												{pedido.descricao}
											</p>
										</label>
									</div>
								</div>
							</div>
							<div className="flex flex-row justify-between pt-5">
								<button
									className={`bg-[#F9DEDC] flex justify-center items-center content-center text-[#410E0B] text-center first-letter w-40 md:w-56 h-14 border rounded-full text-xl font-normal mr-20`}
									onClick={() => cancelarAppointment(pedido.idAppoint)}
								>
									Cancelar consulta
								</button>
								<button
									className={`bg-[#9ED1B7] flex justify-center items-center content-center text-[#410E0B] text-center first-letter w-40 md:w-56 h-14 border rounded-full text-xl font-normal `}
									onClick={() => finalizarAppointment(pedido.idAppoint)}
								>
									Concluir consulta
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};
