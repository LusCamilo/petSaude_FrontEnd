import React, {useEffect, useState} from "react";
import jwt_decode from "jwt-decode";

export const Rating = (props) => {

	const [idPerson, setIdPerson] = useState(0)
	const [date, setIdPerson] = useState(0)

	useEffect(() => {
		const token = localStorage.getItem('__user_JWT')
		const decoded = jwt_decode(token)
		setIdPerson(decoded.id)
		console.log(props);
	}, []);

	function newDate(event) {
		let valor = event.target.value;
		let novaData = adicionarUmDia(valor)
		let dia = novaData.toLocaleDateString("pt-BR");
		let diaMesAno = dia.split('/').join('-');
		setDate(diaMesAno);
	}


	return (
		<div id={props.id} className='w-80 h-64 border border-solid border-[#CAC4D0] rounded-2xl flex flex-none flex-col'>
			<div className='h-1/4 flex flex-row justify-between items-center px-5'>
			{/* <TbDotsVertical /> */}
				<label className='flex items-center'>
					<img src={props.personImage} alt="Imagem ou icone do perfil" className='w-10 h-10 rounded-full text-xs break-normal' />
					<p className='bg-transparent border-none font-sans font-medium text-base w-full px-5 bold'>
					 	{props.userName}
					</p>
				</label>
				<button className="h-6">
					<img src="https://static.thenounproject.com/png/1919184-200.png" alt="" className="h-6" />
				</button>
			</div>
			<div className='w-full h-3/4 rounded-b-2xl'>
				<img src={props.description} alt="Imagem do pet" className="w-full h-full rounded-b-2xl object-cover" />
			</div>
			<p className="text-gray-500 txt-sm"></p>
		</div>
	);
}