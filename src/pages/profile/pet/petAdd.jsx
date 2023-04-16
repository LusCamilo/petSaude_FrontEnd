import React, { useState } from 'react';
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


export const PetAdd = (props) => {

    const [name, setName] = useState("Nome")
    function newName(event) {
        setName(event.target.value);
    }

    const [sexo, setSexo] = useState(["Sexo", 3])

    const [bornDate, setBornDate] = useState("DataDeNascimento")
    function newBornDate(event) {
        setBornDate(event.target.value);
    }

    const [tamanho, setTamanho] = useState(["Tamanho", 1])

    const [specie, setSpecie] = useState("Especie")
    function newSpecie(event) {
        setSpecie(event.target.value);
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

    const submitPet = async data => {
        const petInfos = {
            name: name,
            birthDate: bornDate,
            photo: selectedFile,
            microship: false,
            size: tamanho[1],
            gender: sexo[1],
            specie: specie,
            ownerID: 1
        }

        console.log(petInfos)

        const addPet = await petAdd(petInfos)
        console.log(addPet)
    }

    const handleFileInputChange = (event) => {
        console.log(event.target.files[0])
        const file = event.target.files[0]
        setSelectedFile(URL.createObjectURL(file));
    }

    const [selectedFile, setSelectedFile] = useState(String);

 
    return (
        <>
            <PetHeader namePerson="Teste" personImage="https://revistapesquisa.fapesp.br/wp-content/uploads/2009/03/SITE_Darwin-4-1140.jpg"/>
            <main className='static'>
            <div>
                <div className='flex justify-start p-3 sm:p-10 flex-row items-center content-center align-middle h-30 sm:h-80'>
                    <div className="h-20 w-1/3 sm:h-48 sm:40 md:w-80 rounded-full ">
                        <input type="file" accept="image/*" name="photo" id="photoProfile" className="hidden" onChange={handleFileInputChange}/>
                        <label htmlFor='photoProfile' style={{backgroundImage: `url(${selectedFile})`}}
                            className='
                            flex justify-center items-center rounded-full bg-slate-200 w-full h-full bg-center bg-origin-content bg-no-repeat bg-cover cursor-pointer hover:bg-blend-darken '>
                            <img className="rounded-full" src={addMais}  />
                        </label>
                    </div>
                    <div className='flex flex-col w-2/3 sm:w-full p-3 sm:p-10'>
                        <label>
                            <input type="text" value={name} name="petName" className='bg-transparent border-none md:text-5xl font-medium '/>
                        </label>
                            <img src={linha} alt="" className='invisible sm:visible'/>
                        <label>
                            <input type="text" value={specie}  name="petSpecie" className='bg-transparent border-none text-3xl text-[#A9A9A9]'/>
                        </label>
                    </div>
                </div>
            </div>
                <div className='w-full h-full border-none sm:border-solid border-2 rounded-lg border-black flex flex-col gap-10 pl-3 sm:pl-20 py-8'>
                    <h2 className='font-bold text-5xl flex justify-center sm:justify-start sm:text-6xl font-sans'>Endereço</h2>
                    <div className='flex flex-col sm:flex-row justify-between pr-20'>
                        <div className='flex flex-col gap-3 sm:gap-5 justify-start w-full sm:w-1/3 mb-2'>
                            <div>
                                <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                    Nome
                                    <input type="text" onBlurCapture={newName}  name="nameAnimal" id="nameAnimal" placeholder='Nome' className='bg-transparent placeholder:text-black placeholder:text-3xl border-none text-2xl text-[#000]' />
                                </label>
                            </div>
                            <div>
                                <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                    Sexo
                                    <DropdownMenu.Root className="w-full">
                                        <DropdownMenu.Trigger className='flex justify-start text-black text-3xl'>{sexo[0]}</DropdownMenu.Trigger>
                                        <StyledContent>
                                            <StyledItem onSelect={() => setSexo(["Fêmea",  1])}>Feminino</StyledItem>
                                            <StyledItem onSelect={() => setSexo(["Macho", 2])}>Masculino</StyledItem>
                                            <StyledItem onSelect={() => setSexo([ "Ginandromorfo", 3])}>Ginandromorfo</StyledItem>
                                        <StyledArrow />
                                        </StyledContent>
                                    </DropdownMenu.Root>
                                </label>
                            </div>
                            <div>
                                <label className='flex flex-col text-xl text-[#A9A9A9]'>
                                    Espécie
                                    <input type="text" onBlurCapture={newSpecie} name="especieAnimal" id="specisAnimal" placeholder='Espécie' className='bg-transparent placeholder:text-black placeholder:text-3xl border-none text-2xl text-[#000]' />
                                </label>
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-col gap-3 mb-5 sm:gap-5 justify-start content-center w-full sm:w-1/3'>
                            <div className='w-full'>
                                <label className='flex flex-col text-xl text-[#A9A9A9] sm:1/4'>
                                    Data de Nascimento
                                    <input type="date" onBlurCapture={newBornDate}  name="firstName" className='w-full border-none text-3xl text-[#000] ' />
                                </label>
                            </div>
                            <div>
                                <label className='flex flex-col text-xl text-[#A9A9A9] sm:w-1/4'>
                                    Tamanho
                                    <DropdownMenu.Root className="w-full">
                                        <DropdownMenu.Trigger className='flex justify-start text-black text-3xl'>{tamanho[0]}</DropdownMenu.Trigger>
                                        <StyledContent>
                                            <StyledItem onSelect={() => setTamanho(["Grande",  2])}>Grande</StyledItem>
                                            <StyledItem onSelect={() => setTamanho(["Médio",  1])}>Médio</StyledItem>
                                            <StyledItem onSelect={() => setTamanho([ "Pequeno", 3])}>Pequeno</StyledItem>
                                        <StyledArrow />
                                        </StyledContent>
                                    </DropdownMenu.Root>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full flex justify-end mb-30'>
                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                        <button asChild onClick={submitPet}>
                            <img src={certo} alt=""/>
                        </button>
                        </Dialog.Trigger>
                        <Dialog.Portal >
                        <Dialog.Overlay className="DialogOverlay"/>
                        <Dialog.Content className="DialogContent" class='cardPet'>
                            <PetAddSucess class='cardPet' what='Novo pet adicionado'/>
                        </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                </div>
            </main> 
            
        </>
    );
}