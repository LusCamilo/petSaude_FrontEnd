import React from 'react';
import { HeaderProfile } from "./resource/header.jsx";
import { Cards } from "./resource/cards/cards.jsx"
import { TopContainer } from './resource/topContainer.jsx';
import { AcademicInfos } from './resource/academicInfo.jsx';
import profilePhoto from "./resource/img/profilePhoto.png" 
import userPhoto from "./resource/img/userPhoto.png";
import { Maps } from './resource/maps.jsx';
import { getUser } from '../../services/integrations/user.js';
const biografia = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum finibus consectetur ipsum, in fermentum dui pharetra vitae. Pellentesque placerat ex felis, at ullamcorper quam sagittis nec. Quisque id sem purus. Ut augue lorem, elementum volutpat orci eget, tincidunt pharetra lorem. Fusce finibus lorem sit amet consequat imperdiet. Nullam ac consectetur enim. Cras aliquam tincidunt dui, a tristique enim pulvinar vel. Nullam rutrum felis eu urna blandit blandit. Donec tincidunt mauris ornare, hendrerit enim et, scelerisque odio.Morbi a ex dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris nulla augue, eleifend tempus venenatis varius, suscipit eu sapien. Suspendisse suscipit id orci ac tempus. Nullam odio elit, cursus ut mauris sed, sagittis auctor arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sed mi tortor."

export const UserVet = () => {


    let infosVet = getUser(localStorage.getItem('__Vet_Id'), localStorage.getItem('__user_JWT'))
    localStorage.setItem('__register_type', "professional")

    if (localStorage.getItem('__register_type') === "professional") {
        return (
            <div>
                <HeaderProfile />
                <div>
                    <TopContainer name="Hayley Williams" profilePhoto={profilePhoto} userPhoto={userPhoto} biografia={biografia} />
                    <Cards />
                    <div className='flex flex-col md:flex-row justify-between gap-[10%] px-10 md:px-44 mb-16'>
                        <AcademicInfos formacao="técnico veterinário" dataFormacao="31/02/1914" instituicao="USP" carreiraInicio="31/05/45" />
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
                    <TopContainer name="Hayley Williams" profilePhoto={profilePhoto} userPhoto={userPhoto} biografia={biografia} />
                    <Cards />
                    <div className='flex justify-center gap-[10%] px-44 mb-16'>
                        <Maps/>
                    </div>
                </div>
            </div>
            
        );                  
    }
}
