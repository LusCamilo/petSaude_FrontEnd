import React from 'react'
import { GoLocation } from "react-icons/go";
import { ImCalendar } from "react-icons/im";
import { FaUserNurse  } from "react-icons/fa";

export const WebFunction = () => {
	return (
		<>
			<div className='flex flex-col justify-center items-center  bg-[#9ED1B7] pb-20 pt-14'>
				<h2 className="px-10 text-2xl sm:text-4xl font-semibold font-montserrat sm:pt-20 text-center md:w-3/6 ">A PetSaúde tem tudo que você precisa para manter a saúde de seu Pet em dia!</h2>
				<div className='md:flex flex-row justify-center sm:flew-col gap-32 sm:pt-20 md:p-20 w-full'>
					<div className='hidden md:flex md:flex-col bg-[#78A890] w-4/5 md:w-2/3 h-full xl:w-96 text-center drop-shadow-lg rounded-2xl p-5 mt-14 md:mt-0 ml-10 md:ml-0'>
						<div className='flex '>
							<FaUserNurse   className="text-6xl pt-5"/>
							<h3 className='text-white md:text-2xl text-xl pt-5'>Perfil dos veterinários disponíveis na plataforma!</h3>
						</div>
						<p className='text-white text-start text-xl sm:text-center pt-10'>Acesse o perfil Vet para ler suas informações acadêmicas e pessoais para ter um melhor atendimento.</p>
					</div>
					<div className=' bg-[#78A890] w-4/5 md:w-2/3 h-full xl:w-96 text-center drop-shadow-lg rounded-2xl p-5 mt-14 md:mt-0 ml-10 md:ml-0'>
						<div className='flex gap-3'>
							<GoLocation className="text-6xl pt-5"/>
							<h3 className='text-white md:text-2xl text-xl pt-5'>Pesquise e encontre nossas diversas opções!</h3>
						</div>
						<p className='text-white text-start text-xl sm:text-center pt-10'>Com nosso sistema de busca, é possível achar os especialistas com o melhor atendimento perto de você.</p>
					</div>
					<div className='hidden md:flex md:flex-col bg-[#78A890] w-4/5 md:w-2/3 h-full xl:w-96 text-center drop-shadow-lg rounded-2xl p-5 mt-14 md:mt-0 ml-10 md:ml-0'>
						<div className='flex'>
							<ImCalendar  className="text-6xl pt-5"/>
							<h3 className='text-white md:text-2xl text-xl pt-5'>Tenha acesso a suas consultas!</h3>
						</div>
						<p className='text-white text-start text-xl sm:text-center pt-10'>A partir da página de visualização de agendamentos, você pode ter acesso a informações sobre suas consultas.</p>
					</div>
				</div>
			</div>
		</>
	);
}