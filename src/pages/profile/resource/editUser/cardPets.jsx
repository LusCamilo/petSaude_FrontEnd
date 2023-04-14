import React from 'react';
import lapis from "../../../../assets/svg/pencil.svg";


export const CardPets = (props) => {
    return ( 
        <div className='w-80 h-64 border-4 border-[#CAC4D0] rounded-3xl flex flex-none flex-col'>
            <div className='h-1/4 flex flex-row justify-center content-center items-center px-5'>
                <img src={props.personImage} alt="Imagem ou icone do perfil" className='w-10 h-10 rounded-full' />
                <label className='flex'>
                <input type="text" name="firstName"value={props.animalName} className='bg-transparent border-none font-sans font-medium text-base w-full px-5 '/>
                <img src={lapis} alt="Icone editar" className='w-5 h-5'/>
                </label>
                
            </div>
            <div className='w-full h-3/4 bg-[#CAC4D0] rounded-b-2xl'>
                <img src={props.animalImage} alt="Imagem do pet" className="w-full h-full rounded-b-3xl object-cover"/>
            </div>
        </div>
     ); 
}
 