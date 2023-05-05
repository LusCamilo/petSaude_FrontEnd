import React, {useState} from "react";
import {Link, useHref} from "react-router-dom";
import backgroundImage from '../../assets/login-register-background.png'
import {useForm} from "react-hook-form";
import {AuthHeader} from "../../components/headers/AuthHeader";
import {IoEye, IoEyeOff} from "react-icons/io5";
import {login, signup} from "../../services/integrations/authentication";
import jwt_decode from "jwt-decode";

export const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const [isPasswordVisible, setPasswordVisibility] = useState(false)
    const togglePasswordVisibility = () => {
        if (isPasswordVisible === false)
            setPasswordVisibility(true)
        else
            setPasswordVisibility(false)
    }


    const SubmitForm = async data => {

        // TODO: AUTENTICAÇÃO
        const response = await login(data)

        if (response.token != '' && response.token != null && response.token != undefined) {
             document.location.href = '/home'
            //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqb2huZG9lQGdtYWlsLmNvbSIsImlzVmV0IjpmYWxzZSwicHJvZmlsZUJhbm5lclBob3RvIjoiaHR0cHM6Ly9lbmNyeXB0ZWQtdGJuMC5nc3RhdGljLmNvbS9pbWFnZXM_cT10Ym46QU5kOUdjUy04azZEZmFIQVB2Y0RaZndmc2xHRWxVekRzTUprWXFLTjI1M042VEY3SkVDOXl2NEVaQk53c1dyX1RKU3QzMW93R1EmdXNxcD1DQVUiLCJwcm9maWxlUGhvdG8iOiJnaXRodWIuY29tL21hbHZ6bWsxLnBuZyIsInVzZXJOYW1lIjoiam9oaG55RG9lIiwiY3JlYXRlZEF0IjoiMjAyMy0wNS0wM1QxMTo0MToxNi40NjFaIiwiaWF0IjoxNjgzMTE0MDc2LCJleHAiOjE2ODM3MTg4NzZ9.HKAqSahiaqHtet9BSBOCsSSEmuwwQMDdm-Xssz50chk
            localStorage.setItem('__user_JWT', response.token)
            if (localStorage.getItem('__user_JWT') != false || localStorage.getItem('__user_JWT') != undefined || localStorage.getItem('__user_JWT') != null) {
                
                document.location.href = '/home'
            } else alert(response.message)
        }else{
            window.alert(response.response)
        }

    const validateForm = async (data) => {
        const {
            email,
            password
        } = data

        const apiResponse = await signup(localStorage.getItem('__user_JWT'))

            console.log(apiResponse);

            return true
        }



        // console.log(apiRepsonse.body)
        // if (apiRepsonse)
        //     console.log(apiRepsonse)
        // TODO: VALIDAR FORMULÁRIO
        return true
    }


    return (
        <section className='flex flex-row w-screen h-screen bg-gradient-to-br from-[#092b5a] to-[#9ed1b7] opacity-90 overflow-x-hidden'>
            <div className='lg:w-1/2 md:w-2/3 w-full min-h-fit h-full bg-white flex flex-col md:justify-center justify-around items-center lg:gap-6 md:gap-4 gap-2 z-10 p-4'>
                <AuthHeader title='Bem vindo de volta!' subtitle='Por favor, insira suas informações abaixo' firebaseFeature={true} />
                <form className='h-fit lg:w-3/4 xl:w-2/3 w-full gap-2 p-0 lg:mt-12 mt-6'
                      onSubmit={handleSubmit(SubmitForm)}>
                    <label className='w-full flex flex-col'>
                        E-mail
                        <input
                            className={errors.firstName ? 'h-12 px-2 border-b-2 border-b-red-700 bg-red-200 w-full' : 'h-12 px-2 w-full'}
                            type="email" name="email" {...register('email', {required: true})}/>
                    </label>
                    <label className='w-full flex flex-col'>
                        Senha
                        <div className='relative'>
                            <input
                                className={errors.password ? 'h-12 px-2 border-b-2 border-b-red-700 bg-red-200 w-full' : 'h-12 px-2 w-full'}
                                type={isPasswordVisible ? 'text' : 'password'}
                                name="password" {...register('password', {minLength: 6, required: true})} />
                            {isPasswordVisible
                                ?
                                <IoEye className='w-7 h-7 absolute right-4 top-2.5' onClick={togglePasswordVisibility}/>
                                : <IoEyeOff className='w-7 h-7 absolute right-4 top-2.5'
                                            onClick={togglePasswordVisibility}/>
                            }
                        </div>
                    </label>
                    <button type="submit"
                            className='w-full h-fit bg-[#09738A] text-center text-white font-bold text-2xl rounded lg:mt-12 mt-6 transition py-3 hover:bg-[#78A890]'>Entrar
                    </button>
                </form>
                <p>Ainda não tem uma conta?<Link to='/register'
                                                 className='pl-1 font-bold'>Cadastre-se</Link></p>
            </div>
            <div className='absolute w-full h-full overflow-hidden flex items-center justify-end'>
                <img src={backgroundImage} alt="" className='w-2/3 h-fit opacity-50'/>
            </div>
        </section>
    );
}