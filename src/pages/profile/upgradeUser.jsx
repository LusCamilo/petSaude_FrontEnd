import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
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
import lixeira from '../profile/resource/img/Delete.svg'
import lapis from '../profile/resource/img/LapisColorido.svg'
import { deleteUser, getUser } from '../../services/integrations/user';
import { useState } from 'react';

const InfosUser = async () => {

    const response = await getUser(localStorage.getItem('__user_id'), localStorage.getItem('__user_JWT'))

    let userJson
    
    return userJson = {
        id: response.id,
        personName: response.personName,
        userName: response.userName,
        cpf: response.cpf,
        rg: response.rg,
        profilePhoto: response.profilePhoto,
        profileBannerPhoto: response.profileBannerPhoto,
        email: response.email,
        password: response.password,
        phoneNumber: response.phoneNumber,
        cellphoneNumber: response.cellphoneNumber,
        addressId: response.addressId,
    }
    
}


export const UpgradeUser = (data) => {

    const [nome, setNome] = useState(null)
    const [email, setEmail] = useState(null)
  

    useEffect(() => {
        async function fetchData() {
            const userName = (await InfosUser()).personName
            setNome(userName)

            const userEmail = (await InfosUser()).email
            setEmail(userEmail)
        }
        fetchData()
    }, [])

    

    var largura = window.innerWidth
    window.addEventListener('resize', (e) => {
        console.log(e.target.innerWidth);
    })


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

                                <Link to="/profile/editPerson">
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
                    </div>
                    <div className='border-2 border-[#B3261E] rounded-full py-5 px-5 flex flex-row  mt-10 text-[#B3261E] font-semibold'>
                        <div className='flex flex-row  gap-5'>
                            <img src={Logout} alt="" />
                            Sair
                        </div>
                    </div>
                </main>
            </>
        )
    } else {

        if (localStorage.getItem("user") == "veterinario") {
            return (
                <>
                    <Config hayley="Hayley Williams " user="@HayleyVet" className='hidden' />
           
                    <main className='flex flex-col gap-10'>
                        <Pessoais name="Hayley" lastName="Williams" cpf="000.000.000-00" rg="000.000.000-00" celular="(88) 88888-8888 " telefone="(88) 88888-8888" text=" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                                blandit tincidunt urna sit amet ultricies. Nulla nec turpis ultrices,
                                consequat nunc ut, ultrices purus. Maecenas fermentum, metus sit amet
                                molestie faucibus, justo massa lobortis orci, eget posuere nibh lectus
                                nec elit. Nam blandit placerat semper. Nam vel ultricies mauris. Pellentesque
                                eu imperdiet turpis. Nam congue erat orci, vitae varius eros dictum nec. Suspendisse
                                pharetra nisl sit amet augue suscipit tincidunt. In egestas ex vitae ipsum aliquet
                                porttitor. Cras efficitur dolor est, quis auctor sapien accumsan sed. Morbi tristique vitae quam eu pretium." className='' />
                        <Address cep="06045-420" bairro="Novo Osasco" rua="Via Transversal Sul" estado="São Paulo" cidade="Osasco" complemento="42B" className='' />

                        <Prossionais area="Psiquiatria de Pets" instituicao="USP" dataFormacao="19/03/2005" formacao="Zootecnia" crmv="1234" dataInicioAtuacao="13/02/2006" className='' />
                        <div className='fixed right-0 bottom-10 w-64 h-16 bg-[#1C1B1F] flex sm:hidden rounded-xl'>
                            <button className='flex flex-row content-center justify-center items-center gap-3 text-[#A9A9A9] text-3xl h-16 rounded-xl w-64'>
                                <img src={lapis} alt="" />
                                Habilitar Edição
                            </button>
                        </div>
                        <div className='w-full sm:flex justify-end mr-5 pr-10 pb-10'>
                            <button className='flex flex-row content-center items-center gap-3 text-[#410E0B] bg-[#F9DEDC] text-3xl h-16 rounded-xl w-64' onClick={() => {
                                deleteUser(localStorage.getItem('__user_id'), localStorage.getItem('__user_JWT'))
                                window.location.href('/home')
                            }}>
                                <img src={lixeira} className='h-full' />
                                Excluir perfil
                            </button>
                        </div>
                    </main>
                </>
            );
        } else {
            return (
                <>
                    <div>
                    </div>
                    <Config nome={nome} email={email} />
                    <main className='flex flex-col gap-10'>
                        <Pessoais name="Hayley" lastName="Williams" cpf="000.000.000-00" rg="000.000.000-00" celular="(88) 88888-8888 " telefone="(88) 88888-8888" text=" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                                blandit tincidunt urna sit amet ultricies. Nulla nec turpis ultrices,
                                consequat nunc ut, ultrices purus. Maecenas fermentum, metus sit amet
                                molestie faucibus, justo massa lobortis orci, eget posuere nibh lectus
                                nec elit. Nam blandit placerat semper. Nam vel ultricies mauris. Pellentesque
                                eu imperdiet turpis. Nam congue erat orci, vitae varius eros dictum nec. Suspendisse
                                pharetra nisl sit amet augue suscipit tincidunt. In egestas ex vitae ipsum aliquet
                                porttitor. Cras efficitur dolor est, quis auctor sapien accumsan sed. Morbi tristique vitae quam eu pretium."/>
                        <Address cep="06045-420" bairro="Novo Osasco" rua="Via Transversal Sul" estado="São Paulo" cidade="Osasco" complemento="42B" />
                        <Pets personImage="http://s2.glbimg.com/wbweywCFLC0nCUeg67UbQZWhL7Eu36oRp_QAFsTkIqCqLLlE9GfCYsNrnTRPpEUO/i.glbimg.com/og/ig/f/original/2012/12/14/fabiana1.jpg" />
                        <div className='w-full flex justify-end pr-10 pb-10'>
                            <button className='flex flex-row content-center items-center gap-3 text-[#410E0B] bg-[#F9DEDC] text-3xl h-16 rounded-xl w-64' onClick={() => {

                                deleteUser(localStorage.getItem('__user_id'), localStorage.getItem('__user_JWT'))
                                document.location.href('/home')
                                // BrowserRouter.push('/home')
                            }}>
                                <img src={lixeira} alt="" className='h-full' />
                                Excluir perfil
                            </button>
                        </div>
                    </main>

                </>
            )
        }
    }

}