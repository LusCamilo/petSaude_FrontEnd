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
}

export const AppointmentPedingCards = (props) => {

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


	const [warn, setWarn] = React.useState(false);
	const [Sucess, setSucess] = React.useState(false);

    function openModalQuestionWarn() {
        console.log("Warn open");
		setWarn(true)
	}

	function closeModalQuestionWarn() {
        console.log("Warn close");
		setWarn(false);
	}

	function openModalQuestionSucess() {
        console.log("sucess open");
		setSucess(true)
	}

	function closeModalQuestionSucess() {
        console.log("sucess close");
		setSucess(false);
	}

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

    return(
        <div className=' border-none sm:border-solid border h-1/6 rounded-lg border-black flex flex-col gap-0 pl-8 py-8 md:pl-20 sm:pl-20'>
            <div className='flex flex-row items-center md:content-center md:text-center text-6xl gap-4'>
                <img className='PetImage' src={props.imagemPet} alt="Imagem do pet" />
                <h2 className='font-normal flex md:justify-center sm:justify-start font-sans'>{props.nomePet}</h2>
            </div>
            <div className='flex md:justify-between pr-20'>
                <div className='flex flex-col justify-start w-full sm:w-1/3 '>
                    <div>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            Nome
                            <input type="text" disabled placeholder={props.nomePet} className='bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl '/>
                        </label>
                    </div>

                    <div>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            Tamanho
                            <input type="text" disabled placeholder={props.tamanho} className='bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl '/>
                        </label>
                    </div>
                </div>
                <div className='flex flex-col sm:flex-col justify-start content-center w-full sm:w-1/3'>
                    <div className='w-full'>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            Sexo
                            <input type="text" disabled placeholder={props.sexo} className='bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl '/>
                        </label>
                    </div>
                    <div className='w-full'>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            Idade
                            <input type="text" disabled placeholder={props.idade} className='bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl '/>
                        </label>
                    </div>
                </div>
                <div className='flex flex-col sm:flex-col justify-start content-center w-full sm:w-1/3'>
                    <div className='w-full'>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            Espécie
                            <input type="text" disabled placeholder={props.especie} className='bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl '/>
                        </label>
                    </div>
                </div>
            </div>
            <div className={`${props.showClient} flex-row items-center content-center text-center text-6xl gap-4`}>
                <img className='PetImage' src={props.donoImg} alt="Imagem do pet" />
                <h2 className='font-normal flex justify-center sm:justify-start font-sans'>{props.dono}</h2>
            </div>
            <div className='flex flex-col sm:flex-row justify-between pr-20'>
                <div className={`${props.showClient} flex-row justify-start w-full`}>
                    <div>
                        <label className='flex flex-col text-xl text-[#A9A9A9]' >
                            Nome
                            <input type="text" disabled placeholder={props.dono} className='bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl '/>
                        </label>
                    </div>

                    <div>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            Telefone
                            <input type="text" disabled placeholder={props.telefone} className='bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl '/>
                        </label>
                    </div>
                </div>
            </div>
            <div className={`${props.showVet} flex-row items-center content-center text-center text-6xl gap-4`}>
                <img className='PetImage' src={props.vetPhoto} alt="Imagem do pet" />
                <h2 className='font-normal flex justify-center sm:justify-start font-sans'>{props.vetName}</h2>
            </div>
            <div className='flex flex-col sm:flex-row justify-between pr-20'>
                <div className={`${props.showVet} flex-row justify-start w-full`}>
                    <div>
                        <label className='flex flex-col text-xl text-[#A9A9A9]' >
                            Nome
                            <input type="text" disabled placeholder={props.vetName} className='bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl '/>
                        </label>
                    </div>

                    <div>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            Telefone
                            <input type="text" disabled placeholder={props.vetPhone} className='bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl '/>
                        </label>
                    </div>
                </div>
            </div>
            <h2 className='font-normal  flex justify-center sm:justify-start font-sans text-5xl pb-5 '>Informações de consulta </h2>
            <div className='flex flex-col justify-between pr-20'>
                <div className='flex flex-row justify-start w-full sm:w-full '>
                    <div className='w-1/3'>
                        <label className='flex flex-col text-xl text-[#A9A9A9] gap-0'>
                            Data
                            <input type="text" disabled placeholder={props.dataConsulta} className='bg-transparent placeholder:text-gray-400 w-full placeholder:text-3xl border-none text-3xl '/>
                        </label>
                    </div>
                    <div className='w-1/3'>
                        <label className='flex flex-col text-xl text-[#A9A9A9] gap-0'>
                            Horário
                            <input type="text" disabled placeholder={props.horario} className='bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl '/>
                        </label>
                    </div>
                    <div className='w-1/3'>
                        <label className='flex flex-col text-xl text-[#A9A9A9] gap-0'>
                            Duração
                            <input type="text" disabled placeholder={props.duration} className='bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl '/>
                        </label>
                    </div>
                </div>
                <div className='flex flex-row sm:flex-col justify-start content-center w-full '>
                    <div>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            Descrição
                            <p>
                                {props.descricao}
                            </p>
                            {/* //<input type="text" disabled placeholder={props.descricao} class='bg-transparent placeholder:text-gray-400 w-full placeholder:text-3xl border-none text-3xl'/>  */}
                        </label>
                    </div>
                </div>
            </div>
            <div className='flex flex-row justify-evenly'>
                <button
                    className={`bg-[#F9DEDC] flex justify-center items-center content-center text-[#410E0B] text-center first-letter w-40 md:w-56 h-14 border rounded-full text-xl font-normal mr-20`}
                    onClick={()=>openModalQuestionWarn()} // Atualize para usar a propriedade recebida
                    >
                    Cancelar consulta
                </button>
                <button
                    className={`bg-[#9ED1B7] flex justify-center items-center content-center text-[#410E0B] text-center first-letter w-40 md:w-56 h-14 border rounded-full text-xl font-normal mr-20`}
                    onClick={()=>openModalQuestionSucess()} 
                    >
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
            			
            <Modal
            isOpen={warn}
            onAfterOpen={''}
            onRequestClose={closeModalQuestionWarn}
            style={customStylesWarn}
            contentLabel="Example Modal"
            >
                <WarnRequest boolBotoes={'flex'} onClose={closeModalQuestionWarn} onSave={() => cancelarAppointment(props.id)} description={`Certeza que deseja finalizar a consulta? Pode ser penalizado...`} href="/profile/appointment-view" />
            </Modal>
    
            <Modal
            isOpen={Sucess}
            onAfterOpen={''}
            onRequestClose={closeModalQuestionSucess}
            style={customStylesSucess}
            contentLabel="Example Modal"
            >
                <PetAddSucess aparecer='flex' onClose={closeModalQuestionSucess} onSave={()=> finalizarAppointment(props.id)} title="Sucesso" what="A consulta já foi finalizada, certo?" href="/profile/appointment-view" />
            </Modal>
        </div>       
)}