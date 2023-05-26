import React, { useState, useRef, useEffect } from 'react';
import { getUser } from '../../../../services/integrations/user';
import { CardPets } from './cardPets';
import jwt_decode from "jwt-decode";

const infosPet = async () => {
	const token = localStorage.getItem('__user_JWT')
	const decoded = jwt_decode(token);
	const response = await getUser(decoded.id)
	return response.response.user.Pet
}
export const Pets = (props) => {
	const [pet, setPet] = useState([]);
	useEffect(() => {
		async function fetchData() {
			const PetsInfos = await infosPet()
			setPet(PetsInfos);
		}
		fetchData();
	}, []);

	const carrossel = useRef(null)

	return (
		<div className='flex flex-col gap-2 border-2 rounded-lg border-black py-8'>
			<div className='flex justify-between items-center pt-1 pb-2 pl-10 pr-16	'>
				<h2 className='text-6xl font-bold'>Pets</h2>
				<button className='w-fit px-8 h-14 flex-row justify-center items-center gap-4 drop-shadow-lg md:flex text-2xl cursor-pointer text-[#09738A] rounded-full border border-[#91B0B2] border-solid hover:text-[#91B0B2] hover:bg-[#09738A]'
				        onClick={() => {
					        document.location.href = '/profile/pet/add'
				        }
				        }>
					+ Adicionar
				</button>
			</div>
			<div className='flex items-center p-2 px-8'>
				{/* <IoIosArrowBack className='text-5xl cursor-pointer' onClick={handleLeftClick}/> */}
				<div className='flex overflow-x-auto scroll-smooth gap-2' ref={carrossel}>
					{pet.map((item) => {
						return <CardPets key={item.id} id={item.id} personImage={props.personImage} animalName={item.name} animalImage={item.photo} />
					})}
				</div>
				{/* <IoIosArrowForward className='text-5xl cursor-pointer' onClick={handleRightClick}/> */}
			</div>
		</div>

	);
}
