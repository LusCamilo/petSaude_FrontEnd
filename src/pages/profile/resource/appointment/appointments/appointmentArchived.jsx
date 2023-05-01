import React, { useState, useEffect } from 'react';
import './styleAppointment.css'

export const AppointmentArchived = (props) => {
    
    const [pedidos, setPedido] = useState([])
    const [quant, setQuant] = useState({Finalizado: 0, Cancelado: 0})

    useEffect(() => {
        setPedido([
          {
            imagemPet: "https://i.pinimg.com/564x/d6/f8/50/d6f850459ccd0a00dd65ca3309cb3d7c.jpg",
            estado: "Cancelado",
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
            imagemPet: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVYPUnLOG9LqCBw0kA_tkN4iQqA1NQTh9Lr8hQuKh0LogsMDExaCImrwdhjcDNQoLp5UE&usqp=CAU",
            estado: "Cancelado",
            nomePet: "Pixie",
            sexo: "Feminino",
            especie: "Gato",
            tamanho: "Pequeno",
            idade: "1 ano",
            dataConsulta: "25/05/2023",
            horario: "13:00",
            descricao: "Exame cardiaco",
          },
          {
            imagemPet: "https://www.portaldoanimal.org/wp-content/uploads/2019/02/gatinha-pastor-alemao2-6.jpg",
            estado: "Finalizado",
            nomePet: "Randell",
            sexo: "Masculino",
            especie: "Guaxinim",
            tamanho: "Médio",
            idade: "3 anos",
            dataConsulta: "24/08/2023",
            horario: "21:00",
            descricao: "Exame imunológico",
          },
        ]);

      }, []);

      useEffect(() => {
        let cancelada = 0;
        let finalizar = 0;
      
        pedidos.forEach(pedir => {
          if (pedir.estado == "Cancelado") {
            cancelada += 1;
          } else if (pedir.estado == "Finalizado") {
            finalizar += 1;
          }
        });
      
        setQuant(prevQuant => ({ ...prevQuant, Finalizado: finalizar, Cancelado: cancelada }));
      }, [pedidos]);

    return(
        <section>
            <div className='flex flex-row gap-3 justify-between'>
                <div className='flex flex-col'>
                    <div className='flex flex-row gap-2'><h2>Consultas Finalizadas</h2> <div class="w-10 h-10 rounded-md bg-[#09738A]"></div></div>
                    <div className='flex flex-row gap-2'><div className='text-[#A9A9A9] text-base'>Quantidade:</div> <div>{quant.Finalizado}</div></div>
                </div>
                <div className='flex flex-col'>
                    <div className='flex flex-row gap-2'><h2>Consultas Canceladas</h2> <div class="w-10 h-10 rounded-md bg-[#F1EAC6]"></div></div>
                    <div className='flex flex-row gap-2'><div className='text-[#A9A9A9] text-base'>Quantidade:</div> <div>{quant.Cancelado}</div></div>
                </div>
            </div>
            <div className='w-full flex flex-col gap-3 mr-2'>
                    {pedidos.map(pedido =>{
                         const cor = pedido.estado == 'Cancelado' ? 'bg-[#F1EAC6]' : 'bg-[#09738A]'
                        return(
                            <div className={`${cor} border-none sm:border-solid border h-1/6 rounded-lg border-black flex flex-col gap-0 pl-3 sm:pl-20 py-8`}>
                                <div className='flex flex-row items-center content-center text-center text-6xl gap-4'>
                                    <img src={pedido.imagemPet} alt="Imagem do pet" />
                                    <h2 className='font-normal flex justify-center sm:justify-start font-sans'>{pedido.nomePet}</h2>
                                </div>
                                <div className='flex flex-col sm:flex-row justify-between pr-20'>
                                    <div className='flex flex-col justify-start w-full sm:w-1/3 '>
                                        <div>
                                            <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                                Nome
                                                <input type="text" disabled placeholder={pedido.nomePet} className='bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl '/>
                                            </label>
                                        </div>
                                        
                                        <div>
                                            <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                                Tamanho
                                                <input type="text" disabled placeholder={pedido.tamanho} className='bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl '/>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex flex-col sm:flex-col justify-start content-center w-full sm:w-1/3'>
                                        <div className='w-full'>
                                            <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                                Sexo
                                                <input type="text" disabled placeholder={pedido.sexo} className='bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl '/>
                                            </label>
                                        </div>   
                                        <div className='w-full'>
                                            <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                            Idade
                                            <input type="text" disabled placeholder={pedido.idade} className='bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl '/>
                                            </label>
                                        </div>                        
                                    </div>
                                    <div className='flex flex-col sm:flex-col justify-start content-center w-full sm:w-1/3'>
                                        <div className='w-full'>
                                            <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                                Espécie
                                                <input type="text" disabled placeholder={pedido.especie} className='bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl '/>
                                            </label>
                                        </div>                   
                                    </div>
                                </div>
                                <h2 className='font-normal  flex justify-center sm:justify-start font-sans'>Informações de consulta </h2>
                                <div className='flex flex-col justify-between pr-20'>
                                    <div className='flex flex-row justify-start w-full sm:w-full '>
                                        <div>
                                            <label className='flex flex-col text-xl text-[#A9A9A9] gap-0'>
                                            Data
                                            <input type="text" disabled placeholder={pedido.dataConsulta} className='bg-transparent placeholder:text-gray-400 w-full placeholder:text-3xl border-none text-3xl '/>
                                            </label>
                                        </div>
                                        <div className='w-full'>
                                            <label className='flex flex-col text-xl text-[#A9A9A9] gap-0'>
                                                Horário
                                                <input type="text" disabled placeholder={pedido.horario} className='bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl '/>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex flex-row sm:flex-col justify-start content-center w-full '>
                                        <div>
                                            <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                                Descrição
                                                <input type="text" disabled placeholder={pedido.descricao} className='bg-transparent placeholder:text-gray-400 w-full placeholder:text-3xl border-none text-3xl '/>
                                            </label>
                                        </div>                 
                                    </div>
                                </div>
                                <div className='flex flex-row items-center content-center text-bottom gap-2'>
                                    <h2 className='font-normal  flex justify-center sm:justify-start font-sans'>Status:</h2>
                                    <div className='text-[#49454F] font-normal text-lg font-sans'>{pedido.estado}</div>
                                </div>
                            </div>
                        )})}
                </div>   
          
        </section>
    )
}