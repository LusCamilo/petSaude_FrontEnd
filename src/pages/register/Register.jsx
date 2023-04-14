import backgroundImage from '../../assets/login-register-background.png'
// import {type} from "@testing-library/user-event/dist/type";
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthHeader } from "../../components/headers/AuthHeader";
import React from "react";

export function Register() {
    const { register, handleSubmit, formState: {errors} } = useForm()
    const submitForm = data => {
        if (validateForm(data)) {
            localStorage.setItem('__user_register_infos', JSON.stringify(data))
            document.location.href = '/register/address'
        }
    }

    let [isPasswordVisible, setPasswordVisibility] = useState(false)
    let [isConfirmPasswordVisible, setConfirmPasswordVisibility] = useState(false)

    const togglePasswordVisibility = () => {
        if (isPasswordVisible === false)
            setPasswordVisibility(true)
        else
            setPasswordVisibility(false)
    }

    const toggleConfirmPasswordVisibility = () => {
        if (!isConfirmPasswordVisible)
            setConfirmPasswordVisibility(true)
        else
            setConfirmPasswordVisibility(false)
    }

    const validateForm = (data) => {
        let error = {
            status: false,
            message: '',
        };

        if (data) {
            let {
                password,
                confirmPassword,
            } = data

            if (password !== confirmPassword) error = {status: true, message: 'Password needs to be the same'}

            if (error.status)
                throw new Error(error.message)
            else return true
        }
        return false
    }

    return(
        <section className='flex flex-row w-screen h-screen bg-gradient-to-br from-[#092b5a] to-[#9ed1b7] opacity-90 overflow-x-hidden'>
            <div className='lg:w-1/2 md:w-2/3 w-full min-h-screen h-fit bg-white flex flex-col md:justify-center justify-between items-center lg:gap-6 md:gap-4 sm:gap-2 z-10 p-4'>
                <AuthHeader title='É novo por aqui?' subtitle='Insira suas informações abaixo e cadastre-se!' firebaseFeature={true} />
                <form className='h-fit lg:w-3/4 xl:w-2/3 w-full gap-2 p-0 lg:mt-12 md:mt-6' onSubmit={handleSubmit(submitForm)}>
                    <div className='flex xl:flex-row flex-col justify-between lg:gap-8 gap-2 w-full'>
                        <label className='w-full flex flex-col'>
                            Primeiro nome
                            <input className={errors.firstName ? 'h-12 px-2 border-b-2 border-b-red-700 bg-red-200 w-full' : 'h-12 px-2 w-full'} type="text" name="firstName" {...register('firstName', {required: true})}/>
                        </label>
                        <label className='w-full flex flex-col'>
                            Sobrenome
                            <input className={errors.lastName ? 'h-12 px-2 border-b-2 border-b-red-700 bg-red-200 w-full' : 'h-12 px-2 w-full'} type="text" name="lastName" {...register('lastName', {required: true})} />
                        </label>
                    </div>
                    <label className='w-full flex flex-col'>
                        CPF
                        <input className={errors.cpf ? 'h-12 px-2 border-b-2 border-b-red-700 bg-red-200 w-full' : 'h-12 px-2 w-full'} type="text" name="cpf" {...register('cpf', {required: true})}/>
                    </label>
                    <label className='w-full flex flex-col'>
                        E-mail
                        <input className={errors.email ? 'h-12 px-2 border-b-2 border-b-red-700 bg-red-200 w-full' : 'h-12 px-2 w-full'} type="email" name="email" {...register('email', {required: true})} />
                    </label>
                    <label className='w-full flex flex-col'>
                        Senha
                        <div className='relative'>
                            <input className={errors.password ? 'h-12 px-2 border-b-2 border-b-red-700 bg-red-200 w-full' : 'h-12 px-2 w-full'} type={isPasswordVisible ? 'text' : 'password'} name="password" {...register('password', {minLength: 6, required: true})} />
                            {isPasswordVisible
                                ? <IoEye className='w-7 h-7 absolute right-4 top-2.5' onClick={togglePasswordVisibility} />
                                : <IoEyeOff className='w-7 h-7 absolute right-4 top-2.5' onClick={togglePasswordVisibility}/>
                            }
                        </div>
                    </label>
                    <label className='w-full flex flex-col'>
                        Confirme a senha
                        <div className='relative'>
                            <input className={errors.confirmPassword ? 'h-12 px-2 border-b-2 border-b-red-700 bg-red-200 w-full' : 'h-12 px-2 w-full'} type={isConfirmPasswordVisible ? 'text' : 'password'} name="confirmPassword" {...register('confirmPassword', {required: true})} />
                            {isConfirmPasswordVisible
                                ? <IoEye className='w-7 h-7 absolute right-4 top-2.5' onClick={toggleConfirmPasswordVisibility} />
                                : <IoEyeOff className='w-7 h-7 absolute right-4 top-2.5' onClick={toggleConfirmPasswordVisibility}/>
                            }
                        </div>
                    </label>
                    <div className='flex xl:flex-row flex-col justify-between lg:gap-8 gap-2 w-full'>
                        <label className='w-full'>
                            Celular
                            <input className={errors.cellphoneNumber ? 'h-12 px-2 border-b-2 border-b-red-700 bg-red-200 w-full' : 'h-12 px-2 w-full'} type="tel" name="cellphoneNumber" {...register('cellphoneNumber', {required: true})} />
                        </label>
                        <label className='w-full'>
                            Telefone
                            <input className='h-12 px-2 w-full' type="tel" name="phoneNumber" {...register('phoneNumber')} />
                        </label>
                    </div>
                    <button type="submit" className='w-full h-fit bg-[#09738A] text-center text-white font-bold text-2xl rounded lg:mt-12 mt-6 transition py-3 hover:bg-[#78A890]'>Continuar</button>
                </form>
                <p className='mt-8 mb-4'>Já tem uma conta?<Link to='/login' className='pl-1 font-bold'>Faça login</Link></p>
            </div>
            <div className='absolute w-full h-full overflow-hidden flex items-center justify-end'>
                <img src={backgroundImage} alt="" className='w-2/3 h-fit opacity-50' />
            </div>
        </section>
    )
}
