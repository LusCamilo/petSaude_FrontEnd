import React, { useEffect, useState } from "react";

export const CardProfessionals = (props) => {
	const [effects, setEffects] = useState("flex");
	const [especializacao, setEspecializacao] = useState('')

	useEffect(() => {
		if (props.especializacao === null || props.especializacao === "") {
			setEspecializacao('')
		} else {
			setEspecializacao(props.especializacao)
		}
	}, [props.especializacao])

	function handleClick(event, id) {

		document.location.href = "/userProfile/veterinary";
		localStorage.setItem("__Vet_Id", event)
		localStorage.setItem("__Vet_correctId", id);
	}
	return (
		<div className={`w-full h-96 ${effects} flex-row gap-5 p-4 drop-shadow-2xl bg-white mb-10`}  onClick={() => handleClick(props.userName, props.id)}>
			<div className="w-1/4 h-full">
				<img src={props.image} alt="Imagem do especialista" className="overflow-hidden h-full w-full"/>
			</div>

			<div className="w-3/4 h-full flex flex-row">
				<div className="w-full h-full flex justify-start flex-col gap-3">
					<div className="flex flex-row gap-2 text-3xl">
						<p className="font-bold">Nome: </p>
						<p>{props.titulo}</p>
					</div>
					<div className="flex flex-row gap-2 text-3xl">
						<p className="font-bold">Início de atuação: </p>
						<p>{props.subtitulo}</p>
					</div>
				</div>
			</div>
		</div>
	)



}