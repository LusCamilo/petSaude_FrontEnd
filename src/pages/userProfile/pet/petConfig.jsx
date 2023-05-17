import React, {useEffect, useState} from 'react';
import {initializeApp} from 'firebase/app';
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';
import {useForm} from "react-hook-form";
import {PetHeader} from './petHeader';
import addMais from "../resource/img/AddMais.png"
import linha from "../../../assets/svg/linha.svg"
import '../../reset.css';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {styled} from '@stitches/react';
import certo from '../resource/img/Certo.jpg'
import lixeira from '../resource/img/Excluir.png'
import {PetAddSucess} from './cards/sucess';
import * as Dialog from '@radix-ui/react-dialog';
import {PetAddWarn} from './cards/warn';
import './css/pet.css';
import lapis from '../../../assets/svg/pencil.svg';
import {getPet, petUpdate} from '../../../services/integrations/pet';

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

const maskPetSize = (tamanho) => {
	let tamanhoBr
	if (tamanho === "MEDIUM" || tamanho === "Médio")
		tamanhoBr = "Médio"
	else if (tamanho === "BIG" || tamanho === 'Grande')
		tamanhoBr = 'Grande'
	else
		tamanhoBr = "Pequeno"
	return tamanhoBr
}

const dataFormation = (date) => {
	let data = date.split("-")
	const dataReverse = data.reverse()
	return dataReverse.join('-')
}

const InfosUser = async () => {
	const response = await getPet(localStorage.getItem("__pet_id"))
	return {
		id: response.id,
		name: response.name,
		birthDate: response.birthDate,
		photo: response.photo,
		microship: response.microship,
		petSize: response.petSize,
		petGender: response.petGender,
		ownerId: response.ownerId,
		idSpecie: response.petSpecie.id,
		nameSpecie: response.petSpecie.name
	}
}

