import React from 'react';
import { Config } from '../headerConfig';
import fotoFundo from '../../img/profilePhoto.png'
import more from '../../img/mais com cor.svg'
import lixeira from '../../img/Delete.svg'
import {UpgradeUser} from '../../../upgradeUser'

export const PessoaisInfos = () => { 
    var largura = window.innerWidth
    if(largura > 768){
        return(
            <UpgradeUser/>
        );
    } else{
        return (
            <>
                <Config/>
                <main className='p-2 h-screen'>
                    <div>
                        <div>
                            <h6 className='font-semibold mb-5'>
                                Foto de perfil
                            </h6>
                            <div className='w-full flex justify-center'>
                            <img src={fotoFundo} alt="" className='w-3/4' />
                            </div>
                            <div className='flex flex-row justify-center gap-2'>
                                <button className='w-25 border-2 border-[#78A890] h-6 p-6 my-5 rounded-full flex justify-center items-center gap-5'>
                                    <img src={more} alt="" />
                                    <p className='text-[#78A890]'>Upload</p>
                                </button>
                                <button className='w-25 border-2 border-[#B3261E] bg-[#F9DEDC] h-6 p-6 my-5 rounded-full flex justify-center items-center gap-5'>
                                    <img src={lixeira} alt="" />
                                    <p className='text-black'>Upload</p>
                                </button>
                            </div>
                        </div>
                        <div>
                            <h6 className='font-semibold mb-5'>
                                Foto da capa
                            </h6>
                            <div className='flex rounded-full justify-center w-full '>
                            <div className='w-10 rounded-full h-10 flex justify-center'>
                            <img src="https://thumbs.dreamstime.com/b/incognito-unknown-person-incognito-unknown-person-silhouette-female-white-background-110196074.jpg" alt="" className='w-3/4 rounded-full' />
                            </div>
                            </div>
                            <div className='flex flex-row justify-center gap-2'>
                                <button className='w-25 border-2 border-[#78A890] h-6 p-6 my-5 rounded-full flex justify-center items-center gap-5'>
                                    <img src={more} alt="" />
                                    <p className='text-[#78A890]'>Upload</p>
                                </button>
                                <button className='w-25 border-2 border-[#B3261E] bg-[#F9DEDC] h-6 p-6 my-5 rounded-full flex justify-center items-center gap-5'>
                                    <img src={lixeira} alt="" />
                                    <p className='text-black'>Upload</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <fieldset class="border border-solid border-black p-3 rounded-lg">
                        <legend class="text-sm">Nome de usuário</legend>
                        <input type="text" name="cep" placeholder='Seu username...' className='bg-transparent border-none text-2xl text-[#000]' />
                    </fieldset>
                    <fieldset class="border border-solid border-black p-3 rounded-lg">
                        <legend class="text-sm">Nome</legend>
                        <input type="text" name="cep" placeholder='Seu nome...' className='bg-transparent border-none text-2xl text-[#000]' />
                    </fieldset>
                    <fieldset class="border border-solid border-black p-3 rounded-lg">
                        <legend class="text-sm">Sobrenome</legend>
                        <input type="text" name="cep" placeholder='Seu sobrenome...' className='bg-transparent border-none text-2xl text-[#000]' />
                    </fieldset>
                    <fieldset class="border border-solid border-black p-3 rounded-lg">
                        <legend class="text-sm">RG</legend>
                        <input type="text" name="cep" placeholder='Seu RG...' className='bg-transparent border-none text-2xl text-[#000]' />
                    </fieldset>
                    <fieldset class="border border-solid border-black p-3 rounded-lg">
                        <legend class="text-sm">CPF</legend>
                        <input type="text" name="cep" placeholder='Seu CPF...' className='bg-transparent border-none text-2xl text-[#000]' />
                    </fieldset>
                    <fieldset class="border border-solid border-black p-3 rounded-lg">
                        <legend class="text-sm">Número de celular</legend>
                        <input type="text" name="cep" placeholder='Seu número de celular' className='bg-transparent border-none text-2xl text-[#000]' />
                    </fieldset>
                    <fieldset class="border border-solid border-black p-3 rounded-lg">
                        <legend class="text-sm">Número de telefone</legend>
                        <input type="text" name="cep" placeholder='Seu número de telefone' className='bg-transparent border-none text-2xl text-[#000]' />
                    </fieldset>
                    <fieldset class="border border-solid border-black p-3 rounded-lg h-1/3">
                        <legend class="text-sm">Bio</legend>
                        <textarea type="text" name="cep"  className='bg-transparent border-none text-2xl w-full h-full text-[#000]'></textarea> 
                    </fieldset>
                    <button className='bg-[#9ED1B7] rounded-full  w-full h-10 my-10'>
                        <p className='text-white'>Salvar</p>
                    </button>
                </main>
            </>
        );
    }
}