import React from "react";
import cuidado from '../../resource/img/Cuidado.png'

export const ServerError = () =>{

	return (
		<div>
			<div className='w-1/3 h-96 bg-[#F9DEDC] rounded-3xl drop-shadow-lg flex justify-center content-center flex-col'>
				<h2 className='text-[#B3261E] text-6xl flex content-center justify-center mt-10'>Erro</h2>
				<div className='w-full flex justify-center'>
					<img src={cuidado} alt="" className='w-40 h-40'/>
				</div>
				<p className='text-black text-4xl flex content-center justify-center'>Erro no servidor, tente mais tarde</p>
			</div>
		</div>
	)
}