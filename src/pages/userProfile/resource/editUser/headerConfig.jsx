import React from 'react';
import lapis from "../../../../assets/svg/pencil.svg";
import { PetHeader } from '../../pet/petHeader';
// import { MdEdit } from 'react-icons/md';

export const Config = (props) => {

	

	return (
		<section>
			<PetHeader />
			<div className='flex justify-between w-full px-36'>
				<div className='flex items-center justify-center md:pt-10'>
					<img className=' md:w-60 md:h-60 rounded-full bg-slate-200' src={props.profilePhoto} alt='Profile' />
					<div className='flex flex-col pl-10 gap-1'>
						<label>
							<h2 className='bg-transparent border-none text-2xl md:text-5xl font-semibold text-black'>@{props.userName}</h2>
						</label>
						<label>
							<h2 className='bg-transparent border-none text-2xl md:text-3xl text-[#A9A9A9]'>{props.personName}</h2>
						</label>
					</div>
				</div>
				<div className='flex items-center justify-center md:pt-10'>
					<button className='w-fit px-14 h-14 flex-row justify-center items-center cursor-pointer gap-4 bg-[#ECECEC] rounded-full drop-shadow-lg hidden md:flex text-2xl' onClick={
						() => { 
							document.location.href = '/profile/edit-profile' 
						}}>
						<img src={lapis} alt="" className='h-7'/>
						Editar	
					</button>
				</div>
			</div>
		</section>
	)
};
