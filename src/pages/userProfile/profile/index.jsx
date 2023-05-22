import React, { useState, useEffect } from "react";
import { HeaderProfile } from "../resource/header.jsx";
import { Cards } from "../resource/cards/cards.jsx";
import { TopContainer } from "../resource/topContainer.jsx";
import { AcademicInfos } from "../resource/academicInfo.jsx";
import { Maps } from "../resource/maps.jsx";
import jwt_decode from "jwt-decode";
import getUserInfos from "../../../utils/getUserInfos";

export const Profile = () => {
  const [isVet, SetIsVet] = useState(false);
  const [userInfos, setUserInfos] = useState({});

  useEffect(() => {
    async function loadUserInfos() {
      const userInfos = await getUserInfos();
      setUserInfos(userInfos);
      // console.log(userInfos)
      SetIsVet(userInfos.isVet);
    }
    loadUserInfos();
  }, []);

  return (
    <div>
      <HeaderProfile />
      <div>
        <TopContainer
          name={userInfos.userName}
          profilePhoto={userInfos.profilePhoto}
          profileBannerPhoto={userInfos.profileBannerPhoto}
          biografia={userInfos.biography}
          isVet={userInfos.isVet}
          myProfile={true}
        />
        <Cards />
        <div className="flex flex-col md:flex-row justify-between gap-[10%] px-10 md:px-44 mb-16">
          {isVet ? (
            <AcademicInfos
              formacao={userInfos.formation}
              dataFormacao={userInfos.formationDate}
              instituicao={userInfos.institution}
              carreiraInicio={userInfos.startActingDate}
            />
          ) : null}
          <Maps />
        </div>
      </div>
    </div>
  );
};
