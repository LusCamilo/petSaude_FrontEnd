import React from 'react';
import formacao from './img/formacao.png'
import formacaoDate from './img/formacaoDate.png'
import instituicao from './img/instituicao.png'
import carreira from './img/carreira.png'
import { IoSchool } from 'react-icons/io5';
import { FaSchool } from 'react-icons/fa';

export const AcademicInfos = (props) => {

	function formatarData(dataString) {
		var data = new Date(dataString);
		
		var dia = data.getUTCDate();
		var mes = data.getUTCMonth() + 1;
		var ano = data.getUTCFullYear();
		
		// Adicionando zeros à esquerda se necessário
		dia = dia < 10 ? '0' + dia : dia;
		mes = mes < 10 ? '0' + mes : mes;
		
		return dia + '/' + mes + '/' + ano;
	}
	  
	const dateFormation = formatarData(props.dataFormacao)
	const dateInicioCarreira = formatarData(props.carreiraInicio)

	return (
		<div className='flex flex-col items-center md:w-96 mt-4'>
			<h2 className="text-3xl pt-5 mb-3 w-max">
				Informações acadêmicas
			</h2>
			<div className='hidden md:flex flex-col p-4 w-full h-min gap-4 border rounded-lg border-zinc-700 mt-5'>
				<div className='flex items-center justify-between gap-x-4 pl-4 border rounded-lg border-zinc-700'>
					<span className='flex flex-col'>
						<h3>Formação:</h3>
						<p>{props.formacao}</p>
					</span>					
					<img className='p-4 border rounded-lg' src={formacao} alt='Formation' />
				</div>
				<div className='flex items-center justify-between border gap-x-4 pl-4 rounded-lg border-zinc-700'>
					<span className='flex flex-col'>
						<h3>Data de Formação:</h3>
						<p>{dateFormation}</p>
					</span>
					<img className='p-4 border rounded-lg' src={formacaoDate} alt='Formation hat'  />
				</div>
				<div className='flex items-center border justify-between gap-x-4 pl-4 rounded-lg border-zinc-700'>
					<span className='flex flex-col'>
						<h3>Instituição:</h3>
						<p>{props.instituicao}</p>
					</span>
					<img className='py-4 px-[22px] border rounded-lg' src={instituicao} alt='Institution' />
				</div>
				<div className='flex items-center border justify-between rounded-lg gap-x-4 pl-4 border-zinc-700'>
					<span className='flex flex-col'>
						<h3>Inicio de Carreira:</h3>
						<p>{dateInicioCarreira}</p>
					</span>
					<img className='p-4 border rounded-lg' src={carreira} alt='Briefing case' />
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
