import React, { useEffect, useState } from "react";
import axios from "axios";

export const CardProfessionals = (props) => {
	const [addressInfo, setAddressInfo] = useState("");
	const [effects, setEffects] = useState("flex");

	let year = props.dateStart

	useEffect(() => {
		const fetchAddressInfo = async () => {
			try {
				const response = await axios.get(
					`https://viacep.com.br/ws/${props.cep}/json/`
				);
				setAddressInfo({ cidade: response.data.localidade, estado: response.data.uf });
			} catch (error) {
			}
		};

		fetchAddressInfo();
	}, [props.cep]);

	function handleClick(event, id) {

		document.location.href = "/profile/veterinary";
		localStorage.setItem("__Vet_Id", event)
		localStorage.setItem("__Vet_correctId", id);
	}

	function specialtiesList() {
		const specialties = props.specialties.slice(0, 2).map(esp => esp.specialities.name);
		const specialtiesString = specialties.join(", ");
		return <li>{specialtiesString}</li>
	}
	function specialtiesPetList() {
		const specialtiesPet = props.animal.slice(0, 2).map(esp => esp.PetSpecie.name);
		const specialtiesPetString = specialtiesPet.join(", ");
		return <li>{specialtiesPetString}</li>
	}

	return (
		<div className={`w-full h-3/6 md:h-96 ${effects} flex-col md:flex-row gap-5 p-10 drop-shadow-2xl bg-white mb-10 rounded-3xl`}>
			<div className="w-72 md:w-1/4 h-full">
				<img src={props.image} alt="Imagem do especialista" className="overflow-hidden h-full w-full rounded-md" />
			</div>
			<div className="w-3/4 h-full flex flex-row">
				<div className="w-full h-full flex justify-center flex-col gap-2 ml-5">
					<div className="flex flex-row text-xl md:text-2xl gap-2">
						<p className="font-bold">Nome: </p>
						<p className="text-2xl w-5/6">{props.nome}</p>
					</div>
					<div className="flex flex-row text-xl md:text-2xl gap-2">
						<p className="font-bold">Apelido: </p>
						<p className="text-2xl w-5/6">{props.userName}</p>
					</div>
					<div className="flex flex-row text-xl md:text-2xl">
						<p className="font-bold w-72">Início de atuação: </p>
						<p className="text-2xl w-11/12">{year.split("-")[0]}</p>
					</div>
					<div className="flex flex-row text-xl md:text-2xl gap-2 ">
						<p className="font-bold">Estado: </p>
						<p className="text-2xl w-5/6">{addressInfo.estado}</p>
					</div>
					<div className="flex flex-row text-xl md:text-2xl gap-2 " >
						<p className="font-bold">Cidade: </p>
						<p className="text-2xl w-5/6">{addressInfo.cidade}</p>
					</div>
					<div className="flex flex-row text-xl md:text-2xl gap-2 w-full">
						<p className="font-bold">Formação: </p>
						<p className="text-2xl w-5/6">{props.formacao} - {props.instituicao}</p>
					</div>
					<div className="flex flex-row text-xl md:text-2xl gap-2 w-80 md:w-full">
						<p className="font-bold">Especialização: </p>
						<ul className={` text-2xl w-4/6`}>
							{specialtiesList()}
						</ul>
					</div>
					<div className="flex flex-row text-xl md:text-2xl gap-2 w-80 md:w-full">
						<p className="font-bold w-full">Especialização animal: </p>
						<ul className={` text-2xl w-4/6`}>
							{
								specialtiesPetList()
							}
						</ul>
					</div>
				</div>
				<div className="flex w-56 justify-end items-end ">
					<button className="w-24 h-5 md:h-9 md:w-40 p-3 bg-[#9ED1B7] rounded-3xl text-center text-2xl" onClick={() => handleClick(props.userName, props.id)}>
						Contate-nos
					</button>
				</div>
			</div>
		</div>
	)
};
