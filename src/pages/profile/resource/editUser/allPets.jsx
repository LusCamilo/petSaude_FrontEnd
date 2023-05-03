import React, { useState, useRef, useEffect } from 'react';
import { getUser } from '../../../../services/integrations/user';
import arrow from '../img/arrow.png';
import { CardPets } from './cardPets';


const infosPet = async () => {

    const response = await getUser(localStorage.getItem('__user_id'))

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

    const handleLeftClick = (e) => {
        carrossel.current.scrollLeft -= carrossel.current.offsetWidth
    }
    const handleRightClick = (e) => {
        carrossel.current.scrollLeft += carrossel.current.offsetWidth
    }

    return (
        <div className='flex flex-col gap-2 border-2 rounded-lg border-black py-8'>
            <div className='flex justify-between items-center pt-4 pb-3 px-20'>
                <h2 className='text-6xl font-bold'>Pets</h2>
                <button className='cursor-pointer text-[#09738A] p-3 rounded-full border border-[#91B0B2]'
                    onClick={() => {
                        document.location.href = '/profile/pet/Add'
                    }
                    }>
                    + Adicionar
                </button>
            </div>
            <div className='flex items-center'>
                <img src={arrow} onClick={handleLeftClick} className='border cursor-pointer py-3 px-4 rounded-full drop-shadow-[0px 4px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.3)]' />
                <div className='flex overflow-x-auto scroll-smooth gap-2' ref={carrossel}>
                    {pet.map((item) => {
                        return <CardPets id={item.id} personImage={props.personImage} animalName={item.name} animalImage={item.photo} />
                    })}                 
                </div>
                <img src={arrow} onClick={handleRightClick} className='border rotate-180 cursor-pointer py-3 px-4 rounded-full' />
            </div>
        </div>

    );
}
