import React from 'react';
import { Link } from "react-router-dom";
import Hayley from '../../../assets/svg/Hayley.svg';
import Home from '../../../assets/svg/Home.svg';
import Work from '../../../assets/svg/Work.svg';
import Blog from '../../../assets/svg/Blog.svg';
import Info from '../../../assets/svg/InfoOutline.svg';
import Calendary from '../../../assets/svg/Calendar today.svg';
import Person from '../../../assets/svg/Person.svg';
import Lock from '../../../assets/svg/Lock.svg';
import { HomeWeb } from '../../home/Home-Web';

export const PetHeader = (props) => {

    

    return (
        <>
            <header>
                <div className="flex font-normal items-center justify-between bg-white shadowxl:p-10 h-30 text-4xl md:p-5">
                    <div className='flex'>
                        <button className=" py-3 px-4 mx-2 rounded focus:outline-none group">
                            <div className="w-4 h-1 bg-[#000] mb-1 md:w-10 md:h-1.5"></div>
                            <div className="w-4 h-1 bg-[#000] mb-1 md:w-10 md:h-1.5"></div>
                            <div className="w-4 h-1 bg-[#000] mb-1 md:w-10 md:h-1.5"></div>
                            <div className="absolute top-0 -left-full opacity-0 h-full w-96 bg-[#ECECEC] border transform group-focus:left-0 group-focus:opacity-100 transition-all duration-300">
                                <h2 className="pt-10 pl-5 text-left  text-2xl font-semibold md:font-5xl">Menu</h2>
                                <ul className="flex flex-col items-center w-full text-base cursor-pointer pt-5 space-y-3">
                                    <Link  to="/home" className="flex items-center hover:bg-[#9ED1B7]  py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">
                                        <img src={Home} className="pr-3  w-14"></img>
                                         Home
                                       
                                    </Link>
                                    <Link to="/home/searchProfessionals" className="flex items-center hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">
                                        <img src={Work} className="pr-3  w-14"></img>
                                         Profissionais
                                        
                                    </Link>
                                    <Link className="flex items-center hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">
                                        <img src={Blog} className="pr-3 w-14"></img>
                                        Blog
                                    </Link>
                                    <Link to="/home/aboutUs" className="flex items-center hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">
                                        <img src={Info} className="pr-3 w-14"></img>
                                         Sobre nós
                                        
                                    </Link>
                                    <Link to="/profile/appointmentView" className="flex items-center hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">
                                        <img src={Calendary} className="pr-3  w-14"></img>
                                         Consultas
                                        
                                    </Link>
                                </ul>
                                <h3 className="pt-5 pl-5 text-left  text-2xl font-semibold">Configurações</h3>
                                <ul className="flex flex-col items-center w-full text-base cursor-pointer pt-5 space-y-3">
                                    <Link to="/profile/infosPerson" className="flex items-center hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">
                                        <img src={Person} className="pr-3 w-14"></img>
                                             Perfil
                                            
                                    </Link>
                                    {/*<li className="flex items-center hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9]  h-30 w-5/6 text-left rounded-full ">
                                        <img src={Lock} className="pr-3 w-14"></img>
                                            Segurança
                                    </Link>*/}
                                </ul>
                            </div>
                        </button>
                    <h1 className=" md:pt-1 text-1xl sm:flex justify-start font-bold">PetSaúde</h1>
                    </div>
                    <div className=" md:flex flex-row gap-2" >
                    <img className="w-20 h-20 rounded-full md:h-10 md:w-10" src={props.personImage} />
                        <Link to="../login" className=" hidden md:flex home-btn text-2xl mr-3 text-black">
                            {props.namePerson}
                        </Link>
                    </div>
                </div>
            </header>
            

        </>
    );
}