import React, { isValidElement, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Address } from './resource/editUser/address';
import { Pessoais } from './resource/editUser/infosPerson';
import { Prossionais } from './resource/editUser/infosProfissional';
import './css/UpgradeUser.css';
import { Pets } from './resource/editUser/allPets';
import Person from '../../assets/svg/Person.svg';
import Cadeado from '../../assets/svg/Lock.svg';
import Work from '../../assets/svg/Work.svg';
import Calendary from '../../assets/svg/calendary.svg';
import Local from '../../assets/svg/Gps.svg';
import Logout from '../../assets/svg/Logout.svg';
import { Config } from "./resource/editUser/headerConfig.jsx";
import Arrow from '../../assets/svg/Arrow.svg';
import lixeira from './/resource/img/Delete.svg'
import lapis from './/resource/img/LapisColorido.svg'
import { deleteClient, deleteVeterinary, getUser, getVeterinary } from '../../services/integrations/user';
import { PetHeader } from './pet/petHeader';
import Modal from 'react-modal';
import { WarnRequest } from './pet/cards/warnTwo';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px',
        width: '40vw',
        height: '40vh',
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#F9DEDC"
    }
};

const dataFormation = (date) => {

    const dataFormation = date.split("T")

    let data = dataFormation[0]

    return data

}
const InfosUser = async () => {

    const token = localStorage.getItem('__user_JWT')

    if (localStorage.getItem('__user_isVet') == 'false') {
        const response = await getUser(localStorage.getItem('__user_id'))


        const [nome, ...sobrenomes] = response.response.user.personName.split(' ');

        const sobrenome = sobrenomes.join(' ');
        return {
            id: response.response.user.id,
            personName: response.response.user.personName,
            firstName: nome,
            lastName: sobrenome,
            userName: response.response.user.userName,
            cpf: response.response.user.cpf,
            rg: response.response.user.rg,
            profilePhoto: response.response.user.profilePhoto,
            profileBannerPhoto: response.response.user.profileBannerPhoto,
            email: response.response.user.email,
            password: response.response.user.password,
            phoneNumber: response.response.user.phoneNumber,
            cellphoneNumber: response.response.user.cellphoneNumber,
            biography: response.response.user.biography,
            addressId: response.response.user.addressId,
            cep: response.response.user.Address.cep,
            number: response.response.user.Address.number,
            complement: response.response.user.Address.complement,
        }



    } else {

        const response = await getVeterinary(localStorage.getItem('__user_id'))

        const [nome, ...sobrenomes] = response.response.user.personName.split(' ');

        const sobrenome = sobrenomes.join(' ');

        const formation = dataFormation(response.response.user.formationDate)
        const actingDate = dataFormation(response.response.user.startActingDate)

        return {

            id: response.response.user.id,
            personName: response.response.user.personName,
            firstName: nome,
            lastName: sobrenome,
            userName: response.response.user.userName,
            cpf: response.response.user.cpf,
            rg: response.response.user.rg,
            profilePhoto: response.response.user.profilePhoto,
            profileBannerPhoto: response.response.user.profileBannerPhoto,
            email: response.response.user.email,
            password: response.response.user.password,
            phoneNumber: response.response.user.phoneNumber,
            cellphoneNumber: response.response.user.cellphoneNumber,
            biography: response.response.user.biography,
            addressId: response.response.user.addressId,
            cep: response.response.user.Address.cep,
            number: response.response.user.Address.number,
            complement: response.response.user.Address.complement,
            crmv: response.response.user.crmv,
            formationDate: formation,
            startActingDate: actingDate,
            occupationArea: response.response.user.occupationArea,
            formation: response.response.user.formation,
            institution: response.response.user.institution,
            PetSpecieVeterinary: response.response.user.PetSpecieVeterinary,
            VeterinaryEspecialities: response.response.user.VeterinaryEspecialities

        }

    }
}
const getAddressFromZipCode = async (cep) => {

    return (await fetch(`https://viacep.com.br/ws/${cep}/json/`)).json()

}


