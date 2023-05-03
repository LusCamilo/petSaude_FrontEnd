import React, { useState, useEffect } from 'react';
import './styleAppointment.css'
import Modal from 'react-modal';

const customStyles = {
    content: {
     top: '50%',
     left: '50%',
     right: 'auto',
     bottom: 'auto',
     marginRight: '-50%',
     transform: 'translate(-50%, -50%)',
     border: '4px solid #9ED1B7',
     borderRadius: '10px',
     width: '40vw',
     height: '75vh',
     display: "flex",
     justifyContent: "center"

    }
 };

export const AppointmentArchived = (props) => {
    
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [pedidos, setPedido] = useState([])
    const [quant, setQuant] = useState({Finalizado: 0, Cancelado: 0})
    const [showModal, setShowModal] = useState(false);
  

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

      const handleOpenModal = () => {
        setShowModal(true);
      };
      
      const handleCloseModal = () => {
        setShowModal(false);
      };      

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

      const [rating, setRating] = useState(0);

      const handleRatingChange = (event) => {
        setRating(event.target.value);
      };

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
                                <div>
                                <button 
                                class="bg-yellow-500 hover:bg-yellow-600 text-white w-1/6 font-bold py-2 px-4 rounded"
                                onClick={openModal}
                                >
                                Avaliar consulta
                                </button>
                                <Modal
                                    isOpen={modalIsOpen}
                                    onAfterOpen={afterOpenModal}
                                    onRequestClose={closeModal}
                                    style={customStyles}
                                    contentLabel="Example Modal"
                                >
                                    <form>
                                        <div className="bg-white w-full ">
                                        <div className="mb-3">
                                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                                            Título do comentário
                                            </label>
                                            <input
                                            id="email"
                                            type="email"
                                            placeholder=""
                                            autoFocus
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="comment" className="block text-gray-700 font-bold mb-2">
                                            Assunto do comentário
                                            </label>
                                            <textarea
                                            id="comment"
                                            rows={3}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                        <div>
                                        <label htmlFor="comment" className="block text-gray-700 font-bold mb-2">
                                            De 1 a 5, quão bom foi o atendimento?
                                            <div className="p-4 flex justify-center flex-row ">    
                                                <div className="flex items-center mb-4">
                                                    <input
                                                    type="radio"
                                                    id="rating1"
                                                    name="rating"
                                                    value="1"
                                                    checked={rating === '1'}
                                                    onChange={handleRatingChange}
                                                    className="mr-2 w-2 h-2"
                                                    />
                                                    <label htmlFor="rating1">1</label>
                                                </div>
                                                <div className="flex items-center mb-4">
                                                    <input
                                                    type="radio"
                                                    id="rating2"
                                                    name="rating"
                                                    value="2"
                                                    checked={rating === '2'}
                                                    onChange={handleRatingChange}
                                                    className="mr-2 w-2 h-2"
                                                    />
                                                    <label htmlFor="rating2">2</label>
                                                </div>
                                                <div className="flex items-center mb-4">
                                                    <input
                                                    type="radio"
                                                    id="rating3"
                                                    name="rating"
                                                    value="3"
                                                    checked={rating === '3'}
                                                    onChange={handleRatingChange}
                                                    className="mr-2 w-2 h-2"
                                                    />
                                                    <label htmlFor="rating3">3</label>
                                                </div>
                                                <div className="flex items-center mb-4">
                                                    <input
                                                    type="radio"
                                                    id="rating4"
                                                    name="rating"
                                                    value="4"
                                                    checked={rating === '4'}
                                                    onChange={handleRatingChange}
                                                    className="mr-2 w-2 h-2"
                                                    />
                                                    <label htmlFor="rating4">4</label>
                                                </div>
                                                <div className="flex items-center mb-4">
                                                    <input
                                                    type="radio"
                                                    id="rating5"
                                                    name="rating"
                                                    value="5"
                                                    checked={rating === '5'}
                                                    onChange={handleRatingChange}
                                                    className="mr-2 w-2 h-2"
                                                    />
                                                    <label htmlFor="rating5">5</label>
                                                </div>
                                            </div>
                                        </label>
                                        </div>
                                            <div className="flex justify-between">
                                                <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                type="button"
                                                onClick={closeModal}
                                                >
                                                Fechar
                                                </button>
                                                <button
                                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline"
                                                type="submit"
                                                onClick={closeModal}
                                                >
                                                Enviar
                                                </button>
                                            </div>    
                                        </div>
                                    </form>
                                    </Modal>
                                </div>

                            </div>
                        )})}
                </div>   
          
        </section>
    )
}