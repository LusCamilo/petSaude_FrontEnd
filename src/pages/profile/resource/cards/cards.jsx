import React, { useState, useRef } from 'react';
import { Card } from './card';
import profiletestePhoto from '../img/profiletestePhoto.webp'
import arrow from '../img/arrow.png';


const jsonTeste = [
    {
        photoUser: profiletestePhoto,
        name: "teste",
        img: profiletestePhoto,
        avaliacao: 7.0,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae purus augue. Ut sit amet erat ornare, condimentum lectus vitae, aliquet lectus. Nulla facilisis auctor ex, id rutrum odio aliquet vel. Curabitur non fringilla metus. Praesent et hendrerit ligula. Nam interdum fringilla nulla, vitae rhoncus nunc gravida nec. Quisque ornare tellus risus, in porttitor felis fringilla non. Duis a pulvinar diam, iaculis condimentum justo. In viverra vitae quam eu mattis. Integer eleifend ligula libero. Aenean egestas nisi vitae volutpat hendrerit. Suspendisse at hendrerit odio, vel pellentesque lectus. Cras posuere euismod diam, vel facilisis lectus volutpat sed. Quisque non vehicula justo."
    },
    {
        photoUser: profiletestePhoto,
        name: "feliz",
        img: profiletestePhoto,
        avaliacao: 10,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae purus augue. Ut sit amet erat ornare, condimentum lectus vitae, aliquet lectus. Nulla facilisis auctor ex, id rutrum odio aliquet vel. Curabitur non fringilla metus. Praesent et hendrerit ligula. Nam interdum fringilla nulla, vitae rhoncus nunc gravida nec. Quisque ornare tellus risus, in porttitor felis fringilla non. Duis a pulvinar diam, iaculis condimentum justo. In viverra vitae quam eu mattis. Integer eleifend ligula libero. Aenean egestas nisi vitae volutpat hendrerit. Suspendisse at hendrerit odio, vel pellentesque lectus. Cras posuere euismod diam, vel facilisis lectus volutpat sed. Quisque non vehicula justo."
    },
   
   

]

export const Cards = () => {

    const carrossel = useRef(null)

    const handleLeftClick = () => {
        console.log(carrossel.current.offsetWidth);
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
            <h2 className='pl-5 text-3xl md:pt-4 pb-3'>Avaliações</h2>
            <div className='flex items-center pl-14 md:pl-0'>
                <img src={arrow} onClick={handleLeftClick} className='hidden md:flex flex-col border cursor-pointer py-3 px-4 rounded-full drop-shadow-[0px 4px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.3)]' />
                <div className='md:flex overflow-x-auto scroll-smooth md:gap-2 md:pr-[45%]' ref={carrossel}>
                    {jsonTeste.map(item =>
                        <Card img={item.img} name={item.name} description={item.description} avaliacao={item.avaliacao} />
                    )}
                </div>
                <img src={arrow} onClick={handleRightClick} className='hidden md:flex justify-self-end border rotate-180 cursor-pointer py-3 px-4 rounded-full' />
            </div>
        </div>
    );
}

