import React, { useState } from 'react';
import icon from "../img/Iconbutton.png"
import img from "../img/Ellipse.png"
// import TextTruncate from 'react-text-truncate';

export const Card = (props) => {

    if (localStorage.getItem('__register_type') === "professional") {
        return (
            <div className='flex flex-none flex-col max-w-xs h-4/5 border-solid border-2 border-gray-400 rounded-lg'>
                <div className='flex flex-col items-center mb-3 px-4 py-3'>
                    <div className='flex items-center gap-4'>
                        <img className='border-solid border-slate-400 w-1/3 h-1/3' src={img} alt="" />
                        <h3 className='text-base'>
                            {props.name}
                        </h3>
                    </div>
                    <img className='cursor-pointer' src={img} alt="" />
                </div>
                <img src={props.img} alt="" className='max-h-44 w-full' />
                <span className='flex flex-col  gap-4 px-4 py-3' >
                    <p>Avaliação {props.avaliacao}/10</p>
                    <p className='truncate'>{props.description}</p>
                    {/* <TextTruncate
                        line={2}
                        element="p"
                        text={props.description}
                    /> */}
                </span>
            </div>
        );
    }else {
        return (
            <div className='flex flex-none flex-col max-w-xs h-4/5 border-solid border-2 border-gray-400 rounded-lg'>
                <div className='flex justify-between items-center mb-3 px-4 py-3'>
                    <div className='flex items-center gap-4'>
                        <img className='rounded-lg border-solid border-slate-400 w-1/3 h-1/3' src={img} alt="" />
                        <h3 className='text-base'>
                            {props.name}
                        </h3>
                    </div>
                </div>
                <img src={props.img} alt="" className='max-h-44 w-full' />
            </div>
        )
    }


}

