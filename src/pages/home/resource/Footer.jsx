import React from "react";
import linha from "../../../assets/svg/linha.svg"
import logo from "../../../assets/svg/iconDog.svg"
import { Link } from 'react-router-dom';
import Lupa from "../../../assets/svg/lupa.svg"
import Doctor from "../../../assets/svg/medico 1.svg";
import Local from "../../../assets/svg/localizacao.svg";
import "./Footer.css"

export const Footer = () => {
    return (
        <>
            <div className="bg-[#9ED1B7] flex flex-col pt-10 md:pt-28 md:mt-10 pb-10 md:pb-0">
                <div className=" flex justify-center items-center flex-row">
                    <div className="basis-1/3 md:basis-1/4 w-1/8 flex items-center justify-evenly flex-col">
                        <h4 className="flex flex-row font-bold text-xs md:text-2xl items-center"><img className="w-10 md:w-20" src={logo} alt="" /> PetSaude</h4>
                        <p className="break-words ml-5 w-24 md:w-56 font-montserrat text-xs md:text-base miniSize">Nossos serviços estão dispóniveis a qualquer hora e em qualque lugar!</p>
                    </div>
                    <div className="basis-1/3 md:basis-1/4 w-1/8 flex items-center flex-col content-evenly">
                        <h5 className="font-semibold text-xs md:text-2xl flex items-center justify-center"> Veja também : </h5>
                        <ul className="flex items-center justify-center flex-col gap-4 py-2 px-7 ">
                            <li className="w-full text-xs md:text-xl font-montserrat font-normal miniSize"><Link to="/home">Profissionais</Link></li>
                            <li className="w-full text-xs md:text-xl font-montserrat font-normal miniSize"><Link to="/home">Blog</Link></li>
                            <li className="w-full text-xs md:text-xl font-montserrat font-normal miniSize"><Link to="/home/aboutUs">Sobre nós</Link></li>
                        </ul>
                    </div>
                    <div className="basis-1/3 md:basis-1/4 flex items-center flex-col">
                        <h5 className="font-semibold text-xs md:text-2xl w-1/8 flex items-center justify-center">App disponível :</h5>
                        <ul className="flex items-center justify-center flex-col gap-4 py-2 px-7 ">
                            <li className="w-full text-xs md:text-xl font-montserrat font-normal miniSize"> Play Store</li>
                            <li className="w-full text-xs md:text-xl font-montserrat font-normal miniSize"> App Store</li>
                        </ul>
                    </div>
                    <div className="basis-1/4 hidden md:flex flex-col items-center">
                        <h5 className="flex text-xs md:text-2xl w-1/8 font-semibold font-montserrat items-center justify-center flex-row gap-4"><img src={Lupa} alt="Icone de uma lupa" className="w-7 y-7" /> Pesquise :</h5>
                        <ul className="flex items-center justify-center flex-col gap-4 py-2 px-7 pt-3.5">
                            <li className="flex text-xs md:text-lg font-montserrat gap-4 bg-[#78A890] px-4 rounded-full"><img src={Doctor} alt="Icone de um médico" className="w-7 y-7" /> Especialistas da área</li>
                            <li className="flex text-xs md:text-lg font-montserrat gap-4 bg-[#78A890] px-4 rounded-full"><img src={Local} alt="Icone de um pino" className="w-7 y-7" /> Veterinários próximos</li>
                        </ul>
                    </div>
                </div>
                <div className=" justify-center mt-20 mb-5 flex-col hidden md:flex">
                    <img src={linha} alt="" className="flex mx-28"/>
                    <p className="flex justify-center">©Copyright 2023 - NovaDev</p>
                </div>
            </div>
        </>
    )
};