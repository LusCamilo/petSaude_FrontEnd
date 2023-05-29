import React, { useState, useRef, useEffect } from 'react';
import { getUser } from '../../../../services/integrations/user';
import { CardPets } from '../editUser/cardPets.jsx';
import jwt_decode from "jwt-decode";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { getRatings } from '../../../../services/integrations/rating';
import { Rating } from '../../veterinaryProfile/rating';




export const Cards = (props) => {
	const [petOrRating, setPetOrRating] = useState([]);
	useEffect(() => {
		async function fetchData() {
			const infos = await infosCards()
			setPetOrRating(infos);
		}
		fetchData();
	}, [props]);	

	const infosCards = async () => {
		const token = localStorage.getItem('__user_JWT')
		const decoded = jwt_decode(token);
		if (props.isVet == true) {
			const response = await getRatings(props.id)
			console.log(response);
			return response.response.atings
			return []
		} else {
			const response = await getUser(decoded.id)
			return response.response.user.Pet
		}

	}
 
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

	if (props.isVet == true) {
		return (
			<div className='flex flex-col mt-4 md:px-44'>
				<h2 className='text-3xl pb-2'>Avaliações</h2>
				<div className='flex items-center pl-14 md:pl-0 justify-between'>
					<IoIosArrowBack className='text-5xl' onClick={handleLeftClick}/>
					<div className='md:flex overflow-x-auto scroll-smooth md:gap-2 md:pr-[45%] w-full ' ref={carrossel}>
						{petOrRating.map((item) => {

							return <Rating id={item.id} personImage={props.personImage} userName={props.userName} score={item.score} text={item.text} />
						})}
						
					</div>
					<IoIosArrowForward className='text-5xl cursor-pointer' onClick={handleRightClick}/>
				</div>
			</div>
		);
	} else {
		return (
			<div className='flex flex-col mt-4 md:px-44'>
				<h2 className='text-3xl pb-2'>{localStorage.getItem("__user_isVet") == 'true' ? 'Avaliações' : 'Pets'}</h2>
				<div className='flex items-center pl-14 md:pl-0 justify-between'>
					<IoIosArrowBack className='text-5xl' onClick={handleLeftClick}/>
					<div className='md:flex overflow-x-auto scroll-smooth md:gap-2 md:pr-[45%] w-full ' ref={carrossel}>
						{petOrRating.map((item) => {
							return <CardPets id={item.id} personImage={props.personImage} animalName={item.name} animalImage={item.photo} />
						})}
						
					</div>
					<IoIosArrowForward className='text-5xl cursor-pointer' onClick={handleRightClick}/>
				</div>
			</div>
		);
	}

}

