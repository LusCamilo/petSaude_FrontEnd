import React from 'react';


export const Specialities = (props) => {
    return (
        <div>
            <label id={props.id} className='flex gap-2 items-center text-2xl'>
                <input className='w-5 h-5 rounded' type="checkbox"/>
                {props.nome}
            </label>
        </div>
    )
}