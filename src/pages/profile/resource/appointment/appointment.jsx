import React, { useState } from 'react';
import Monkey from '../../../../assets/svg/monkey.svg';
import Dog from '../../../../assets/svg/iconDog.svg';





export const Appointment = () => {

    const [name, setName] = useState('')

    const [classButton, setClassButton] = useState("")

    function newName(event) {
        setName(event.target.value);
    }



    return (

        <>
            <section id='buttonCanceled' className={`md:w-3/4 border-4 border-[#9ED1B7] rounded-lg  m-10 bg-white ${classButton}`}>
                <div className='p-2 md:p-20'>
                    <h1 className='flex justify-center text-3xl md:text-5xl font-semibold pt-2 md:pt-10'>Selecione o animal</h1>
                    <div className='flex justify-between md:pt-10'>
                        <div className='flex flex-col md:w-2/4 pt-2 md:p-5'>
                            <div className='flex border rounded-lg h-16 md:h-24'>
                                <img className='w-20 md:w-32' src={Dog} />
                                <input className='w-full text-2xl shadow-none' placeholder='List item' />
                            </div>
                            <div className=' border rounded-md h-24 hidden md:flex'>
                                <img className='w-32' src={Dog} />
                                <input className='text-2xl shadow-none w-full' placeholder='List item' onBlurCapture={newName} />
                            </div>
                        </div>
                        <div className='hidden md:flex justify-end pl-20'>
                            <img className=' w-56' src={Monkey}></img>
                            <div className='flex flex-col pl-10 md:pt-10'>
                                <label>
                                    <input type="text" name="firstName" defaultValue='Nome' className='bg-transparent border-none  md:text-5xl font-semibold ' />
                                </label>

                                <label>
                                    <input type="text" name="firstName" defaultValue='Espécie' className='bg-transparent border-none text-1xl md:text-6xl text-[#A9A9A9]' />
                                </label>

                            </div>
                        </div>
                    </div>
                </div>
                <h2 className='hidden md:flex md:text-5xl font-semibold pl-20'>Selecione a data e a hora</h2>
                <h2 className='flex justify-center text-3xl md:hidden md:text-5xl font-semibold '>Data e hora</h2>
                <div className='flex xl:flex-row flex-col justify-between lg:gap-8 gap-2 w-full pl-14 md:pl-20 pt-3 md:pt-10'>
                    <label className='w-full flex flex-col'>
                        <p className='text-3xl text-[#A9A9A9]'>
                            Data
                        </p>

                        <input className='w-56' type="date" />
                    </label>
                    <label className='w-full flex flex-col'>
                        <p className='text-3xl text-[#A9A9A9]'>
                            Hora
                        </p>

                        <input className='w-56' type="time" />
                    </label>
                </div>
                <div className='p-3 md:pl-20 md:pr-20'>
                    <div className='flex mt-2 md:mt-10 justify-between gap-5'>
                        <button  className={`p-2 md:w-56 md:text-center md:h-20 border rounded-full bg-[#F9DEDC] text-[#410E0B] font-bold text-2xl origin-center `} type="button"
                            onClick={
                                () => {
                                    if (document.getElementById("buttonCanceled").classList.contains("hidden")) {
                                        console.log("teste");
                                    } else {
                                        document.getElementById("buttonCanceled").classList.add("hidden")
                                    }
                                }
                            }>
                            Cancelar
                        </button>
                        <button className='md:ml-56  p-2  w-32 md:w-56 text-center md:h-20 border rounded-full bg-[#9ED1B7] text-[#41564B] font-bold text-2xl'>
                            Marcar
                        </button>
                    </div>
                </div>
            </section>


        </>

    )
};


