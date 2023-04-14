import React from "react";
import {Link} from "react-router-dom";
import Photo from '../../../assets/svg/userAnonimo.svg';
import FootHeader from "../../../assets/svg/FootHeader.svg";
import Home from '../../../assets/svg/Home.svg';
import Work from '../../../assets/svg/Work.svg';
import Blog from '../../../assets/svg/Blog.svg';
import Info from '../../../assets/svg/InfoOutline.svg';
import Calendary from '../../../assets/svg/Calendar today.svg';
import Person from '../../../assets/svg/Person.svg';
import Lock from '../../../assets/svg/Lock.svg';


export const HeaderInfo = (props) => {
    return (
        <>
            <div className=" bg-[#9ED1B7] w-full h-full ">
                <div className="flex font-normal items-center justify-around xl:p-5 h-30 text-4xl ">
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
                  Home
                </li>
                <li className="flex hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">
                <img src={Work} className="pr-3"></img>
                  Profissionais
                </li>
                <li className="flex hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">
                <img src={Blog} className="pr-3"></img>
                  Blog
                </li>
                <li className="flex hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">
                <img src={Info} className="pr-3"></img>
                  Sobre nós
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
                    <nav>
                        <div class="flex justify-between items-center ">
                            <span class="text-3xl cursor-pointer mx-2 md:hidden block">
                                <ion-icon name="menu" onclick="Menu(this)"></ion-icon>
                            </span>
                        </div>
                        <ul class="md:flex md:items-center z-[-1] md:z-auto md:static absolute w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500 ">
                            <li class="mx-4 my-6 md:my-0 transition">
                                <a href="#" class="text-2xl duration-500 flex flex-col-reverse relative transition-all
                                after:h-0.5 after:absolute after:w-0 after:bg-green-300 after:transition
                                hover:after:w-full">Home</a>
                            </li>
                            <li class="mx-4 my-6 md:my-0">
                                <a href="#" className="text-2xl duration-500 flex flex-col-reverse relative transition-all
                                after:h-0.5 after:absolute after:w-0 after:bg-green-300 after:transition
                                hover:after:w-full">Prossionais</a>
                            </li>
                            <li class="mx-4 my-6 md:my-0">
                                <a href="#" className="text-2xl duration-500 flex flex-col-reverse relative transition-all
                                after:h-0.5 after:absolute after:w-0 after:bg-green-300 after:transition
                                hover:after:w-full">Blog</a>
                            </li>
                            <li class="mx-4 my-6 md:my-0">
                                <a href="#" className="text-2xl duration-500 flex flex-col-reverse relative transition-all
                                after:h-0.5 after:absolute after:w-0 after:bg-green-300 after:transition
                                hover:after:w-full">Sobre nós</a>
                            </li>
                        </ul>
                        <div class="menu">
                            <span class="bar"></span>
                            <span class="bar"></span>
                            <span class="bar"></span>
                        </div>
                    </nav>
                    <div className=" w-10 md:flex flex-direction " >
                        <img className="pt-10 pr-1 md:pt-1 " src={Photo} />
                        <Link to="../login" class=" invisible xl:visible home-btn p-1 ">
                            Entrar
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col justify-items-center text-center p-10 gap-20 ml-80">
                    <div className=" ml-80 flex flex-col justify-center w-1/3 basis-1/4 content-center gap-20">
                        <h1 className="font-bold text-7xl w-full h-3/4 rounded-lg bg-[#78A890] xl:text-9xl mt-20 ml-80 hidden md:flex justify-center content-center items-center"> {props.title}</h1>
                        <p className="md:flex justify-center xl:text-center text-4xl  w-full xl:ml-80 hidden "> {props.description} </p>
                    </div>
                    <img className=" mr-80 pr-20 pt-0 w-full" src={FootHeader}/>
                </div>

            </div>
        </>
    )
};