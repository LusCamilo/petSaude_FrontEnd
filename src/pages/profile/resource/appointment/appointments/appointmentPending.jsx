import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
     top: '50%',
     left: '50%',
     right: 'auto',
     bottom: 'auto',
     marginRight: '-50%',
     transform: 'translate(-50%, -50%)',
     borderRadius: '10px',
     width: '100px',
     height: '100px',
     display: "flex",
     justifyContent: "center",
     backgroundColor: "red"
    }
 };

export const AppointmentPeding = (props) => {

    const [pedidos, setPedido] = useState([])
    const [tutorStatus, setTutorStatus] = useState('hidden')
    const [buttonStatus, setButtonStatus] = useState('flex')

    const handleClick = () => {
        setTutorStatus('flex');
        setButtonStatus('hidden');
      };
    
      const handleClickAgain = () => {
        setTutorStatus('hidden');
        setButtonStatus('flex');
      };

      const [modalIsOpen, setIsOpen] = React.useState(false);

      function openModal() {
        setIsOpen(true);
      }
    
      function closeModal() {
          setIsOpen(false);
      }
  
      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        //subtitle.style.color = '#f00';
      }
      
    useEffect(() => {
        setPedido([
          {
            imagemPet: "https://i.pinimg.com/564x/d6/f8/50/d6f850459ccd0a00dd65ca3309cb3d7c.jpg",
            donoImg: "https://www.portaldoanimal.org/wp-content/uploads/2019/02/gatinha-pastor-alemao2-6.jpg",
            dono: "algebra",
            telefone: "0114002-8922",
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
            donoImg: "https://i.pinimg.com/564x/d6/f8/50/d6f850459ccd0a00dd65ca3309cb3d7c.jpg",
            dono: "metemática",
            telefone: "0134002-8923",
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
            donoImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVYPUnLOG9LqCBw0kA_tkN4iQqA1NQTh9Lr8hQuKh0LogsMDExaCImrwdhjcDNQoLp5UE&usqp=CAU",
            dono: "surpresa",
            telefone: "Festa",
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

    return(
        <section>
               <div className='w-full flex flex-col gap-3 mr-2'>
                    {pedidos.map(pedido =>{
                        return(
                            <div className='border-none sm:border-solid border h-1/6 rounded-lg border-black flex flex-col gap-0 pl-3 sm:pl-20 py-8'>
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
                                <div className='flex flex-row justify-between'>
                                    <button className={`bg-[#F9DEDC] ${buttonStatus} justify-center items-center content-center text-[#410E0B] text-center w-56 h-14 border rounded-full text-xl font-normal mr-20`}
                                        onClick={openModal}
                                    >
                                        Cancelar consulta
                                    </button>
                                    <Modal
                                    isOpen={modalIsOpen}
                                    onAfterOpen={afterOpenModal}
                                    onRequestClose={closeModal}
                                    style={customStyles}
                                    contentLabel="Example Modal"
                                >

                                </Modal>
                                    <button className={`bg-[#9ED1B7] ${buttonStatus} justify-center items-center content-center text-[#41564B] text-center w-72 h-14 border rounded-full text-xl font-normal mr-20`} >
                                        Concluir consulta
                                    </button>
                                </div>
                            </div>
                        )})}
                </div>    
        </section>
    )
}