import React, { useState, useEffect } from "react";
import { HeaderProfile } from "../resource/header.jsx";
import { Cards } from "../resource/cards/cards.jsx";
import { TopContainer } from "../resource/topContainer.jsx";
import { AcademicInfos } from "../resource/academicInfo.jsx";
import { Maps } from "../resource/maps.jsx";
import getUserInfos from "../../../utils/getUserInfos";

export const  Profile = () => {
  const [isVet, SetIsVet] = useState(false);
  const [cep, SetCEP] = useState("");
  const [userInfos, setUserInfos] = useState({});

  useEffect(() => {
    loadUserInfos();
  }, []);

  async function loadUserInfos() {
    const userInfos = await getUserInfos();
    setUserInfos(userInfos); 
    console.log(userInfos);
    SetIsVet(userInfos.isVet);
    SetCEP(userInfos.cep);
    localStorage.setItem("__basic_Infos", `${userInfos.isVet}, ${userInfos.id}`)
  }

  return (
    <div>
      <HeaderProfile />
      <div>
        <TopContainer
          name={userInfos.userName}
          profilePhoto={userInfos.profilePhoto}
          profileBannerPhoto={userInfos.profileBannerPhoto}
          biografia={userInfos.bio}
          isVet={userInfos.isVet}
          myProfile={true}
        /> 
        <Cards personImage={userInfos.profilePhoto} boolVet={isVet} idVets={userInfos.id}/>
        <div className="flex flex-col md:flex-row justify-between gap-[10%] px-10 md:px-44 mb-16">
            {isVet && <AcademicInfos
              formacao={userInfos.formacao}
              dataFormacao={userInfos.dataFormacao}
              instituicao={userInfos.instituicao}
              carreiraInicio={userInfos.carreiraInicio}
            />}
            {console.log(cep)}
          <Maps cep={cep}/>
        </div>
      </div>
    </div>
  );
};
