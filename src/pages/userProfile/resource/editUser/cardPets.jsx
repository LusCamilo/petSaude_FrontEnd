import React from 'react';
import lapis from "../../../../assets/svg/pencil.svg";


export const CardPets = (props) => {
	return (
		<div id={props.id} className='w-80 h-64 border border-solid border-[#CAC4D0] rounded-3xl flex flex-none flex-col'>
			<div className='h-1/4 flex flex-row justify-between items-center px-5'>
				<label className='flex items-center'>
					<img src={props.personImage} alt="Imagem ou icone do perfil" className='w-10 h-10 rounded-full' />
					<p className='bg-transparent border-none font-sans font-medium text-base w-full px-5 '>
						{props.animalName}
					</p>
				</label>
				<img id={props.id} src={lapis} alt="Icone editar" className='w-5 h-5 cursor-pointer' onClick={(e) => {
					localStorage.setItem("__pet_id" ,e.target.id)
					document.location.href = "/profile/pet/edit"

				}} />
			</div>
			<div className='w-full h-3/4 bg-[#CAC4D0] rounded-b-3xl'>
				<img src={props.animalImage} alt="Imagem do pet" className="w-full h-full rounded-b-3xl object-cover" />
			</div>
		</div>
	);
}
