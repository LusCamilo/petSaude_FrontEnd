import React, { useState } from 'react';
import lapis from "../../../../assets/svg/pencil.svg"
import { UserPhoto } from './userPhoto';



export const InfosProfile = (props) => {

    const [userInfosDisable, userInfosDisableState] = useState({
        disable: true,
        class: 'opacity-50 bg-white'
    })
    const [password, passwordState] = useState({
        class: "opacity-50 bg-white",
        disabled: true,
        type: "password",
        password: props.password
    })

    const [form, formState] = useState({
        nome: props.nome,
        email: props.email,
    })

    const handleNameChange = (event) => {
        console.log(event.target.value);
        formState({ nome: event.target.value });
    }
    const handleEmailChange = (event) => {
        console.log(event.target.value);
        formState({ email: event.target.value });
    }
    const handlePasswordChange = (event) => {
        console.log(event.target.value);
        passwordState({ password: event.target.value });
    }

    return (
        <div className='w-full h-full flex flex-col  border rounded-lg border-black gap-10 p-8'>
            <h2 className='text-5xl font-sans'>Informações do perfil</h2>
            <div className="flex justify-between flex-col md:flex-row gap-3 items-center ">
               <div className='flex flex-col md:pt-20'>
                    <div className='flex flex-col text-xl text-[#A9A9A9]'>
                        Nome de usuario
                        <input disabled={userInfosDisable.disable} onChange={handleNameChange} className={`text-black text-3xl md:p-1 ${userInfosDisable.class}`} defaultValue={form.nome} id="userInfo" />
                    </div>

                    <div className='hidden md:flex justify-betwen pt-4  flex-col alight-start text-2xl md:text-xl text-[#A9A9A9] '>
                            Senha
                            <input type={password.type} id='password' disabled={password.disabled} onChange={handlePasswordChange} className={`text-black md:text-3xl md:p-1 ${password.class}`} defaultValue={password.password} />
                    </div>
                </div>
               
                <div className='flex flex-col text-xl text-[#A9A9A9] '>
                    E-mail
                    <input disabled={userInfosDisable.disable} onChange={handleEmailChange} className={`text-black text-3xl md:p-1 ${userInfosDisable.class}`} defaultValue={form.email} />
                </div>
    

                
                <div className="flex justify-betwen md:pl-5">
                    <div className='md:hidden flex flex-col alight-start text-2xl md:text-xl text-[#A9A9A9] '>
                        Senha
                        <input type={password.type} id='password' disabled={password.disabled} onChange={handlePasswordChange} className={`text-black md:text-3xl md:p-1 ${password.class}`} defaultValue={password.password} />
                    </div>
                    <div className='flex flex-col gap-5'>
                        <button className='w-52 h-12 hidden md:flex flex-row justify-center items-center gap-4 bg-[#ECECEC] rounded-full drop-shadow-lg' onClick={() => {

                            if (document.getElementById('userInfo').disabled == true) {
                                userInfosDisableState({
                                    disable: false,
                                    class: ''
                                })
                            } else {
                                userInfosDisableState({
                                    disable: true,
                                    class: 'opacity-50 bg-white'
                                })
                            }

                        }}>
                            <img src={lapis} />
                            Editar
                        </button>
                        <button
                            className=' w-20 md:w-52 md:h-12 hidden md:flex flex-row justify-center items-center gap-4 bg-[#F9DEDC] rounded-full drop-shadow-lg font-bold text-[#410E0B]'
                            onClick={() => {


                                if (document.getElementById('password').type == 'password') {
                                    passwordState({
                                        type: 'text',
                                        disabled: false,
                                        class: ''
                                    })
                                    console.log();
                                } else {
                                    passwordState({
                                        type: 'password',
                                        disabled: true,
                                        class: 'opacity-50 bg-white'
                                    })
                                }
                            }}>
                            Mudar Senha
                        </button>
                    </div>
                   
                </div>
                <div>
                        <button
                            className=' ml-40 md:ml-0 h-10 w-32 md:w-52 md:h-12 md:hidden flex flex-row justify-center items-center gap-4 bg-[#F9DEDC] rounded-full drop-shadow-lg font-bold text-[#410E0B]'
                            onClick={() => {
                                if (document.getElementById('password').type == 'password') {
                                    passwordState({
                                        type: 'text',
                                        disabled: false,
                                        class: ''
                                    })
                                    console.log();
                                } else {
                                    passwordState({
                                        type: 'password',
                                        disabled: true,
                                        class: 'opacity-50 bg-white'
                                    })
                                }
                            }}>
                            Mudar Senha
                        </button>
                    </div>
            </div>
            <UserPhoto nome={form.nome} completName={props.completName} />
        </div>
    );
}

