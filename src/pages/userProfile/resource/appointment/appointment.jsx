import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Monkey from '../../../../assets/svg/monkey.svg';
import Dog from '../../../../assets/svg/iconDog.svg';
import { getAllPets } from '../../../../services/integrations/pet';
import { appointmentAdd } from '../../../../services/integrations/appointment';
import jwt_decode from "jwt-decode";
import 'react-toastify/dist/ReactToastify.css';
import Notifications from "../../../../utils/Notifications";

export default function submitAppointment(object) {
	const vet = localStorage.getItem("__Vet_correctId");
	const appointmentInfos = {
		date: object.date,
		startsAt: object.date + ' ' + object.startsAt,
		description: object.description,
		veterinaryId: parseInt(vet, 10),
		petId: object.petId,
	}

	console.log(appointmentInfos);
	sessionStorage.setItem("appointment", JSON.stringify(appointmentInfos))

	return appointmentInfos	
}

export const Appointment = () => {
	const [json, setJson] = useState({})
	const [date, setDate] = useState('')
	const [startsAt, setStartAt] = useState('')
	const [description, setDescription] = useState('')
	const [petId, setPetId] = useState(0)
	const [petsAll, setPetAll] = useState([]);
	const [petsName, setPetName] = useState('Nome');
	const [ThereArentPets, setThereArentPets] = useState('hidden');
	const [ThereArePets, setThereArePets] = useState('flex');
	const [petsEspecie, setPetEspecie] = useState('Tamanho');
	const [petImage, setPetImage] = useState(Monkey)

	useEffect(() => {
		const fetchData = async () => {
			const token = localStorage.getItem('__user_JWT')
			const decoded = jwt_decode(token);
			if (decoded.id) {
				const pets = await getAllPets(decoded.id);
				if (pets == 'Não foram encontrados registros no Banco de Dados') {
					await Notifications.error('Você não tem pets!', 'Crie um pet para fazer uma consulta!')
					setTimeout(function () {
						document.location.href = '/profile/pet/add'
					}, 3000);
				} else {
					if (pets === null || pets === undefined || pets === []) {
						setPetAll([{ name: "Não foram encontrados pets" }]);
						setThereArentPets('flex')
						setThereArePets('hidden')
					} else setPetAll(pets)
				}
			} else {
				setPetAll(["Não foram encontrados pets"]);
				setThereArentPets('flex')
				setThereArePets('hidden')
			}
		};
		fetchData();
	}, [json]);

	function newDate(event) {
		let valor = event.target.value;
		let novaData = adicionarUmDia(valor)
		let dia = novaData.toLocaleDateString("pt-BR");
		let diaMesAno = dia.split('/').join('-');
		setDate(diaMesAno);
		setJson({
			date: date,
			startsAt: startsAt,
			description: description,
			petId: petId
		})
	}

	function adicionarUmDia(data) {
		let novaData = new Date(data);
		novaData.setDate(novaData.getDate() + 1);
		return novaData;
	}

	function newDescription(event) {
		setDescription(event.target.value);
		setJson({
			date: date,
			startsAt: startsAt,
			description: description,
			petId: petId
		})
	}

	function newTime(event) {
		setStartAt(event.target.value + ":00");
		setJson({
			date: date,
			startsAt: startsAt,
			description: description,
			petId: petId
		})
	}

	let hoje = new Date();
	let ano = hoje.getFullYear();
	let mes = hoje.getMonth() + 1;
	let dia = hoje.getDate();
	if (mes < 10) mes = '0' + mes
	if (dia < 10) dia = '0' + dia
	let dataFormatada = `${ano}-${mes}-${dia}`;

	function handlePetSelection(pet) {
		setPetName(pet.name);
		setPetEspecie(pet.petSpecie.name);
		setPetId(pet.id);
		if (pet.photo === null) {
			setPetImage(Dog);
		} else setPetImage(pet.photo);
		setJson({
			date: date,
			startsAt: startsAt,
			description: description,
			petId: petId
		})
	}

	submitAppointment(json)


	return (
		<section id='buttonCanceled' className=" w-full h-full p-10">
			<form className=" flex justify-start w-full">
				<div className=' w-full'>
					<h1 className='flex justify-start text-3xl md:text-5xl font-normal'>Selecione o animal</h1>
					<div className='flex justify-between md:pt-5 w-full h-56 gap-20 '>
						<div
							className={`${ThereArePets} flex-col md:w-2/4  md:p-5 md:pt-3 overflow-x-auto max-h-64 border-2 rounded-xl shadow-lg  bg-slate-100 w-10`}>
							{petsAll.map(pet => {
								if (pet.photo === null || pet.photo === '') {
									return (
										<button
											className='py-2 mt-2 bg-slate-500 gap-2 rounded-md flex-grow border-2 border-black flex flex-row '
											key={pet.id}
											type='button'
											id={pet.id}
											onClick={() => handlePetSelection(pet)}
										>
											<img className='w-32' src={Dog} alt="Pet ainda não há foto" />
											<p
												className='text-2xl shadow-none  w-full flex text-center align-middle content-center items-center text-black'
												disabled>{pet.name}</p>
										</button>
									)
								} else {
									return (
										<button
											key={pet.id}
											type='button'
											className='py-2 mt-2 shadow-lg gap-2 rounded-md flex-grow flex flex-row bg-white'
											id={pet.id}
											onClick={() => handlePetSelection(pet)}
										>
											<img className='w-32 ml-3' src={pet.photo} alt={pet.name} />
											<p
												className='text-3xl shadow-none w-full flex text-center align-middle content-center items-center text-black '
												disabled>{pet.name}</p>
										</button>
									)
								}

							})}
						</div>
						<div
							className={`${ThereArentPets} flex-col md:w-2/4  md:p-5 overflow-x-auto max-h-64 border-2 rounded-xl border-gray-400`}>
							<div className='py-2 mt-2 bg-slate-500 gap-2 rounded-md flex-grow border-2 border-black flex flex-row'>
								<img className='w-32' src={Dog} alt="Pet ainda não há foto" />
								<p
									className='text-2xl shadow-none w-full flex text-center align-middle content-center items-center text-black'
									disabled>Você não possui pets</p>
							</div>
						</div>
						<div className='hidden md:flex justify-end pl-20'>
							<img className=' w-56 rounded-full' src={petImage} alt={'Pet'}></img>
							<div className='flex flex-col pl-10 md:pt-10'>
								<label>
									<input disabled type="text" name="firstName" value={petsName}
										className='bg-transparent text-black border-none  md:text-5xl font-normal ' />
								</label>
								<label>
									<input disabled type="text" name="firstName" value={petsEspecie}
										className='bg-transparent border-none text-1xl md:text-5xl text-[#A9A9A9]' />
								</label>
							</div>
						</div>
					</div>
				</div>
				<div className=' w-full'>
					<div className='pt-10'>
						<h2 className='hidden md:flex md:text-4xl font-normal'>Informações</h2>
						<h2 className='flex justify-center text-3xl md:hidden md:text-5xl font-semibold'>Data e hora</h2>
						<div className='flex xl:flex-row flex-col justify-between w-1/2 pt-5 text-start gap-32'>
							<label className='flex flex-col text-gray-400 '>
								Data
								<input className='w-56' type='date' onChange={newDate} min={dataFormatada} />
							</label>
							<label className='flex flex-col text-gray-400'>
								Hora
								<input className='w-56' type='time' onChange={newTime} />
							</label>
						</div>
						<div className='w-full mt-5'>
							<label htmlFor="descricao" className=" mb-2 flex justify-start pt-5">Descrição:</label>
							<textarea id="descricao" name="descricao" onBlur={newDescription}
								className="flex justify-start p-2 mt-5 border-2 border-black w-full rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
								rows="4" onChange={newDescription}></textarea>
						</div>
					</div>
					<div className='pt-5  '>
						<div className='flex mt-5 justify-between gap-5'>
						</div>
					</div>
				</div>

			</form>
		</section>
	);

};


