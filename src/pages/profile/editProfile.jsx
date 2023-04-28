import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { HeaderEditProfile } from './resource/headerEdit';
import { TopContainer } from './resource/editProfile/topContainer';
import { InfosProfile } from './resource/editProfile/infosProfile';
import profilePhoto from './resource/img/profilePhoto.png'
import userPhoto from './resource/img/userPhoto.png'
import check from './resource/img/saveProfile.png'
import { deleteClient, deleteVeterinary, getUser, getVeterinary } from '../../services/integrations/user';


const InfosUser = async () => {

    if (localStorage.getItem('__user_isVet') == 'false') {
        const response = await getUser(localStorage.getItem('__user_id'))

        const [nome, ...sobrenomes] = response.user.personName.split(' ');

        const sobrenome = sobrenomes.join(' ');

        return {
            id: response.user.id,
            userName: response.user.userName,
            personName: response.user.personName,
            profilePhoto: response.user.profilePhoto,
            profileBannerPhoto: response.user.profileBannerPhoto,
            email: response.user.email,
            password: response.user.password,
        }

    } else {

        const response = await getVeterinary(localStorage.getItem('__user_id'))


        return {
            id: response.id,
            userName: response.userName,
            personName: response.personName,
            profilePhoto: response.profilePhoto,
            profileBannerPhoto: response.profileBannerPhoto,
            email: response.email,
            password: response.password,

        }

    }
}

export const EditProfile = () => {

    function handleChildNameChange(value) {
        console.log("nome:", value);
    }
    
    function handleChildEmailChange(value) {
        console.log("email", value);
    }

    function handleChildPasswordChange(value) {
        console.log("password", value);
    }

    const [infos, setInfos] = useState({})

    useEffect(() => {
        async function fetchData() {

            const allInfosUser = (await InfosUser())

            setInfos(
                {
                    userName: allInfosUser.userName,
                    personName: allInfosUser.personName,
                    profilePhoto: allInfosUser.profilePhoto,
                    profileBannerPhoto: allInfosUser.profileBannerPhoto,
                    email: allInfosUser.email,
                    password: allInfosUser.password
                }
            )
        }
        fetchData()
    }, [infos.userName, infos.email, infos.password, infos.personName, infos.profilePhoto, infos.profileBannerPhoto])


    return (
        <>
            <HeaderEditProfile name={infos.personName} />
            <div className="flex flex-col gap-y-3 items-center justify-center h-full pt-[80px] px-[10%] ">
                <TopContainer profileBannerPhoto={infos.profileBannerPhoto}/>
                <InfosProfile
                    onNameChange={handleChildNameChange}
                    onEmailChange={handleChildEmailChange}
                    onPasswordChange={handleChildPasswordChange}
                    userName={infos.userName} completName={infos.personName} email={infos.email} password={infos.password} photoUser={infos.profilePhoto} 
                />
            </div>
            <button className=' hidden md:flex  md:fixed md:end-40  self-end rounded-lg bg-[#9ED1B7] mt-5 shadow-md mb-7' onClick={() => {

                console.log(infos);

            }}>
                <img src={check} className='w-10 h-10 my-5 mx-5' />
            </button>
        </>
    );
}
