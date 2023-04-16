import React from "react";
import { CardProfessionals } from "./resource/CardProfessionals";
import { Footer } from "./resource/Footer";
import { HeaderInfo } from "./resource/HeaderInfo";
import { getUsers} from "../../services/integrations/filters";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import search from '../../assets/svg/lupa.svg'

export const SearchProfessional = () => {

    let hoje = new Date()


    const { register, handleSubmit, formState: { errors } } = useForm();	

	let [vets, setVets] = useState([]);
	let json
    const onSearch = async (data) => {
        console.log(data);
        try {
            if(data.search == ''){
              setVets([])
            }else {
              let response = await getUsers(data.search);
              console.log(response);
              let result = response.response
              console.log(result);
              json = result.filter(item => item.personName.toLowerCase().includes(data.search.toLowerCase()) || item.userName.toLowerCase().includes(data.search.toLowerCase()));;
              result.map(item => console.log('marmita'))
              console.log(json);
              setVets(json)
              console.log(vets);
            }
          
        } catch (error) {
          console.error(error);
        }
      };

    const veterinarios = [{
                id: 1,
                personName: "Deco Alves",
                formation: "Veterinary",
                institution: "USP",
                Address: {
                    "id": 1,
                    "state": "São José",
                    "city": "New York"
                },
                VeterinaryEspecialities: [
                    {
                        id: 1,
                        specialitiesId: 1,
                        veterinaryId: 1,
                        specialities: {
                            id: 1,
                            name: "Vacina"
                        }
                    }
                ]
            }]

    return (
        <>
            <HeaderInfo title="Profissionais" description="Temos os melhores e mais confiaveis profissionais em nosso site." />
            <div className="p-20 container mx-auto px-4 flex flex-col gap-10">
                <div className="flex flex-row gap-10 w-full border-4 border-black rounded-lg items-center content-center">
                    <img className="w-10" src={search} />
                    <form onChange={handleSubmit(onSearch)} className="w-full flex items-center content-center">
                        <input className="xl:w-full h-10 text-2xl flex items-center content-center" placeholder="Pesquisar especialistas" {...register("search")}/>
                    </form>
				</div>
                <div>
                    {veterinarios.map(vet => {
                        return (
                            <CardProfessionals key={vet.id} nome={vet.personName} idade="24" estado={vet.Address.state} cidade={vet.Address.city} formacao={vet.formation} instituicao={vet.institution} especializacao={vet.VeterinaryEspecialities[0].specialities.name} image="https://conteudo.imguol.com.br/blogs/174/files/2018/05/iStock-648229868-1024x909.jpg"/>
                        )    
                    })}
                </div>
            </div>
            <Footer />
        </>
    )


}