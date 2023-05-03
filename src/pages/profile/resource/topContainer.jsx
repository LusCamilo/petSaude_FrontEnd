import React, { useState } from 'react';
import iconVet from './img/iconVet.png'
import * as Dialog from '@radix-ui/react-dialog';
import { Appointment } from './appointment/appointment';
import '../../profile/pet/css/pet.css'
import { AppointmentModal } from './appointment/appointmentModal';
import Modal from 'react-modal';

// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     border: '4px solid #9ED1B7',
//     borderRadius: '10px',
//     width: '75vw',
//     height: '50vh',
//   },
// };

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)


export const TopContainer = (props) => {
    const [biografia, setBiografia] = useState("truncate")
    const [lerMais, setLerMais] = useState("")
    const [lerMenos, setLerMenos] = useState("hidden")

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
    if (1 == 1) {

        return (
            <div id='topHeader' className='flex flex-col items-center md:px-44'>
                <img src={props.profilePhoto} className='w-full md:max-h-[400px] rounded-b-lg ' />
                <div className='self-start w-full z-10  mt-[-120px] md:mt-[-80px] px-9 md:flex'>
                    <img src={props.userPhoto} className="flex relative pl-24 sm:pl-56 md:pl-0 md:border-4 h-28  md:h-48 md:border-white border-solid rounded-full" />
                    <div className='flex flex-col md:flex-row justify-between w-full md:mt-16'>
                        <div className='flex flex-col md:flex-row items-center gap-1 pt-4'>
                            <div className='flex'>
                                <p className='text-3xl md:text-4xl'>{props.name}</p>
                                <img className='pl-2' src={iconVet} />
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
                            <button className='bg-lime-500 rounded-md px-3 py-2 text-2xl w-full md:text-4xl md:w-96 shadow-lg justify-center self-center md:mt-10' onClick={openModal}>Agendar uma consulta</button>
                            <Modal
                                isOpen={modalIsOpen}
                                onAfterOpen={afterOpenModal}
                                onRequestClose={closeModal}
                                // style={customStyles}
                                contentLabel="Example Modal"
                            >
                                <form className='w-full'>
                                    <Appointment onCancel={handleCancelAppointment} />
                                </form>
                            </Modal>
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
            </div >
        );
    } else {

        return (
            <div className='flex flex-col items-center px-44'>
                <img src={props.profilePhoto} className='w-full max-h-[400px] rounded-b-lg ' />
                <div className='flex self-start w-full z-10 mt-[-80px] px-9'>
                    <img src={props.userPhoto} className=" relative border-4 h-48 border-white border-solid rounded-full" />
                    <div className='flex justify-between w-full mt-16'>
                        <div className='flex flex-row items-center gap-1'>
                            <p className=' text-4xl'>{props.name}</p>
                        </div>
                    </div>
                </div>
                <div className='w-full h-[1px] bg-gray-400 mt-2'></div>
                <h2 className='self-start text-3xl pt-5 pb-2'>Sobre Mim</h2>
                <div className='flex w-full '>
                    <span className={`w-11/12 ${biografia}`} id="biografia">
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

