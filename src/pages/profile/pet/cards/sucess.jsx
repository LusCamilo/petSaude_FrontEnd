import React, { useState, useEffect } from 'react';
import sucesso from '../../resource/img/Sucesso.png'
import './cssPadrao.css'

export const PetAddSucess = (props) => {

    const [aparecer, setAparecer] = useState('hidden')

    useEffect(() => {
        if(props.aparecer == '') setAparecer('flex')
      }, []);

    return(
        <div className='mae flex justify-center content-start p-4'>
            <div className='bg-[#E3EFF0] rounded-3xl flex justify-center content-center flex-col'>
                <h2 className='text-[#78A890] text-6xl flex content-center justify-center'>{props.title}</h2>
                <div className='w-full flex justify-center'>
                    <img src={sucesso} alt="" className='w-40 h-40'/>
                </div>
                <p className='text-[#78A890] text-4xl flex content-center justify-center'>{props.what}</p>
            </div>
            <div className={`${aparecer} justify-between`}>
                <button className='rounded-xl bg-[#78A890] h-8'>
                    Não
                </button>
                <button className='rounded-xl bg-[#78A890] h-8' 
                onClick={() => { 
                props.onSave()
                if(props.href != undefined || props.href != null) document.location.href = props.href
                }}>
                    Sim
                </button> 
            </div>
        </div>
    );
}