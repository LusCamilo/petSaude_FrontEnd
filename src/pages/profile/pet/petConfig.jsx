import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { PetHeader } from './petHeader';
import addMais from "../resource/img/AddMais.png"
import linha from "../../../assets/svg/linha.svg"
import '../../reset.css';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { styled } from '@stitches/react';
import certo from '../resource/img/Certo.jpg'
import lixeira from '../resource/img/Excluir.png'
import { PetAddSucess } from './cards/sucess';
import * as Dialog from '@radix-ui/react-dialog';
import { PetAddWarn } from './cards/warn';
import './css/pet.css';
import lapis from '../../../assets/svg/pencil.svg';
import { getPet } from '../../../services/integrations/pet';

const InfosUser = async () => {

    const response = await getPet(localStorage.getItem('__pet_id'))

    // {
    //     "id": 10,
    //     "name": "teste",
    //     "birthDate": "2023-04-14T00:00:00.000Z",
    //     "photo": "",
    //     "microship": false,
    //     "petSize": "MEDIUM",
    //     "petGender": "M",
    //     "petSpecieId": 5,
    //     "ownerId": 5,
    //     "petSpecie": {
    //         "id": 5,
    //         "name": "teste"
    //     }
    // }

    return {
        id: response.id,
        name: response.name,
        birthDate: response.birthDate,
        photo: response.photo,
        microship: response.microship,
        petSize: response.petSize,
        petGender: response.petGender,
        petSpecie: {
            idSpecie: response.petSpecie.id,
            nameSpecie: response.petSpecie.name
        }
    }
}


