import React, {useState} from 'react';
import { petDelete } from '../../../../services/integrations/pet';
import cuidado from '../../resource/img/Cuidado.png'
import './cssPadraoCards.css'





export const WarnRequest = (props) => {

    return(
        <span className='flex justify-center content-start rounded-3xl'>
            <div className='w-1/3 h-96 bg-[#F9DEDC] rounded-3xl flex justify-center content-center flex-col'>
                <h2 className='text-[#B3261E] text-6xl flex content-center justify-center mt-10'>Erro</h2>
                <div className='w-full flex justify-center'>
                    <img src={cuidado} alt="" className='w-40 h-40'/>
                </div>
                <p className='text-black text-xl w-full flex content-center justify-center text-center'>{props.description}</p>
                <div className='flex flex-coll justify-center gap-5 text-4xl mt-5 mb-10'>
                    <button className={`${props.boolBotoes} text-[#F9DEDC] text-xl p-5 bg-[#B3261E] rounded-full` }
                    onClick={() => props.onClose()}>
                        Não
                    </button>
                    <button className={`${props.boolBotoes} text-[#F9DEDC] text-xl p-5 bg-[#B3261E] rounded-full`} onClick={
                        () => {
                            props.onSave()
                            document.location.href = props.href
                        }
                    }>
                        Sim
                    </button>
                </div>
            </div>
        </span>
    );
}