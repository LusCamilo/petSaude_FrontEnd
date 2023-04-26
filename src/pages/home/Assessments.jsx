import React from 'react'
import Girl from "../../assets/svg/GirlAndBird.svg"
import Boy from "../../assets/svg/BoyDog.svg"
import Lady from "../../assets/svg/LadyCat.svg"
import Star from "../../assets/svg/stars.svg"

export const Assessments = () => {
    return (
        <>
        <div className='flex flex-col justify-center items-center'>
            <h2 className="text-3xl xl:text-5xl text-center font-semibold pt-20 sm:w-1/3 ">Avaliações de nosso clientes</h2>
            <div className='md:flex flex-row justify-center sm:flew-col gap-32 pt-10 sm:pt-20 md:p-20 w-full'>
                    <div className='hidden md:flex flex-col items-center border-4 border-black sm:w-1/6 h-full text-center drop-shadow-lg rounded-2xl p-5 '>
                        
                        <img className='w-28 m-5' src={Girl}></img>
                        <div className='flex flex-col justify-start items-start'>
                            <h3 className='text-3xl pt-5'>Gostei e recomendo!</h3>
                            <p className='text-2xl text-left items-center pt-5'>Minhas calopsitas estavam precisando passar em um veterinário e o PetSaúde foi 
                            fundamental para que eu conseguissse tirar dúvidas.
                            </p>
                        </div>    

                        <img className='pt-0 md:pt-0 xl:pt-8' src={Star}></img>
                    </div>
                    <div className='flex flex-col items-center border-4 ml-14 md:ml-0 border-black w-3/4 md:w-1/6 h-full text-center drop-shadow-lg rounded-2xl p-5 '>
                        
                        <img className='w-28 m-5' src={Boy}></img>
                        <div className='flex flex-col justify-center items-start'>
                            <h3 className='text-3xl pt-5'>Experiência incrível!</h3>
                            <p className='text-2xl text-left items-center pt-5'>Meu cachorro estava com alguns problemas de saúde
                            e foi atendido por um profissional de confiança.
                            </p>
                        </div>    

                        <img className='pt-0 md:pt-40 xl:pt-14' src={Star}></img>
                    </div>
                    <div className='hidden md:flex flex-col items-center border-4 border-black sm:w-1/6 h-full text-center drop-shadow-lg rounded-2xl p-5 '>
                        
                        <img className='w-28 m-5' src={Lady}></img>
                        <div className='flex flex-col justify-center items-start'>
                            <h3 className='text-3xl pt-5'>Gostei e recomendo!</h3>
                            <p className='text-2xl text-left items-center pt-5'>A gata da minha avó estava doente nos últimos dias, não 
                            sabiamos onde levar ela e o PetSaúde ajudou a achar um veterinário para nos ajudar.
                            </p>
                        </div>    

                        <img className='pt-5' src={Star}></img>
                    </div>
                </div>
            </div>
        </>
    );
}