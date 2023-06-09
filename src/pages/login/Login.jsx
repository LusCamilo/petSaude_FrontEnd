import React, { useState, useEffect } from "react";
import { Link, useHref } from "react-router-dom";
import backgroundImage from '../../assets/login-register-background.png'
import { useForm } from "react-hook-form";
import { AuthHeader } from "../../components/headers/AuthHeader";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { login, signup } from "../../services/integrations/authentication";
import jwt_decode from "jwt-decode";
import { ServerError } from "../profile/pet/cards/erro500";
import Modal from 'react-modal'
import { WarnRequest } from "../profile/pet/cards/warnTwo";

const userId = async () => {

    const apiResponse = await signup(localStorage.getItem('__user_JWT'))

    localStorage.setItem('__user_id', apiResponse.user.id)
    localStorage.setItem('__user_isVet', apiResponse.user.isVet)

}

export const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const [isPasswordVisible, setPasswordVisibility] = useState(false)
    const togglePasswordVisibility = () => {
        if (isPasswordVisible === false)
            setPasswordVisibility(true)
        else
            setPasswordVisibility(false)
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: '4px solid transparent',
            borderRadius: '12px 12px',
            backgroundColor: '#FFFFFF00',
            display: "flex",
            justifyContent: "center"
        },
        overlay : {
            backgroundColor: '#0000'
        }
     };

     const [modalIsOpenServer, setIsOpenSever] = React.useState(false);

     function openModalServer() {
        setIsOpenSever(true)
     }
 
     function closeModalServer() {
        setIsOpenSever(false);
     }

     const [modalIsOpen, setIsOpen] = React.useState(false);
     const [errorLogin, setErrorLogin] = useState('bg-red-200');

     function openModal() {
         setIsOpen(true)
     }
 
     function closeModal() {
         setIsOpen(false);
     }
    
    const SubmitForm = async data => {

        // TODO: AUTENTICAÇÃO
        const response = await login(data)
        console.log(response['response']);
        if (response['response'] == 'Nenhum registro encontrado no banco') {
            openModal()
            setErrorLogin('bg-red-200')
            setTimeout(function() {
                closeModal()
                setErrorLogin('bg-[#B3261E]')
            }, 2000); 
        } else {
            if (response.token != '' && response.token != null && response.token != undefined) {
                localStorage.setItem('__user_JWT', response.token)
                userId()
                document.location.href = '/home'
            } else {
                window.alert(response.response)
            }
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
        return true
    }


    return (
        <section className='flex flex-row w-screen h-screen bg-gradient-to-br from-[#092b5a] to-[#9ed1b7] opacity-90 overflow-x-hidden'>
            <div className='lg:w-1/2 md:w-2/3 w-full min-h-fit h-full bg-white flex flex-col md:justify-center justify-around items-center lg:gap-6 md:gap-4 gap-2 z-10 p-4'>
                <AuthHeader title='Bem vindo de volta!' subtitle='Por favor, insira suas informações abaixo' firebaseFeature={true} />
                <form className='h-fit lg:w-3/4 xl:w-2/3 w-full gap-2 p-0 lg:mt-12 mt-6'
                    onSubmit={handleSubmit(SubmitForm)}>
                    <label className='w-full flex flex-col md:text-xl text-lg'>
                        E-mail
                        <input
                            className={errors.firstName ? `h-12 px-2 border-b-2 border-b-red-700 ${errorLogin} w-full` : 'h-12 px-2 w-full'}
                            type="email" name="email" {...register('email', { required: true })} />
                    </label>
                    <label className='w-full flex flex-col md:text-xl text-lg'>
                        Senha
                        <div className='relative'>
                            <input
                                className={errors.password ? `h-12 px-2 border-b-2 border-b-red-700 ${errorLogin} w-full` : 'h-12 px-2 w-full'}
                                type={isPasswordVisible ? 'text' : 'password'}
                                name="password" {...register('password', { minLength: 6, required: true })} />
                            {isPasswordVisible
                                ?
                                <IoEye className='w-7 h-7 absolute right-4 top-2.5' onClick={togglePasswordVisibility} />
                                : <IoEyeOff className='w-7 h-7 absolute right-4 top-2.5'
                                    onClick={togglePasswordVisibility} />
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
                <img src={backgroundImage} alt="" className='w-2/3 h-fit opacity-50' />
            </div>
            <Modal
                    isOpen={modalIsOpenServer}
                    onAfterOpen={''}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <ServerError/>
                </Modal>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={''}
                    onRequestClose={closeModalServer}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <WarnRequest boolBotoes={'hidden'} description="Email ou senha inválidos"/>
                </Modal>
        </section>
    );
}