import React, {useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
//import Dropdownfrom from "components/dropdown";

export const Rating = (props) => {

	const [idPerson, setIdPerson] = useState(0)
	const [date, setDate] = useState('01/01/1901')

	useEffect(() => {
		const token = localStorage.getItem('__user_JWT')
		const decoded = jwt_decode(token)
		setIdPerson(decoded.id)	
		async function fetchData() {
			newDate(props.whenCreated)
		}
		console.log(props);
		fetchData();
	}, []);


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
		novaData.setDate(novaData.getDate() + 1);
		return novaData;
	  }


	return (
		<div id={props.id} className='w-80 h-48 border border-solid border-[#CAC4D0] rounded-2xl flex flex-none flex-col'>
			<div className='h-1/4 flex flex-row justify-between items-center px-5'>
				<label className='flex items-center'>
					<img src={props.personImage} className='w-10 h-10 rounded-full text-xs break-normal' />
					<p className='bg-transparent border-none font-sans font-medium text-base w-full px-5 bold'>
					 	{props.userName}
					</p>
				</label>
				{/* <Dropdown */}
				    {/* button={ */}
						<button className={`h-6 ${props.clientId != idPerson || props.idVet == idPerson ? 'flex' : 'hidden'}`}>
							<img src="https://static.thenounproject.com/png/1919184-200.png" alt="" className="h-6" />
						</button>
				    {/* } */}
				    children={
				      <div className="flex h-max w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat pb-4 shadow-[0_20px_25px_-5px] shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
				          <a
				            href=" "
				            className="mt-3 text-sm font-medium text-red-500 hover:text-red-500"
				          >
				            Log Out
				          </a>
				      </div>
				    }
				    classNames={"py-2 bottom-[-30px] -left-[180px] w-max"}
				  />
				
			</div>
			<p className="ml-4"> Avaliação {props.score}/5</p>
			<div className='w-full h-3/4 rounded-b-2xl'>
				{props.text}
			</div>
			<p className="text-gray-500 txt-sm flex justify-end mr-2">{date}</p>
		</div>
	);
}