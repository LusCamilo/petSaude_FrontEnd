import React, { useState } from 'react';

export const PetSpawn = (props) => {

    return (
        <button type='button' className=' border rounded-md h-24 hidden md:flex'>
            <img className='w-32' src={props.image} />
            <input className='text-2xl shadow-none w-full' placeholder={props.name} disabled />
        </button>
    );
}