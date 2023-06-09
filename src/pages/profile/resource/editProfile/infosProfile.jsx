import React, { useState, useEffect } from 'react';
import lapis from "../../../../assets/svg/pencil.svg"
import { UserPhoto } from './userPhoto';



export const InfosProfile = (props) => {


    const [userInfosDisable, userInfosDisableState] = useState({
        disable: true,
        class: 'opacity-50 bg-white'
    })

    const [passwordClass, setClassPassword] = useState({
        class: "opacity-50 bg-white",
        disabled: true,
        type: "password",
    })

    const [name, setName] = useState(props.userName)


    useEffect(() => {
        setName(props.userName)
        props.onNameChange(props.userName);
        props.onPasswordChange(props.password);
        props.onEmailChange(props.email);
    }, [props.userName, props.profilePhoto])

    function handleNameChange(event) {
        const value = event.target.value;
        setName(value)
        props.onNameChange(value);
    }

    function handlePasswordChange(event) {
        const value = event.target.value;
        props.onPasswordChange(value);
    }

    function handleEmailChange(event) {
        const value = event.target.value;
        props.onEmailChange(value);
    }

    return (
        <div className='w-full h-full flex flex-col  border rounded-lg border-black gap-10 p-8'>
            <h2 className='text-5xl font-sans'>Informações do perfil</h2>
            <div className="flex justify-between flex-col md:flex-row gap-3 items-center">
                <div className='flex flex-col'>
                    <div className='flex flex-col text-xl text-[#A9A9A9]'>
                        Nome de usuario
                        <input disabled={userInfosDisable.disable} onChange={handleNameChange} className={`text-black text-3xl md:p-1 ${userInfosDisable.class}`} placeholder="Seu Nome" defaultValue={props.userName} id="userInfo" />
                    </div>
                    <div className='hidden md:flex justify-between pt-4  flex-col alight-start text-2xl md:text-xl text-[#A9A9A9] '>
                        Senha
                        <input type={passwordClass.type} id='password' disabled={passwordClass.disabled} onChange={handlePasswordChange} className={`text-black md:text-3xl md:p-1 ${passwordClass.class}`} placeholder="Senha" defaultValue={props.password} />
                    </div>
                </div>
                <div>
                    <div className='flex flex-col text-xl text-[#A9A9A9] md:pb-24'>
                        E-mail
                        <input disabled={userInfosDisable.disable} onChange={handleEmailChange} className={`text-black text-3xl md:p-1 ${userInfosDisable.class}`} placeholder="Email" defaultValue={props.email} />
                    </div>
                </div>

                <div className="flex justify-betwen">
                    <div className='flex flex-col gap-14'>
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
                                    setClassPassword({
                                        type: 'text',
                                        disabled: false,
                                        class: ''
                                    })
                                    console.log();
                                } else {
                                    setClassPassword({
                                        type: 'password',
                                        disabled: true,
                                        class: 'opacity-50 bg-white',

                                    })
                                }
                            }}>
                            Mudar Senha
                        </button>
                    </div>
                </div>

            </div>
            <UserPhoto nome={name} completName={props.completName} callBackProfilePhoto={props.onProfilePhotoChange} profilePhoto={props.profilePhoto} />
        </div>
    );
}



