import React, { useState, useEffect } from 'react';
import iconVet from './img/iconVet.png'
import { Appointment } from './appointment/appointment';
import '../pet/css/pet.css'
import Modal from 'react-modal';
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		transform: 'translate(-50%, -50%)',
		border: '4px solid #9ED1B7',
		borderRadius: '10px',
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

	const [isVet, SetIsVet] = useState(false)
	useEffect(() => {
		const token = localStorage.getItem('__user_JWT')
		console.log(token);
		const decoded = jwt_decode(token);
		console.log(decoded ? decoded : '');
		console.log(decoded.profilePhoto);
		if (decoded.isVet === false) {
			SetIsVet(true)
		}
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
	let subtitle;
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

	//localStorage.getItem('__register_type') === "professional"

	if (isVet === true) {

		return (
			<div id='topHeader' className='flex flex-col items-center md:px-44'>
				<img src={props.profilePhoto} alt='Profile banner' className='w-full md:h-[500px] rounded-b-xl' />
				<div className='self-start w-full mt-[-120px] md:mt-[-80px] px-9 md:flex'>
					<img src={props.userPhoto} alt='Profile' className="flex relative pl-24 sm:pl-56 md:pl-0 md:border-4 h-28  md:h-48 md:border-white border-solid rounded-full" />
					<div className='flex flex-col md:flex-row justify-between w-full md:mt-16'>
						<div className='flex flex-col md:flex-row items-center gap-1 pt-4'>
							<div className='flex'>
								<p className='text-3xl md:text-4xl'>{props.name}</p>
								<img className='pl-2' src={iconVet} alt='Veterinary badge' />
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
						<div>
							<button className='botaoAppont bg-lime-500 rounded-md px-3 py-2 text-2xl w-full md:text-4xl md:w-96 shadow-lg justify-center self-center md:mt-10 z-10' onClick={openModal}>
								Agendar uma consulta
							</button>
						</div>
					</div>
				</div>
				<div className='w-full h-[1px] bg-gray-400 mt-2 '></div>
				<h2 className='self-start text-3xl pt-5 pb-2 pl-5'>Sobre Mim</h2>
				<div className='flex w-full p-5 text-justify'>
					<span className={`  md:w-11/12 ${props.biografia}`} id="biografia">
						{props.biografia}
						<a href="#" className={`text-sky-600 ${lerMenos}`} onClick={textTruncate} >
							ler menos
						</a>
					</span>
					<a href="#" className={`w-auto text-sky-600 ${lerMais}`} onClick={textTruncate} >
						ler mais
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
			</div >
		);
	} else {

		return (
			<div id='topHeader' className='flex flex-col items-center md:px-44'>
				<div className='w-full md:max-h-[500px] h-[500px] rounded-b-xl relative overflow-hidden flex items-center justify-center'>
					<img src={props.profilePhoto} className='bg-cover w-full' alt='Profile banner' />
				</div>
				<div className='self-start w-full mt-[-120px] md:mt-[-80px] px-9 md:flex'>
					<img src={props.userPhoto} alt='Profile' className="bg-cover w-full flex relative pl-24 sm:pl-56 md:pl-0 md:border-4 h-28 md:h-48 md:w-48 md:border-white border-solid rounded-full" />
					<div className='flex flex-col md:flex-row justify-between w-full md:mt-16'>
						<div className='flex flex-col md:flex-col md:items-start gap-1 pt-9 pl-3'>
							<div className='flex'>
								<p className='text-3xl md:text-4xl'>{props.name}</p>
								<img className='pl-2' src={iconVet} alt='Veterinary badge' />
							</div>
							<div className='flex'>
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
					</div>
				</div>
				<div className='w-full h-[1px] bg-gray-400 mt-2 '></div>
				<h2 className='self-start text-3xl pt-5 pb-2 pl-5'>Sobre Mim</h2>
				<div className='flex w-full p-5 text-justify'>
					<span className={`md:w-11/12 ${props.biografia}`} id="biografia">
						{props.biografia}
						<a href="#" className={`text-sky-600 ${lerMenos}`} onClick={textTruncate} >
							ler menos
						</a>
					</span>
					<a href="#" className={`w-auto text-sky-600 ${lerMais}`} onClick={textTruncate} >
						ler mais
					</a>
				</div>
			</div >
		);
	}
}
