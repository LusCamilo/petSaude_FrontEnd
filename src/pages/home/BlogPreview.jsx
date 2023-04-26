import React from 'react'
import WalkDog from "../../assets/svg/walk the dog.svg"
import DogFood from "../../assets/svg/DogFood.svg"
import Vaccine from "../../assets/svg/vaccine.svg"
import Arrow from "../../assets/svg/Arrow 1.svg"

export const BlogPreview = () => {
    return (
        <>
        <div className='flex flex-col justify-center items-center'>
            <h2 className="text-3xl sm:text-5xl text-center font-semibold pt-20 sm:w-1/3 ">Blog PetSaúde</h2>
        <div className='md:flex md:flex-row justify-center sm:flew-col gap-32 sm:pt-20 md:p-20 w-full'>
                <div className='hidden md:flex flex-col justify-center border-4 border-[#78A890] sm:w-1/5 h-full text-center drop-shadow-lg rounded-lg p-5 '>
                    
                        <img src={DogFood}></img>
                        <h3 className='text-2xl pt-5'>Alimentos que são  prejudiciais para seu animal. </h3>
                  
                    <p className='text-xl text-left items-center pt-5'>Fizemos uma lista com alguns dos alimentos que
                    podem ser fatais na saúde de seu Pet, por exemplo: Chocolate, chá, café, Cebolas, alhos e as Uvas
                    </p>
                </div>
                <div className='flex flex-col ml-16 md:ml-0 justify-center border-4 border-[#78A890]  w-2/3 md:w-1/5 h-full text-center drop-shadow-lg rounded-lg p-5 mt-14 md:mt-0'>
                   
                        <img className='w-72 sm:w-full' src={WalkDog}></img>
                        <h3 className='text-xl md:text-2xl pt-5'>Importancia de levar seus pets para passear.</h3>
                  
                    <p className='text-xl text-left items-center pt-10'>Ajuda a controlar o peso, estimula o instinto do cão,
                    aumenta o vínculo com o tutor, ajuda a controlar o 
                    estresse e a ansiedade, entre outros...
                    </p>
                </div>
                <div className='hidden md:flex flex-col justify-center border-4 border-[#78A890] md:w-1/5 h-full text-center drop-shadow-lg rounded-lg p-5 mt-14 md:mt-0'>
                   
                            <img src={Vaccine}></img>
                            <h3 className='text-2xl pt-5'>O acompanhamento anual ao veterinário é importante?</h3>
                    
                    <p className='text-xl text-left items-center pt-10'>É muito importante, tanto para as revacinações,
                    quanto para evolução do crescimento, aptidões 
                    e características genéticas herdáveis.
                    </p>
                </div>
            </div>
            <div className='flex justify-center items-center p-5 sm:p-0 sm:w-96 h-20 border bg-[#78A890] rounded-lg mt-10 md:mt-0'>
                <button className='flex gap-5 text-xl'>
                    
                    Visite nosso Blog
                    <img className='sm:w-20' src={Arrow}></img>
                </button>
            </div>
            </div>
        </>
    );
}