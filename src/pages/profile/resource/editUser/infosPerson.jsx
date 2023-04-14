import React from 'react';
import lapis from "../../../../assets/svg/pencil.svg"
 
export const Pessoais = (props) => {
    return (

        <>
            <section className='w-full h-full border-none sm:border-solid border-2 rounded-lg border-black flex flex-col gap-10 md:pl-20 py-8'>
            <h2 className='text-5xl md:text-6xl font-bold font-sans text-center sm:text-left'>Informações Pessoais</h2>
                <div className='flex flex-row'>
                    <div className='flex flex-row justify-between w-full  pr-0 sm:pr-12'> 
                        <div className='gap-1 sm:gap-10 mt-10 grid grid-cols-1 sm:grid-cols-2 sm:w-4/5'>
                                <div className=''>
                                    <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                        Primeiro nome
                                        <input type="text" name="firstName" value={props.name} className='bg-transparent border-none text-2xl text-[#000]' />
                                    </label> 
                                </div>
                                <div className='flex justify-center'>
                                    <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                        Sobrenome
                                        <input type="text" name="firstName" value={props.lastName} className='bg-transparent border-none text-2xl text-[#000]' />
                                    </label>
                                </div>
                                <div className=''>
                                    <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                    CPF
                                        <input type="text" name="firstName" value={props.cpf} className='bg-transparent border-none text-2xl text-[#000]' />
                                    </label>
                                </div>
                                <div className='flex justify-center'>
                                    <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                        RG
                                        <input type="text" name="firstName" value={props.rg} className='bg-transparent border-none text-2xl text-[#000]' />
                                    </label>
                                </div>
                                <div className=''>
                                    <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                        Celular
                                        <input type="text" name="firstName" value={props.celular} className='bg-transparent border-none text-2xl text-[#000]' />
                                    </label>
                                </div>
                                <div className='flex justify-center'>
                                    <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                    Telefone
                                        <input type="text" name="firstName" value={props.telefone} className='bg-transparent border-none text-2xl text-[#000]' />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='hidden sm:flex flex-row w-1/5 justify-end pr-10 '>
                        <button className='w-52 h-12 flex flex-row justify-center items-center gap-4 bg-[#ECECEC] rounded-full drop-shadow-lg'>
                            <img src={lapis} alt="" />
                            Editar
                        </button>
                    </div>
                </div>    
                <div className='w-full sm:mr-10'>
                    <p className='flex flex-col text-xl text-[#A9A9A9] pt-3 sm:pt-20 mr-0 sm:mr-20 w-full sm:w-10/12 '> Bio
                        <span className='text-2xl text-[#000] w-full p-2  break-words text-justify'>
                            {props.text}
                        </span>
                    </p>
                </div>

            </section>

        </>

    );
}
