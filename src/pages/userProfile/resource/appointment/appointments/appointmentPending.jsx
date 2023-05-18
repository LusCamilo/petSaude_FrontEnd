import React, { useState, useEffect } from 'react';
import './styleAppointment.css'
import jwt_decode from "jwt-decode";
import { getAppointments } from '../../../../../services/integrations/appointment';
import { getUser, getVeterinary} from '../../../../../services/integrations/user'
import {  canceladoAppointments, finalizadoAppointments } from '../../../../../services/integrations/appointment'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal'
import { WarnRequest } from '../../../pet/cards/warnTwo';
import { PetAddSucess } from '../../../pet/cards/sucess';
import cuidado from '../../../../userProfile/resource/img/Cuidado.png'
import { AppointmentPedingCards } from './appointmentPedingCards';

const customStylesWarn = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		borderRadius: '10px',
		width: '30vw',
		height: '30vh',
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F9DEDC"
	}
};

const customStylesSucess = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		borderRadius: '10px',
		width: '30vw',
		height: '30vh',
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#E3EFF0"
	}
};

export const AppointmentPeding = (props) => {

	const [pedidos, setPedido] = useState([])
	const [tutorStatus, setTutorStatus] = useState('hidden')
	const [buttonStatus, setButtonStatus] = useState('flex')
	const [buttonAceitar, setButtonAceitar] = useState('flex')
	const [showVet, setShowVet] = useState('hidden')
	const [showClient, setShowClient] = useState('flex')
	const [divNothing, setDivNothing] = useState('hidden')
	const [duracao, setDuracao] = useState(0)
	const [preco, setPreco] = useState(0.0)

	const [warn, setWarn] = React.useState(false);
	const [Sucess, setSucess] = React.useState(false);

	function openModalQuestionWarn() {
		setWarn(true)
	}

	function closeModalQuestionWarn() {
		setWarn(false);
	}

	function openModalQuestionSucess() {
		setSucess(true)
	}

	function closeModalQuestionSucess() {
		setSucess(false);
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const token = localStorage.getItem('__user_JWT')
				const decoded = jwt_decode(token);
				let appoint = await getappo(decoded.id)

				if (appoint !== undefined && appoint !== null) {

					let filteredAppointments = appoint.filter(appointment => appointment.status === 'SCHEDULED');

					let appoints = await Promise.all(filteredAppointments.map(async (app) => {
						let client = await getclient(app.clientId);
						let arrayPet = await getPet(app.petId, client.Pet)
						let vet = await getvet(app.veterinaryId);
						const consultaDataSplit = app.date.split('T');
						const consultaDataPrimeiraMetade = consultaDataSplit[0];
						const consultaDataFormatada = consultaDataPrimeiraMetade.split('-').reverse().join('/');


						const horarioSplit = app.startsAt.split('T');
						const horarioSegundaMetade = horarioSplit[1];
						const horarioSplit2 = horarioSegundaMetade.split(':00.000Z');
						const horario = horarioSplit2[0];

						const dataDeNascimento = new Date(arrayPet.birthDate);
						const dataAtual = new Date();

						const diferencaEmMilissegundos = dataAtual - dataDeNascimento;
						const idadeEmAnos = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24 * 365));

						let idadeString;

						if (typeof idadeEmAnos === "number" && Number.isInteger(idadeEmAnos)) {
							idadeString = idadeEmAnos.toString() + " anos";
						} else {
							const idadeEmMeses = idadeEmAnos * 12;
							idadeString = idadeEmMeses.toString() + " meses";
						}

						const formattedDuration = formatDuration(app.duration);

						const finalArray = {
							idAppoint: app.id,
							imagemPet: arrayPet.photo,
							donoImg: client.profilePhoto,
							dono: client.personName,
							telefone: client.cellphoneNumber,
							nomePet: arrayPet.name,
							sexo: arrayPet.petGender,
							especie: arrayPet.petSpecie.name,
							tamanho: arrayPet.petSize,
							idade: idadeString,
							dataConsulta: consultaDataFormatada,
							horario: horario,
							descricao: app.description,
							duration: formattedDuration,
							vetName: vet.personName,
							vetPhone: vet.cellphoneNumber,
							vetPhoto: vet.profilePhoto
						};

						return finalArray;
					}));
					setDivNothing('hidden')
					setPedido(appoints)
				} else {
					setDivNothing('flex')
					setPedido([])

				}


				if (decoded.isVet === false) {
					setButtonAceitar('hidden')
				}
			} catch (error) {
			}
		}
		fetchData();
	}, []);

	function formatDuration(duration) {
		const hours = Math.floor(duration / 60);
		const minutes = duration % 60;
		const formattedHours = hours.toString().padStart(2, '0');
		const formattedMinutes = minutes.toString().padStart(2, '0');
		return `${formattedHours}h${formattedMinutes}min`;
	}

	const getPet = async (idPet, arrayPet) => {
		const filteredPets = arrayPet.filter(pet => pet.id === idPet);
		return filteredPets[0];
	}

	const showToastMessageSucess = (message) => {
		toast.success(`${message}`, {
			position: "top-right",
			autoClose: 1500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	};

	const showToastMessageFailed = (message) => {
		toast.error('Erro no sistema, tente mais tarde', {
			position: "top-right",
			autoClose: 1500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	};

	const cancelarAppointment = async (idAppointment) => {

		const recusar = await canceladoAppointments(idAppointment);
		if (recusar.response.message === "Consulta cancelada") {
			showToastMessageSucess("Consulta cancelada com sucesso!")
			setTimeout(() => {
				window.location.reload();
			}, 2000); // Refresh after 5 seconds

		}
		else {
			showToastMessageFailed()
			// setTimeout(() => {
			//     window.location.reload();
			//   }, 2000); // Refresh after 5 seconds
		}
		return recusar
	}

	const finalizarAppointment = async (idAppointment) => {

		const aceitar = await finalizadoAppointments(idAppointment);
		if (aceitar.response.message === "Consulta concluída") {
			showToastMessageSucess("Consulta finalizada com sucesso!")
			setTimeout(() => {
				window.location.reload();
			}, 2000); // Refresh after 5 seconds
		}
		else {
			showToastMessageFailed()
			setTimeout(() => {
				window.location.reload();
			}, 2000); // Refresh after 5 second
		}
		return aceitar
	}


	const getappo = async (idPerson) => {
        const token = localStorage.getItem('__user_JWT')
        const decoded = jwt_decode(token);
        let allAboutIt
        if (decoded.isVet == true) {
            allAboutIt = await getAppointments(idPerson)    
        } else {
            let person = await getUser(idPerson)
            allAboutIt = person
        }
        if (allAboutIt.response == 'Não foram encontrados registros no Banco de Dados') {
            return []
        } else {
            return allAboutIt.response.user.Appointments
        }
	};

	const getclient = async (idPerson) => {
		let allAboutIt = await getUser(idPerson)
		if (allAboutIt.response === 'Não foram encontrados registros no Banco de Dados') {
			return []
		} else {
			return  allAboutIt.response.user
		}

	};

	const getvet = async (idPerson) => {
		let allAboutIt = await getVeterinary(idPerson)
		if (allAboutIt.response === 'Não foram encontrados registros no Banco de Dados') {
			return []
		} else {
			return  allAboutIt.response.user
		}

	};

	function formatPrice(input) {
		let value = input.value.replace(/[^0-9.]/g, '');

		let decimalCount = value.split('.').length - 1;
		if (decimalCount > 1) {
			value = value.slice(0, -1);
		}

		input.value = parseFloat(value).toLocaleString('pt-BR', {minimumFractionDigits: 2});
	}

	useEffect( ()  => {
		const token = localStorage.getItem('__user_JWT')
		const decoded = jwt_decode(token);

		if (decoded.isVet) {
			setShowVet('hidden')
			setShowClient('flex')
		} else {
			setShowVet('flex')
			setShowClient('hidden')
		}
	}, []);

	return(
		<section className=''>
			<div className=' w-full flex flex-col gap-3 mr-2'>
				<div className={`${divNothing}`}>
					Nenhuma consulta a ser aceita
				</div>
				{pedidos.map(pedido =>{
					console.log(pedido.idAppoint);
					return(
					//chamada para o código filho
						<AppointmentPedingCards 
							key={pedido.id}
							id={pedido.idAppoint}
							showClient={showClient}
							showVet={showVet}
							imagemPet={pedido.imagemPet}
							nomePet={pedido.nomePet}
							tamanho={pedido.tamanho}
							sexo={pedido.sexo}
							idade={pedido.idade}
							especie={pedido.especie}
							donoImg={pedido.donoImg}
							dono={pedido.dono}
							telefone={pedido.telefone}
							vetPhoto={pedido.vetPhoto}
							vetName={pedido.vetName}
							vetPhone={pedido.vetPhone}
							dataConsulta={pedido.dataConsulta}
							horario={pedido.horario}
							duration={pedido.duration}
							descricao={pedido.descricao}

							
							cancel={openModalQuestionWarn}
							finish={openModalQuestionSucess}
							closeSucess={closeModalQuestionSucess}
							closeWarn={closeModalQuestionWarn}
							finalizar={finalizarAppointment}
							cancelar={cancelarAppointment}
							warn={warn}
							Sucess={Sucess}
						/>
				)})}

			
			</div>
		</section>
	)
}
