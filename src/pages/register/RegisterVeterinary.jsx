import React, { useState } from "react";
import "./css/cadastroVet.css";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import backgroundImage from "../../assets/svg/imgVetCadastro.svg";
import { AuthHeader } from "../../components/headers/AuthHeader";
import { createVeterinaryInfosIntoExistingUser, registerUser, registerVet } from "../../services/integrations/user";

export const RegisterVeterinary = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const submitForm = async data => {

        const userInfos = JSON.parse(localStorage.getItem('__user_register_infos'))

        const allInfos = {
            personName: `${userInfos.firstName} ${userInfos.lastName}`,
            cpf: userInfos.cpf,
            email: userInfos.email,
            password: userInfos.password,
            cellphoneNumber: userInfos.cellphoneNumber,
            phoneNumber: userInfos.phoneNumber,
            isVet: false,
            address: {
                ...userInfos.address
            },
            crmv: data.crmv,
            occupationArea: data.occupationArea,
            formation: data.formation,
            institution: data.institution,
            formationDate: data.formationDate,
            startActingDate: data.startActingDate

        }

        if (validateForm(data)) {
            const createUserResponse = await registerVet(allInfos)
            console.log(createUserResponse);
            if (createUserResponse)
                  document.location.href = '/login'  

            // else alert('Erro na criação do usuário')
        } else alert('Formulário inválido')
        // TODO: INTEGRAÇÃO
    }

    const validateForm = (data) => {
        // TODO: VALIDAÇÃO DO FORM PARA INTEGRAÇÃO
        return !!data;
    }



    return (
        <section className='flex flex-row-reverse w-screen h-screen bg-gradient-to-br from-[#092b5a] to-[#9ed1b7] opacity-90 overflow-x-hidden'>
            <div className='absolute w-full h-full overflow-hidden flex items-center justify-start'>
                <img src={backgroundImage} alt="" className='w-1/2 h-fit p-4' />
            </div>
            <div className='lg:w-1/2 md:w-full w-full min-h-screen h-fit bg-white flex flex-col md:justify-center justify-between items-center lg:gap-6 md:gap-4 sm:gap-2 z-10 p-4'>
                <AuthHeader title='Cadastro de profissionais' subtitle='Por favor, insira as informações abaixo e aproveite a plataforma! ' firebaseFeature={false} />
                <form className='h-fit lg:w-3/4 w-full gap-2 p-0 lg:mt-12 md:mt-6' onSubmit={handleSubmit(submitForm)}>
                    <div className='w-full flex flex-col items-start'>
                        <span className='font-normal text-xl'>Especialidades</span>
                        <div className='flex flex-wrap gap-2'>
                            <label className='flex gap-1 items-center'>
                                <input className='w-5 h-5 rounded' type="checkbox" {...register('surgeon')} />
                                Cirurgião
                            </label>
                            <label className='flex gap-1 items-center'>
                                <input className='w-5 h-5 rounded' type="checkbox" {...register('clinic')} />
                                Clínica
                            </label>
                            <label className='flex gap-1 items-center'>
                                <input className='w-5 h-5 rounded' type="checkbox" {...register('laboratory')} />
                                Laboratorial
                            </label>
                            <label className='flex gap-1 items-center'>
                                <input className='w-5 h-5 rounded' type="checkbox" {...register('research')} />
                                Pesquisa
                            </label>
                            <label className='flex gap-1 items-center'>
                                <input className='w-5 h-5 rounded' type="checkbox" {...register('anesthetist')} />
                                Anestesista
                            </label>
                            <label className='flex gap-1 items-center'>
                                <input className='w-5 h-5 rounded' type="checkbox" {...register('anesthetist')} />
                                Farmácia Veterinária
                            </label>
                            <label className='flex gap-1 items-center'>
                                <input className='w-5 h-5 rounded' type="checkbox" {...register('anesthetist')} />
                                Técnico em Zoo
                            </label>
                        </div>
                    </div>
                    <div className='w-full flex flex-col items-start'>
                        <span className='font-normal text-xl'>Animais que atende</span>
                        <div className='flex flex-wrap gap-2'>
                            <label className='flex gap-1 items-center'>
                                <input className='w-5 h-5 rounded' type="checkbox" {...register('dog')} />
                                Cachorro
                            </label>
                            <label className='flex gap-1 items-center'>
                                <input className='w-5 h-5 rounded' type="checkbox" {...register('cat')} />
                                Gato
                            </label>
                            <label className='flex gap-1 items-center'>
                                <input className='w-5 h-5 rounded' type="checkbox" {...register('birds')} />
                                Aves
                            </label>
                            <label className='flex gap-1 items-center'>
                                <input className='w-5 h-5 rounded' type="checkbox" {...register('reptiles')} />
                                Répteis
                            </label>
                            <label className='flex gap-1 items-center'>
                                <input className='w-5 h-5 rounded' type="checkbox" {...register('exoctics')} />
                                Exóticos
                            </label>
                        </div>
                    </div>
                    <div className='flex xl:flex-row flex-col justify-between lg:gap-8 gap-2 w-full'>
                        <label className='w-full flex flex-col'>
                            Área de atuação
                            <input className={errors.occupationArea ? 'h-12 px-2 border-b-2 border-b-red-700 bg-red-200 w-full' : 'h-12 px-2 w-full'} type="text" name="occupationArea" {...register('occupationArea', { required: true })} />
                        </label>
                        <label className='w-full flex flex-col'>
                            CRMV
                            <input className={errors.crmv ? 'h-12 px-2 border-b-2 border-b-red-700 bg-red-200 w-full' : 'h-12 px-2 w-full'} type="text" name="crmv" {...register('crmv', { required: true })} />
                        </label>
                    </div>
                    <label className='w-full flex flex-col'>
                        Formação
                        <input className={errors.formation ? 'h-12 px-2 border-b-2 border-b-red-700 bg-red-200 w-full' : 'h-12 px-2 w-full'} type="text" name="formation" {...register('formation', { required: true })} />
                    </label>
                    <label className='w-full flex flex-col'>
                        Instituição
                        <input className={errors.institution ? 'h-12 px-2 border-b-2 border-b-red-700 bg-red-200 w-full' : 'h-12 px-2 w-full'} type="text" name="institution" {...register('institution', { required: true })} />
                    </label>
                    <div className='flex xl:flex-row flex-col justify-between lg:gap-8 gap-2 w-full'>
                        <label className='w-full flex flex-col'>
                            Data de formação
                            <input className={errors.formationDate ? 'h-12 px-2 border-b-2 border-b-red-700 bg-red-200 w-full' : 'h-12 px-2 w-full'} type="date" name="formationDate" {...register('formationDate', { required: true })} />
                        </label>
                        <label className='w-full flex flex-col'>
                            Início de atuação
                            <input className={errors.startActingDate ? 'h-12 px-2 border-b-2 border-b-red-700 bg-red-200 w-full' : 'h-12 px-2 w-full'} type="date" name="startActingDate" {...register('startActingDate', { required: true })} />
                        </label>
                    </div>
                    <button type="submit" className='w-full h-fit bg-[#09738A] text-center text-white font-bold text-2xl rounded transition drop-shadow-xl py-3 hover:bg-[#78A890] mt-4'>Cadastrar-se</button>
                </form>
                <p className='mt-8 mb-4'>Já tem uma conta?<Link to='/login' className='pl-1 font-bold'>Faça login</Link></p>
            </div>
        </section>
        // <main className="mainVet">
        //   <div className="img-forms">
        //     <div className="arrow-img p-10">
        //       <Link to="/">
        //         <img src={arrow} alt="" />
        //       </Link>
        //       <div className="conteiner-img">
        //         <img className="bg-image" src={image} alt="location-image" />
        //       </div>
        //     </div>
        //     <form>
        //       <div className="form-header">
        //         <h1>Cadastro de Profissionais</h1>
        //         <span>
        //           Por favor, insira as informações abaixo e aproveite a plataforma!
        //         </span>
        //       </div>
        //       <div className="inputs-container">
        //         <div className="checkbox-container">
        //           <div className="specialties">
        //             <span>Especialidades</span>
        //             <div className="inputs-specialties">
        //               <label>
        //                 <input type="checkbox" name="" id="" />
        //                 Cirurgião
        //               </label>
        //               <label>
        //                 <input type="checkbox" name="" id="" />
        //                 Clínica
        //               </label>
        //               <label>
        //                 <input type="checkbox" name="" id="" />
        //                 Laboritorial
        //               </label>
        //               <label>
        //                 <input type="checkbox" name="" id="" />
        //                 Pesquisa
        //               </label>
        //               <label>
        //                 <input type="checkbox" name="" id="" />
        //                 Anestesia
        //               </label>
        //               <label className="FV">
        //                 <input type="checkbox" name="" id="" />
        //                 <p>Fármacia Veterinária</p>
        //               </label>
        //               <label className="FV">
        //                 <input type="checkbox" name="" id="" />
        //                 <p>Técnico em Zoo</p>
        //               </label>
        //             </div>
        //           </div>
        //           <div className="animals">
        //             <span>Animais que atende</span>
        //             <div className="inputs-animals">
        //               <label>
        //                 <input type="checkbox" name="" id="" />
        //                 Cachorro
        //               </label>
        //               <label>
        //                 <input type="checkbox" name="" id="" />
        //                 Gato
        //               </label>
        //               <label>
        //                 <input type="checkbox" name="" id="" />
        //                 Aves
        //               </label>
        //               <label>
        //                 <input type="checkbox" name="" id="" />
        //                 Répteis
        //               </label>
        //               <label>
        //                 <input type="checkbox" name="" id="" />
        //                 Exóticos
        //               </label>
        //             </div>
        //           </div>
        //         </div>
        //         <div className="atuacao-container">
        //           <div className="atuacao-crmv">
        //             <label>
        //               <p>Área de atuação</p>
        //               <input type="text" name="" className="area" {...register('areaAtuacao', {minLenght: 6, required: true})} />
        //             </label>
        //
        //             <label>
        //               <p>CRMV</p>
        //               <input type="text" name="" className="CRMV" />
        //             </label>
        //           </div>
        //
        //           <label>
        //             <p>Formação</p>
        //             <input type="text" name="" id="" />
        //           </label>
        //           <label>
        //             <p>Instituição</p>
        //             <input type="text" name="" id="" />
        //           </label>
        //
        //           <div className="form-group">
        //             <label>
        //               <p>Data de Formação</p>
        //               <input type="date" name="" id="" />
        //             </label>
        //             <label>
        //               <p>Início de Atuação</p>
        //               <input type="date" name="" id="" />
        //             </label>
        //           </div>
        //         </div>
        //         <div className="user">
        //           <button className="register-button">Cadastrar</button>
        //         </div>
        //       </div>
        //       <p className="text-login">
        //         Já tem uma conta?<a href="../html/login.html">Faça login</a>
        //       </p>
        //     </form>
        //   </div>
        // </main>
    );
};
