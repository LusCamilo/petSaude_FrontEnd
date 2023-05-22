import React, { useState, useRef, useEffect } from 'react';
import { getUser } from '../../../../services/integrations/user';
import { CardPets } from '../editUser/cardPets.jsx';
import { Card } from './card.jsx';
import jwt_decode from "jwt-decode";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';


const infosPet = async () => {

	const token = localStorage.getItem('__user_JWT')
	const decoded = jwt_decode(token);
	const response = await getUser(decoded.id)
	return response.response.user.Pet

}

export const Cards = (props) => {
	const [pet, setPet] = useState([]);
	useEffect(() => {
		async function fetchData() {
			const PetsInfos = await infosPet()
			setPet(PetsInfos);
		}
		fetchData();
	}, []);	

	const carrossel = useRef(null)

	const handleLeftClick = () => {
		const result = 300 - carrossel.current.offsetWidth
		carrossel.current.scrollLeft += result
		// carrossel.current.scrollLeft -= carrossel.current.offsetWidth
	}
	const handleRightClick = () => {
		const result = 300 - carrossel.current.offsetWidth
		carrossel.current.scrollLeft -= result
		// carrossel.current.scrollLeft += carrossel.current.offsetWidth
	}
	return (
		<div className='flex flex-col gap-2 md:px-44'>
			<h2 className='text-3xl md:pt-4 pb-3'>{localStorage.getItem("__user_isVet") == 'true' ? 'Avaliações' : 'Pets'}</h2>
			<div className='flex items-center pl-14 md:pl-0 justify-between'>
				<IoIosArrowBack className='text-5xl' onClick={handleLeftClick}/>
				<div className='md:flex overflow-x-auto scroll-smooth md:gap-2 md:pr-[45%] w-full ' ref={carrossel}>
					{pet.map((item) => {
						return <CardPets id={item.id} personImage={props.personImage} animalName={item.name} animalImage={item.photo} />
					})}
					{/* {pet.map((item) => {
						return <Card id={item.id} img={item.personImage} name={item.name} imgPet={item.img} />
					})} */}
				</div>
				<IoIosArrowForward className='text-5xl cursor-pointer' onClick={handleRightClick}/>
			</div>
		</div>
	);
}

