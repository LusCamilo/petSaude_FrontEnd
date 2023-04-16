import React from 'react';
import { useForm } from 'react-hook-form';
import { HeaderEditProfile } from './resource/headerEdit';
import { TopContainer } from './resource/editProfile/topContainer';
import { InfosProfile } from './resource/editProfile/infosProfile';
import profilePhoto from './resource/img/profilePhoto.png'
import userPhoto from './resource/img/userPhoto.png'
import check from './resource/img/saveProfile.png'
import * as Dialog from '@radix-ui/react-dialog';
import certo from './resource/img/Certo.jpg';
import { PetAddSucess } from '../profile/pet/cards/sucess';
import { submitPet, useState } from 'react';





export const EditProfile = () => {
    const [name, setName] = useState("Nome")
    function newName(event) {
        setName(event.target.value);
    }

    return (
        <>
            <HeaderEditProfile completName="Hayley Willians" />
            <div className="flex flex-col gap-y-3 items-center justify-center h-full pt-[80px] px-[10%] ">
                <TopContainer/>
                <InfosProfile nome="hayleyVet" completName="Hayley Willians" email="hayley@gmail.com" password='12345678' photoUser={userPhoto} />
            </div>
            
            <button className=' hidden md:flex self-end rounded-lg bg-[#9ED1B7] mt-5 shadow-md mb-7' onClick={() => {
                // <div className='w-full flex justify-end mb-30'>
                //     <Dialog.Root>
                //     <Dialog.Trigger asChild>
                //     <button asChild onClick={submitPet}>
                //         <img src={certo} alt=""/>
                //     </button>
                //     </Dialog.Trigger>
                //     <Dialog.Portal >
                //     <Dialog.Overlay className="DialogOverlay"/>
                //     <Dialog.Content className="DialogContent" class='cardPet'>
                //         <PetAddSucess class='cardPet' what='Novo pet adicionado'/>
                //     </Dialog.Content>
                //     </Dialog.Portal>
                //     </Dialog.Root>
                // </div>
            }
            }>
                <img src={check} className='w-7 h-7 my-5 mx-5' />
            </button>
        </>
    );
}
