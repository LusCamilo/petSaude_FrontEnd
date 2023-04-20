import React from 'react';
import lapis from "../../../../assets/svg/pencil.svg"

export const Address = (props) => {
    return (  
        <div className='w-full h-full border-none sm:border-solid border-2 rounded-lg border-black flex flex-col gap-10 pl-2 sm:pl-20 py-8'>
            <h2 className='text-5xl md:text-6xl font-bold text-center sm:text-left'>Endereço</h2>
            <div className='flex flex-row justify-between '>
                <div className='gap-1 sm:gap-10 mt-10 grid grid-cols-1 sm:grid-cols-2 sm:w-4/5'>
                    <div className=''>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            CEP
                            <input type="text" name="firstName" defaultValue={props.cep} className='bg-transparent border-none text-2xl text-[#000]' />
                        </label>
                    </div>
                    <div className='flex justify-start md:ml-24'>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            Cidade
                            <input type="text" name="firstName" defaultValue={props.cidade} className='bg-transparent border-none text-2xl text-[#000]' />
                        </label>
                    </div>
                    <div className=''>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            Estado
                            <input type="text" name="firstName" defaultValue={props.estado} className='bg-transparent border-none text-2xl text-[#000]' />
                        </label>
                    </div>
                    <div className='flex justify-start md:ml-24'>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            Bairro
                            <input type="text" name="firstName" defaultValue={props.bairro} className='bg-transparent border-none text-2xl text-[#000]' />
                        </label>
                    </div>
                    <div className=''>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            Rua
                            <input type="text" name="firstName" defaultValue={props.rua} className='bg-transparent border-none text-2xl text-[#000]' />
                        </label>
                    </div>
                    <div className='flex justify-start md:ml-24'>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            Complemento
                            <input type="text" name="firstName" defaultValue={props.complemento} className='bg-transparent border-none text-2xl text-[#000]' />
                        </label>
                    </div>
                </div>
                <div className='hidden sm:flex flex-col content-end aling-end pr-10 '>
                    <button className='w-52 h-12 flex flex-row justify-center items-center gap-4 bg-[#ECECEC] rounded-full drop-shadow-lg'>
                        <img src={lapis} alt="" />
                        Editar
                    </button>
                </div>
            </div>
        </div>
    );
}
 