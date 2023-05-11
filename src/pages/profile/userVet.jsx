import React, { useState, useEffect } from "react";
import { getUsers, getAllVets } from "../../services/integrations/filters";
import { HeaderProfile } from "./resource/header.jsx";
import { Cards } from "./resource/cards/cards.jsx"
import { TopContainer } from './resource/topContainer.jsx';
import { AcademicInfos } from './resource/academicInfo.jsx';
import profilePhoto from "./resource/img/profilePhoto.png" 
import userPhoto from "./resource/img/userPhoto.png";
import { Maps } from './resource/maps.jsx';
import { getAllPets } from "../../services/integrations/pet";
import { getUser } from "../../services/integrations/user";
import jwt_decode from "jwt-decode";
//const biografia = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum finibus consectetur ipsum, in fermentum dui pharetra vitae. Pellentesque placerat ex felis, at ullamcorper quam sagittis nec. Quisque id sem purus. Ut augue lorem, elementum volutpat orci eget, tincidunt pharetra lorem. Fusce finibus lorem sit amet consequat imperdiet. Nullam ac consectetur enim. Cras aliquam tincidunt dui, a tristique enim pulvinar vel. Nullam rutrum felis eu urna blandit blandit. Donec tincidunt mauris ornare, hendrerit enim et, scelerisque odio.Morbi a ex dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris nulla augue, eleifend tempus venenatis varius, suscipit eu sapien. Suspendisse suscipit id orci ac tempus. Nullam odio elit, cursus ut mauris sed, sagittis auctor arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sed mi tortor."



    // let infosVet = getUser(localStorage.getItem('__Vet_Id'), localStorage.getItem('__user_JWT'))localStorage.setItem('__register_type', "professional")
export const UserVet = () => {

    const [isVet, SetIsVet] = useState(false)  

    useEffect(() => {
        const token = localStorage.getItem('__user_JWT')
        console.log(token);
        const decoded = jwt_decode(token);
        console.log(decoded ? decoded : '');
        console.log(decoded.profilePhoto);
        SetIsVet(decoded.isVet)
      }, []);

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
    

    if (isVet) {
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
    } else {
        return (
            <div>
                <HeaderProfile />
                <div>
                    <TopContainer name={vets.personName} profilePhoto={vets.profileBannerPhoto} userPhoto={vets.profilePhoto} biografia={vets.biography} />
                    <Cards id={vets.id} />
                    <div className='flex justify-center gap-[10%] px-44 mb-16'>
                        <Maps/>
                    </div>
                </div>
            </div>
            
        );                  
    }
}
