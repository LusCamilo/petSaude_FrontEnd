import React from "react";
import { NameEspeciality } from "./nameEspeciality";


export const CardProfessionals = (props) => {

    function handleClick(event) {
		document.location.href = "/profile/veterinary";
		localStorage.setItem("__Vet_Id", event);
	}

    return (
        <div className="w-full h-96 flex flex-row gap-5 p-4 drop-shadow-2xl bg-white mb-10">
            <div className="w-1/4 h-full">
                <img src={props.image} alt="Imagem do especialista" className="overflow-hidden h-full w-full"/>
            </div>
            <div className="w-3/4 h-full flex flex-row">
                <div className="w-full h-full flex justify-start flex-col gap-3">
                    <div className="flex flex-row gap-2 text-3xl">
                        <p className="font-bold">Nome: </p>
                        <p>{props.nome}</p>
                    </div>
                    <div className="flex flex-row gap-2 text-3xl">
                        <p className="font-bold">Idade: </p>
                        <p>{props.idade}</p>
                    </div>
                    <div className="flex flex-row gap-2 text-3xl">
                        <p className="font-bold">Estado: </p>
                        <p>{props.estado}</p>
                    </div>
                    <div className="flex flex-row gap-2 text-3xl" >
                        <p className="font-bold">Cidade: </p>
                        <p>{props.cidade}</p>
                    </div>
                    <div className="flex flex-row gap-2 text-3xl">
                        <p className="font-bold">Formação: </p>
                        <p>{props.formacao} - {props.instituicao}</p>
                    </div>
                    <div className="flex flex-row gap-2 text-3xl w-full">
                        <p className="font-bold">Especialização: </p>
                        <p>{props.especializacao}</p>
                    </div>
                </div>
                <div className="flex w-56 justify-end items-end">
                    <button className="p-3 bg-[#9ED1B7] rounded-3xl"  onClick={() => handleClick(props.key)}>
                        Contate-nos
                    </button>
                </div>
            </div>
        </div>
    )


}