import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Hayley from '../../../assets/svg/Hayley.svg';
import Home from '../../../assets/svg/Home.svg';
import Work from '../../../assets/svg/Work.svg';
import Blog from '../../../assets/svg/Blog.svg';
import Info from '../../../assets/svg/InfoOutline.svg';
import Calendary from '../../../assets/svg/Calendar today.svg';
import Person from '../../../assets/svg/Person.svg';
import Lock from '../../../assets/svg/Lock.svg';


export const HeaderEditProfile = (props) => {

  return (
    <>
      <div className="flex font-normal items-center justify-between bg-white md:px-10 pt-1 h-30 text-4xl">
        <div className='flex'>
          <button className=" py-3 px-4 mx-2 rounded focus:outline-none group">
            <div className="w-5 h-1 bg-[#000] mb-1 md:w-10 md:h-1.5"></div>
            <div className="w-5 h-1 bg-[#000] mb-1 md:w-10 md:h-1.5"></div>
            <div className="w-5 h-1 bg-[#000] mb-1 md:w-10 md:h-1.5"></div>
            <div className="absolute top-0 -left-full opacity-0 h-full w-96 bg-[#ECECEC] border transform 
                  group-focus:left-0 group-focus:opacity-100 transition-all duration-300">
              <h2 className="pt-10 pl-5 text-left  text-2xl font-semibold md:font-5xl">Menu</h2>
              <ul className="flex flex-col items-center w-full text-base cursor-pointer pt-5 space-y-3">
                <li className="flex hover:bg-[#9ED1B7]  py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">
                  <img src={Home} className="pr-3  w-14"></img>
                  Home
                </li>
                <li className="flex hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">
                  <img src={Work} className="pr-3  w-14"></img>
                  Profissionais
                </li>
                <li className="flex hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">
                  <img src={Blog} className="pr-3 w-14"></img>
                  Blog
                </li>
                <li className="flex hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">
                  <img src={Info} className="pr-3 w-14"></img>
                  Sobre nós
                </li>
                <li className="flex hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">
                  <img src={Calendary} className="pr-3  w-14"></img>
                  Consultas
                </li>
              </ul>
              <h3 className="pt-5 pl-5 text-left  text-2xl font-semibold">Configurações</h3>
              <ul className="flex flex-col items-center w-full text-base cursor-pointer pt-5 space-y-3">
                <li className="flex hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">
                  <img src={Person} className="pr-3 w-14"></img>
                  Perfil
                </li>
                <li className="flex hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9]  h-30 w-5/6 text-left rounded-full ">
                  <img src={Lock} className="pr-3 w-14"></img>
                  Segurança
                </li>
              </ul>
            </div>
          </button>
          <h1 className=" text-1xl sm:flex md:justify-start pl-5 md:pl-1 md:pt-2 font-bold">PetSaúde</h1>
        </div>
        <div className="flex md:flex items-center gap-x-3" >
          <img className="h-2/3 w-2/3 pt-2 md:pl-2 md:pt-5 md:w-14" src={Hayley} />
          <Link to="../login" className="self-center invisible xl:visible home-btn text-2xl">
            {props.name}
          </Link>
        </div>
      </div>
    </>
  );
}