export const UpgradeUser = () => {

    const [infos, setInfos] = useState({})

    const [address, setAddress] = useState(true)



    useEffect(() => {
        async function fetchData() {
            const allInfosUser = (await InfosUser())

            // console.log(getAddressFromZipCode(allInfosUser.cep));
            const address = (await getAddressFromZipCode(allInfosUser.cep))

            setInfos(
                {
                    userName: allInfosUser.userName,
                    personName: allInfosUser.personName,
                    firstName: allInfosUser.firstName,
                    lastName: allInfosUser.lastName,
                    cpf: allInfosUser.cpf,
                    rg: allInfosUser.rg,
                    celular: allInfosUser.cellphoneNumber,
                    telefone: allInfosUser.phoneNumber,
                    text: allInfosUser.biography,
                    cep: allInfosUser.cep,
                    addressId: allInfosUser.addressId,
                    rua: address.logradouro,
                    bairro: address.bairro,
                    estado: address.uf,
                    cidade: address.localidade,
                    complemento: allInfosUser.complement,
                    profilePhoto: allInfosUser.profilePhoto,
                    profileBannerPhoto: allInfosUser.profileBannerPhoto,
                    institution: allInfosUser.institution,
                    crmv: allInfosUser.crmv,
                    formationDate: allInfosUser.formationDate,
                    startActingDate: allInfosUser.startActingDate,
                    occupationArea: allInfosUser.occupationArea,
                    formation: allInfosUser.formation,
                    PetSpecieVeterinary: allInfosUser.PetSpecieVeterinary,
                    VeterinaryEspecialities: allInfosUser.VeterinaryEspecialities

                }
            )

        }
        fetchData()
    }, [])

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        //subtitle.style.color = '#f00';
    }

    const deletePetzinho = () => {
        deleteClient(localStorage.getItem('__user_JWT'))
        closeModal()
    }

    // console.log(infos.PetSpecieVeterinary);
    // console.log(infos.VeterinaryEspecialities);

    var largura = window.innerWidth

    if (largura <= 8) {
        return (
            <>
                <Config />
                <main>
                    <div>
                        <p className=' font-bold font-sans  h-10 text-2xl'>Configurações</p>
                        <div className='border-2 border-[#CAC4D0] rounded-full py-5 px-5 flex flex-row  mt-2'>
                            <div className='flex flex-row  gap-5'>
                                <img src={Person} alt="" />
                                Informações pessoais
                                <Link to="/profile/edit-profile">
                                    <img className='pl-16' src={Arrow} alt="" />
                                </Link>

                            </div>
                        </div>
                        <div className='border-2 border-[#CAC4D0] rounded-full py-5 px-5 flex flex-row  mt-2'>
                            <div className='flex flex-row  gap-5'>
                                <img src={Cadeado} alt="" />
                                Segurança
                                <Link to="/profile/editSecurity">
                                    <img className='pl-36' src={Arrow} alt="" />
                                </Link>

                            </div>
                        </div>
                        <div className='border-2 border-[#CAC4D0] rounded-full py-5 px-5 flex flex-row  mt-2'>
                            <div className='flex flex-row  gap-5'>
                                <img src={Local} alt="" />
                                Localização
                                <Link to="/profile/editAdress">
                                    <img className='pl-36' src={Arrow} alt="" />
                                </Link>

                            </div>
                        </div>
                    </div>
                    <div>
                        <p className=' font-bold font-sans  h-10 text-2xl pt-10'>Adicionais</p>
                        <div className='border-2 border-[#CAC4D0] rounded-full py-5 px-5 flex flex-row mt-10'>
                            <div className='flex flex-row  gap-5'>
                                <img src={Calendary} alt="" />
                                Consultas
                                <Link to="/profile/Consultas">
                                    <img className='pl-36' src={Arrow} alt="" />
                                </Link>
                            </div>
                        </div>
                        <div className='border-2 border-[#CAC4D0] rounded-full py-5 px-5 flex flex-row mt-2 '>
                            <div className='flex flex-row  gap-5'>
                                <img src={Work} alt="" />
                                Informações Profissionais
                                <Link to="/profile/editProfissionais">
                                    <img className='pl-10' src={Arrow} alt="" />
                                </Link>
                            </div>
                        </div>
                        <div className='border-2 border-[#B3261E] rounded-full py-5 px-5 flex flex-row  mt-10 text-[#B3261E] font-semibold'>
                            <div className='flex flex-row  gap-5'>
                                <img src={Logout} alt="" />
                                Sair
                            </div>
                        </div>
                    </div>
                </main>
            </>
        )

    } else {
        return (
            <>
                <Config userName={infos.userName} personName={infos.personName} profilePhoto={infos.profilePhoto} />
                <main className='flex flex-col gap-10'>
                    <Pessoais name={infos.firstName} lastName={infos.lastName} cpf={infos.cpf} rg={infos.rg} celular={infos.celular} telefone={infos.telefone} text={infos.text} className='' />
                    <Address id={infos.addressId} viaCep={getAddressFromZipCode} cep={infos.cep} bairro={infos.bairro} rua={infos.rua} estado={infos.estado} cidade={infos.cidade} complemento={infos.complemento} className='' />

                    {localStorage.getItem("__user_isVet") == 'true' ?
                        <>
                            <Prossionais area={infos.occupationArea} instituicao={infos.institution} dataFormacao={infos.formationDate} formacao={infos.formation} crmv={infos.crmv} dataInicioAtuacao={infos.startActingDate} className='' />
                            <div className='fixed right-0 bottom-10 w-64 h-16 bg-[#1C1B1F] flex sm:hidden rounded-xl'>
                                <button className='flex flex-row content-center justify-center items-center gap-3 text-[#A9A9A9] text-3xl h-16 rounded-xl w-64'>
                                    <img src={lapis} alt="" />
                                    Habilitar Edição
                                </button>
                            </div>
                            <div className='w-full sm:flex justify-end mr-5 pr-10 pb-10'>
                                <button className='flex flex-row content-center items-center gap-3 text-[#410E0B] bg-[#F9DEDC] text-3xl h-16 rounded-xl w-64' onClick={() => {
                                    deleteVeterinary(localStorage.getItem('__user_id'), localStorage.getItem('__user_JWT'))
                                    document.location.href = '/login'
                                }}>
                                    <img src={lixeira} className='h-full' />
                                    Excluir perfil
                                </button>
                            </div>
                        </>
                        :
                        <>
                            <Pets personImage={infos.profilePhoto} />
                            <div className='w-full sm:flex justify-end mr-5 pr-10 pb-10'>
                                <button className='flex flex-row content-center items-center gap-3 text-[#410E0B] bg-[#F9DEDC] text-3xl h-16 rounded-xl w-64' onClick={() => {
                                    openModal()
                                }}>
                                    <img src={lixeira} className='h-full' />
                                    Excluir perfil
                                </button>
                                <Modal
                                    isOpen={modalIsOpen}
                                    onAfterOpen={afterOpenModal}
                                    onRequestClose={closeModal}
                                    style={customStyles}
                                    contentLabel="Example Modal"
                                >
                                    <WarnRequest onClose={closeModal} description="Tem certeza que deseja excluir seu perfil?" onSave={deletePetzinho} href="/login" />
                                </Modal>
                            </div>
                        </>
                    }
                </main>
            </>
        );
    }

}