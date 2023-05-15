import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { useForm } from 'react-hook-form';
import Monkey from '../../../../assets/svg/monkey.svg';
import Dog from '../../../../assets/svg/iconDog.svg';
import { getAllPets   } from '../../../../services/integrations/pet';
import { appointmentAdd } from '../../../../services/integrations/appointment';
import { PetSpawn } from './appointmentPets';
import Modal from 'react-modal'
import { propTypes } from 'react-bootstrap/esm/Image';
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Appointment = (props) => {
    const [date, setDate] = useState('')
    const [startsAt, setStartAt] = useState('')
    const [description, setDescription] = useState('')
    const [petId, setPetId] = useState(0)
    const [petsAll, setPetAll] = useState([]);
    const [petsName, setPetName] = useState('Nome');
    const [ThereArentPets, setThereArentPets] = useState('hidden');
    const [ThereArePets, setThereArePets] = useState('flex');
    const [petsEspecie, setPetEspecie] = useState('Tamanho');

    const [petImage, setPetImage] = useState(Monkey)
    const { register, handleSubmit, formState: errors, setValue } = useForm()

    const showToastMessage = (message) => {
        toast(`${message}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

      useEffect(() => {
        const fetchData = async () => {
        const token = localStorage.getItem('__user_JWT')
        const decoded = jwt_decode(token);
          if (decoded.id) {
            const pets = await getAllPets(decoded.id);
            if (pets == null || pets == undefined || pets == []) {
                setPetAll([{ name: "Não foram encontrados pets" }]);
                setThereArentPets('flex')
                setThereArePets('hidden')
            } else setPetAll(pets)
          } else {
            setPetAll([ "Não foram encontrados pets" ]);
            setThereArentPets('flex')
            setThereArePets('hidden')
          }
        };
        fetchData();
      }, []);
    
    const [classButton, setClassButton] = useState("")

    function newDate(event) {
        let valor = event.target.value;
        let data = valor;
        let novaData = adicionarUmDia(data)
        let dia = novaData.toLocaleDateString("pt-BR");
        let diaMesAno = dia.split('/').join('-');
        setDate(diaMesAno);
      }

      function adicionarUmDia(data) {
        let novaData = new Date(data);
        novaData.setDate(novaData.getDate() + 1);
        return novaData;
      }

    function newDescription(event) {
        setDescription(event.target.value);
    }

    function newTime(event) {
        setStartAt(event.target.value + ":00");
      }      
    
      let hoje = new Date();
      let ano = hoje.getFullYear();
      let mes = hoje.getMonth() + 1;
      let dia = hoje.getDate();
      if (mes < 10)  mes = '0' + mes 
      if (dia < 10)  dia = '0' + dia 
      let dataFormatada = `${ano}-${mes}-${dia}`;

      async function submitAppointment(event) {
        event.preventDefault();
        const vet = localStorage.getItem("__Vet_correctId");
        const appointmentInfos = {
          date: date,
          startsAt: date + ' ' + startsAt,
          description: description,
          veterinaryId: parseInt(vet, 10),
          petId: petId,
        }
        const addAppointment = await appointmentAdd(appointmentInfos);
        console.log("aqui");
        console.log( addAppointment);
        if(addAppointment.response.message == 'Consulta criada com sucesso'){
            showToastMessage("Consulta criada com sucesso")
            setTimeout(function () {
                props.onCancel()
            }, 2000);
        } else if(addAppointment.response == "A data não pode ser anterior a atual" || addAppointment.response == "Já existe uma consulta agendada para o Veterinário nesse horário"){
            showToastMessage("Erro ao criar a consulta, por causa da data, tente outra")
            setTimeout(function () {
                props.onCancel()
            }, 2000);
        }else {
            showToastMessage("Erro ao criar a consulta, tente novamente mais tarde")
            setTimeout(function () {
                props.onCancel()
            }, 2000);
        }
        setTimeout(function () {
            props.onCancel()
        }, 2000);
      }
      

    function handlePetSelection(pet) {
        let today = new Date();
        setPetName(pet.name);
        let idade = today - pet.birthDate
        setPetEspecie(pet.petSize);
        setPetId(pet.id);
        if (pet.photo == null || pet.photo == undefined) {
            setPetImage(Dog);
        } else  setPetImage(pet.photo);
      }


    return (
    <section id='buttonCanceled' className=" w-full h-full -mt-60 bg-black" >
        <form onSubmit={handleSubmit(submitAppointment)} className=" flex justify-start w-full">
            <div className='p-2 md:p-20  w-full'>
                <h1 className='flex justify-start text-3xl md:text-5xl font-semibold pt-2 md:pt-10'>Selecione o animal</h1>
                <div className='flex justify-between md:pt-10 w-full  '>
                <div className={`${ThereArePets} flex-col md:w-2/4  md:p-5 overflow-x-auto max-h-64 border-2 rounded-xl border-gray-400`}>
                    {petsAll.map(pet => {
                        if (pet.photo == null || pet.photo == undefined || pet.photo == '') {
                            return(<button
                                className='py-2 mt-2 bg-slate-500 gap-2 rounded-md flex-grow border-2 border-black flex flex-row'
                                key={pet.id}
                                type='button'
                                id={pet.id}
                                onClick={() => handlePetSelection(pet)}
                                >  
                                    <img className='w-32' src={Dog} alt="Pet ainda não há foto" />
                                    <p className='text-2xl shadow-none w-full flex text-center align-middle content-center items-center text-black' disabled>{pet.name}</p>
                                </button>)
                        } else{
                            return(<button
                                key={pet.id}
                                type='button'
                                className='py-2 mt-2 bg-slate-500 gap-2 rounded-md flex-grow border-2 border-black flex flex-row'
                                id={pet.id}
                                onClick={() => handlePetSelection(pet)}
                                >  
                                    <img className='w-32' src={pet.photo} alt={pet.name} />
                                    <p className='text-3xl shadow-none w-full flex text-center align-middle content-center items-center text-black' disabled>{pet.name}</p>
                                </button>)
                        }
                        
                    })}
                    </div>
                    <div className={`${ThereArentPets} flex-col md:w-2/4  md:p-5 overflow-x-auto max-h-64 border-2 rounded-xl border-gray-400`}>
                    
                       
                        <div className='py-2 mt-2 bg-slate-500 gap-2 rounded-md flex-grow border-2 border-black flex flex-row'>  
                                <img className='w-32' src={Dog} alt="Pet ainda não há foto" />
                                <p className='text-2xl shadow-none w-full flex text-center align-middle content-center items-center text-black' disabled>Voê não possui pets</p>
                        </div>
                    </div>
                    <div className='hidden md:flex justify-end pl-20'>
                    <img className=' w-56 rounded-full' src={petImage}></img>
                        <div className='flex flex-col pl-10 md:pt-10'>
                            <label>
                                <input disabled type="text" name="firstName" value={petsName} className='bg-transparent border-none  md:text-5xl font-semibold ' />
                            </label>
                            <label>
                                <input disabled type="text" name="firstName" value={petsEspecie} className='bg-transparent border-none text-1xl md:text-6xl text-[#A9A9A9]' />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className=' w-full'>
                <div className=''>
                    <h2 className='hidden md:flex md:text-5xl font-semibold pl-20'>Informações</h2>
                    <h2 className='flex justify-center text-3xl md:hidden md:text-5xl font-semibold'>Data e hora</h2>
                    <div className='flex xl:flex-row flex-col justify-between lg:gap-8 gap-2 w-full  pl-14 md:pl-20 pt-3 md:pt-10'>
                        <label className='w-full flex flex-col text-gray-400 '>
                            Data
                            <input type='date' onChange={newDate}min={dataFormatada}/>
                        </label>
                        <label className='w-full flex flex-col text-gray-400'>
                            Hora
                            <input type='time' onChange={newTime} />
                        </label>
                    </div>
                    <div className=' p-4'>
                        <label htmlFor="descricao" className=" mb-2">Descrição:</label>
                        <textarea id="descricao" name="descricao" className=" border-2 border-black w-full rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" rows="4" onChange={newDescription}></textarea>
                    </div>
                </div>
                <div className='p-3 md:pl-20 md:pr-20'>
                    <div className='flex mt-2 md:mt-10 justify-between gap-5'>
                        <button className={`p-2 md:w-56 md:text-center md:h-20 border rounded-full bg-[#F9DEDC] text-[#410E0B] font-bold text-2xl origin-center `} type="button" onClick={() =>  props.onCancel()}>
                            Cancelar
                        </button>
                        <button type="submit" className='md:ml-56 p-2 w-32 md:w-56 text-center md:h-20 border rounded-full bg-[#9ED1B7] text-[#41564B] font-bold text-2xl'
                              onClick={(event) => {
                                submitAppointment(event);
                              }}
                            >
                            Marcar 
                        </button>
                    </div>
                </div>
            </div>

        </form>
    </section>
    );   

};


