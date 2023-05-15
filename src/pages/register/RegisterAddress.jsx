import React, { useState } from "react";
import { AuthHeader } from "../../components/headers/AuthHeader";
import { get, useForm } from "react-hook-form";
import { registerUser } from "../../services/integrations/user";
import { Link } from "react-router-dom";
import backgroundImage from "../../assets/image/address-image.png"
import { ServerError } from "../userProfile/pet/cards/erro500";
import Modal from 'react-modal'
import { WarnRequest } from "../userProfile/pet/cards/warnTwo";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PetAddSucess } from "../userProfile/pet/cards/sucess";

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
    overlay: {
        backgroundColor: '#0000'
    }
};


export function RegisterAddress() {
    const { register, handleSubmit, formState: errors, setValue } = useForm()
    const [city, setCity] = useState('')
    const [neight, setNeight] = useState('')
    const [street, setStreet] = useState('')
    const [uf, setUf] = useState('')

    const [modalIsOpenServer, setIsOpenSever] = React.useState(false);

    function openModalServer() {
        setIsOpenSever(true)
    }

    function closeModalServer() {
        setIsOpenSever(false);
    }


    function openModal() {
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false);
    }

    const [emailModal, setEmailModal] = React.useState(false);
    const [wordUsed, setWordUsed] = React.useState(false);
    function openModalEmail(word) {
        setWordUsed(word)
        setEmailModal(true)
    }

    function closeModalEmail() {
        setEmailModal(false);
    }

    const [sucess, setSucess] = React.useState(false);

    function openModalSucess() {
        setSucess(true)
    }

    function closeModalSucess() {
        setSucess(false);
    }


    const submitForm = async (data) => {

        const registerType = localStorage.getItem('__register_type')
        let userInfos = JSON.parse(localStorage.getItem('__user_register_infos'))

        let allInfos;

        allInfos = {
            personName: `${userInfos.firstName} ${userInfos.lastName}`,
            cpf: userInfos.cpf,
            email: userInfos.email,
            password: userInfos.password,
            cellphoneNumber: userInfos.cellphoneNumber,
            phoneNumber: userInfos.phoneNumber,
            isVet: false,
            address: {
                ...data
            }
        }



        if (registerType === 'professional') {
            allInfos.isVet = 'true'
            userInfos.address = data
            localStorage.setItem('__user_register_infos', JSON.stringify(userInfos))
            document.location.href = '/register/veterinary'
        } else {

            console.log(JSON.stringify(allInfos));
            const response = await registerUser(allInfos)
            let error1 = response?.response || "";
            let error = response?.response?.error || "";

            console.log(response);


            if (response.response.id) {
                
                localStorage.setItem('__user_id', response.id)
                showToastMessage()
                setTimeout(function () {
                    openModalSucess()
                    setTimeout(function () {
                        closeModalSucess()
                        document.location.href = '/login'
                    }, 5000);
                }, 4000);
            } else {
                console.log(error1)
                console.log(error);
                console.log(error.includes('já está em uso'))
                if (error1 == "Email já está em uso" || error1 == "CPF já está em uso") {
                    let firstWord = error1.split(" ")[0]
                    openModalEmail(firstWord)
                    setTimeout(function () {
                        closeModalEmail()
                        document.location.href = '/register'
                    }, 2000);
                } else {
                    openModal()
                    setTimeout(function () {
                        closeModal()
                        document.location.href = '/register'
                    }, 2000);
                }
            }
            
        }
    }

    const showToastMessage = () => {
        toast('Criando usuário', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };




    const getAddressFromZipCode = async (event) => {
        const zipCode = event
        await fetch(`https://viacep.com.br/ws/${zipCode}/json/`)
            .then(response => response.json())
            .then(data => setFormValues(data))
            .catch(erro => setFormValues(erro))
    }

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false);
    }


    const setFormValues = data => {
        if (data.uf == '' || data.uf == null || data.uf == undefined) {
            openModal()
            setTimeout(function () {
                closeModal()
            }, 2000);
        } else {
            setCity(data.localidade)
            setNeight(data.bairro)
            setStreet(data.logradouro)
            setUf(data.uf)
            setValue('street', data.logradouro)
            setValue('neighborhood', data.bairro)
            setValue('city', data.localidade)
            setValue('state', data.uf)
        }

    }



    return (
        <section className='flex flex-row-reverse w-screen h-screen bg-gradient-to-br from-[#092b5a] to-[#9ed1b7] opacity-90 overflow-x-hidden'>
            <div className='absolute w-full h-full overflow-hidden flex items-center justify-start'>
                <img src={backgroundImage} alt="" className='w-2/4 h-fit' />
            </div>
            <div className='lg:w-1/2 md:w-full w-full min-h-screen h-fit bg-white flex flex-col md:justify-center justify-between items-center lg:gap-6 md:gap-4 sm:gap-2 z-10 p-4'>
                <AuthHeader title='Podemos saber a sua localização?' subtitle='Para a experiência na plataforma, informe-nos a sua localização' firebaseFeature={false} />
                <form onSubmit={handleSubmit(submitForm)} className='h-fit lg:w-3/4 w-full gap-2 p-0 lg:mt-10 md:mt-6' >
                    <label className='w-full flex flex-col md:text-xl text-lg'>
                        CEP
                        <input
                            onBlurCapture={(e) => {
                                console.log(e);
                                getAddressFromZipCode(e.target.value)
                            }}
                            className={errors.zipCode ? 'h-12 px-2 border-b-2 border-b-red-700 bg-red-200 w-full' : 'h-12 px-2 w-full'} type="text" name="zipCode" {...register('zipCode', { required: true })}
                        />
                    </label>
                    <div className='flex xl:flex-row flex-col justify-between lg:gap-8 gap-2 w-full'>
                        <label className='w-full flex flex-col md:text-xl text-lg'>
                            Cidade
                            <input value={city} className={errors.city ? 'h-12 px-2 border-b-2 border-b-red-700 bg-red-200 w-full' : 'h-12 px-2 w-full'} type="text" name="city" />
                        </label>
                        <label className='w-full flex flex-col md:text-xl text-lg'>
                            Estado
                            <input value={uf} className={errors.state ? 'h-12 px-2 border-b-2 border-b-red-700 bg-red-200 w-full' : 'h-12 px-2 w-full'} type="text" name="state" />
                        </label>
                    </div>
                    <label className='w-full flex flex-col md:text-xl text-lg'>
                        Rua
                        <input value={street} className={errors.street ? 'h-12 px-2 border-b-2 border-b-red-700 bg-red-200 w-full' : 'h-12 px-2 w-full'} type="text" name="street" />
                    </label>
                    <label className='w-full flex flex-col md:text-xl text-lg'>
                        Bairro
                        <input value={neight} className={errors.neighborhood ? 'h-12 px-2 border-b-2 border-b-red-700 bg-red-200 w-full' : 'h-12 px-2 w-full'} type="text" name="neighborhood" />
                    </label>
                    <div className='flex xl:flex-row flex-col justify-between lg:gap-8 gap-2 w-full'>
                        <label className='w-full flex flex-col md:text-xl text-lg'>
                            Número
                            <input className={errors.number ? 'h-12 px-2 border-b-2 border-b-red-700 bg-red-200 w-full' : 'h-12 px-2 w-full'} type="text" name="number" {...register('number', { required: true })} />
                        </label>
                        <label className='w-full flex flex-col md:text-xl text-lg'>
                            Complemento (Se houver)
                            <input className={errors.complement ? 'h-12 px-2 border-b-2 border-b-red-700 bg-red-200 w-full' : 'h-12 px-2 w-full'} type="text" name="complement" {...register('complement', { required: false })} />
                        </label>
                    </div>
                    <div className='flex xl:flex-row flex-col justify-between gap-2 w-full lg:mt-12 mt-6'>
                        <button id='client' type="submit" onClick={event => localStorage.setItem('__register_type', event.target.id)} className='w-full h-fit bg-[#09738A] text-center text-white font-bold text-xl md:text-2xl rounded transition drop-shadow-xl py-3 hover:bg-[#78A890]'>Cadastrar cliente</button>
                        <button id='professional' type="submit" onClick={event => localStorage.setItem('__register_type', event.target.id)} className='w-full h-fit bg-[#09738A] text-center text-white font-bold text-xl md:text-2xl rounded transition py-3 drop-shadow-xl hover:bg-[#78A890]'>Cadastrar profissional</button>
                    </div>
                </form>
                <p className='mt-8 mb-4'>Já tem uma conta?<Link to='/login' className='pl-1 font-bold'>Faça login</Link></p>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Modal
                isOpen={modalIsOpenServer}
                onAfterOpen={''}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <ServerError />
            </Modal>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={''}
                onRequestClose={closeModalServer}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <WarnRequest boolBotoes={'hidden'} description="Informe um CEP valido" />
            </Modal>
            <Modal
                isOpen={sucess}
                onAfterOpen={''}
                onRequestClose={closeModalSucess}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <PetAddSucess aparecer='hidden' title="Sucesso" what="Novo usuário criado com sucesso!" />
            </Modal>
        </section>
    )
}