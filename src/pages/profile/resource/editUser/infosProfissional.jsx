import React from 'react';
import lapis from "../../../../assets/svg/pencil.svg"
import { useForm } from 'react-hook-form';


{/* 
<label className='flex flex-col text-xl text-[#A9A9A9]'>
    Celular
    <input type="text" name="firstName" defaultValue={props.celular} className='bg-transparent border-none text-3xl text-[#000]' />
</label> 
*/
}

export const Prossionais = (props) => { 
    const { register, handleSubmit, formState: {errors} } = useForm()

    console.log(localStorage.getItem('Id'));

    return ( 
        <div className='w-full h-full border-none sm:border-solid border-2 rounded-lg border-black flex flex-col gap-10 pl-2 sm:pl-20 py-8'>
            <h2 className='text-5xl md:text-6xl font-bold font-sans text-center sm:text-left'>Informações Profissonais</h2>
            <div className='flex flex-row justify-between '>
                <div className='gap-1 sm:gap-10 mt-10  grid grid-cols-1 sm:grid-cols-2 sm:w-4/5'>
                    <div className='0'>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            Área de Atuação
                            <input type="text" id='cep' name="area" defaultValue={props.area} disabled className='bg-transparent border-none text-3xl text-[#000]' />
                        </label> 
                    </div>
                    <div className='flex justify-start md:ml-24 '>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            Formação
                            <input type="text" id='cep' name="area" defaultValue={props.formacao} disabled className='bg-transparent border-none text-3xl text-[#000]' />
                        </label> 
                    </div>
                    <div>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            Instituição
                            <input type="text" id='cep' name="area" defaultValue={props.instituicao} disabled className='bg-transparent border-none text-3xl text-[#000]' />
                        </label> 
                    </div>
                    <div className='flex justify-start md:ml-24'>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            CRMV
                            <input type="text" id='cep' name="area" defaultValue={props.crmv} disabled className='bg-transparent border-none text-3xl text-[#000]' />
                        </label> 
                    </div>
                 <div>
                    <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            Data de Formação
                            <input  type="text" id='cep' name="area" defaultValue={props.dataFormacao} disabled className='bg-transparent border-none text-3xl text-[#000]' />
                        </label> 
                    </div>
                    <div className='flex justify-start md:ml-24'>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                        Início de atuação
                            <input type="text" id='cep' name="area" defaultValue={props.dataInicioAtuacao} disabled className='bg-transparent border-none text-3xl text-[#000]' />
                        </label> 
                    </div>

                    <div className='flex flex-col gap-10'>
                        <div className='w-full flex flex-col items-start'>
                        <span className='font-normal text-xl text-[#A9A9A9]'>Especialidades</span>
                            <div className='flex flex-wrap pt-2 md:grid md:grid-rows-2 grid-flow-col w-full  gap-5'>
                                <div>
                                    <label className='flex gap-2 items-center text-2xl'>
                                        <input className='w-5 h-5 rounded' type="checkbox" {...register('surgeon')} />
                                        Cirurgião
                                    </label>
                                </div>
                                <div>
                                    <label className='flex gap-2 items-center text-2xl '>
                                        <input className='w-5 h-5 rounded' type="checkbox" {...register('clinic')} />
                                        Clínica
                                    </label>
                                </div>
                                <div>
                                    <label className='flex gap-2 items-center text-2xl '>
                                        <input className='w-5 h-5 rounded' type="checkbox" {...register('laboratory')} />
                                        Laboratorial
                                    </label>
                                </div>
                                <div>
                                    <label className='flex gap-2 items-center text-2xl '>
                                        <input className='w-5 h-5 rounded ' type="checkbox" {...register('research')} />
                                        Pesquisa
                                    </label>
                                </div>
                                <div>
                                    <label className='flex gap-2 items-center text-2xl '>
                                        <input className='w-5 h-5 rounded' type="checkbox" {...register('anesthetist')} />
                                        Anestesista
                                    </label>
                                </div>
                                <div>
                                    <label className='flex gap-2 items-center text-2xl '>
                                        <input className='w-5 h-5 rounded' type="checkbox" {...register('anesthetist')} />
                                        Farmácia Veterinária
                                    </label>
                                </div>
                                <div>
                                    <label className='flex gap-2 items-center text-2xl '>
                                        <input className='w-5 h-5 rounded' type="checkbox" {...register('anesthetist')} />
                                        Técnico em Zoo
                                    </label>
                                </div>
                            </div>
                        </div>

                    <div className='w-full flex flex-col items-start'>
                        <span className='font-normal text-xl text-[#A9A9A9]'>Animais que atende</span>
                            <div className='flex flex-wrap gap-5'>
                                <label className='flex gap-2 items-center text-2xl '>
                                    <input className='w-5 h-5 rounded' type="checkbox" {...register('dog')} />
                                    Cachorro
                                </label>
                                <label className='flex gap-2 items-center text-2xl '>
                                    <input className='w-5 h-5 rounded' type="checkbox" {...register('cat')} />
                                    Gato
                                </label>
                                <label className='flex gap-2 items-center text-2xl '>
                                    <input className='w-5 h-5 rounded' type="checkbox" {...register('birds')} />
                                    Aves
                                </label>
                                <label className='flex gap-2 items-center text-2xl '>
                                    <input className='w-5 h-5 rounded' type="checkbox" {...register('reptiles')} />
                                    Répteis
                                </label>
                                <label className='flex gap-2 items-center text-2xl '>
                                    <input className='w-5 h-5 rounded' type="checkbox" {...register('exoctics')} />
                                    Exóticos
                                </label>
                            </div>
                    </div>
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
 