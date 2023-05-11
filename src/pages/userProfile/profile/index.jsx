import React, { useState, useEffect } from "react";
import { HeaderProfile } from "../resource/header.jsx";
import { Cards } from "../resource/cards/cards.jsx"
import { TopContainer } from '../resource/topContainer.jsx';
import { AcademicInfos } from '../resource/academicInfo.jsx';
import { Maps } from '../resource/maps.jsx';
import jwt_decode from "jwt-decode";

export const Profile = () => {
    const [isVet, SetIsVet] = useState(false)
    const [userInfos, setUserInfos] = useState({})

    useEffect(() => {
        const token = localStorage.getItem('__user_JWT')
        const decoded = jwt_decode(token);
        setUserInfos(decoded)
        SetIsVet(decoded.isVet)
    }, []);

    console.log(userInfos)

    if (isVet) {
        return (
            <div>
                <HeaderProfile />
                <div>
                    <TopContainer name={userInfos.userName} profilePhoto={userInfos.profileBannerPhoto} userPhoto={userInfos.profilePhoto} biografia={userInfos.biography} />
                    <Cards />
                    <div className='flex flex-col md:flex-row justify-between gap-[10%] px-10 md:px-44 mb-16'>
                        <AcademicInfos formacao={userInfos.formation} dataFormacao={userInfos.formationDate} instituicao={userInfos.institution} carreiraInicio={userInfos.startActingDate} />
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
                    <TopContainer name={userInfos.userName} profilePhoto={userInfos.profileBannerPhoto} userPhoto={userInfos.profilePhoto} biografia={userInfos.biography} />
                    <Cards id={userInfos.id} />
                    <div className='flex justify-center gap-[10%] px-44 mb-16'>
                        <Maps/>
                    </div>
                </div>
            </div>

        );
    }
}
