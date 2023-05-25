import React from "react";
import { TbDotsVertical } from 'react-icons/fa' ;  


export const Rating = (props) => {
	return (
		<div id={props.id} className='w-80 h-52 border border-solid border-[#CAC4D0] rounded-3xl flex flex-none flex-col'>
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
			<div className="flex flex-col gap-4 pl-4">
				<div className="flex flex-row gap-4">
					Avaliação
					<p>
						{props.score}/10
					</p>
				</div>
				<div className='w-full h-3/4 bg-white rounded-b-3xl'>
					<p className="font-sans text-sm text-[#49454F]">
						{props.text}
					</p>
				</div>
			</div>
		</div>
	);
}