import React from "react";
import { Link } from "react-router-dom";
import Photo from '../../../assets/svg/userAnonimo.svg';
import Home from '../../../assets/svg/Home.svg';
import Work from '../../../assets/svg/Work.svg';
import Blog from '../../../assets/svg/Blog.svg';
import Info from '../../../assets/svg/InfoOutline.svg';
import Calendary from '../../../assets/svg/Calendar today.svg';
import Person from '../../../assets/svg/Person.svg';
import Lock from '../../../assets/svg/Lock.svg';



export const HeaderWeb = () => {


  return (
    <div className="flex font-normal items-center justify-around bg-white shadow
    xl:p-5 h-30 text-4xl ">
      <button className=" md:hidden py-3 px-4 mx-2 rounded focus:outline-none group">
            <div className="w-5 h-1 bg-gray-600 mb-1"></div>
            <div className="w-5 h-1 bg-gray-600 mb-1"></div>
            <div className="w-5 h-1 bg-gray-600 mb-1"></div>
          <div className="absolute top-0 -left-full opacity-0 h-screen w-8/12 bg-[#ECECEC] border transform 
            group-focus:left-0 group-focus:opacity-100 transition-all duration-300">
            <h2 className="pt-10 pl-5 text-left  text-2xl font-semibold">Menu</h2>
                <ul className="flex flex-col items-center w-full text-base cursor-pointer pt-5 space-y-3">
                <li className="flex hover:bg-[#9ED1B7]  py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">
                  <img src={Home} className="pr-3"></img>
                  <Link to="/home/Home-Web"  href="#" className=" duration-500 flex flex-col-reverse relative transition-all
                    after:h-0.5 after:absolute after:w-0 after:bg-green-300 after:transition
                    hover:after:w-full"> Home
                  </Link>
                </li>
                 
                  <li className="flex hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">
                  <img src={Work} className="pr-3"></img>
                  <Link className=" duration-500 flex flex-col-reverse relative transition-all
                    after:h-0.5 after:absolute after:w-0 after:bg-green-300 after:transition
                    hover:after:w-full" to="/home/searchProfessionals"> Profissionais
                  </Link>
                </li>
                <li className="flex hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">
                <img src={Blog} className="pr-3"></img>
                  Blog
                </li>
                <li className="flex hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">
                <img src={Info} className="pr-3"></img>
                <Link to="/home/aboutUs" className="duration-500 flex flex-col-reverse relative transition-all
                      after:h-0.5 after:absolute after:w-0 after:bg-green-300 after:transition
                      hover:after:w-full">Sobre nós
                    </Link>
                </li>
                <li className="flex hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">
                <img src={Calendary} className="pr-3"></img>
                  Consultas
                </li>
              </ul>
            <h3 className="pt-5 pl-5 text-left  text-2xl font-semibold">Configurações</h3>
            <ul className="flex flex-col items-center w-full text-base cursor-pointer pt-5 space-y-3">
              <li className="flex hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">
              <img src={Person} className="pr-3"></img>
                Perfil
              </li>
              <li className="flex hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">
              <img src={Lock} className="pr-3"></img>
                Segurança
              </li>
            </ul>
          </div>
          </button>
       <h1 className=" text-1xl sm:flex justify-start font-bold">PetSaúde</h1>
       <div className="flex justify-between items-center">
          <nav>
          <ul className="md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-1000 ">
                  <li className="mx-4 my-6 md:my-0 transition">
                    <Link to="/home/Home-Web"  href="#" className="text-2xl duration-500 flex flex-col-reverse relative transition-all
                    after:h-0.5 after:absolute after:w-0 after:bg-green-300 after:transition
                    hover:after:w-full">Home
                    </Link>
                  </li>
                  <li className="mx-4 my-6 md:my-0">
                    <Link className="text-2xl duration-500 flex flex-col-reverse relative transition-all
                    after:h-0.5 after:absolute after:w-0 after:bg-green-300 after:transition
                    hover:after:w-full" to="/home/searchProfessionals">Prossionais 
                    </Link>
                  </li>
                  <li className="mx-4 my-6 md:my-0">
                    <Link>
                      <a href="#" className="text-2xl duration-500 flex flex-col-reverse relative transition-all
                      after:h-0.5 after:absolute after:w-0 after:bg-green-300 after:transition
                      hover:after:w-full">Blog</a>
                    </Link>
                  </li>
                  <li className="mx-4 my-6 md:my-0">
                    <Link to="/home/aboutUs" className="text-2xl duration-500 flex flex-col-reverse relative transition-all
                      after:h-0.5 after:absolute after:w-0 after:bg-green-300 after:transition
                      hover:after:w-full">Sobre nós
                    </Link>
                  </li>
              </ul>
            </nav>
      </div>
            
       <div className=" w-10 md:flex flex-direction " >
       <img className="pt-10 pr-1 md:pt-1 " src={Photo} />
        <Link to="../login" className=" invisible xl:visible home-btn p-1 ">
            Entrar
        </Link>
        </div>
    
    </div>
  );
};

