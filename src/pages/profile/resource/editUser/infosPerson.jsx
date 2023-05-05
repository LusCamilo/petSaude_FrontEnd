import React, { useState, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import lapis from "../../../../assets/svg/pencil.svg"
import { updatePersonalInfosClient, updatePersonalInfosVeterinary } from '../../../../services/integrations/user';

export const Pessoais = (props) => {


    const [personalInfos, setPersonalInfos] = useState({ disabled: true, textColor: 'opacity-50' })
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [cpf, setCpf] = useState('')
    const [rg, setRg] = useState('')
    const [celular, setCelular] = useState('')
    const [telefone, setTelefone] = useState('')
    const [text, setText] = useState('')

    function handleNameChange(event) {
        setName(event.target.value);
    }
    function handleLastNameChange(event) {
        setLastName(event.target.value);
    }
    function handleCpfChange(event) {
        setCpf(event.target.value);
    }
    function handleRgChange(event) {
        setRg(event.target.value);
    }
    function handleCelularChange(event) {
        setCelular(event.target.value);
    }
    function handleTelefoneChange(event) {
        setTelefone(event.target.value);
    }
    function handleTextChange(event) {
        setText(event.target.value);
    }

    useEffect(() => {

        setName(props.name)
        setLastName(props.lastName)
        setCpf(props.cpf)
        setRg(props.rg)
        setCelular(props.celular)
        setTelefone(props.telefone)
        setText(props.text)

    }, [
        props.name,
        props.lastName,
        props.cpf,
        props.rg,
        props.celular,
        props.telefone,
        props.text
    ])



    return (

        <>
            <section className='w-full h-full border-none sm:border-solid border-2 rounded-lg border-black flex flex-col gap-10 md:pl-20 py-8'>
                <h2 className='text-5xl md:text-6xl font-bold font-sans text-center sm:text-left'>Informações Pessoais</h2>
                <div className='flex flex-row'>
                    <div className='flex flex-row justify-between w-full  pr-0 sm:pr-12'>
                        <div className='gap-1 sm:gap-10 mt-10 grid grid-cols-1 sm:grid-cols-2 sm:w-4/5'>
                            <div className=''>
                                <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                    Primeiro nome
                                    <input disabled={personalInfos.disabled} type="text" name="firstName" onChange={handleNameChange} defaultValue={name} className={`bg-transparent border-none text-2xl text-[#000] ${personalInfos.textColor}`} />
                                </label>
                            </div>
                            <div className='flex justify-center'>
                                <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                    Sobrenome
                                    <input disabled={personalInfos.disabled} type="text" name="firstName" onChange={handleLastNameChange} defaultValue={lastName} className={`bg-transparent border-none text-2xl text-[#000]${personalInfos.textColor}`} />
                                </label>
                            </div>
                            <div className=''>
                                <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                    CPF
                                    <input disabled={personalInfos.disabled} type="text" name="firstName" onChange={handleCpfChange} defaultValue={cpf} className={`bg-transparent border-none text-2xl text-[#000]${personalInfos.textColor}`} />
                                </label>
                            </div>
                            <div className='flex justify-center'>
                                <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                    RG
                                    <input disabled={personalInfos.disabled} type="text" name="firstName" onChange={handleRgChange} defaultValue={rg} className={`bg-transparent border-none text-2xl text-[#000]${personalInfos.textColor}`} />
                                </label>
                            </div>
                            <div className=''>
                                <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                    Celular
                                    <input disabled={personalInfos.disabled} type="text" name="firstName" onChange={handleCelularChange} defaultValue={celular} className={`bg-transparent border-none text-2xl text-[#000]${personalInfos.textColor}`} />
                                </label>
                            </div>
                            <div className='flex justify-center'>
                                <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                    Telefone
                                    <input disabled={personalInfos.disabled} type="text" name="firstName" onChange={handleTelefoneChange} defaultValue={telefone} className={`bg-transparent border-none text-2xl text-[#000]${personalInfos.textColor}`} />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='hidden sm:flex flex-row w-1/5 justify-end pr-10 '>
                        <button className='w-52 h-12 flex flex-row justify-center items-center gap-4 bg-[#ECECEC] rounded-full drop-shadow-lg' onClick={() => {


                            if (personalInfos.disabled == true) {
                                setPersonalInfos({ disabled: false, textColor: '' })
                            } else {
                                setPersonalInfos({ disabled: true, textColor: 'opacity-50' })

                                let infos

                                if (text == null)
                                    infos = {
                                        personName: `${name} ${lastName}`,
                                        cpf: cpf,
                                        rg: rg,
                                        cellphoneNumber: celular,
                                        phoneNumber: telefone,
                                        bio: ""
                                    }
                                else
                                    infos = {
                                        personName: `${name} ${lastName}`,
                                        cpf: cpf,
                                        rg: rg,
                                        cellphoneNumber: celular,
                                        phoneNumber: telefone,
                                        bio: text
                                    }



                                if (Boolean(localStorage.getItem('__user_isVet')))
                                     updatePersonalInfosVeterinary(infos)
                                else
                                    updatePersonalInfosClient(infos)
                            }

                        }}>
                            <img src={lapis} alt="" />
                            Editar
                        </button>
                    </div>
                </div>
                <div className='w-full sm:mr-10'>
                    <p className='flex flex-col text-xl text-[#A9A9A9] pt-3 sm:pt-20 mr-0 sm:mr-20 w-full sm:w-10/12 '> Biografia
                        <TextareaAutosize id="my-textarea" onChange={handleTextChange} defaultValue={text} className="block w-full p-2 rounded resize-none" />
                    </p>
                </div>
            </section>
        </>
    );
}
