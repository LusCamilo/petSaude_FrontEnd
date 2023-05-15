import React from 'react';
import { petDelete } from '../../../../services/integrations/pet';
import cuidado from '../../resource/img/Cuidado.png'

export const PetAddWarn = () => {
    return(
        <div className='w-screen h-screen flex justify-center content-start '>
            <div className='w-1/3 h-96 bg-[#F9DEDC] rounded-3xl drop-shadow-lg flex justify-center content-center flex-col'>
                <h2 className='text-[#B3261E] text-6xl flex content-center justify-center mt-10'>Atenção</h2>
                <div className='w-full flex justify-center'>
                    <img src={cuidado} alt="" className='w-40 h-40'/>
                </div>
                <p className='text-black text-4xl flex content-center justify-center'>Deseja mesmo excluir o pet?</p>
                <div className='flex flex-coll justify-center gap-5 text-4xl mt-5 mb-10'>
                    <button className='text-[#F9DEDC] text-xl p-5 bg-[#B3261E] rounded-full'>
                        Não
                    </button>
                    <button className='text-[#F9DEDC] text-xl p-5 bg-[#B3261E] rounded-full' onClick={
                        () => {
                            petDelete(localStorage.getItem('__pet_id'))
                            document.location.href = "/profile/pet/edit"
                        }
                    }>
                        Sim
                    </button>
                </div>
            </div>
        </div>
    );
}