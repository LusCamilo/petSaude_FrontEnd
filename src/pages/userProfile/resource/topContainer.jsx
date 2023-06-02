import React, { useState, useEffect } from 'react';
import iconVet from './img/iconVet.png'
import '../pet/css/pet.css'
import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getVeterinary } from '../../../services/integrations/user';
import Notifications from "../../../utils/Notifications";
import Ellipsis from 'react-lines-ellipsis';
import { appointmentAdd } from '../../../services/integrations/appointment';

export const TopContainer = (props) => {
	const [biography, setBiography] = useState("truncate")
	const [lerMais, setLerMais] = useState("")
	const [lerMenos, setLerMenos] = useState("hidden")
	const [Stringappoinment, setStringAppoinment] = useState('Consultas concluidas')
	const [bio, setBio] = useState('')

	const showToastMessage = (message) => {
		toast(`${message}`, {
			position: "top-right",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	};

	const [isVet, SetIsVet] = useState('hidden')
	const [thisUserIsVet, setThisUserIsVet] = useState(props.isVet)

	useEffect(() => {
		const token = localStorage.getItem('__user_JWT')
		const decoded = jwt_decode(token);
		if (decoded.isVet == false) {
			SetIsVet("flex")
		}

		setThisUserIsVet(decoded.isVet)
		textTruncate(false)
		async function fetchData() {
			let allInfos = await getVeterinary(localStorage.getItem("__Vet_correctId"))
			let allAppoinments = await allInfos.response.user.Appointments
			let quantAppontments = allAppoinments.filter(appointment => appointment.status === "CONCLUDED");
			let quant = quantAppontments.length
			if (quant === 1) {
				setStringAppoinment('Consulta Concluida')
			} else if (quant <= 0) {
				setStringAppoinment('Não há consultas concluidas')
			} else {
				setStringAppoinment('Consultas concluidas')
			}
		}
		fetchData();
	}, []);

	const textTruncate = (bool) => {
		const biografia = document.getElementById('biografia')
		if (bool == true) {
			setBiography("flex")
			setLerMais("hidden")
			setLerMenos("flex")
		}
		else {
			setBiography("truncate")
			setLerMais("flex")
			setLerMenos("hidden")
		}
	}

	const [modalIsOpen, setIsOpen] = React.useState(false);

	// function openModal() {
	// 	setIsOpen(true);
	// }

	function closeModal() {
		setIsOpen(false);
	}

	localStorage.setItem('OpenOrClose', false)

	function handleCancelAppointment() {
		closeModal();
	}



	function isValidImageUrl(url) {
		const imageUrlRegex = /\.(jpe?g|tiff?|png|bmp|webp)$/i;
		return imageUrlRegex.test(url);
	}

	useEffect(() => {
		if (props.biografia == null) setBio('Este veterinário ainda não possui biografia')
		else setBio(props.biografia)

	}, [props.biografia])

	async function openAppointmentModal() {

		await Notifications.appointment(handleCancelAppointment, showToastMessage).then(async result => {
			if (result.isConfirmed) {
				const addAppointment = await appointmentAdd(JSON.parse(localStorage.getItem("appointment")));
				if (addAppointment.response.message === 'Consulta criada com sucesso') {
					await Notifications.success(addAppointment.response.message)
				} else if (addAppointment.response === "A data não pode ser anterior a atual" || addAppointment.response === "Já existe uma consulta agendada para o Veterinário nesse horário") {
					await Notifications.error('Data inválida', addAppointment.response)
				} else {
					await Notifications.error('Erro ao marcar a consulta', "Verifique se todos os dados foram inseridos")
				}
			}
			sessionStorage.removeItem("appointment")
		})
	}

	return (
		<div id='topHeader' className='flex flex-col items-center md:px-44'>
			<div className='w-full md:h-[500px] rounded-b-xl bg-gray-300'>
				<img src={isValidImageUrl(props.profileBannerPhoto) || props.profileBannerPhoto == '' ? '' : props.profileBannerPhoto} alt='Profile banner' className={'w-full md:h-[500px] rounded-b-xl object-cover'
				} />
			</div>
			<div className='self-start w-full mt-[-120px] md:mt-[-80px] md:flex ml-9 h-fit'>
				<div className='flex relative md:border-4 h-28 w-28 md:h-48 md:border-white border-solid rounded-full md:w-48 items-center justify-center bg-white'>
					<img
						src={isValidImageUrl(props.profilePhoto) || props.profilePhoto == '' ? 'https://www.svgrepo.com/show/335455/profile-default.svg' : props.profilePhoto}
						alt='Profile'
						className="h-full w-full rounded-full"
					/>
				</div>
				<div className='flex flex-col md:flex-row justify-between w-5/6 md:mt-16'>
					<div className='flex flex-col md:flex-row items-center gap-1 pt-4'>
						<div className='flex ml-4'>
							<p className='text-3xl md:text-4xl'>{props.name}</p>
							{props.isVet ? <img className='pl-2' src={iconVet} alt='Veterinary badge' /> : null}
						</div>
						<div className='flex md:hidden'>
							<p className='flex justify-center text-xl'> 777
								<span className='pl-2 text-[#A9A9A9]'>Clientes</span>
							</p>
						</div>
					</div>
					<div className='flex md:hidden justify-center gap-2 pt-4'>
						<div className='border shadow-lg  rounded text-center w-full p-2 font-normal'>
							<h3>Total de consultas</h3>
							<p>465</p>
						</div>
						<div className='border shadow-lg rounded text-center w-72 p-2 bg-[#E3EFF0] font-semibold text-[#09738A]'>
							<h3>Avaliação</h3>
							<p>9,8/10</p>
						</div>
					</div>
					{props.isVet && !props.myProfile && !thisUserIsVet ?
						<button
							className='bg-lime-500 rounded-lg p-3 h-fit text-xl md:text-3xl shadow-lg md:mt-10'
							onClick={openAppointmentModal}>
							Agendar uma consulta
						</button> : null}
				</div>
			</div>
			<div className='w-full h-[1px] bg-gray-400 mt-2'></div>
			{bio !== null ? (
				<>
					<h2 className='self-start text-3xl mt-2'>Sobre mim</h2>
					<div className='w-full h-auto text-justify'>
						<Ellipsis
							id="biografia"
							className={`md:w-auto text-[#A9A9A9] text-xl ${biography} flex-col`}
							text={bio}
							maxLine="10"
							ellipsis="..."
							trimRight
							basedOn="letters"
						/>
						<a href="#" className={`text-[#09738A] ${lerMenos} text-xl font-semibold`} onClick={() => textTruncate(false)}>
							Ler menos
						</a>
						<a href="#" className={`w-auto text-[#09738A]  ${lerMais} text-xl font-semibold`} onClick={() => textTruncate(true)}>
							Ler mais
						</a>
					</div>
				</>
			) : <span></span>}

		</div>
	);
}
