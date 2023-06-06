import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { TopContainer } from './resource/editProfile/topContainer';
import { InfosProfile } from './resource/editProfile/infosProfile';
import { updateProfileInfosClient, updateProfileInfosVeterinary } from '../../services/integrations/user';
import { PetHeader } from './pet/petHeader';
import verifyIfUserHasUserName from "../../utils/verifyIfUserHasUserName";
import getUserInfos from "../../utils/getUserInfos";
import Notifications from "../../utils/Notifications";
import { AiOutlineCheck } from 'react-icons/ai';

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

export const EditProfile = () => {
	const [infos, setInfos] = useState({})
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [profilePhoto, setProfilePhoto] = useState('')
	const [profileBannerPhoto, setProfileBannerPhoto] = useState('')

	useEffect(() => {
		async function verifyUserName() {
			const userHasUserName = await verifyIfUserHasUserName()
			if (!userHasUserName) await Notifications.warning('Crie um nome de usuário')
		}
		async function fetchData() {
			const allInfosUser = (await getUserInfos())
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
		verifyUserName()
		fetchData()
	}, [infos.email, infos.personName])

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
		if (value) {
			uploadBytes(storageRef, value)
				.then(() => getDownloadURL(storageRef))
				.then((url) => {
					if (url !== undefined) {
						setProfilePhoto(`${url}`);
					} else {
						setProfilePhoto('');
					}
				});
		} else {
			setProfilePhoto('');
		}
	}

	async function handleChildProfileBannerPhotoChange (value) {
		let storageRef = ref(storage, `Client/${value.name}`);
		if (Boolean(localStorage.getItem('__user_isVet'))) {
			storageRef = ref(storage, `Veterinario/${value.name}`);
		}
		if (value) {
			uploadBytes(storageRef, value).then(() => {
				return getDownloadURL(storageRef)
			}).then((url) => {
				setProfileBannerPhoto(`${url}`)
			});
		} else {
			setProfileBannerPhoto('')
		}
	}

	async function editInformations() {
		let profileInfos = {
			userName: name,
			email: email,
			password: `${password}`,
			profileBannerPhoto: profileBannerPhoto,
			profilePhoto: profilePhoto
		}

		if (profileInfos.email.includes("@")) {
			if (localStorage.getItem('__user_isVet') === 'true'){
			updateProfileInfosVeterinary(profileInfos).then(async (response) => {
				if (response && typeof response === 'object') {
					console.log(response);
					
					if (response.hasOwnProperty('message')) await Notifications.error('E-mail já está em uso')
				} else {
					await Notifications.success('Informações atualizadas com sucesso')
					document.location.href = '/profile/configuration'
				}
			})}
			else
			
			updateProfileInfosClient(profileInfos).then(async (response) => {
				if (response && typeof response === 'object') {
					if (response.hasOwnProperty('message')) await Notifications.error('E-mail já está em uso')
				} else {
					await Notifications.success('Informações atualizadas com sucesso')
					document.location.href = '/profile/configuration'
				}
			})
		}else 
			await Notifications.error("Informe um E-mail válido")
		
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
				<AiOutlineCheck
					className='text-5xl h-20 w-20 self-end rounded-2xl text-green-900 hover:text-green-600 border-solid border-green-900 hover:border-green-600 hover:scale-110 border-2 bg-green-200 mt-5 shadow-md mb-7 p-5 cursor-pointer transition-all'
					onClick={editInformations}
				/>
			</div>
		</div>
	);
}