export const PetConfig = (props) => {


    const [infos, setInfos] = useState({})

    useEffect(() => {
        async function fetchData() {

            const allInfosPet = (await InfosUser())
            setInfos(
                {
                    id: allInfosPet.id,
                    name: allInfosPet.name,
                    birthDate: allInfosPet.birthDate,
                    photo: allInfosPet.photo,
                    microship: allInfosPet.microship,
                    petSize: allInfosPet.petSize,
                    petGender: allInfosPet.petGender,
                    petSpecieId: allInfosPet.petSpecieId,
                    ownerId: allInfosPet.ownerId,

                }
            )
        }
        fetchData()
    }, [])

    /*yarn add moment
    yarn add ms
    https://medium.com/geekculture/dynamically-set-the-max-min-date-at-input-field-with-react-e26cf98946d1 */

    const [petInfosDisable, petInfosDisableState] = useState({
        disable: true,
        class: ' text-slate-400'
    })

    const [name, setName] = useState()
    function newName(event) {
        setName(event.target.value);
    }
    const [sexo, setSexo] = useState()

    const [tamanho, setTamanho] = useState()

    const [specie, setSpecie] = useState()
    function newSpecie(event) {
        setSpecie(event.target.value);
    }

    const [dateBorn, setDateBorn] = useState()
    function newDateBorn(event) {
        setDateBorn(event.target.value);
    }

    const StyledContent = styled(DropdownMenu.Content, {
        minWidth: 130,
        backgroundColor: 'white',
        borderRadius: 6,
        padding: 5,
        boxShadow: '0px 5px 15px -5px hsla(206,22%,7%,.15)',
    });

    const StyledItem = styled(DropdownMenu.Item, {
        fontSize: 13,
        padding: '5px 10px',
        borderRadius: 3,
        cursor: 'default',

        '&:focus': {
            outline: 'none',
            backgroundColor: 'dodgerblue',
            color: 'white',
        },
    });

    const StyledArrow = styled(DropdownMenu.Arrow, {
        fill: 'white',
    });


    const [selectedFile, setSelectedFile] = useState();

    const handleFileInputChange = (event) => {
        console.log(event.target.files[0])
        const file = event.target.files[0]
        setSelectedFile(URL.createObjectURL(file));
    }

    return (
        <>
            <PetHeader namePerson="Teste" personImage="https://revistapesquisa.fapesp.br/wp-content/uploads/2009/03/SITE_Darwin-4-1140.jpg" />
            <main className='static w-full'>
                <div>
                    <div className='flex justify-start p-3 sm:p-10 flex-row items-center content-center align-middle h-30 sm:h-80'>
                        <div className="h-20 w-1/3 sm:h-48 sm:40 md:w-80 rounded-full ">
                            <input type="file" accept="image/*" name="photo" id="photoProfile" className="hidden" onChange={handleFileInputChange} />
                            <label htmlFor='photoProfile' style={{ backgroundImage: `url(${selectedFile})` }}
                                className='
                                flex justify-center items-center rounded-full bg-slate-200 w-full h-full bg-center bg-origin-content bg-no-repeat bg-cover cursor-pointer hover:bg-blend-darken '>
                                <img className src={addMais} />
                            </label>
                        </div>
                        <div className='flex flex-col w-2/3 sm:w-full p-3 sm:p-10'>
                            <label>
                                <input type="text" defaultValue={name} name="petName" className='bg-transparent border-none md:text-5xl font-medium ' />
                            </label>
                            <img src={linha} alt="" className='invisible sm:visible' />
                            <label>
                                <input type="text" defaultValue={specie} name="petSpecie" className='bg-transparent border-none text-3xl text-[#A9A9A9]' />
                            </label>
                        </div>
                    </div>
                </div>
                <div className='w-full h-full border-none sm:border-solid border-2 rounded-lg border-black flex flex-col gap-10 pl-3 sm:pl-20 py-8'>
                    <h2 className='font-bold text-5xl flex justify-center sm:justify-start sm:text-6xl font-sans'>Informações </h2>
                    <div className='flex flex-col sm:flex-row justify-between pr-20'>
                        <div className='flex flex-col gap-3 sm:gap-5 justify-start w-full sm:w-1/3 mb-2'>
                            <div>
                                <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                    Nome
                                    <input type="text" onChange={newName} disabled={petInfosDisable.disable} name="nameAnimal" placeholder='Nome' className={`bg-transparent placeholder:text-black placeholder:text-3xl border-none text-2xl ${petInfosDisable.class}`} defaultValue={name} id='petInfos' />
                                </label>
                            </div>
                            <div>
                                <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                    Sexo
                                    <DropdownMenu.Root className="w-full">
                                        <DropdownMenu.Trigger disabled={petInfosDisable.disable} className={`flex justify-start  text-2xl ${petInfosDisable.class}`} >{sexo}</DropdownMenu.Trigger>
                                        <StyledContent >
                                            <StyledItem onSelect={() => setSexo("Fêmea")}>Feminino</StyledItem>
                                            <StyledItem onSelect={() => setSexo("Macho")}>Masculino</StyledItem>
                                            <StyledItem onSelect={() => setSexo("Ginandromorfo")}>Ginandromorfo</StyledItem>
                                            <StyledArrow />
                                        </StyledContent>
                                    </DropdownMenu.Root>
                                </label>
                            </div>
                            <div>
                                <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                    Espécie
                                    <input type="text" disabled={petInfosDisable.disable} onChange={newSpecie} defaultValue={specie} name="especieAnimal" id="specisAnimal" placeholder='Espécie' className={`bg-transparent placeholder:text-black placeholder:text-3xl border-none text-2xl  ${petInfosDisable.class}`} />
                                </label>
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-col gap-3 mb-5 sm:gap-5 justify-start content-center w-full sm:w-1/3'>
                            <div className='w-full'>
                                <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                    Data de Nascimento
                                    <input type="date" disabled={petInfosDisable.disable} onChange={newDateBorn} name="dateBorn" defaultValue={dateBorn} className={`bg-transparent border-none text-2xl text-[#000] w-full ${petInfosDisable.class}`} />
                                </label>
                            </div>
                            <div>
                                <label className='flex flex-col text-xl text-[#A9A9A9] '>
                                    Tamanho
                                    <DropdownMenu.Root className="w-full">
                                        <DropdownMenu.Trigger disabled={petInfosDisable.disable} className={`flex justify-start  text-2xl  ${petInfosDisable.class}`}>{tamanho}</DropdownMenu.Trigger>
                                        <StyledContent>
                                            <StyledItem onSelect={() => setTamanho("Grande")}>Grande</StyledItem>
                                            <StyledItem onSelect={() => setTamanho("Médio")}>Médio</StyledItem>
                                            <StyledItem onSelect={() => setTamanho("Pequeno")}>Pequeno</StyledItem>
                                            <StyledArrow />
                                        </StyledContent>
                                    </DropdownMenu.Root>
                                </label>
                            </div>
                        </div>
                        <div className='w-full sm:w-1/3 flex justify-end content-center'>
                            <button className='w-full sm:w-52 h-12 flex flex-row justify-center items-center gap-4 bg-[#ECECEC] rounded-full drop-shadow-lg' onClick={() => {

                                if (document.getElementById('petInfos').disabled == true) {
                                    petInfosDisableState({
                                        disable: false,
                                        class: 'text-black'
                                    })
                                } else {
                                    petInfosDisableState({
                                        disable: true,
                                        class: 'opacity-50 bg-white'
                                    })
                                }
                            }}>
                                <img src={lapis} />
                                Editar
                            </button>
                        </div>
                    </div>
                </div>
                <div className='w-full flex justify-between mb-30'>
                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                            <button asChild>
                                <img src={lixeira} alt="" />
                            </button>
                        </Dialog.Trigger>
                        <Dialog.Portal >
                            <Dialog.Overlay className="DialogOverlay" />
                            <Dialog.Content className="DialogContent" class='cardPet'>
                                <PetAddWarn />
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                            <button asChild>
                                <img src={certo} alt="" />
                            </button>
                        </Dialog.Trigger>
                        <Dialog.Portal >
                            <Dialog.Overlay className="DialogOverlay" />
                            <Dialog.Content className="DialogContent" class='cardPet'>
                                <PetAddSucess what="Pet editado" />
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                </div>
            </main>
        </>
    );
}