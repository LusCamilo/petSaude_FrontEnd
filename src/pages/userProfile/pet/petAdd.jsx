import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { PetHeader } from './petHeader';
import "../css/UpgradeUser.css"
import addMais from "../resource/img/AddMais.png"
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { styled } from '@stitches/react';
import { petAdd } from "../../../services/integrations/pet.js";
import './css/pet.css'
import { getSpecialtiesPet } from '../../../services/integrations/specialtiesPet';
import { toast } from 'react-toastify';
import Notifications from '../../../utils/Notifications';
import { AiOutlineCheck } from 'react-icons/ai';
import {IoMdAdd} from "react-icons/io";


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

const checkboxSpecialitiesPet = async () => {
	const response = await getSpecialtiesPet()
	return {
		allSpecialitiesPet: response.response,
	}
}

export const PetAdd = () => {

	const [especialidadesPet, setEspecialidadesPet] = useState([])
	const [animalType, setAnimalType] = useState('Espécie')


	let hoje = new Date();
	let ano = hoje.getFullYear();
	let mes = hoje.getMonth() + 1;
	let dia = hoje.getDate();
	if (mes < 10) mes = '0' + mes
	if (dia < 10) dia = '0' + dia
	let dataFormatada = `${ano}-${mes}-${dia}`;


	useEffect(() => {
		async function fetchDataAll() {
			const dadosPet = await checkboxSpecialitiesPet()

			setEspecialidadesPet(dadosPet.allSpecialitiesPet)
		}

		fetchDataAll()
	}, [])

	const [name, setName] = useState("Nome")
	function newName(event) {
		setName(event.target.value);
	}

	const [bornDate, setBornDate] = useState("DataDeNascimento")
	function newBornDate(event) {
		setBornDate(event.target.value);
	}

	const [tamanho, setTamanho] = useState(["Pequeno", "SMALL"])
	const [sexo, setSexo] = useState(["Macho", "M"])


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

	const showErrorMessage = () =>{
		toast.error('Erro ao criar o pet, veja se todas as informações foram escritas corretamente', {
			position: "top-right",
			autoClose: 1900,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
			});
	}

	const showSucessMessage = () => {
		toast.success('Criando pet', {
			position: "top-right",
			autoClose: 1900,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
			});
	}

	const submitPet = async () => {
		let date = bornDate.split("-").reverse().join("-")

		if (selectedFile == undefined || selectedFile == null) {
			setSelectedFile('')
		}

		const petInfos = {
			name: name,
			birthDate: date,
			photo: selectedFile,
			microship: false,
			size: tamanho[1],
			gender: sexo[1],
			specie: animalType,
		}

		let newPet
		let resultAPI

		if (petInfos.photo == undefined || petInfos.photo == null) {
			newPet = {
				name: name,
				birthDate: date,
				photo: "",
				microship: false,
				size: tamanho[1],
				gender: sexo[1],
				specie: animalType,
			}

			resultAPI = await petAdd(newPet, localStorage.getItem("__user_id"), localStorage.getItem("__user_JWT"))

		} else {
			resultAPI = await petAdd(petInfos, localStorage.getItem("__user_id"), localStorage.getItem("__user_JWT"))
			console.log(resultAPI);
		}

		if (resultAPI.response.statusCode == 201) {

			await Notifications.success('Pet Criado com sucesso')
			setTimeout(() => {
				document.location.href = "/profile/configuration";
			}, 1600); 
	
		}
	}

	const handleFileInputChange = (event) => {
		const file = event.target.files[0]
		const storageRef = ref(storage, `Pet/${file.name}`);
		uploadBytes(storageRef, file).then(() => {
			return getDownloadURL(storageRef)
		}).then((url) => {
			setSelectedFile(url);
		});
	}

	const [selectedFile, setSelectedFile] = useState();
	const [modalIsOpen, setIsOpen] = React.useState(false);

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	function afterOpenModal() {
	}

	function cancelClose() {
		closeModal();
	}

	return (
		<section>
			<PetHeader/>
			<main className='static'>
				<div>
					<div className='flex justify-start p-3 sm:p-10 flex-row items-center content-center align-middle h-30 sm:h-80'>
						<div className="h-20 w-20 md:h-48 md:w-48 rounded-full ">
							<input type="file" accept="image/*" name="photo" id="photoProfile" className="hidden" onChange={handleFileInputChange} />
							<label htmlFor='photoProfile' style={{ backgroundImage: `url(${selectedFile})` }}
								className='flex justify-center items-center rounded-full bg-slate-900 w-full h-full bg-center bg-origin-content bg-no-repeat bg-cover cursor-pointer hover:bg-blend-darken'>
								<IoMdAdd className="text-8xl text-white" alt="Add icon"/>
							</label>
						</div>
						<div className='flex flex-col w-2/3 sm:w-fit p-3 sm:p-10'>
							<h2 className='bg-transparent border-none md:text-5xl font-medium'>{name}</h2>
							<h2 className='bg-transparent border-none text-3xl text-[#A9A9A9]'>{animalType}</h2>
						</div>
					</div>
				</div>
				<div className='w-full h-full border-none sm:border-solid border-2 rounded-lg border-black flex flex-col gap-5 md:p-10'>
					<h2 className='font-bold text-5xl flex justify-center sm:justify-start sm:text-6xl font-sans'>Informações</h2>
					<div className='flex flex-col sm:flex-row justify-start pr-20'>
						<div className='flex flex-col gap-3 sm:gap-5 justify-start w-full sm:w-1/3 mb-2'>
							<label className='flex flex-col text-2xl text-[#A9A9A9]'>
								Nome
								<input type="text" onBlurCapture={newName} name="nameAnimal" id="nameAnimal" placeholder='Nome' className='h-fit bg-transparent placeholder:text-black  placeholder:text-2xl border-none text-2xl text-[#000]' />
							</label>
							<div>
								<label className='flex flex-col text-2xl text-[#A9A9A9]'>
									Sexo
									<DropdownMenu.Root className="w-full">
										<DropdownMenu.Trigger className='flex justify-start text-black text-2xl'>{sexo[0]}</DropdownMenu.Trigger>
										<StyledContent>
											<StyledItem onSelect={() => setSexo(["Fêmea", "F"])}>Fêmea</StyledItem>
											<StyledItem onSelect={() => setSexo(["Macho", "M"])}>Macho</StyledItem>
											<StyledArrow />
										</StyledContent>
									</DropdownMenu.Root>
								</label>
							</div>
							<div>
								<label className='flex flex-col text-2xl text-[#A9A9A9]'>
									Espécie
									<DropdownMenu.Root className="w-full">
										<DropdownMenu.Trigger className='h-fit flex justify-start text-black text-2xl'>{animalType}</DropdownMenu.Trigger>
										<StyledContent>
											{especialidadesPet.map((item) => {
												return<StyledItem onSelect={() => setAnimalType(item.name)}>{item.name}</StyledItem>
											})}
											<StyledArrow />
										</StyledContent>
									</DropdownMenu.Root>
								</label>
							</div>
						</div>
						<div className='flex flex-col sm:flex-col gap-3 mb-5 sm:gap-5 justify-start content-center w-full sm:w-1/3'>
							<div className='w-3/4'>
								<label className='flex flex-col text-2xl text-[#A9A9A9] w-3/4'>
									Data de Nascimento
									<input type="date" onBlurCapture={newBornDate} name="firstName" className='h-fit w-full border-none text-2xl text-[#000] ' max={dataFormatada} />
								</label>
							</div>
							<div>
								<label className='flex flex-col text-2xl text-[#A9A9A9] sm:w-1/4'>
									Tamanho
									<DropdownMenu.Root className="w-full">
										<DropdownMenu.Trigger className='h-fit flex justify-start text-black text-2xl'>{tamanho[0]}</DropdownMenu.Trigger>
										<StyledContent>
											<StyledItem onSelect={() => setTamanho(["Grande", "BIG"])}>Grande</StyledItem>
											<StyledItem onSelect={() => setTamanho(["Médio", "MEDIUM"])}>Médio</StyledItem>
											<StyledItem onSelect={() => setTamanho(["Pequeno", "SMALL"])}>Pequeno</StyledItem>
											<StyledArrow />
										</StyledContent>
									</DropdownMenu.Root>
								</label>
							</div>
						</div>
					</div>
				</div>
				<div className='w-full flex justify-end mb-30'>
					<AiOutlineCheck
						className='text-5xl h-20 w-20 self-end rounded-2xl text-green-900 hover:text-green-600 border-solid border-green-900 hover:border-green-600 hover:scale-110 border-2 bg-green-200 mt-5 shadow-md mb-7 p-5 cursor-pointer transition-all'
						onClick={submitPet}
					/>
				</div>
			</main>
		</section>
	);
}