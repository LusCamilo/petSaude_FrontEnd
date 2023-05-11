import React, { useState, useEffect } from "react";
import { getUsers, getAllVets } from "../../../services/integrations/filters";
import { HeaderProfile } from "../resource/header.jsx";
import { Cards } from "../resource/cards/cards.jsx"
import { TopContainer } from '../resource/topContainer.jsx';
import { AcademicInfos } from '../resource/academicInfo.jsx';
import profilePhoto from "../resource/img/profilePhoto.png"
import userPhoto from "../resource/img/userPhoto.png";
import { Maps } from '../resource/maps.jsx';
import { getAllPets } from "../../../services/integrations/pet";
import { getUser } from "../../../services/integrations/user";
import jwt_decode from "jwt-decode";

export const VeterinaryProfile = () => {
    const [vets, setVets] = useState([]);

    const onSearch = async () => {
        try {
            let vetJson = localStorage.getItem("__Vet_Id");
            let response = await getUsers(vetJson, "userName");
            let result = response.response;
            let json
            if (result === "Nenhum veterinário atende aos filtros de pesquisa" ) {
              json = []
            } else {
              json = result
            }
            setVets(json[0])
            if (vets.isVet === true) {
                localStorage.setItem('__register_type', "professional")
            }
        } catch (error) {
          console.error(error);
        }
      };
    
        useEffect(() => {
            onSearch(); // Chama a função apenas uma vez durante o ciclo de vida do componente
        }, []);
    

        return (
            <div>
                <HeaderProfile />
                <div>
                    <TopContainer name={vets.personName} profilePhoto={vets.profileBannerPhoto} userPhoto={vets.profilePhoto} biografia={vets.biography} />
                    <Cards />
                    <div className='flex flex-col md:flex-row justify-between gap-[10%] px-10 md:px-44 mb-16'>
                        <AcademicInfos formacao={vets.formation} dataFormacao={vets.formationDate} instituicao={vets.institution} carreiraInicio={vets.startActingDate} />
                        <Maps/>
                    </div>
                </div>
            </div>
        );
}
