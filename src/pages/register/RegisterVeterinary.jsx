import React, { useState } from "react";
import "./css/cadastroVet.css";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import backgroundImage from "../../assets/svg/imgVetCadastro.svg";
import { AuthHeader } from "../../components/headers/AuthHeader";
import { createVeterinaryInfosIntoExistingUser, registerUser, registerVet } from "../../services/integrations/user";
import { ServerError } from "../profile/pet/cards/erro500";
import Modal from 'react-modal'
import { WarnRequest } from "../profile/pet/cards/warnTwo";
import { PetAddSucess } from "../profile/pet/cards/sucess";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

export const RegisterVeterinary = () => {

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

    const { register, handleSubmit, formState: { errors } } = useForm()

    const [modalIsOpenServer, setIsOpenSever] = React.useState(false);

    function openModalServer() {
       setIsOpenSever(true)
    }

    function closeModalServer() {
       setIsOpenSever(false);
    }

    const [modalIsOpen, setIsOpen] = React.useState(false);

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
            console.log( createUserResponse.response);
            let error1 = createUserResponse.response ? createUserResponse.response : ""
            let error = createUserResponse.response.error ? createUserResponse.response.error : ""
            if (createUserResponse.response.id) {
                showToastMessage()
                setTimeout(function() {
                    openModalSucess()
                    setTimeout(function() {
                        closeModalSucess()
                        document.location.href = '/login' 
                    }, 5000); 
                }, 4000); 
            } else {
                console.log(error1)
                console.log(error);
                console.log(error.includes('já está em uso'))
                if(error1 == "Email já está em uso" || error == "CRMV já está em uso"){
                    console.log("aqui");
                    if (error1 == 'Email já está em uso') {
                        let firstWord = error1.split(" ")[0]
                        openModalEmail(firstWord)
                        setTimeout(function() {
                            closeModalEmail()
                            document.location.href = '/register' 
                        }, 2000); 
                    } else {
                        let firstWord = error.split(" ")[0]
                        openModalEmail(firstWord)
                        setTimeout(function() {
                            closeModalEmail()
                            document.location.href = '/register' 
                        }, 2000); 
                    }
                }else{
                    openModal()
                        setTimeout(function() {
                            closeModal()
                            document.location.href = '/register' 
                        }, 2000); 
                }
            }

            // else alert('Erro na criação do usuário')
        } else {
            openModal()
            setTimeout(function() {
                closeModal()
            }, 2000); 
        }
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
                        <span className='font-normal text-2xl'>Especialidades</span>
                        <div className='flex flex-wrap gap-2 m-1'>
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
                        <span className='font-normal text-2xl'>Animais que atende</span>
                        <div className='flex flex-wrap gap-2 m-1'>
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
                        <label className='w-full flex flex-col text-black'>
                            Área de atuação
                            <input className={errors.occupationArea ? 'h-12 px-2 border-b-2 border-b-red-700 bg-red-200 w-full' : 'h-12 px-2 w-full'} type="text" name="occupationArea" {...register('occupationArea', { required: true })} />
                        </label>
                        <label className='w-full flex flex-col text-black'>
                            CRMV
                            <input className={errors.crmv ? 'h-12 px-2 border-b-2 border-b-red-700 bg-red-200 w-full' : 'h-12 px-2 w-full'} type="text" name="crmv" {...register('crmv', { required: true })} />
                        </label>
                    </div>
                    <label className='w-full flex flex-col text-black'>
                        Formação
                        <input className={errors.formation ? 'h-12 px-2 border-b-2 border-b-red-700 bg-red-200 w-full' : 'h-12 px-2 w-full'} type="text" name="formation" {...register('formation', { required: true })} />
                    </label>
                    <label className='w-full flex flex-col text-black'>
                        Instituição
                        <input className={errors.institution ? 'h-12 px-2 border-b-2 border-b-red-700 bg-red-200 w-full' : 'h-12 px-2 w-full'} type="text" name="institution" {...register('institution', { required: true })} />
                    </label>
                    <div className='flex xl:flex-row flex-col justify-between lg:gap-8 gap-2 w-full'>
                        <label className='w-full flex flex-col text-black'>
                            Data de formação
                            <input className={errors.formationDate ? 'h-12 px-2 border-b-2 border-b-red-700 bg-red-200 w-full' : 'h-12 px-2 w-full'} type="date" name="formationDate" {...register('formationDate', { required: true })} />
                        </label>
                        <label className='w-full flex flex-col text-black'>
                            Início de atuação
                            <input className={errors.startActingDate ? 'h-12 px-2 border-b-2 border-b-red-700 bg-red-200 w-full' : 'h-12 px-2 w-full'} type="date" name="startActingDate" {...register('startActingDate', { required: true })} />
                        </label>
                    </div>
                    <button type="submit" className='w-full h-fit bg-[#09738A] text-center text-white font-bold text-2xl rounded transition drop-shadow-xl py-3 hover:bg-[#78A890] mt-4'>Cadastrar-se</button>
                </form>
                <p className='mt-8 mb-4'>Já tem uma conta?<Link to='/login' className='pl-1 font-bold'>Faça login</Link></p>
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
                    <ServerError/>
                </Modal>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={''}
                    onRequestClose={closeModalServer}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <WarnRequest boolBotoes={'hidden'} description="Erro ao cadastrar, veja se todas as informações estão corretas"/>
                </Modal>
                <Modal
                    isOpen={emailModal}
                    onAfterOpen={''}
                    onRequestClose={closeModalEmail}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <WarnRequest boolBotoes={'hidden'} description={`${wordUsed} já utilizado, escolha outro`}/>
                </Modal>
                <Modal
                    isOpen={sucess}
                    onAfterOpen={''}
                    onRequestClose={closeModalSucess}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <PetAddSucess aparecer='hidden' title="Sucesso" what="Novo usuário criado com sucesso!"/>
                </Modal>

            </div>
        </section>
    );
};
