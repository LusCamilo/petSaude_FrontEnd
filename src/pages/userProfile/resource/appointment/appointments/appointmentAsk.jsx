import React, { useState, useEffect } from 'react';
import './styleAppointment.css'
import * as Dialog from '@radix-ui/react-dialog';
import jwt_decode from "jwt-decode";
import { getAppointments } from '../../../../../services/integrations/appointment';
import { getUser, getVeterinary} from '../../../../../services/integrations/user'
import {  recusarAppointments, aceitadoAppointments } from '../../../../../services/integrations/appointment'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AppointmentAsk = () => {

    const [pedidos, setPedido] = useState([])
    const [tutorStatus, setTutorStatus] = useState('hidden')
    const [buttonStatus, setButtonStatus] = useState('flex')
    const [buttonAceitar, setButtonAceitar] = useState('flex')
    const [showVet, setShowVet] = useState('hidden')
    const [showClient, setShowClient] = useState('flex')
    const [divNothing, setDivNothing] = useState('hidden') 
    const [duracao, setDuracao] = useState(0) 
    const [preco, setPreco] = useState(0.0) 



    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('__user_JWT')
                console.log(token);
                const decoded = jwt_decode(token);
                console.log(decoded.id);
                let appoint = await getappo(decoded.id)
                console.log("appoint");
                console.log(appoint);
               
                if (appoint != undefined && appoint != null) {
                    
                    let filteredAppointments = appoint.filter(appointment => appointment.status == 'WAITING_CONFIRMATION');
                    
                    let appoints = await Promise.all(filteredAppointments.map(async (app) => {
                        let client = await getclient(app.clientId);
                        let arrayPet = await getPet(app.petId, client.Pet)
                        let vet = await getvet(app.veterinaryId)
                        console.log(appoint);
                        console.log(client);
                        console.log(arrayPet);
                        console.log(vet);
                        const consultaDataSplit = app.date.split('T');
                        const consultaDataPrimeiraMetade = consultaDataSplit[0];
                        const consultaDataFormatada = consultaDataPrimeiraMetade.split('-').reverse().join('/');
    
    
                        const horarioSplit = app.startsAt.split('T');
                        const horarioSegundaMetade = horarioSplit[1];
                        const horarioSplit2 = horarioSegundaMetade.split(':00.000Z');
                        const horario = horarioSplit2[0];
    
                        const dataDeNascimento = new Date(arrayPet.birthDate);
                        const dataAtual = new Date();
    
                        const diferencaEmMilissegundos = dataAtual - dataDeNascimento;
                        const idadeEmAnos = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24 * 365));
    
                        let idadeString;
    
                        if (typeof idadeEmAnos === "number" && Number.isInteger(idadeEmAnos)) {
                            idadeString = idadeEmAnos.toString() + " anos";
                        } else {
                            const idadeEmMeses = idadeEmAnos * 12;
                            idadeString = idadeEmMeses.toString() + " meses";
                        }
    
                        console.log(idadeEmAnos); // Saída: 23
    
    
                        const finalArray = {
                          idAppoint: app.id,
                          imagemPet: arrayPet.photo,
                          donoImg: client.profilePhoto,
                          dono: client.personName,
                          telefone: client.cellphoneNumber,
                          nomePet: arrayPet.name,
                          sexo: arrayPet.petGender,
                          especie: arrayPet.petSpecie.name,
                          tamanho: arrayPet.petSize,
                          idade: idadeString,
                          dataConsulta: consultaDataFormatada,
                          horario: horario,
                          descricao: app.description,
                          vetName: vet.personName,
                          vetPhone: vet.cellphoneNumber,
                          vetPhoto: vet.profilePhoto
                        };

                        console.log(finalArray);
                      
                        return finalArray;
                      }));
                      setDivNothing('hidden')
                      setPedido(appoints)   
                } else {
                    setDivNothing('flex')
                    setPedido([])
                    
                }
                    
                  
                console.log();
                if (decoded.isVet == false) {
                    setButtonAceitar('hidden')
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, []);


    
      
    const getPet = async (idPet, arrayPet) => {
        const filteredPets = arrayPet.filter(pet => pet.id === idPet);
        return filteredPets[0];
      }

      const showToastMessageSucess = (message) => {
        toast.success(`${message}`, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };


    const showToastMessageFailed = (message) => {
        toast.error('Erro no sistema, tente mais tarde', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

      const recusarAppointment = async (idAppointment) => {
        const jsonNothing = {
            duration: 0,
            price: 0.00
          };
          
        const recusar = await recusarAppointments(idAppointment, jsonNothing);
        console.log(recusar);
        if (recusar.response.message == "Consulta recusada") {
            showToastMessageSucess("Consulta recusada com sucesso!")
            setTimeout(() => {
                window.location.reload();
              }, 2000); // Refresh after 5 seconds
              
          }
          else {
            showToastMessageFailed()
            setTimeout(() => {
                window.location.reload();
              }, 2000); // Refresh after 5 seconds
        }
        return recusar
      }

      const marcarAppointment = async (idAppointment) => {
        const jsonAppointment = {
            duration: parseFloat(duracao),
            price: parseFloat(preco)
          };
        const aceitar = await aceitadoAppointments(idAppointment, jsonAppointment);
        console.log(aceitar);
        if (aceitar.response.message == "Consulta aceita") {
            showToastMessageSucess("Consulta aceita com sucesso!")
            setTimeout(() => {
                window.location.reload();
              }, 2000); // Refresh after 5 seconds
          }
          else {
            showToastMessageFailed()
            setTimeout(() => {
                window.location.reload();
              }, 2000); // Refresh after 5 second
        }
        return aceitar
      }


    const getappo = async (idPerson) => {
        let allAboutIt = await getAppointments(idPerson)
        
        if (allAboutIt.response == 'Não foram encontrados registros no Banco de Dados') {
            return []
        } else {
            return allAboutIt.response.user.Appointments
        }

    };

    const getclient = async (idPerson) => {
        let allAboutIt = await getUser(idPerson)
        console.log("entrou");
        console.log(allAboutIt);
        if (allAboutIt.response == 'Não foram encontrados registros no Banco de Dados') {
            return []
        } else {
            return  allAboutIt.response.user
        }

    };

    const getvet = async (idPerson) => {
        let allAboutIt = await getVeterinary(idPerson)
        console.log("vet");
        console.log(allAboutIt);
        if (allAboutIt.response == 'Não foram encontrados registros no Banco de Dados') {
            return []
        } else {
            return  allAboutIt.response.user
        }

    };

    function formatPrice(input) {
        let value = input.value.replace(/[^0-9\.]/g, '');
      
        let decimalCount = value.split('.').length - 1;
        if (decimalCount > 1) {
          value = value.slice(0, -1);
        }
      
        input.value = parseFloat(value).toLocaleString('pt-BR', {minimumFractionDigits: 2});
      }

    const handleClick = () => {
        setTutorStatus('flex');
        setButtonStatus('hidden');
      };
    
      const handleClickAgain = () => {
        setTutorStatus('hidden');
        setButtonStatus('flex');
      };

    useEffect( ()  => {
        const token = localStorage.getItem('__user_JWT')
        console.log(token);
        const decoded = jwt_decode(token);

        if (decoded.isVet) {
            setShowVet('hidden')
            setShowClient('flex')
        } else {
            setShowVet('flex')
            setShowClient('hidden')
        }
        // setPedido([
        //     {
        //       imagemPet: "https://i.pinimg.com/564x/d6/f8/50/d6f850459ccd0a00dd65ca3309cb3d7c.jpg",
        //       donoImg: "https://www.portaldoanimal.org/wp-content/uploads/2019/02/gatinha-pastor-alemao2-6.jpg",
        //       dono: "algebra",
        //       telefone: "0114002-8922",
        //       nomePet: "Rex",
        //       sexo: "Masculino",
        //       especie: "Cachorro",
        //       tamanho: "Médio",
        //       idade: "4 anos",
        //       dataConsulta: "2023-05-10",
        //       horario: "14:00",
        //       descricao: "Exame de rotina",
        //     }
        //   ]);
      }, []);

    return(
        <section className=''>
               <div className=' w-full flex flex-col gap-3 mr-2'>
                    <div className={`${divNothing}`}>
                        Nenhuma consulta a ser aceita
                    </div>
                    {pedidos.map(pedido =>{
                        return(
                            <div className='border-none sm:border-solid border h-1/6 rounded-lg border-black flex flex-col gap-0 pl-3 py-8 md:pl-20 sm:pl-20'>
                                <div className='flex flex-row items-center md:content-center md:text-center text-6xl gap-4'>
                                    <img className='PetImage' src={pedido.imagemPet} alt="Imagem do pet" />
                                    <h2 className='font-normal flex md:justify-center sm:justify-start font-sans'>{pedido.nomePet}</h2>
                                </div>
                                <div className='flex md:justify-between pr-20'>
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
                                <div  className={`${showClient} flex-col`}>
                                    <div className={`${tutorStatus} flex-row items-center content-center text-center text-6xl gap-4`}>
                                        <img className='PetImage' src={pedido.donoImg} alt="Imagem do pet" />
                                        <h2 className='font-normal flex justify-center sm:justify-start font-sans'>{pedido.dono}</h2>
                                    </div>
                                    <div className='flex flex-col sm:flex-row justify-between pr-20'>
                                        <div className={`${tutorStatus} flex-row justify-start w-full`}>
                                            <div>
                                                <label className='flex flex-col text-xl text-[#A9A9A9]' >
                                                    Nome
                                                    <input type="text" disabled placeholder={pedido.dono} className='bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl '/>
                                                </label>
                                            </div>
                                            
                                            <div>
                                                <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                                    Telefone
                                                    <input type="text" disabled placeholder={pedido.telefone} className='bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl '/>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${showVet} flex-col`}>
                                    <div className={`${tutorStatus} flex-row items-center content-center text-center text-6xl gap-4`}>
                                        <img className='PetImage' src={pedido.vetPhoto} alt="Imagem do pet" />
                                        <h2 className='font-normal flex justify-center sm:justify-start font-sans'>{pedido.vetName}</h2>
                                    </div>
                                    <div className='flex flex-col sm:flex-row justify-between pr-20'>
                                        <div className={`${tutorStatus} flex-row justify-start w-full`}>
                                            <div>
                                                <label className='flex flex-col text-xl text-[#A9A9A9]' >
                                                    Nome
                                                    <input type="text" disabled placeholder={pedido.vetName} className='bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl '/>
                                                </label>
                                            </div>
                                            
                                            <div>
                                                <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                                    Telefone
                                                    <input type="text" disabled placeholder={pedido.vetPhone} className='bg-transparent placeholder:text-gray-400  placeholder:text-3xl border-none text-3xl '/>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h2 className='font-normal  flex justify-center sm:justify-start font-sans text-5xl pb-5 '>Informações de consulta </h2>
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
                                            <label class='flex flex-col text-xl text-[#A9A9A9]'>
                                                Descrição
                                                <p>
                                                    {pedido.descricao} 
                                                </p>
                                                {/* <input type="text" disabled placeholder={pedido.descricao} class='bg-transparent placeholder:text-gray-400 w-full placeholder:text-3xl border-none text-3xl'/> */}
                                            </label>
                                        </div>      
                                    </div>
                                </div>
                                <span className={`${buttonAceitar}`}>
                                    <div className={`${tutorStatus} flex-col justify-center items-start md:items-center content-center mb-2 ` }>
                                        <h2>Confirmar consulta</h2>
                                        <div className='w-1/3 flex justify-center gap-5 flex-col'>
                                            <label className='flex flex-col justify-center text-xl text-[#A9A9A9] w-full'>
                                                Duracação
                                                <input type="time" id="duracao" name="duracao" min="00:01" className='w-full text-2xl' 
                                                  defaultValue={duracao}
                                                  onChange={(e) => {
                                                    const time = e.target.value.split(':');
                                                    const hours = parseInt(time[0]);
                                                    const minutes = parseInt(time[1]);
                                                    const totalMinutes = (hours * 60) + minutes;
                                                    setDuracao(totalMinutes);
                                                  }}/>
                                            </label>
                                            <label className='flex flex-col justify-center text-xl text-[#A9A9A9] w-full'>
                                                Valor
                                                <div className='flex items-center justify-center gap-2'>
                                                    <span className='text-2xl align-bottom'>R$  </span>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        min="0.01"
                                                        name="preco"
                                                        id="preco"
                                                        lang="pt-BR"
                                                        className='min-w-full text-2xl'
                                                        defaultValue={preco}
                                                        onBlur={(e) => formatPrice(e.target)}
                                                        onChange={(e) => setPreco(e.target.value)}
                                                    />
                                                </div>
                                            </label>
                                        </div> 
                                    </div>
                                </span>
                                <div className='flex flex-row justify-around md:justify-between'>
                                    <button className={`bg-[#F9DEDC] ${buttonStatus} justify-center items-center content-center text-[#410E0B] text-center first-letter w-40 md:w-56 h-14 border rounded-full text-xl font-normal mr-20`}
                                    onClick={() => recusarAppointment(pedido.idAppoint)}
                                    >
                                        Recusar
                                    </button>
                                    <button className={`bg-[#F9DEDC] ${tutorStatus} justify-center items-center content-center text-[#410E0B] text-center w-40 md:w-56 h-14 mt-10 border rounded-full text-xl font-normal mr-20`}
                                        onClick={handleClickAgain}
                                    >
                                        Cancelar
                                    </button>
                                    <button className={`bg-[#9ED1B7] ${buttonStatus} justify-center items-center content-center text-[#41564B] text-center w-40 md:w-72 h-14 border rounded-full text-xl font-normal mr-20`} 
                                        onClick={handleClick}
                                    >
                                        Ver mais informações
                                    </button>
                                    <span className={`${buttonAceitar}`}>
                                        <button className={`bg-[#9ED1B7] ${tutorStatus} justify-center items-center content-center text-[#41564B] text-center w-40 md:w-72 h-14 mt-10 border rounded-full text-xl font-normal mr-20`} 
                                        onClick={() => marcarAppointment(pedido.idAppoint)}>
                                            Marcar
                                        </button>
                                    </span>
                                </div>
                                <ToastContainer
                                    position="top-right"
                                    autoClose={1500}
                                    hideProgressBar={false}
                                    newestOnTop={false}
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover
                                    theme="light"
                                />
                            </div>
                        )})}
                </div>    
        </section>
    )
}