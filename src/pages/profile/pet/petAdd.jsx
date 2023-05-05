import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Link } from "react-router-dom";
import { PetHeader } from './petHeader';
import "../css/UpgradeUser.css"
import addMais from "../resource/img/AddMais.png"
import linha from "../../../assets/svg/linha.svg"
import * as Popover from '@radix-ui/react-popover';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { styled } from '@stitches/react';
import certo from '../resource/img/Certo.jpg'
import { PetAddSucess } from './cards/sucess';
import * as Dialog from '@radix-ui/react-dialog';
import { petAdd } from "../../../services/integrations/pet.js";
import './css/pet.css'
import Modal from 'react-modal'
import { Appointment } from '../resource/appointment/appointment';

const firebaseConfig = {
    apiKey: "AIzaSyDidn9lOpRvO7YAkVjuRHvI88uLRPnpjak",
    authDomain: "petsaude-6ba51.firebaseapp.com",
    projectId: "petsaude-6ba51",
    storageBucket: "petsaude-6ba51.appspot.com",
    messagingSenderId: "965774218063",
    appId: "1:965774218063:web:51d112960710c8481ceb3a"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: '4px solid transparent',
        borderRadius: '10px',
        backgroundColor: '#E3EFF0',
        width: '510px',
        height: '360px',
        padding: '0',
        display: "flex",
        justifyContent: "center"
    },
    overlay : {
        backgroundColor: '#0000'
    }
 };



export const PetAdd = (props) => {

    const [name, setName] = useState("Nome")
    function newName(event) {
        setName(event.target.value);
    }

    const [bornDate, setBornDate] = useState("DataDeNascimento")
    function newBornDate(event) {
        setBornDate(event.target.value);
    }

    const [specie, setSpecie] = useState("Especie")
    function newSpecie(event) {
        setSpecie(event.target.value);
    }

    const [tamanho, setTamanho] = useState(["Pequeno", "SMALL"])
    const [sexo, setSexo] = useState(["Macho", "M"])


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

    const submitPet = async () => {

        let date = bornDate.split("-").reverse().join("-")


        const petInfos = {
            name: name,
            birthDate: date,
            photo: selectedFile,
            microship: false,
            size: tamanho[1],
            gender: sexo[1],
            specie: specie,
        }

        petAdd(petInfos, localStorage.getItem("__user_id"), localStorage.getItem("__user_JWT"))

        setTimeout(function() {
            document.location.href = "/profile/upgradeUser";
        }, 5000); 
    }

    const handleFileInputChange = (event) => {
        const file = event.target.files[0]
        const storageRef = ref(storage, `Pet/${file.name}`);
        uploadBytes(storageRef, file).then(() => {
            console.log('Arquivo enviado com sucesso!');
            return getDownloadURL(storageRef)
        }).then((url) => {
            setSelectedFile(url);
        });
    }

    const [selectedFile, setSelectedFile] = useState();

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
        submitPet()
    }

    function closeModal() {
        setIsOpen(false);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        //subtitle.style.color = '#f00';
    }

    function cancelClose() {
        closeModal();
    }

    return (
        <>
            <PetHeader namePerson="Teste" personImage="https://revistapesquisa.fapesp.br/wp-content/uploads/2009/03/SITE_Darwin-4-1140.jpg" />
            <main className='static'>
                <div>
                    <div className='flex justify-start p-3 sm:p-10 flex-row items-center content-center align-middle h-30 sm:h-80'>
                        <div className="w-56 sm:h-48 sm:40 md:w-82 rounded-full ">
                            <input type="file" accept="image/*" name="photo" id="photoProfile" className="hidden" onChange={handleFileInputChange} />
                            <label htmlFor='photoProfile' style={{ backgroundImage: `url(${selectedFile})` }}
                                className='flex justify-center items-center rounded-full bg-slate-200 w-full h-full bg-center bg-origin-content bg-no-repeat bg-cover cursor-pointer hover:bg-blend-darken '>
                                <img className="rounded-full" src={addMais} />
                            </label>
                        </div>
                        <div className='flex flex-col w-2/3 sm:w-full p-3 sm:p-10'>
                            <h2 className='bg-transparent border-none md:text-5xl font-medium'>{name}</h2>
                            <h2 className='bg-transparent border-none text-3xl text-[#A9A9A9]'>{specie}</h2>
                        </div>
                    </div>
                </div>
                <div className='w-full h-full border-none sm:border-solid border-2 rounded-lg border-black flex flex-col gap-10 pl-3 sm:pl-20 py-8'>
                    <h2 className='font-bold text-5xl flex justify-center sm:justify-start sm:text-6xl font-sans'>Informações</h2>
                    <div className='flex flex-col sm:flex-row justify-between pr-20'>
                        <div className='flex flex-col gap-3 sm:gap-5 justify-start w-full sm:w-1/3 mb-2'>
                            <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                Nome
                                <input type="text" onBlurCapture={newName} name="nameAnimal" id="nameAnimal" placeholder='Nome' className='bg-transparent placeholder:text-black  placeholder:text-3xl border-none text-3xl text-[#000]' />
                            </label>
                            <div>
                                <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                    Sexo
                                    <DropdownMenu.Root className="w-full">
                                        <DropdownMenu.Trigger className='flex justify-start text-black text-3xl'>{sexo[0]}</DropdownMenu.Trigger>
                                        <StyledContent>
                                            <StyledItem onSelect={() => setSexo(["Fêmea", "F"])}>Feminino</StyledItem>
                                            <StyledItem onSelect={() => setSexo(["Macho", "M"])}>Masculino</StyledItem>
                                            <StyledArrow />
                                        </StyledContent>
                                    </DropdownMenu.Root>
                                </label>
                            </div>
                            <div>
                                <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                    Espécie
                                    <input type="text" onBlurCapture={newSpecie} name="especieAnimal" id="specisAnimal" placeholder='Espécie' className='bg-transparent placeholder:text-black placeholder:text-3xl border-none text-3xl text-[#000]' />
                                </label>
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-col gap-3 mb-5 sm:gap-5 justify-start content-center w-full sm:w-1/3'>
                            <div className='w-full'>
                                <label className='flex flex-col text-xl text-[#A9A9A9] sm:1/4'>
                                    Data de Nascimento
                                    <input type="date" onBlurCapture={newBornDate} name="firstName" className='w-full border-none text-3xl text-[#000] ' />
                                </label>
                            </div>
                            <div>
                                <label className='flex flex-col text-xl text-[#A9A9A9] sm:w-1/4'>
                                    Tamanho
                                    <DropdownMenu.Root className="w-full">
                                        <DropdownMenu.Trigger className='flex justify-start text-black text-3xl'>{tamanho[0]}</DropdownMenu.Trigger>
                                        <StyledContent>
                                            <StyledItem onSelect={() => setTamanho(["Grande", "BIG"])}>Grande</StyledItem>
                                            <StyledItem onSelect={() => setTamanho(["Médio", "MEDIUM"])}>Médio</StyledItem>
                                            <StyledItem onSelect={() => setTamanho(["Pequeno", "SMALL"])}>Pequeno</StyledItem>
                                            <StyledArrow />
                                        </StyledContent>
                                    </DropdownMenu.Root>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full flex justify-end mb-30'>
                <button asChild onClick={openModal}>
                    <img src={certo} alt="" />
                </button>
                {/*  submitPet*/}
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <PetAddSucess className='cardPet' title="Sucesso" what='Novo pet adicionado' onCancel={cancelClose} />
                </Modal>
                </div>
            </main>

        </>
    );
}