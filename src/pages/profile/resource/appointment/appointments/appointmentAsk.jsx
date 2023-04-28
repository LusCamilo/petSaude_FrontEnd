import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

export const AppointmentAsk = () => {

    const [pedidos, setPedido] = useState([])


    useEffect(() => {
        setPedido([
          {
            nomePet: "Rex",
            sexo: "Masculino",
            especie: "Cachorro",
            tamanho: "Médio",
            idade: "4 anos",
            dataConsulta: "2023-05-10",
            horario: "14:00",
            descricao: "Exame de rotina",
          },
          {
            nomePet: "Rex",
            sexo: "Masculino",
            especie: "Cachorro",
            tamanho: "Médio",
            idade: "4 anos",
            dataConsulta: "2023-05-10",
            horario: "14:00",
            descricao: "Exame de rotina",
          },
          {
            nomePet: "Rex",
            sexo: "Masculino",
            especie: "Cachorro",
            tamanho: "Médio",
            idade: "4 anos",
            dataConsulta: "2023-05-10",
            horario: "14:00",
            descricao: "Exame de rotina",
          },
        ]);
      }, []);

    return(
        <section>
               <div className='w-5/6 flex flex-col gap-3'>
                    {pedidos.map(pedido =>{
                        return(
                            <div className='border-none sm:border-solid border h-1/4 rounded-lg border-black flex flex-col gap-10 pl-3 sm:pl-20 py-8'>
                                <div>
                                    <h2 className='font-normal text-3xl flex justify-center sm:justify-start sm:text-6xl font-sans'>Pet (Nome do pet)</h2>
                                </div>
                                <div className='flex flex-col sm:flex-row justify-between pr-20'>
                                    <div className='flex flex-col gap-3 sm:gap-5 justify-start w-full sm:w-1/3 mb-2'>
                                        <div>
                                            <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                                Nome
                                                <input type="text" disabled placeholder={pedido.nomePet} className='bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl '/>
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
                        )})}
                </div>    
        </section>
    )
}