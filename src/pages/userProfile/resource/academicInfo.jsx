import React from 'react';
import formacao from './img/formacao.png'
import formacaoDate from './img/formacaoDate.png'
import instituicao from './img/instituicao.png'
import carreira from './img/carreira.png'

export const AcademicInfos = (props) => {

	function formatarData(dataString) {
		const data = new Date(dataString);

		let dia = data.getUTCDate();
		let mes = data.getUTCMonth() + 1;
		const ano = data.getUTCFullYear();

		// Adicionando zeros à esquerda se necessário
		dia = dia < 10 ? '0' + dia : dia;
		mes = mes < 10 ? '0' + mes : mes;
		
		return dia + '/' + mes + '/' + ano;
	}
	  
	const dateFormation = formatarData(props.dataFormacao)
	const dateInicioCarreira = formatarData(props.carreiraInicio)

	return (
		<div className='flex flex-col items-center md:w-96 mt-4'>
			<h2 className="text-3xl w-max">
				Informações acadêmicas
			</h2>
			<div className='hidden md:flex flex-col p-4 w-full h-min gap-4 border rounded-lg border-zinc-300 mt-1'>
				<div className='flex items-center justify-between gap-x-4 pl-4 border rounded-lg border-zinc-300'>
					<span className='flex flex-col'>
						<h3>Formação:</h3>
						<p>{props.formacao}</p>
					</span>				
					<img className='p-4 border-l border-zinc-300 border-solid' src={formacao} alt='Formation'/>
				</div>
				<div className='flex items-center border justify-between rounded-lg gap-x-4 pl-4 border-zinc-300'>
					<span className='flex flex-col'>
						<h3>Data de Formação:</h3>
						<p>{dateFormation}</p>
					</span>
					<img className='p-4 border-l border-zinc-300 border-solid' src={formacaoDate} alt='Formation hat'  />
				</div>
				<div className='flex items-center border justify-between gap-x-4 pl-4 rounded-lg border-zinc-300'>
					<span className='flex flex-col'>
						<h3>Instituição:</h3>
						<p>{props.instituicao}</p>
					</span>
					<img className='py-4 px-[22px] border-l border-zinc-300 border-solid' src={instituicao} alt='Institution' />
				</div>
				<div className='flex items-center border justify-between rounded-lg gap-x-4 pl-4 border-zinc-300'>
					<span className='flex flex-col'>
						<h3>Inicio de Carreira:</h3>
						<p>{dateInicioCarreira}</p>
					</span>
					<img className='p-4 border-l border-zinc-300 border-solid' src={carreira} alt='Briefing case' />
				</div>
			</div>
			<div className='flex flex-col md:hidden'>
				<div className='flex justify-center gap-2'>
					<div className='border shadow-lg rounded text-center w-44 p-2'>
						<h3>Formação:</h3>
						<p>{props.formacao}</p>
					</div>
					<div className='border shadow-lg rounded text-center w-44 p-2'>
						<h3>Data de Formação:</h3>
						<p>{props.dataFormacao}</p>
					</div>
				</div>
				<div className='flex pt-5 justify-center gap-2'>
					<div className='border shadow-lg  rounded text-center w-44 p-2 '>
						<h3>Instituição:</h3>
						<p>{props.instituicao}</p>
					</div>
					<div className='border shadow-lg rounded text-center w-44 p-2' >

						<h3>Inicio de Carreira:</h3>
						<p>{dateInicioCarreira}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
