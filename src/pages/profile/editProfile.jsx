import React from 'react';
import { useForm } from 'react-hook-form';
import { HeaderEditProfile } from './resource/headerEdit';
import { TopContainer } from './resource/editProfile/topContainer';
import { InfosProfile } from './resource/editProfile/infosProfile';
import profilePhoto from './resource/img/profilePhoto.png'
import userPhoto from './resource/img/userPhoto.png'
import check from './resource/img/saveProfile.png'





export const EditProfile = () => {

    return (
        <>
            <HeaderEditProfile completName="Hayley Willians" />
            <div className="flex flex-col gap-y-3 items-center justify-center h-full pt-[80px] px-[10%] ">
                <TopContainer/>
                <InfosProfile nome="hayleyVet" completName="Hayley Willians" email="hayley@gmail.com" password='12345678' photoUser={userPhoto} />
            </div>
            <button className='hidden md:flex self-end rounded-lg bg-[#9ED1B7] -mt-5 shadow-md mb-7' onClick={() => {
            }
            }>
                <img src={check} className='w-7 h-7 my-5 mx-5' />
            </button>
        </>
    );
}

