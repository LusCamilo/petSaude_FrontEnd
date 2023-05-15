import React, { useState, useEffect } from 'react';
import sucesso from '../../resource/img/Sucesso.png'
import './cssPadraoCards.css'

export const PetAddSucess = (props) => {

    const [aparecer, setAparecer] = useState('hidden')

    useEffect(() => {
        if(props.aparecer == '') setAparecer('flex')
      }, []);

    console.log(props.Pet);

    return(
        <div className='flex justify-center content-start flex-col p-4'>
            <div className='bg-[#E3EFF0] rounded-3xl flex justify-center content-center flex-col'>
                <h2 className='text-[#78A890] text-6xl flex content-center justify-center'>{props.title}</h2>
                <div className='w-full flex justify-center'>
                    <img src={sucesso} alt="" className='w-40 h-40'/>
                </div>
                <p className='text-[#78A890] text-4xl flex content-center justify-center'>{props.what}</p>
            </div>
            <div className={`${props.aparecer} gap-2 justify-center`}>
                <button className='rounded-3xl bg-[#78A890] text-center h-10 w-20'
                onClick={() => props.onClose()}>
                    Não
                </button>
                <button className='rounded-3xl bg-[#78A890] text-center h-10 w-20' 
                onClick={() => { 
                console.log("Apertado");
                props.onSave()

                }}>
                    Sim
                </button> 
            </div>
        </div>
    );
}