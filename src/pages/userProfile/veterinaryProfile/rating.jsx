import React from "react";


export const Rating = (props) => {
	return (
		<div id={props.id} className='w-80 h-52 border border-solid border-[#CAC4D0] rounded-3xl flex flex-none flex-col'>
			<div className='h-1/4 flex flex-row justify-between items-center px-5'>
				
				<label className='flex items-center'>
					<img src="https://media.tenor.com/f1WExN6f1OMAAAAM/clown-fool.gif" alt="Imagem ou icone do perfil" className='w-10 h-10 rounded-full' />
					<p className='bg-transparent border-none font-sans font-medium text-base w-full px-5 '>
					 ahahahaha
					</p>
				</label>

			</div>
			<div className='w-full h-3/4 bg-white rounded-b-3xl'>
				<img src={props.text} alt="Imagem do pet" className="w-full h-full rounded-b-3xl object-cover" />
			</div>
		</div>
	);
}