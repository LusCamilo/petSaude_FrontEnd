import React, {useState, useEffect} from 'react';
import './styleAppointment.css'
import jwt_decode from "jwt-decode";
import {getAppointments} from '../../../../../services/integrations/appointment';
import {getUser, getVeterinary} from '../../../../../services/integrations/user'
import {canceladoAppointments, finalizadoAppointments} from '../../../../../services/integrations/appointment'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal'
import {WarnRequest} from '../../../pet/cards/warnTwo';
import {PetAddSucess} from '../../../pet/cards/sucess';
import {AppointmentPedingCards} from './appointmentPedingCards';

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

		} else {
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
		} else {
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
			return allAboutIt.response.user
		}

	};

	const getvet = async (idPerson) => {
		let allAboutIt = await getVeterinary(idPerson)
		if (allAboutIt.response === 'Não foram encontrados registros no Banco de Dados') {
			return []
		} else {
			return allAboutIt.response.user
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

	useEffect(() => {
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

	return (
		<section className={'w-full'}>
			<div className='w-full flex flex-col gap-3 mr-2'>
				<div className={`${divNothing}`}>
					Nenhuma consulta a ser aceita
				</div>
				{pedidos.map(pedido => {
					console.log(pedido.idAppoint);
					return (
						<div key={pedido.id}
								 className='border-none sm:border-solid border h-1/6 rounded-lg border-black flex flex-col gap-0 p-20'>
							<Modal
								isOpen={warn}
								onAfterOpen={''}
								onRequestClose={closeModalQuestionWarn}
								style={customStylesWarn}
								contentLabel="Example Modal"
							>
								<WarnRequest boolBotoes={'flex'} onClose={closeModalQuestionWarn} Pet={pedido.nomePet}
														 idApp={pedido.idAppoint} onSave={() => cancelarAppointment(pedido.idAppoint)}
														 description={`Certeza que deseja finalizar a consulta? Pode ser penalizado...`}
														 href="/profile/appointment-view"/>
							</Modal>
							<Modal
								isOpen={Sucess}
								onAfterOpen={''}
								onRequestClose={closeModalQuestionSucess}
								style={customStylesSucess}
								contentLabel="Example Modal"
							>
								<PetAddSucess aparecer='flex' onClose={closeModalQuestionSucess} Pet={pedido.nomePet}
															onSave={() => finalizarAppointment(pedido.idAppoint)} title="Sucesso"
															what="A consulta já foi finalizada, certo?" href="/profile/appointment-view"/>
							</Modal>
							<div className='flex flex-row items-center md:content-center md:text-center text-5xl gap-4'>
								<img className='PetImage' src={pedido.imagemPet} alt="Imagem do pet"/>
								<h2 className='font-normal flex md:justify-center sm:justify-start font-sans'>{pedido.nomePet}</h2>
							</div>
							<div className='flex md:justify-between pr-20'>
								<div className='flex flex-col justify-start w-full sm:w-1/3 '>
									<div>
										<label className='flex flex-col text-xl text-[#A9A9A9]'>
											Nome
											<input type="text" disabled placeholder={pedido.nomePet}
														 className='bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl '/>
										</label>
									</div>
									{/*<AppointmentPedingCards*/}
									{/*	key={pedido.id}*/}
									{/*	id={pedido.idAppoint}*/}
									{/*	showClient={showClient}*/}
									{/*	showVet={showVet}*/}
									{/*	imagemPet={pedido.imagemPet}*/}
									{/*	nomePet={pedido.nomePet}*/}
									{/*	tamanho={pedido.tamanho}*/}
									{/*	sexo={pedido.sexo}*/}
									{/*	idade={pedido.idade}*/}
									{/*	especie={pedido.especie}*/}
									{/*	donoImg={pedido.donoImg}*/}
									{/*	dono={pedido.dono}*/}
									{/*	telefone={pedido.telefone}*/}
									{/*	vetPhoto={pedido.vetPhoto}*/}
									{/*	vetName={pedido.vetName}*/}
									{/*	vetPhone={pedido.vetPhone}*/}
									{/*	dataConsulta={pedido.dataConsulta}*/}
									{/*	horario={pedido.horario}*/}
									{/*	duration={pedido.duration}*/}
									{/*	descricao={pedido.descricao}*/}
									{/*	cancel={openModalQuestionWarn}*/}
									{/*	finish={openModalQuestionSucess}*/}
									{/*	closeSucess={closeModalQuestionSucess}*/}
									{/*	closeWarn={closeModalQuestionWarn}*/}
									{/*	finalizar={finalizarAppointment}*/}
									{/*	cancelar={cancelarAppointment}*/}
									{/*	warn={warn}*/}
									{/*	Sucess={Sucess}*/}
									{/*/>*/}

									<div>
										<label className='flex flex-col text-xl text-[#A9A9A9]'>
											Telefone
											<input type="text" disabled placeholder={pedido.telefone} className='bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl '/>
										</label>
									</div>
								</div>
							</div>
							<div className={`${showVet} flex-row items-center content-center text-center text-6xl gap-4`}>
								<img className='PetImage' src={pedido.vetPhoto} alt="Imagem do pet"/>
								<h2 className='font-normal flex justify-center sm:justify-start font-sans'>{pedido.vetName}</h2>
							</div>
							<div className='flex flex-col sm:flex-row justify-between pr-20'>
								<div className={`${showVet} flex-row justify-start w-full`}>
									<div>
										<label className='flex flex-col text-xl text-[#A9A9A9]'>
											Nome
											<input type="text" disabled placeholder={pedido.vetName}
														 className='bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl '/>
										</label>
									</div>

									<div>
										<label className='flex flex-col text-xl text-[#A9A9A9]'>
											Telefone
											<input type="text" disabled placeholder={pedido.vetPhone}
														 className='bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl '/>
										</label>
									</div>
								</div>
							</div>
							<h2 className='font-normal  flex justify-center sm:justify-start font-sans text-3xl pb-5 '>Informações de
								consulta </h2>
							<div className='flex flex-col justify-between pr-20'>
								<div className='flex flex-row justify-start w-full sm:w-full '>
									<div className='w-1/3'>
										<label className='flex flex-col text-xl text-[#A9A9A9] gap-0'>
											Data
											<input type="text" disabled placeholder={pedido.dataConsulta}
														 className='bg-transparent placeholder:text-gray-400 w-full placeholder:text-3xl border-none text-3xl '/>
										</label>
									</div>
									<div className='w-1/3'>
										<label className='flex flex-col text-xl text-[#A9A9A9] gap-0'>
											Horário
											<input type="text" disabled placeholder={pedido.horario}
														 className='bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl '/>
										</label>
									</div>
									<div className='w-1/3'>
										<label className='flex flex-col text-xl text-[#A9A9A9] gap-0'>
											Duração
											<input type="text" disabled placeholder={pedido.duration}
														 className='bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl '/>
										</label>
									</div>
								</div>
								<div className='flex flex-row sm:flex-col justify-start content-center w-full '>
									<div>
										<label className='flex flex-col text-xl text-[#A9A9A9]'>
											Descrição
											<p>
												{pedido.descricao}
											</p>
											{/* <input type="text" disabled placeholder={pedido.descricao} class='bg-transparent placeholder:text-gray-400 w-full placeholder:text-3xl border-none text-3xl'/> */}
										</label>
									</div>
								</div>
							</div>
							<span className={`${buttonAceitar}`}>
								<div
									className={`${tutorStatus} flex-col justify-center items-start md:items-center content-center mb-2 `}>
									<h2>Confirmar consulta</h2>
									<div className='w-1/3 flex justify-center gap-5 flex-col'>
										<label className='flex flex-col justify-center text-xl text-[#A9A9A9] w-full'>
											Duracação
											<input type="time" id="duracao" name="duracao" min="00:01" className='w-full text-2xl'
														 defaultValue={duracao}
														 onChange={(e) => {
															 const time = e.target.value.split(':');
															 const hours = parseInt(time[0]);
															 const minutes = parseInt(time[1]);
															 const totalMinutes = (hours * 60) + minutes;
															 setDuracao(totalMinutes);
														 }}/>
										</label>
										<label className='flex flex-col justify-center text-xl text-[#A9A9A9] w-full'>
											Valor
											<div className='flex items-center justify-center gap-2'>
												<span className='text-2xl align-bottom'>R$  </span>
												<input
													type="number"
													step="0.01"
													min="0.01"
													name="preco"
													id="preco"
													lang="pt-BR"
													className='min-w-full text-2xl'
													defaultValue={preco}
													onBlur={(e) => formatPrice(e.target)}
													onChange={(e) => setPreco(e.target.value)}
												/>
											</div>
										</label>
									</div>
								</div>
							</span>
							<div className='flex flex-row justify-between pt-5'>
								<button
									className={`bg-[#F9DEDC] flex justify-center items-center content-center text-[#410E0B] text-center first-letter w-40 md:w-56 h-14 border rounded-full text-xl font-normal mr-20`}
									onClick={() => openModalQuestionWarn()}>
									Cancelar consulta
								</button>
								<button
									className={`bg-[#9ED1B7] flex justify-center items-center content-center text-[#410E0B] text-center first-letter w-40 md:w-56 h-14 border rounded-full text-xl font-normal mr-20`}
									onClick={() => openModalQuestionSucess()}>
									Concluir consulta
								</button>
							</div>
							<ToastContainer
								position="top-right"
								autoClose={1500}
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
					)
				})}
			</div>
		</section>
	)
}
