import React, { useEffect, useState } from "react";
import axios from "axios";
import { getVet } from "../../../services/integrations/filters";


export const CardProfessionals = (props) => {
	const [addressInfo, setAddressInfo] = useState("");
	const [effects, setEffects] = useState("flex");
	const [veterinariosEspecialdades, setVeterinariosEspecialdades] = useState([]);
	const [showEspecialidade, setShowEspecialidade] = useState('flex');
	const [firstName, setFirstName] = useState('');
	useEffect(() => {
		let pesquisa = props.umCorteRapido
		let city = addressInfo ? addressInfo.cidade : "";
		if (pesquisa === '' || pesquisa === null) {
			setEffects('flex')
		} else{
			if (city.toLowerCase().includes(pesquisa.toLowerCase())) {
				setEffects('flex')
			} else {
				setEffects('hidden')
			}

		}
	}, [props.umCorteRapido, addressInfo.cidade]);

	useEffect(() => {
		let specialidades = getVet(props.id)
	})

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

	useEffect(() => {
		async function fetchData() {
			const specialidades = await getVet(props.id)
			setVeterinariosEspecialdades(specialidades.response.user.VeterinaryEspecialities)
			if (veterinariosEspecialdades > 0) {
				setShowEspecialidade('hidden')
			}
			setFirstName(veterinariosEspecialdades[0])
		}
		fetchData();
	}, [props.id]);

	// let especialista
	const [especializacao, setEspecializacao] = useState('')
	useEffect(() => {
		if (props.especializacao === null || props.especializacao === "") {
			setEspecializacao('')
		} else {
			setEspecializacao(props.especializacao)
		}
	}, [props.especializacao])

	function handleClick(event, id) {

		document.location.href = "/profile/veterinary";
		localStorage.setItem("__Vet_Id", event)
		localStorage.setItem("__Vet_correctId", id);
	}

	// function truncateSpecialities(specialities) {
	// 	const parsedToStringArray = specialities.join(', ');
	// 	// TODO: VALIDAR SE O TAMANHO DA STRING EXCEDE O TAMANHO PERMETIDO
	// 	return parsedToStringArray.slice(0, 40) + '...'
	// }

	return (
		<div className={`w-full h-3/6 md:h-96 ${effects} flex-col md:flex-row gap-5 p-10 drop-shadow-2xl bg-white mb-10 rounded-3xl`}>
			<div className="w-72 md:w-1/4 h-full">
				<img src={props.image} alt="Imagem do especialista" className="overflow-hidden h-full w-full rounded-md"/>
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
						<ul className={`${showEspecialidade} text-2xl w-4/6`}>
							{veterinariosEspecialdades.map(esp =>{
								const name = esp.specialities.name
								return(
									<p key={esp.specialities.id}>
										{name},
									</p>
								)
							})}
						</ul>
					</div>
				</div>
				<div className="flex w-56 justify-end items-end ">
					<button className="w-24 h-5 md:h-9 md:w-40 p-3 bg-[#9ED1B7] rounded-3xl text-center text-2xl"  onClick={() => handleClick(props.userName, props.id)}>
						Contate-nos
					</button>
				</div>
			</div>
		</div>
	)
};
