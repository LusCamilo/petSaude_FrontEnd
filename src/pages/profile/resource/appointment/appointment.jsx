import React, { useState } from 'react';
import Monkey from '../../../../assets/svg/monkey.svg';
import Dog from '../../../../assets/svg/iconDog.svg';
import { appointmentAdd } from '../../../../services/integrations/appointment';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const Appointment = () => {

    const [date, setDate] = useState('')
    const [startsAt, setStartAt] = useState('')
    const [endsAt, setEndAt] = useState('')
    const [description, setDescription] = useState('')
    const [petId, setPetId] = useState(0)


    const [classButton, setClassButton] = useState("")

    function newDate(event) {

        let valor = event.target.value;
        let dataOriginal = new Date(valor); // Cria um objeto Date com a data original
        let dataInscricao = dataOriginal.toLocaleDateString("pt-BR"); // Formata a data para o padrão brasileiro Dia/Mês/Ano

        setDate(dataInscricao);
      }

      function newAt(event) {
        let valor = event.target.value;
        setStartAt(valor);
      }

      function newDescription(event) {
        console.log(event.target.value);
        let valor = event.target.value;
        setDescription(valor);
      }

      function newName(event) {
        console.log(event.target.value);
        let valor = event.target.value;
        setDescription(valor);
      }

    const submitAppointment = async data => {
        const appointmentInfos = {
            date: date,
            startsAt: startsAt,
            endsAt: startsAt,
            description: description,
            veterinaryId: 0,
            petId: 0
        }

        console.log(appointmentInfos)

       const addAppointment = await appointmentAdd(appointmentInfos)
       console.log(addAppointment)
    }




    return (

            <div id='buttonCanceled' className={`md:w-4/5 border-4 p-8 border-[#9ED1B7] h-3/4 rounded-lg mb-10 -mt-4 m-10 bg-white ${classButton}`}>
                <div className=''>
                    <h1 className='flex justify-start text-3xl font-semibold '>Selecione o animal</h1>
                    <div className='flex justify-between align-middle content-center items-center'>
                        <div className='flex flex-col '>
                            <div className=' border rounded-md h-8 hidden w-full md:flex'>
                                <img className='w-20 xl-32' src={Dog} />
                                <input className='text-2xl shadow-none w-full' placeholder='List item' />
                            </div>
                            <div className=' border rounded-md h-8 hidden w-full md:flex'>
                                <img className='w-20 xl-32' src={Dog} />
                                <input className='text-2xl shadow-none w-full' placeholder='List item' onBlurCapture={newDate} />
                            </div>
                        </div>
                        <div className='hidden md:flex justify-end '>
                            <img className=' w-32' src={Monkey}></img>
                            <div className='flex flex-col '>
                                <label>
                                    <input type="text" name="firstName" value='Nome' className='bg-transparent border-none text-xs xl:text-5xl ' />
                                </label>

                                <label>
                                    <input type="text" name="firstName" value='Espécie' className='bg-transparent border-none text-base xl:text-6xl text-[#A9A9A9]' onChange={newDescription}/>
                                </label>

                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    <h2 className='hidden md:flex text-3xl font-semibold'>Selecione a data e a hora</h2>
                    <h2 className='flex justify-center text-xl md:hidden xl:text-5xl font-semibold '>Data e hora</h2>
                    <div className='flex xl:flex-row flex-col justify-between 2 w-full '>
                        <label className='w-full flex flex-col'>
                            <p className='text-3xl text-[#A9A9A9]'>
                                Data
                            </p>

                            <input className='w-56' type="date" onChange={newDate}/>
                        </label>
                        <label className='w-full flex flex-col'>
                            <p className='text-3xl text-[#A9A9A9]'>
                                Hora
                            </p>

                            <input className='w-56' type="time" onChange={newAt}/>
                        </label>
                    </div>
                    <div className='p-3  md:pr-20'>
                        <div className='flex justify-between gap-5'>
                            <button  className={`p-2 h-10 w-24 border rounded-full bg-[#F9DEDC] text-[#410E0B] font-bold text-sm origin-center flex justify-center items-center content-center align-middle`} type="button"
                                onClick={
                                    () => {
                                        if (document.getElementById("buttonCanceled").classList.contains("hidden")) {
                                           
                                        } else {
                                            document.getElementById("buttonCanceled").classList.add("hidden")
                                        }
                                    }
                                }>
                                Cancelar
                            </button>
                            <button className='w-24 h-10 p-2 border rounded-full bg-[#9ED1B7] text-[#41564B] font-bold text-sm flex justify-center  items-center content-center align-middle'>
                                Marcar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    )
};


