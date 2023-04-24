import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Monkey from '../../../../assets/svg/monkey.svg';
import Dog from '../../../../assets/svg/iconDog.svg';
import { getAllPets   } from '../../../../services/integrations/pet';
import { appointmentAdd } from '../../../../services/integrations/appointment';
import { PetSpawn } from './appointmentPets';


export const Appointment = () => {

    const [date, setDate] = useState('')
    const [startsAt, setStartAt] = useState('')
    const [description, setDescription] = useState('')
    const [petId, setPetId] = useState(0)
    const [petsAll, setPetAll] = useState([]);
    const [petsName, setPetName] = useState('Nome');
    const [petsEspecie, setPetEspecie] = useState('Espécie');
    const [petImage, setPetImage] = useState(Monkey)
    const { register, handleSubmit, formState: errors, setValue } = useForm()

      useEffect(() => {
        const fetchData = async () => {
          const ids = localStorage.getItem("__ID");
          const id = 1;
          if (id) {
            const pets = await getAllPets(1);
            setPetAll(pets);
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
      console.log(dataFormatada);

    const submitAppointment = async () => {
        const vet = localStorage.getItem("__Vet_correctId");
        const appointmentInfos = {
            date: date,
            startsAt: date + ' ' + startsAt,
            endsAt: date + ' ' + startsAt,
            description: description,
            veterinaryId: parseInt(vet, 10),
            petId: petId,
        }

        console.log(appointmentInfos);

        const addAppointment = await appointmentAdd(appointmentInfos)
        console.log(addAppointment);

    }

    function handlePetSelection(pet) {
        setPetName(pet.name);
        setPetEspecie(pet.especie);
        setPetId(pet.id);
        setPetImage(pet.photo);
      }
    
    return (
    <section id='buttonCanceled' className={` md:w-3/4 border-4 border-[#9ED1B7] rounded-lg overflow-auto m-10 bg-white ${classButton}`}>
        <form onSubmit={handleSubmit(submitAppointment)} className="bg-green-300 w-full">
        <div className='p-2 md:p-20 bg-purple-500 w-full'>
            <h1 className='flex justify-start text-3xl md:text-5xl font-semibold pt-2 md:pt-10'>Selecione o animal</h1>
            <div className='flex justify-between md:pt-10 w-full bg-yellow-400'>
                <div className='flex flex-col md:w-2/4 md:p-5 overflow-y-auto bg-yellow-900 h-full'>
                    {petsAll.map(pet => {
                        if (pet.photo == null || pet.photo == undefined) {
                            return(<button
                                key={pet.id}
                                type='button'
                                className='py-2 gap-2 rounded-md flex-grow border-2 border-black flex flex-row'
                                id={pet.id}
                                onClick={() => handlePetSelection(pet)}
                                >  
                                    <img className='w-32' src={Dog} alt="Pet ainda não há foto" />
                                    <input className='text-2xl shadow-none w-full' placeholder={pet.name} disabled />
                                </button>)
                        } else{
                            return(<button
                                key={pet.id}
                                type='button'
                                className='py-2 gap-2 rounded-md flex-grow border-2 border-black flex flex-row'
                                id={pet.id}
                                onClick={() => handlePetSelection(pet)}
                                >  
                                    <img className='w-32' src={pet.photo} alt={pet.name} />
                                    <input className='text-2xl shadow-none w-full' placeholder={pet.name} disabled />
                                </button>)
                        }
                        
                    })}
                </div>
            <div className='hidden md:flex justify-end pl-20'>
                <img className=' w-56' src={petImage}></img>
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
        <div>
            <label htmlFor="descricao">Descrição:</label>
            <textarea id="descricao" name="descricao" onChange={newDescription}></textarea>
        </div>
        <div>
            <h2 className='hidden md:flex md:text-5xl font-semibold pl-20'>Selecione a data e a hora</h2>
            <h2 className='flex justify-center text-3xl md:hidden md:text-5xl font-semibold'>Data e hora</h2>
            <div className='flex xl:flex-row flex-col justify-between lg:gap-8 gap-2 w-full pl-14 md:pl-20 pt-3 md:pt-10'>
            <label className='w-full flex flex-col'>
                <input type='date' onChange={newDate}min={dataFormatada}/>
            </label>
            <label className='w-full flex flex-col'>
                <input type='time' onChange={newTime} />
            </label>
            </div>
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10">
            Agendar
        </button>
        </form>
    </section>
    );      
};


