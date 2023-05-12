import React, { useState, useEffect } from 'react';
import { AppointmentAsk } from './appointments/appointmentAsk';
import { PetHeader } from '../../pet/petHeader';
import { AppointmentPeding } from './appointments/appointmentPending';
import { AppointmentArchived } from './appointments/appointmentArchived';


export const AppointmentView = (props) => {

    const [tela1, setTela1] = useState({estado: 'flex', cor: '#092B5A', text: 'text-white'})
    const [tela2, setTela2] = useState({estado: 'hidden', cor: '#E3EFF0'})
    const [tela3, setTela3] = useState({estado: 'hidden', cor: '#E3EFF0'})
    
    useEffect(() => {
        handleClickPedidos();
      }, []);

    const handleClickPedidos = () => {
        setTela1({estado: 'flex', cor: 'bg-[#09738A]'})
        setTela2({estado: 'hidden', cor: 'bg-[#09738A]'})
        setTela3({estado: 'hidden', cor: 'bg-[#E3EFF0]'})
      };

    const handleClickPendentes = () => {
        setTela1({estado: 'hidden', cor: 'bg-[#E3EFF0]'})
        setTela2({estado: 'flex', cor: 'bg-[#09738A]'})
        setTela3({estado: 'hidden', cor: 'bg-[#E3EFF0]'})
      };
    
      const handleClickArquivadas = () => {
        setTela1({estado: 'hidden', cor: 'bg-[#E3EFF0]'})
        setTela2({estado: 'hidden', cor: 'bg-[#E3EFF0]'})
        setTela3({estado: 'flex', cor: 'bg-[#09738A]'})
      };

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
                <div className='w-full flex flex-row gap-5'>
                    <section className='w-1/2'>  
                    <div className='flex flex-col md:flex-row gap-5'>
                    
                        <div className='flex flex-col w-5/6 md:w-full bg-[#E3EFF0] rounded-lg pb-96 md:h-screen'>
                            <ul className="flex flex-col items-center w-full cursor-pointer pt-5 space-y-3 text-xl">
                                <button type="button" className={`flex ${tela1.cor} items-center border border-black py-2 px-6 bg-[#E3EFF0] h-30 w-56 md:w-5/6 text-left ${tela1.text} rounded-full`}
                                    onClick={handleClickPedidos}
                                >       
                                    Pedidos de consultas
                                </button>
                                <button type="button" className={`flex ${tela2.cor} items-center border border-black py-2 px-6 bg-[#E3EFF0] h-30 w-56 md:w-5/6 text-left rounded-full`}
                                    onClick={handleClickPendentes}
                                >
                                    Consultas pendentes
                                </button>
                                <button type="button" className={`flex ${tela3.cor} items-center border border-black py-2 px-6 bg-[#E3EFF0] h-30 w-56 md:w-5/6 text-left rounded-full`}
                                    onClick={handleClickArquivadas}
                                >
                                    Consultas arquivadas
                                </button>
                                </ul>                
                            </div>
                        </div>
                    </section>
                    <section className='w-full'>
                        <div className='w-full'> 
                            <div className={`${tela2.estado} w-full`}>
                                <AppointmentPeding  />
                            </div>
                            <div className={`${tela1.estado} w-full`}>
                                <AppointmentAsk /> 
                            </div>
                            <div className={`${tela3.estado} w-full`}>
                                <AppointmentArchived />
                            </div>
                        </div>        
                    </section>
                </div>
            </section>
        </>
    );
}



