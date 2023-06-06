import React from 'react';
import lapis from "../../../../assets/svg/pencil.svg";


export const CardPets = (props) => {

	

	return (
		<div id={props.id} className='w-80 h-64 border border-solid border-[#CAC4D0] rounded-2xl flex flex-none flex-col'>
			<div className='h-1/4 flex flex-row justify-between items-center px-5'>
				<label className='flex items-center'>
					<img src={props.personImage} alt="Imagem ou icone do perfil" className='w-10 h-10 rounded-full mr-5' />
					<p className='bg-transparent border-none font-sans font-medium text-base w-fit'>
						{props.animalName}
					</p>
				</label>
				<img id={props.id} src={lapis} alt="Icone editar" className='w-5 h-5 cursor-pointer' onClick={(e) => {
					localStorage.setItem("__pet_id" ,e.target.id)
					document.location.href = "/profile/pet/edit"

				}} />
			</div>
			<div className='w-full h-3/4 rounded-b-2xl'>
				<img src={props.animalImage} alt="Imagem do pet" className="w-full h-full rounded-b-2xl object-cover" />
			</div>
		</div>
	);
}
