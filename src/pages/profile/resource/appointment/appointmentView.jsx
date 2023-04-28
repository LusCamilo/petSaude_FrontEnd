import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { AppointmentMenu } from './appointmentMenu';
import { AppointmentAsk } from './appointments/appointmentAsk';
import { PetHeader } from '../../pet/petHeader';

export const AppointmentView = (props) => {
    const [petsAll, setPetsAll] = useState([]);

    const handlePetSelection = (pet) => {
        console.log(`Selected pet: ${pet.name}`);
    };
    const [tamanho, setTamanho] = useState('')

    const [name, setName] = useState('')
    function newName(event) {
        setName(event.target.value);
    }

    const [sexo, setSexo] = useState('')

    const [specie, setSpecie] = useState('')
    function newSpecie(event) {
        setSpecie(event.target.value);
    }

    const [infos, setInfos] = useState({})

    useEffect(() => {

       
        setName(infos.name ? infos.name : '')
        setSpecie(infos.specie ? infos.specie : '')
        setTamanho(infos.size ? infos.size : '')
        setSexo(infos.gender ? infos.gender : '')

        


  
    }, [infos.photo, infos.name, infos.specie, infos.size, infos.gender])

    const [petInfosDisable, petInfosDisableState] = useState({
        disable: true,
        class: ' text-slate-400'
    })



    return (
        <>
            <PetHeader />
            <section>
                    <div className='flex flex-row gap-5'>
                       <AppointmentMenu/>
                        <div className="flex flex-col w-full h-full">
                            <div className='w-5/6 border-none sm:border-solid border h-1/4 rounded-lg border-black flex flex-col gap-10 pl-3 sm:pl-20 py-8'>
                                <div>
                                    {/* {petsAll.map(pet => { */}
                                
                                    <h2 className='font-normal text-3xl flex justify-center sm:justify-start sm:text-6xl font-sans'>Pet (Nome do pet)</h2>

                                </div>
                                
                                <div className='flex flex-col sm:flex-row justify-between pr-20'>
                                    <div className='flex flex-col gap-3 sm:gap-5 justify-start w-full sm:w-1/3 mb-2'>
                                        <div>
                                            <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                                Nome
                                            </label>
                                        </div>
                                        
                                        <div>
                                            <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                                Tamanho
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex flex-col sm:flex-col gap-3 mb-5 sm:gap-5 justify-start content-center w-full sm:w-1/3'>
                                        <div className='w-full'>
                                            <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                                Sexo
                                            </label>
                                        </div>   
                                        <div className='w-full'>
                                            <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                            Idade
                                            </label>
                                        </div>                        
                                    </div>
                                    <div className='flex flex-col sm:flex-col gap-3 mb-5 sm:gap-5 justify-start content-center w-full sm:w-1/3'>
                                        <div className='w-full'>
                                            <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                                Espécie
                                            </label>
                                        </div>                   
                                    </div>
                                </div>
                                <h2 className='font-normal text-3xl flex justify-center sm:justify-start sm:text-6xl font-sans'>Informações de consulta </h2>
                                <div className='flex flex-col sm:flex-row justify-between pr-20'>
                                    <div className='flex flex-col gap-3 sm:gap-5 justify-start w-full sm:w-1/3 mb-2'>
                                        <div>
                                            <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                            Data
                                            
                                            </label>
                                        </div>
                                        
                                        <div>
                                            <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                                Descrição
                                                {/* Limitar descrição para no máximo duas linhas  */}
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex flex-col sm:flex-col gap-3 mb-5 sm:gap-5 justify-start content-center w-full sm:w-1/3'>
                                        <div className='w-full'>
                                            <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                                Horário
                                                
                                            </label>
                                        </div>                        
                                    </div>
                                </div>
                                <div className='flex flex-row justify-between'>
                                    <button className='bg-[#F9DEDC] text-[#410E0B] text-center w-56 h-14 border rounded-full text-xl font-normal mr-20'>
                                        Recusar
                                    </button>
                                    <button className='bg-[#9ED1B7] text-[#41564B] text-center w-72 h-14 border rounded-full text-xl font-normal mr-20' >
                                    Ver mais informações
                                    </button>
                                </div>
                            </div>    
                            <AppointmentAsk />
                        </div>
                        <AppointmentMenu />
                        <div className='w-5/6 border-none sm:border-solid border rounded-lg border-black flex flex-col gap-10 pl-3 sm:pl-20 py-8'>
                            <div>
                                {petsAll.map(pet => {
                                    return (
                                        <div
                                            key={pet.id}
                                            className='py-2 mt-2 bg-slate-500 gap-2 rounded-md flex-grow border-2 border-black flex flex-row'
                                            id={pet.id}
                                            onClick={() => handlePetSelection(pet)}
                                        >
                                            <img className='w-32' src={pet.photo} alt={pet.name} />
                                            <input className='text-2xl shadow-none w-full' placeholder={pet.name} disabled />
                                        </div>
                                    );
                                })}
                            </div>
                            <h2 className='font-normal text-3xl flex justify-center sm:justify-start sm:text-6xl font-sans'>
                                    Pet (Nome do pet)
                                    </h2>
                            <div className='flex flex-col sm:flex-row justify-between pr-20'>
                                <div className='flex flex-col gap-3 sm:gap-5 justify-start w-full sm:w-1/3 mb-2'>
                                
                                    <div>
                                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                            Nome
                                        
                                        </label>
                                    </div>

                                    <div>
                                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                            Tamanho
                                        </label>
                                    </div>
                                </div>
                                <div className='flex flex-col sm:flex-col gap-3 mb-5 sm:gap-5 justify-start content-center w-full sm:w-1/3'>
                                    <div className='w-full'>
                                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                            Sexo
                                        </label>
                                    </div>
                                    <div className='w-full'>
                                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                            Idade
                                        </label>
                                    </div>
                                </div>
                                <div className='flex flex-col sm:flex-col gap-3 mb-5 sm:gap-5 justify-start content-center w-full sm:w-1/3'>
                                    <div className='w-full'>
                                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                            Espécie
                                            
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <h2 className='font-normal text-3xl flex justify-center sm:justify-start sm:text-6xl font-sans'>
                                Informações de consulta{' '}
                            </h2>
                            <div className='flex flex-col sm:flex-row justify-between pr-20'>
                                <div className='flex flex-col gap-3 sm:gap-5 justify-start w-full sm:w-1/3 mb-2'>
                                    <div>
                                        <label className='flex flex-col text-xl text-[#A9A9A9]'>Data</label>
                                    </div>

                                    <div>
                                        <label className='flex flex-col text-xl text-[#A9A9A9
    '>
                                                Horário
                                                
                                            </label>
                                        </div>                        
                                    </div>
                                </div>
                                <div className='flex flex-row justify-between'>
                                    <button className='bg-[#F9DEDC] text-[#410E0B] text-center w-56 h-14 border rounded-full text-xl font-normal mr-20'>
                                        Recusar
                                    </button>
                                    <button className='bg-[#9ED1B7] text-[#41564B] text-center w-72 h-14 border rounded-full text-xl font-normal mr-20' >
                                    Ver mais informações
                                    </button>
                                </div>
                        </div>     
                    </div>
                </section>
        </>
    );
}