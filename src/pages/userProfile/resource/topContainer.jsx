import React, { useState, useEffect } from 'react';
import iconVet from './img/iconVet.png'
import { Appointment } from './appointment/appointment';
import '../pet/css/pet.css'
import Modal from 'react-modal';
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getVeterinary } from '../../../services/integrations/user';
import isValidImageUrl from "../../../utils/isValidImageUrl";

const customStyles = {
	content: {
		top: '53%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		transform: 'translate(-50%, -50%)',
		border: '3px solid #9ED1B7',
		borderRadius: '32px',
		width: '75vw',
		height: '50vh',
		zIndex: 99,
	},
	overlay : {
		backgroundColor : '#0000',
		position : 'fixed'
	}
};

export const TopContainer = (props) => {
	const [biografia, setBiografia] = useState("truncate")
	const [lerMais, setLerMais] = useState("")
	const [lerMenos, setLerMenos] = useState("hidden")
	const [quantAppont, setQuantAppont] = useState(0)
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

		async function fetchData() {
			let allInfos = await getVeterinary(localStorage.getItem("__Vet_correctId"))
			let allAppoinments = await allInfos.response.user.Appointments
			let quantAppontments = allAppoinments.filter(appointment => appointment.status === "CONCLUDED");
			let quant = quantAppontments.length
			setQuantAppont(quant)
			if (quant === 1) {
				setStringAppoinment('Consulta Concluida')
			} else if(quant <= 0) {
				setStringAppoinment('Não há consultas concluidas')
			} else  {
				setStringAppoinment('Consultas concluidas')
			}
		  }
		  fetchData();
	}, []);

	const textTruncate = () => {
		const biografia = document.getElementById('biografia')
		if (biografia.classList.contains("truncate")) {
			setBiografia("")
			setLerMais("hidden")
			setLerMenos("")
		}
		else {
			setBiografia("truncate")
			setLerMais("")
			setLerMenos("hidden")
		}
	}
	const [modalIsOpen, setIsOpen] = React.useState(false);

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
		//subtitle.style.color = '#f00';
	}
	const [estadoApp, setEstadoApp] = useState()
	localStorage.setItem('OpenOrClose', false)

	function handleCancelAppointment() {
		closeModal();
	}

	function isValidImageUrl(url) {
		const imageUrlRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
		return imageUrlRegex.test(url);
	}

	useEffect(() => {

		setBio(props.biografia)

	}, [props.biografia])


	return (
		<div id='topHeader' className='flex flex-col items-center md:px-44'>
			<div className='w-full md:h-[500px] rounded-b-xl bg-gray-300'>
				<img src={props.profileBannerPhoto} alt='Profile banner' className={'w-full md:h-[500px] rounded-b-xl' + isValidImageUrl(props.profileBannerPhoto) ? ' hidden' : null
			}/>
			</div>
			<div className='self-start w-full mt-[-120px] md:mt-[-80px] md:flex ml-9 h-fit'>
				<div className='flex relative md:border-4 h-28 w-28 md:h-48 md:border-white border-solid rounded-full md:w-48 items-center justify-center bg-white'>
					<img
						src={isValidImageUrl(props.profilePhoto) || props.profilePhoto === '' ? 'https://www.svgrepo.com/show/335455/profile-default.svg' : props.profilePhoto}
						alt='Profile'
						className="h-full w-full rounded-full"
					/>
				</div>
				<div className='flex flex-col md:flex-row justify-between w-5/6 md:mt-16'>
					<div className='flex flex-col md:flex-row items-center gap-1 pt-4'>
						<div className='flex ml-4'>
							<p className='text-3xl md:text-4xl'>{props.name}</p>
							{props.isVet ? <img className='pl-2' src={iconVet} alt='Veterinary badge'/> : null}
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
						onClick={openModal}>
						Agendar uma consulta
					</button> : null}
				</div>
			</div>
			<div className='w-full h-[1px] bg-gray-400 mt-2'></div>
			<h2 className='self-start text-3xl mt-2'>Sobre mim</h2>
			<div className='w-full h-auto text-justify bg-violet-400'>
				<span className={`md:w-auto text-[#A9A9A9] text-xl`} id="biografia">
					{bio + '...  '}
					<a href="#" className={`text-[#09738A] truncate ${lerMenos} text-xl font-semibold`} onClick={textTruncate}>
						Ler menos
					</a>
				</span>
				<a href="#" className={`w-auto text-[#09738A] truncate ${lerMais} text-xl font-semibold`} onClick={textTruncate}>
					Ler mais
				</a>
			</div>
			<Modal
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<form className='w-full'>
					<Appointment onCancel={handleCancelAppointment} onToast={showToastMessage}/>
				</form>
			</Modal>
			<ToastContainer
				position="top-center"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</div>
	);
}
