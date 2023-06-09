import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { HeaderEditProfile } from './resource/headerEdit';
import { TopContainer } from './resource/editProfile/topContainer';
import { InfosProfile } from './resource/editProfile/infosProfile';
import profilePhoto from './resource/img/profilePhoto.png'
import userPhoto from './resource/img/userPhoto.png'
import check from './resource/img/saveProfile.png'
import { deleteClient, deleteVeterinary, getUser, getVeterinary, updateProfileInfosClient, updateProfileInfosVeterinary } from '../../services/integrations/user';
import { PetHeader } from './pet/petHeader';
import jwt_decode from "jwt-decode";

const firebaseConfig = {
    apiKey: "AIzaSyDidn9lOpRvO7YAkVjuRHvI88uLRPnpjak",
    authDomain: "petsaude-6ba51.firebaseapp.com",
    projectId: "petsaude-6ba51",
    storageBucket: "petsaude-6ba51.appspot.com",
    messagingSenderId: "965774218063",
    appId: "1:965774218063:web:51d112960710c8481ceb3a"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


const InfosUser = async () => {

    const token = localStorage.getItem('__user_JWT')
    const decoded = jwt_decode(token);

    if (decoded.isVet == false) {
        const response = await getUser(decoded.id)


        return {
            id: response.response.user.id,
            userName: response.response.user.userName,
            personName: response.response.user.personName,
            profilePhoto: response.response.user.profilePhoto,
            profileBannerPhoto: response.response.user.profileBannerPhoto,
            email: response.response.user.email,
            password: response.response.user.password,
        }

    } else {

        const response = await getVeterinary(decoded.id)

        return {
            id: response.response.user.id,
            userName: response.response.user.userName,
            personName: response.response.user.personName,
            profilePhoto: response.response.user.profilePhoto,
            profileBannerPhoto: response.response.user.profileBannerPhoto,
            email: response.response.user.email,
            password: response.response.user.password,

        }

    }
}

export const EditProfile = () => {
    const token = localStorage.getItem('__user_JWT')
    const decoded = jwt_decode(token);


    const [infos, setInfos] = useState({})

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [profilePhoto, setProfilePhoto] = useState('')
    const [profileBannerPhoto, setProfileBannerPhoto] = useState('')



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

            setEmail(infos.email)
            setName(infos.userName)
            setPassword(infos.password)
            setProfileBannerPhoto(infos.profileBannerPhoto)
            setProfilePhoto(infos.profilePhoto)

        }
        fetchData()
    }, [infos.userName, infos.email, infos.password, infos.personName, infos.profilePhoto, infos.profileBannerPhoto])

    function handleChildNameChange(value) {
        setName(value)
    }

    function handleChildEmailChange(value) {
        setEmail(value)
    }

    function handleChildPasswordChange(value) {
        setPassword(value)
    }

    function handleChildProfilePhotoChange(value) {
        let storageRef = ref(storage, `Client/${value.name}`);
        if (Boolean(localStorage.getItem('__user_isVet'))) {
            storageRef = ref(storage, `Veterinario/${value.name}`);
        }
        uploadBytes(storageRef, value).then(() => {
            console.log('Arquivo enviado com sucesso!');
            return getDownloadURL(storageRef)
        }).then((url) => {
            setProfilePhoto(url)
        });

    }

    function handleChildProfileBannerPhotoChange(value) {
        let storageRef = ref(storage, `Client/${value.name}`);
        if (Boolean(localStorage.getItem('__user_isVet'))) {
            storageRef = ref(storage, `Veterinario/${value.name}`);
        }
        uploadBytes(storageRef, value).then(() => {
            console.log('Arquivo enviado com sucesso!');
            return getDownloadURL(storageRef)
        }).then((url) => {
            setProfileBannerPhoto(url)
        });

    }

    return (
        <div>
            <PetHeader name={infos.personName} />
            <div className="flex flex-col gap-y-3 items-center justify-center h-full pt-[80px] px-[10%] ">
                <TopContainer onProfileBannerPhotoChange={handleChildProfileBannerPhotoChange} profileBannerPhoto={infos.profileBannerPhoto} />
                <InfosProfile
                    onNameChange={handleChildNameChange}
                    onEmailChange={handleChildEmailChange}
                    onPasswordChange={handleChildPasswordChange}
                    onProfilePhotoChange={handleChildProfilePhotoChange}
                    userName={infos.userName} completName={infos.personName} email={infos.email} password={infos.password} profilePhoto={infos.profilePhoto}
                />
                <button className='md:flex md:end-40  self-end rounded-lg bg-[#9ED1B7] mt-5 shadow-md mb-7' onClick={() => {

                    let profileInfos = {
                        userName: name,
                        email: email,
                        password: password,
                        profileBannerPhoto: profileBannerPhoto,
                        profilePhoto: profilePhoto
                    }

                    if (Boolean(decoded.isVet))
                        updateProfileInfosVeterinary(profileInfos)
                    else
                        updateProfileInfosClient(profileInfos)


                    document.location.href = '/profile/upgradeUser'

                }}>
                    <img src={check} className='w-10 h-10 my-5 mx-5' />
                </button>
            </div>
        </div>
    );
}
