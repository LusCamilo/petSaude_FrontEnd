import React, { useState, useEffect } from 'react';
import { AppointmentAsk } from './appointments/appointmentAsk';
import { PetHeader } from '../../pet/petHeader';
import { AppointmentPeding } from './appointments/appointmentPending';
import { AppointmentArchived } from './appointments/appointmentArchived';
import 'react-toastify/dist/ReactToastify.css';


export const AppointmentView = (props) => {

	const [tela1, setTela1] = useState({ estado: 'flex', cor: '#092B5A', text: 'text-white' })
	const [tela2, setTela2] = useState({ estado: 'hidden', cor: '#E3EFF0' })
	const [tela3, setTela3] = useState({ estado: 'hidden', cor: '#E3EFF0' })

	useEffect(() => {
		handleClickPedidos();
	}, []);

	const handleClickPedidos = () => {
		setTela1({ estado: 'flex', cor: 'bg-[#09738A]' })
		setTela2({ estado: 'hidden', cor: 'bg-[#09738A]' })
		setTela3({ estado: 'hidden', cor: 'bg-[#E3EFF0]' })
	};

	const handleClickPendentes = () => {
		setTela1({ estado: 'hidden', cor: 'bg-[#E3EFF0]' })
		setTela2({ estado: 'flex', cor: 'bg-[#09738A]' })
		setTela3({ estado: 'hidden', cor: 'bg-[#E3EFF0]' })
	};

	const handleClickArquivadas = () => {
		setTela1({ estado: 'hidden', cor: 'bg-[#E3EFF0]' })
		setTela2({ estado: 'hidden', cor: 'bg-[#E3EFF0]' })
		setTela3({ estado: 'flex', cor: 'bg-[#09738A]' })
	};

	const [tamanho, setTamanho] = useState('')

	const [name, setName] = useState('')

	function newName(event) {
		setName(event.target.value);
	}

	const [sexo, setSexo] = useState('')

	const [specie, setSpecie] = useState('')

	function newSpecie(event) {
		setSpecie(event.target.value);
	}

	const [infos, setInfos] = useState({})

	useEffect(() => {
		setName(infos.name ? infos.name : '')
		setSpecie(infos.specie ? infos.specie : '')
		setTamanho(infos.size ? infos.size : '')
		setSexo(infos.gender ? infos.gender : '')
	}, [infos.photo, infos.name, infos.specie, infos.size, infos.gender])

	const [petInfosDisable, petInfosDisableState] = useState({
		disable: true,
		class: ' text-slate-400'
	})


	return (
		<>
			<body className='flex flex-col min-h-screen w-screen overflow-hidden'>
				<header className='w-fit bg-white fixed top-0 left-0 right-0 z-10'>
					<PetHeader />
				</header>
				<section className='flex flex-row mt-28'>
					<aside className='flex bg-[#E3EFF0] h-full w-96 px-4 rounded-l-none rounded-br-none rounded-se-2xl fixed'>
						<ul className="flex flex-col items-center w-full cursor-pointer pt-5 space-y-3 text-xl">
							<button type="button"
								className={`flex ${tela1.cor} items-center border border-solid border-[#91B0B2] py-2 px-6 bg-[#E3EFF0] hover:bg-[#09738A] hover:text-white h-30 w-56 md:w-5/6 text-left ${tela1.text} rounded-2xl`}
								onClick={handleClickPedidos}
							>
								Pedidos de consultas
							</button>
							<button type="button"
								className={`flex ${tela2.cor} items-center border border-solid border-[#91B0B2] py-2 px-6 bg-[#E3EFF0] hover:bg-[#09738A] hover:text-white h-30 w-56 md:w-5/6 text-left rounded-2xl`}
								onClick={handleClickPendentes}
							>
								Consultas pendentes
							</button>
							<button type="button"
								className={`flex ${tela3.cor} items-center border border-solid border-[#91B0B2] py-2 px-6 bg-[#E3EFF0] hover:bg-[#09738A] hover:text-white h-30 w-56 md:w-5/6 text-left rounded-2xl`}
								onClick={handleClickArquivadas}
							>
								Consultas arquivadas
							</button>
						</ul>
					</aside>
					<main className='flex-1 overflow-y-auto w-fit h-full pl-96 ml-5'>
						<article className={`${tela2.estado} w-fit`}>
							<AppointmentPeding />
						</article>
						<article className={`${tela1.estado} w-full`}>
							<AppointmentAsk />
						</article>
						<article className={`${tela3.estado} w-fit`}>
							<AppointmentArchived />
						</article>
					</main>
				</section>
			</body>
		</>
	);
}



