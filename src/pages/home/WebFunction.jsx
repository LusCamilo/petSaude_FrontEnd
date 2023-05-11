import React from 'react'
import chat from "../../assets/svg/chat.svg"
import calendary from "../../assets/svg/calendario.svg"
import gps from "../../assets/svg/localizacao.svg"

export const WebFunction = () => {
    return (
        <>
        <div className='flex flex-col justify-center items-center  bg-[#9ED1B7] pb-20 pt-14'>
            <h2 className="text-2xl sm:text-4xl font-semibold font-montserrat sm:pt-20 text-center md:w-1/3 ">A PetSaúde tem tudo que você precisa para manter a saúde de seu Pet em dia!</h2>
        <div className='md:flex flex-row justify-center sm:flew-col gap-32 sm:pt-20 md:p-20 w-full'>
                <div className='hidden md:flex flex-col bg-[#78A890] md:w-1/3 h-full xl:w-1/6 text-center drop-shadow-lg rounded-2xl p-5 '>
                    <div className='flex gap-3'>
                        <img className='w-10 pt-5' src={chat}></img>
                        <h3 className='text-white text-2xl pt-5'>Temos um chat exclusivo!</h3>
                    </div>
                    <p className='text-white text-xl text-center pt-14'>Você consegue entrar em
                    contato com nossos profissionais
                    e ter atualizações sobre seu pet.
                    </p>
                </div>
                <div className='bg-[#78A890] w-4/5 md:w-1/3 h-full xl:w-1/6 text-center drop-shadow-lg rounded-2xl p-5 mt-14 md:mt-0 ml-10 md:ml-0'>
                    <div className='flex gap-3'>
                        <img src={gps}></img>
                        <h3 className='text-white md:text-2xl pt-5'>Pesquise e encontre nossas diversas opções!</h3>
                    </div>
                    <p className='text-white text-start text-xl sm:text-center pt-10'>Com nosso sistema de busca, é 
                                                    possível achar os especialistas com
                                                    o melhor atendimento perto de você.
                    </p>
                </div>
                <div className='hidden md:flex flex-col bg-[#78A890] md:w-1/3 xl:w-1/6 h-full  text-center drop-shadow-lg rounded-2xl p-5 '>
                    <div className='flex gap-3'>
                            <img src={calendary}></img>
                            <h3 className='text-white md:text-2xl pt-2'>Lembre-se de agendamentos e receba notificações!</h3>
                    </div>
                    <p className='text-white text-xl text-center pt-5 mt-1'>Baixe nosso app para ter um melhor 
                                                    controle das consultas de seu pet e ser
                                                    avisado próximo da data agendada.
                    </p>
                </div>
            </div>
            </div>
        </>
    );
}