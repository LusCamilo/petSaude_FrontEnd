import React from 'react';
import {UpgradeUser} from '../../../upgradeUser'
import { Config } from '../headerConfig';

export const AddressInfos = (props) => {

    var largura = window.innerWidth
    if(largura > 768){
        return(
            <UpgradeUser/>
        );
    } else{
        return (
            <>
                <Config/>
                <main className='p-2'>
                    <fieldset class="border border-solid border-black p-3 rounded-lg">
                        <legend class="text-sm">CEP</legend>
                        <input type="text" name="cep" placeholder='000.000.000-00' className='bg-transparent border-none text-2xl text-[#000]' />
                    </fieldset>
                    <fieldset class="border border-solid border-black p-3 rounded-lg">
                        <legend class="text-sm">Cidade</legend>
                        <input type="text" name="cep" placeholder='São Paulo' className='bg-transparent border-none text-2xl text-[#000]' />
                    </fieldset>
                    <fieldset class="border border-solid border-black p-3 rounded-lg">
                        <legend class="text-sm">Estado</legend>
                        <input type="text" name="cep" placeholder='São Paulo' className='bg-transparent border-none text-2xl text-[#000]' />
                    </fieldset>
                    <fieldset class="border border-solid border-black p-3 rounded-lg">
                        <legend class="text-sm">Rua</legend>
                        <input type="text" name="cep" placeholder='Rua xxx' className='bg-transparent border-none text-2xl text-[#000]' />
                    </fieldset>
                    <fieldset class="border border-solid border-black p-3 rounded-lg">
                        <legend class="text-sm">Bairro</legend>
                        <input type="text" name="cep" placeholder='Vila xxx yyy' className='bg-transparent border-none text-2xl text-[#000]' />
                    </fieldset>
                    <fieldset class="border border-solid border-black p-3 rounded-lg">
                        <legend class="text-sm">Número</legend>
                        <input type="text" name="cep" placeholder='000' className='bg-transparent border-none text-2xl text-[#000]' />
                    </fieldset>
                    <fieldset class="border border-solid border-black p-3 rounded-lg">
                        <legend class="text-sm">Complemento</legend>
                        <input type="text" name="cep" placeholder='...' className='bg-transparent border-none text-2xl text-[#000]' />
                    </fieldset>
                </main>
            </>
        );
    }
}