import React from 'react';
import {Config} from "../../editUser/headerConfig";
import {UpgradeUser} from '../../../upgradeUser'

export const SegurancaInfo = () => {
    var largura = window.innerWidth
    if(largura > 768){
        return(
            <UpgradeUser/>
        );
    } else{
        return (
            <>
                <Config/>
                <main className='p-5 w-screen flex flex-col gap-5'>
                    <div className='w-full h-80 border-2 border-black bg-[#F9DEDC] p-5 rounded-lg gap-3'>
                        <h3 className='text-semibold text-2xl'>
                            Mudar E-mail
                        </h3>
                        <p className='h-4/5 w-full brak-words'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque elementum laoreet imperdiet. Quisque et pretium mauris, ut posuere justo.
                        </p>
                        <div className='flex justify-end'>
                            <button className='font-semibold '>
                                Mudar E-mail
                            </button>
                        </div>
                    </div>
                    <div className='w-full h-80 border-2 border-black bg-[#F9DEDC] p-5 rounded-lg gap-3'>
                        <h3 className='text-semibold text-2xl'>
                            Mudar E-Senha
                        </h3>
                        <p className='h-4/5 w-full brak-words'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque elementum laoreet imperdiet. Quisque et pretium mauris, ut posuere justo.
                        </p>
                        <div className='flex justify-end'>
                            <button className='font-semibold '>
                                Mudar senha
                            </button>
                        </div>
                    </div>
                </main>
            </>
        );
    }
}