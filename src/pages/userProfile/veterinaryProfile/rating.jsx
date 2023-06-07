import React, {useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import { deleteRating } from "../../../services/integrations/rating";
import Notifications from "../../../utils/Notifications";
import { BiTrash } from "react-icons/bi";
import Ellipsis from 'react-lines-ellipsis';
//import Dropdownfrom from "components/dropdown";

export const Rating = (props) => {

	const [idPerson, setIdPerson] = useState(0)
	const [date, setDate] = useState('01/01/1901')
	console.log(props);
	useEffect(() => {
		const token = localStorage.getItem('__user_JWT')
		const decoded = jwt_decode(token)
		setIdPerson(decoded.id)	
		async function fetchData() {
			newDate(props.whenCreated)
		}
		fetchData();
	}, []);

	const deleteRateing = async () => {
		await Notifications.warningConfirmOrCancel("Realmente deseja apagar este comentário", "Não irá muda a sua média", async (result) => {
			if (result.isConfirmed) {
				console.log(props.id);
				let response = await deleteRating(props.id)
				console.log(response);
				setTimeout(() => {
					window.location.reload()
				}, 2000);
			} else await Notifications.success('Nenhum dado alterado')
		})
		let response = await deleteRating(props.id)
	}

	async function newDate(event) {
		let valor = event;
		let novaData = adicionarUmDia(valor);
		let dia = novaData.toLocaleDateString("pt-BR");
		let diaMesAno = dia.split('/').join('-');
		let diaMesAnoFormatado = diaMesAno.split('-').join('/');
		setDate(diaMesAnoFormatado);
	  }
	  
	  function adicionarUmDia(data) {
		let novaData = new Date(data);
		novaData.setDate(novaData.getDate());
		return novaData;
	  }

	return (
		<div id={props.id} className='w-80 h-auto border border-solid border-[#CAC4D0] rounded-2xl flex flex-none flex-col justify-between gap-2 p-4'>
			<div className='h-fit flex flex-row justify-between items-center rounded-t-2xl'>
				<label className='flex items-center'>
					<img src={props.personImage} alt="Imagem ou icone do perfil" className='w-10 h-10 rounded-full mr-5' />
					<p className='bg-transparent border-none font-sans font-medium text-base w-fit'>
					 	{props.userName}
					</p>
				</label>
				<button className={`h-6 ${props.clientId != idPerson || props.idVet == idPerson ? 'flex' : 'hidden'}`}
					onClick={()=>deleteRateing()
				}>
					<BiTrash className="text-2xl"/>
				</button>
			</div>
			<p className="font-semibold"> Avaliação {props.score}/5</p>
			<Ellipsis
				id="descricao"
				className={`w-full h-auto text-[#49454F]`}
				text={props.text}
				maxLine="4"
				ellipsis="..."
				trimRight
				basedOn="letters"
			/>
			{/* <div className='w-full h-auto p-4 text-[#49454F]'>
				{props.text}
			</div> */}
			<p className="text-gray-500 txt-sm flex justify-end">{date}</p>
		</div>
	);
}