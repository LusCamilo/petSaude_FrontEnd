import React, { useState } from 'react';
import icon from "../img/Iconbutton.png"
import img from "../img/Ellipse.png"
import TextTruncate from 'react-text-truncate';

export const Card = (props) => {

	if (localStorage.getItem('__user_isVet') == "true") {
		return (
			<div className='flex flex-none flex-col w-80 h-64 border-solid border border-[#CAC4D0] rounded-3xl'>
				<div className='flex items-center justify-between px-4 py-3'>
					<div className='flex flex-row items-center gap-4'>
						<img className='w-10 h-10' src={img} alt="" />
						<h3 className='text-base'>
							{props.name}
						</h3> 
					</div>
					<div className='flex flex-row items-center'>
						{/* <img className='w-10 h-10' src={img} alt="" /> */}
					</div>
				</div>
				<img src={props.img} alt="" className='max-h-44 w-full' />
				<div className='flex flex-col p-3 gap-1'>
					<p className='text-base'>Avaliação {props.avaliacao}/10</p>
					<TextTruncate
						line={2}
						element="p"
						text={props.description}
						className='text-sm'
					/>
				</div>
			</div>
		);
	} else {
		return (
			<div className='flex flex-none flex-col w-80 h-64 border-solid border border-[#CAC4D0] rounded-3xl'>
				<div className='flex justify-between items-center px-4 py-3'>
					<div className='flex items-center gap-4'>
						<img className='rounded-lg w-1/3 h-1/3' src={img} alt="" />
						<h3 className='text-base'>
							{props.name}
						</h3>
					</div>
				</div>
				<img src={props.img} alt="" className='max-h-44 w-full' />
			</div>
		)
	}


}

