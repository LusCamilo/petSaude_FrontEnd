import React from 'react'
import App from "../../assets/svg/App.svg"
import AppResponsive from "../../assets/svg/App Responsive.svg"
import Google from "../../assets/svg/GooglePlay.svg"
import Apple from "../../assets/svg/AppStore.svg"

export const AppPreview = () => {
    return (
        <>
            <div className="flex h-full flex-col w-full md:flex-row md:items-center break-words pt-10">
                <img src={App} alt="" className="hidden sm:flex w-60 md:w-3/4"/>
                <img src={AppResponsive} alt="" className="sm:hidden flex pl-20 sm:pl-0 w-80 md:w-3/4"/>
                <div className="flex h-full w-full justify-start  items-start  mx-1 flex-col gap-5 p-5">
                    <h2 className=" text-3xl sm:text-5xl font-semibold">Instale nosso app!</h2>
                    <div >
                            <p className="text-xl md:text-4xl text-justify break-words font-montserrat pt-5 sm:w-2/3">Para ter mais  facilidade na hora de fazer o agendamento 
                            das consultas, para entrar em contato com os especialistas 
                            a qualquer hora e em qualquer lugar.
                            </p>
                    </div>
                    <div className='flex pl-5 md:pl-56 gap-10 w-full pt-10'>
                        <img className='w-32 sm:w-56' src={Google}></img>
                        <img className='w-32 sm:w-56 border-black rounded-xl' src={Apple}></img>
                    </div>
                    
                </div>
            </div>
        </>
    );
}
 