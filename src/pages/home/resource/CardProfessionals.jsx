import React, { useEffect, useState } from "react";
import { NameEspeciality } from "./nameEspeciality";
import axios from "axios";


export const CardProfessionals = (props) => {
    const [addressInfo, setAddressInfo] = useState("");
    const [effects, setEffects] = useState("flex");


    useEffect(() => {
        let pesquisa = props.umCorteRapido
        let city = addressInfo ? addressInfo.cidade : "";
        if (pesquisa == '' || pesquisa == null || pesquisa == undefined) {
            console.log('a');
            setEffects('flex')
        } else{
            if (city.toLowerCase().includes(pesquisa.toLowerCase())) {
                console.log(city);
                setEffects('flex')
            } else {
                setEffects('hidden')
            }
            
        }
    }, [props.umCorteRapido, addressInfo.cidade]);;

    let year = props.dateStart

    useEffect(() => {
        const fetchAddressInfo = async () => {
          try {
            const response = await axios.get(
              `https://viacep.com.br/ws/${props.cep}/json/`
            );
            setAddressInfo({ cidade: response.data.localidade, estado: response.data.uf });
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchAddressInfo();
      }, [props.cep]);

    // let especialista
    const [especializacao, setEspecializacao] = useState('')
    useEffect(() => {
        console.log(props.especializacao);
        if (props.especializacao == null || props.especializacao == undefined || props.especializacao == "") {
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
    return (
            <div className={`w-full h-96 ${effects} flex-row gap-5 p-4 drop-shadow-2xl bg-white mb-10`}>
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
                            <p className="font-bold">Início de atuação: </p>
                            <p>{year.split("-")[0]}</p>
                        </div>
                        <div className="flex flex-row gap-2 text-3xl">
                            <p className="font-bold">Estado: </p>
                            <p>{addressInfo.estado}</p>
                        </div>
                        <div className="flex flex-row gap-2 text-3xl" >
                            <p className="font-bold">Cidade: </p>
                            <p>{addressInfo.cidade}</p>
                        </div>
                        <div className="flex flex-row gap-2 text-3xl">
                            <p className="font-bold">Formação: </p>
                            <p>{props.formacao} - {props.instituicao}</p>
                        </div>
                        <div className="flex flex-row gap-2 text-3xl w-full">
                            <p className="font-bold">Especialização: </p>
                            <p>{especializacao}</p>
                        </div>
                    </div>
                    <div className="flex w-56 justify-end items-end">
                        <button className="p-3 bg-[#9ED1B7] rounded-3xl"  onClick={() => handleClick(props.userName, props.id)}>
                            Contate-nos
                        </button>
                    </div>
                </div>
            </div>
        )
    


}