export const PetConfig = (props) => {
	const { register, handleSubmit, formState: errors, setValue } = useForm()
	const [selectedFile, setSelectedFile] = useState('');
	const [tamanho, setTamanho] = useState('')
	const [name, setName] = useState('')
	const [sexo, setSexo] = useState('')
	function newName(event) {
		setName(event.target.value);
	}

	const [dateBorn, setDateBorn] = useState()
	function newDateBorn(event) {
		setDateBorn(event.target.value);
	}

	const [specie, setSpecie] = useState('')
	function newSpecie(event) {
		setSpecie(event.target.value);
	}

	const [infos, setInfos] = useState({})

	useEffect(() => {
		setSelectedFile(infos.photo ? infos.photo : '')
		setName(infos.name ? infos.name : '')
		setSpecie(infos.specie ? infos.specie : '')
		setTamanho(infos.size ? infos.size : '')
		setSexo(infos.gender ? infos.gender : '')
		setDateBorn(infos.birthDate ? infos.birthDate : '')
		async function fetchData() {
			const allInfosPet = await InfosUser()
			const dataFormation = allInfosPet.birthDate.split("T")
			let data = dataFormation[0].split("-")
			const newData = new Date(data[0], data[1], data[2])

			setInfos(
				{
					id: allInfosPet.id,
					name: allInfosPet.name,
					birthDate: newData.toISOString().slice(0, 10),
					photo: allInfosPet.photo,
					microship: allInfosPet.microship,
					size: allInfosPet.petSize,
					gender: allInfosPet.petGender,
					ownerID: allInfosPet.ownerId,
					specie: allInfosPet.nameSpecie,
				}
			)
		}
		fetchData()
	}, [infos.photo, infos.name, infos.specie, infos.size, infos.gender, infos.birthDate])

	const [petInfosDisable, petInfosDisableState] = useState({
		disable: true,
		class: ' text-slate-400'
	})
	const StyledContent = styled(DropdownMenu.Content, {
		minWidth: 130,
		backgroundColor: 'white',
		borderRadius: 6,
		padding: 5,
		boxShadow: '0px 5px 15px -5px hsla(206,22%,7%,.15)',
	});
	const StyledItem = styled(DropdownMenu.Item, {
		fontSize: 13,
		padding: '5px 10px',
		borderRadius: 3,
		cursor: 'default',

		'&:focus': {
			outline: 'none',
			backgroundColor: 'dodgerblue',
			color: 'white',
		},
	});
	const StyledArrow = styled(DropdownMenu.Arrow, {
		fill: 'white',
	});
	const handleFileInputChange = (event) => {
		const file = event.target.files[0]
		const storageRef = ref(storage, `Pet/${file.name}`);
		uploadBytes(storageRef, file).then(() => {
			return getDownloadURL(storageRef)
		}).then((url) => {
			setSelectedFile(url);
		});
	}

	return (
		<section>
			<PetHeader />
			<main className='static w-full'>
				<div>
					<div className='flex justify-start p-3 sm:p-10 flex-row items-center content-center align-middle h-30 sm:h-80'>
						<div className="h-20 w-1/3 sm:h-48 sm:40 md:w-56 rounded-full ">
							<input type="file" accept="image/*" name="photo" id="photoProfile" className="hidden" onChange={handleFileInputChange} />
							<label htmlFor='photoProfile' style={{ backgroundImage: `url(${selectedFile})` }}
							       className='flex justify-center items-center rounded-full bg-slate-200 w-full h-full bg-center bg-origin-content bg-no-repeat bg-cover cursor-pointer hover:bg-blend-darken '>
								<img className src={addMais} alt='Add icon' />
							</label>
						</div>
						{infos.id && (
							<div className='flex flex-col w-2/3 sm:w-full p-3 sm:p-10'>
								<p className='md:text-5xl font-medium '>{name}</p>
								<p className='md:text-5xl font-normal text-[#A9A9A9]'>{specie}</p>
							</div>
						)}
					</div>
				</div>
				<div className='w-full h-full border-none sm:border-solid border-2 rounded-lg border-black flex flex-col gap-10 pl-3 sm:pl-20 py-8'>
					<h2 className='font-bold text-5xl flex justify-center sm:justify-start sm:text-6xl font-sans'>Informações </h2>
					<div className='flex flex-col sm:flex-row justify-between pr-20'>
						<div className='flex flex-col gap-3 sm:gap-5 justify-start w-full sm:w-1/3 mb-2'>
							<div>
								<label className='flex flex-col text-xl text-[#A9A9A9]'>
									Nome
									<input type="text" onBlur={newName} disabled={petInfosDisable.disable} name="nameAnimal" placeholder='Nome' className={`bg-transparent placeholder:text-black placeholder:text-3xl border-none text-2xl ${petInfosDisable.class}`} defaultValue={infos.name} id='petInfos' />
								</label>
							</div>
							<div>
								<label className='flex flex-col text-xl text-[#A9A9A9]'>
									Sexo
									<DropdownMenu.Root className="w-full">
										<DropdownMenu.Trigger disabled={petInfosDisable.disable} className={`flex justify-start  text-2xl ${petInfosDisable.class}`} {...register('name', { required: true })}>{sexo}</DropdownMenu.Trigger>
										<StyledContent >
											<StyledItem onSelect={() => setSexo("F")}>Feminino</StyledItem>
											<StyledItem onSelect={() => setSexo("M")}>Masculino</StyledItem>
											<StyledArrow />
										</StyledContent>
									</DropdownMenu.Root>
								</label>
							</div>
							<div>
								<label className='flex flex-col text-xl text-[#A9A9A9]'>
									Espécie
									<input type="text" disabled={petInfosDisable.disable} onBlur={newSpecie} defaultValue={infos.specie} name="especieAnimal" id="specisAnimal" placeholder='Espécie' className={`bg-transparent placeholder:text-black placeholder:text-3xl border-none text-2xl  ${petInfosDisable.class}`} />
								</label>
							</div>
						</div>
						<div className='flex flex-col sm:flex-col gap-3 mb-5 sm:gap-5 justify-start content-center w-full sm:w-1/3'>
							<div className='w-full'>
								<label className='flex flex-col text-xl text-[#A9A9A9]'>
									Data de Nascimento
									<input type="date" disabled={petInfosDisable.disable} onChange={newDateBorn} name="dateBorn" defaultValue={infos.birthDate} className={`bg-transparent border-none text-2xl text-[#000] w-full ${petInfosDisable.class}`} />
								</label>
							</div>
							<div>
								<label className='flex flex-col text-xl text-[#A9A9A9] '>
									Tamanho
									<DropdownMenu.Root className="w-full">
										<DropdownMenu.Trigger disabled={petInfosDisable.disable} className={`flex justify-start  text-2xl  ${petInfosDisable.class}`} {...register('tamanho', { required: true })}>{maskPetSize(tamanho)}</DropdownMenu.Trigger>
										<StyledContent>
											<StyledItem onSelect={() => setTamanho("Grande")} selected={tamanho === "Grande"}>Grande</StyledItem>
											<StyledItem onSelect={() => setTamanho("Médio")} selected={tamanho === "Médio"}>Médio</StyledItem>
											<StyledItem onSelect={() => setTamanho("Pequeno")} selected={tamanho === "Pequeno"}>Pequeno</StyledItem>
											<StyledArrow />
										</StyledContent>
									</DropdownMenu.Root>
								</label>
							</div>
						</div>
						<div className='w-full sm:w-1/3 flex justify-end content-center'>
							<button className='w-full sm:w-52 h-12 flex flex-row justify-center items-center gap-4 bg-[#ECECEC] rounded-full drop-shadow-lg' onClick={() => {

								if (document.getElementById('petInfos').disabled === true) {
									petInfosDisableState({
										disable: false,
										class: 'text-black'
									})
								} else {
									petInfosDisableState({
										disable: true,
										class: 'opacity-50 bg-white'
									})
								}
							}}>
								<img src={lapis} alt='Edit' />
								Editar
							</button>
						</div>
					</div>
				</div>
				<div className='w-full flex justify-between mb-30'>
					<Dialog.Root>
						<Dialog.Trigger asChild>
							<button className='mt-3' asChild>
								<img src={lixeira} alt="" />
							</button>
						</Dialog.Trigger>
						<Dialog.Portal >
							<Dialog.Overlay className="DialogOverlay" />
							<Dialog.Content className="DialogContent" class='cardPet'>
								<PetAddWarn />
							</Dialog.Content>
						</Dialog.Portal>
					</Dialog.Root>
					<Dialog.Root>
						<Dialog.Trigger asChild>
							<button className='mt-3' asChild onClick={() => {

								const data = dataFormation(dateBorn)

								let tamanhoPut

								if (tamanho === "Grande")
									tamanhoPut = "BIG"
								else if (tamanho === "Médio")
									tamanhoPut = "MEDIUM"
								else
									tamanhoPut = "SMALL"

								let infosPet = {
									name: name,
									birthDate: data,
									photo: selectedFile,
									microship: infos.microship,
									size: tamanhoPut,
									gender: sexo,
									ownerID: infos.ownerID,
									specie: specie,
								}

								const { id } = infos
								petUpdate(id, infosPet)
							}}>
								<img src={certo} alt="" />
							</button>
						</Dialog.Trigger>
						<Dialog.Portal >
							<Dialog.Overlay className="DialogOverlay" />
							<Dialog.Content className="DialogContent" class='cardPet'>
								<PetAddSucess what="Pet editado" />
							</Dialog.Content>
						</Dialog.Portal>
					</Dialog.Root>
				</div>
			</main>
		</section>
	);
}