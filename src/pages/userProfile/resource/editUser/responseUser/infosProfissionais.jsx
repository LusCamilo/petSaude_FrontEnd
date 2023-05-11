import React from 'react';
import { Config } from '../headerConfig';
import {UpgradeUser} from '../../../upgradeUser'
import { PetHeader } from '../../../pet/petHeader';

export const ProfissonaisInfos = () => {
    var largura = window.innerWidth
    if(largura > 768){
        return(
            <UpgradeUser/>
        );
    } else{
        return (
            <>
                <PetHeader/>
                <main className='p-2 h-screen flex justify-center'>
                    <form className='w-screen'>
                        <fieldset class="border border-solid border-black p-3 rounded-lg w-11/12">
                            <legend class="text-sm">Área de atuação</legend>
                            <input type="text" name="cep" placeholder='Seu username...' className='bg-transparent border-none text-2xl text-[#000]' />
                        </fieldset>
                        <fieldset class="border border-solid border-black p-3 rounded-lg w-11/12">
                            <legend class="text-sm">CRMV</legend>
                            <input type="text" name="cep" placeholder='Seu nome...' className='bg-transparent border-none text-2xl text-[#000]' />
                        </fieldset>
                        <fieldset class="border border-solid border-black p-3 rounded-lg w-11/12">
                            <legend class="text-sm">Formação</legend>
                            <input type="text" name="cep" placeholder='Seu sobrenome...' className='bg-transparent border-none text-2xl text-[#000]' />
                        </fieldset>
                        <fieldset class="border border-solid border-black p-3 rounded-lg w-11/12">
                            <legend class="text-sm">Instituição</legend>
                            <input type="text" name="cep" placeholder='Seu RG...' className='bg-transparent border-none text-2xl text-[#000]' />
                        </fieldset>
                        <fieldset class="border border-solid border-black p-3 rounded-lg w-11/12">
                            <legend class="text-sm">Data de formação</legend>
                            <input type="date" name="cep" className='bg-transparent border-none text-2xl text-[#000]' />
                        </fieldset>
                        <fieldset class="border border-solid border-black p-3 rounded-lg w-11/12">
                            <legend class="text-sm">Início de atuação</legend>
                            <input type="date" name="cep" className='bg-transparent border-none text-2xl text-[#000]' />
                        </fieldset>


                        <div className=' flex flex-col items-start w-11/12'>
                            <span className='font-normal text-xl'>Especialidades</span>
                            <div className='flex flex-wrap gap-2'>
                                <label className='flex gap-1 items-center'>
                                    <input className='w-5 h-5 rounded' type="checkbox" />
                                    Cirurgião
                                </label>
                                <label className='flex gap-1 items-center'>
                                    <input className='w-5 h-5 rounded' type="checkbox"/>
                                    Clínica
                                </label>
                                <label className='flex gap-1 items-center'>
                                    <input className='w-5 h-5 rounded' type="checkbox" />
                                    Laboratorial
                                </label>
                                <label className='flex gap-1 items-center'>
                                    <input className='w-5 h-5 rounded' type="checkbox" />
                                    Pesquisa
                                </label>
                                <label className='flex gap-1 items-center'>
                                    <input className='w-5 h-5 rounded' type="checkbox" />
                                    Anestesista
                                </label>
                            </div>
                        </div>
                        <div className='w-11/12 flex flex-col items-start'>
                            <span className='font-normal text-xl'>Animais que atende</span>
                            <div className='flex flex-wrap gap-2'>
                                <label className='flex gap-1 items-center'>
                                    <input className='w-5 h-5 rounded' type="checkbox" />
                                    Cachorro
                                </label>
                                <label className='flex gap-1 items-center'>
                                    <input className='w-5 h-5 rounded' type="checkbox" />
                                    Gato
                                </label>
                                <label className='flex gap-1 items-center'>
                                    <input className='w-5 h-5 rounded' type="checkbox" />
                                    Aves
                                </label>
                                <label className='flex gap-1 items-center'>
                                    <input className='w-5 h-5 rounded' type="checkbox"/>
                                    Répteis
                                </label>
                                <label className='flex gap-1 items-center'>
                                    <input className='w-5 h-5 rounded' type="checkbox"/>
                                    Exóticos
                                </label>
                            </div>
                        </div>
                        <button className='bg-[#9ED1B7] rounded-full  w-full h-10 my-10'>
                            <p className='text-white'>Salvar</p>
                        </button>
                    </form>
                </main>
            </>
        );
    }
}