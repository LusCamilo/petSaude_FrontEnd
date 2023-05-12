import React from "react";
import linha from "../../../assets/svg/linha.svg"
import logo from "../../../assets/svg/deco.svg"
import { Link } from 'react-router-dom';
import Lupa from "../../../assets/svg/lupa.svg"
import Doctor from "../../../assets/svg/medico 1.svg";
import Local from "../../../assets/svg/localizacao.svg";
import "./Footer.css"

export const Footer = () => {
    return (
        <>
            <div className="bg-[#9ED1B7] flex flex-col pt-10 md:pt-28 mt-1 pb-10 md:pb-0">
                <div className="flex w-full justify-evenly md:justify-center items-center flex-row">
                    <div className="basis-1/3 md:basis-1/4 w-1/8 flex items-center justify-evenly flex-col">
                        <h4 className="flex flex-row justify-between font-bold text-lg md:text-2xl items-center"><img className="w-10 md:w-20" src={logo} alt="" /> PetSaúde</h4>
                        <p className="flex w-full ml-5 items-center break-words md:w-56 font-montserrat text-sm md:text-xl miniSize">Nossos serviços estão dispóniveis a qualquer hora e em qualque lugar!</p>
                    </div>

                    <div className="basis-1/3 md:basis-1/4 w-1/8 flex items-center flex-col content-evenly">
                        <h5 className="font-semibold text-lg md:text-2xl flex items-center justify-center"> Veja também : </h5>
                        <ul className="flex w-fit items-start justify-start flex-col gap-2">
                            <li className="w-full text-sm md:text-xl font-montserrat font-normal miniSize">
                                <Link to="/home/searchProfessionals" className=" duration-500 flex flex-col-reverse relative transition-all">Profissionais</Link>
                            </li>
                            <li className="w-full md:text-xl font-montserrat font-normal text-sm miniSize">
                                <Link to="/home">Blog</Link>
                            </li>
                            <li className="w-full md:text-xl font-montserrat font-normal text-sm miniSize">
                                <Link to="/home/aboutUs" className=" duration-500 flex flex-col-reverse relative transition-all">Sobre nós</Link>
                            </li>
                        </ul>
                    </div>
                    {/* <div className="basis-1/3 md:basis-1/4 flex items-center flex-col">
                        <h5 className="font-semibold text-xs md:text-2xl w-1/8 flex items-center justify-center">App disponível :</h5>
                        <ul className="flex items-center justify-center flex-col gap-4 py-2 px-7 ">
                            <li className="w-full text-xs md:text-xl font-montserrat font-normal miniSize"> Play Store</li>
                            <li className="w-full text-xs md:text-xl font-montserrat font-normal miniSize"> App Store</li>
                        </ul>
                    </div> */}
                    <div className="basis-1/4 hidden md:flex flex-col items-center">
                        <h5 className="flex text-xs md:text-2xl w-1/8 font-semibold font-montserrat items-center justify-center flex-row gap-4"><img src={Lupa} alt="Icone de uma lupa" className="w-7 y-7" /> Pesquise :</h5>
                        <ul className="flex items-center justify-center flex-col gap-4 py-2 px-7 pt-3.5">
                            <li className="flex text-xs md:text-lg font-montserrat gap-4 bg-[#78A890] px-4 rounded-full xl:h-14 xl:w-72 xl:items-center"><img className="w-10" src={Doctor} alt="Icone de um médico" />
                                <Link className=" duration-500 flex flex-col-reverse relative transition-all
                                hover:after:w-full" to="/home/searchProfessionals"> Especialistas da área
                                </Link> 
                            </li>
                            <li className="flex text-xs md:text-lg font-montserrat gap-4 bg-[#78A890] px-4 rounded-full xl:h-14 xl:w-72 xl:items-center"><img className="w-10" src={Local} alt="Icone de um pino"  />
                                <Link className=" duration-500 flex flex-col-reverse relative transition-all
                                hover:after:w-full" to="/home/searchProfessionals"> Veterinários próximos
                                </Link> 
                            </li>
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