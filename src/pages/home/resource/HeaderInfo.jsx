import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import FootHeader from "../../../assets/svg/FootHeader.svg";
import Home from '../../../assets/svg/Home.svg';
import Work from '../../../assets/svg/Work.svg';
import Info from '../../../assets/svg/InfoOutline.svg';
import Calendary from '../../../assets/svg/Calendar today.svg';
import Person from '../../../assets/svg/Person.svg';
import Lock from '../../../assets/svg/Lock.svg';
import jwt_decode from "jwt-decode";
<<<<<<< HEAD
import PetHeader from "../../profile/pet/petHeader"
=======
import { PetHeader } from "../../profile/pet/petHeader";
import Logout from "../../../assets/svg/Logout.svg";
>>>>>>> 10edbe5b9810994cde525a43f20a63d717fa502d

export const HeaderInfo = (props) => {

  const [userNome, setUserNome] = useState('Entrar')
  const [userFoto, setUserFoto] = useState('Entrar')
  const [linkTo, setLinkTo] = useState('../login')
  const token = localStorage.getItem('__user_JWT')
  const decoded = jwt_decode(token);

  useEffect(() => {
      if (decoded) {
        setUserNome(decoded.userName);
        setUserFoto(decoded.profilePhoto !== '' ? decoded.profilePhoto : 'https://www.svgrepo.com/show/335455/profile-default.svg');
        setLinkTo('../profile/veterinary')
      }
    }, [decoded, token]);

    return (
        <>
<<<<<<< HEAD
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
                    <Link to="/home/aboutUs" className=" duration-500 flex flex-col-reverse relative transition-all
                          after:h-0.5 after:absolute after:w-0 after:bg-green-300 after:transition
                          hover:after:w-full">Sobre nós
                        </Link>
                    </li>
                    <li className="flex hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">
                    <img src={Calendary} className="pr-3"></img>
                    <Link to="/home/appointmentMenu"></Link>
                      Consultas
                    </li>
                  </ul>
                <h3 className="pt-5 pl-5 text-left  text-2xl font-semibold">Configurações</h3>
=======
            <header>
            <div className="flex font-normal items-center justify-between bg-[#9ED1B7] shadowxl:p-10 h-30 text-4xl md:p-5">
              <button className=" py-3 px-4 mx-2 rounded focus:outline-none group">
                <div className="w-4 h-1 bg-[#000] mb-1 md:w-10 md:h-1.5"></div>
                <div className="w-4 h-1 bg-[#000] mb-1 md:w-10 md:h-1.5"></div>
                <div className="w-4 h-1 bg-[#000] mb-1 md:w-10 md:h-1.5"></div>
                <div className="absolute top-0 -left-full opacity-0 h-full w-96 bg-[#ECECEC] border transform group-focus:left-0 group-focus:opacity-100 transition-all duration-300">
                  <h2 className="pt-10 pl-5 text-left  text-2xl font-semibold md:font-5xl">
                    Menu
                  </h2>
                  <ul className="flex flex-col items-center w-full text-base cursor-pointer pt-5 space-y-3">
                    <button
                      onClick={() => {
                        document.location.href = "/home";
                      }}
                      className="flex items-center hover:bg-[#9ED1B7]  py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full"
                    >
                      <img src={Home} className="pr-3  w-14"></img>
                      {/* () => { document.location.href = '/home' } */}
                      {/* <Link to={HomeWeb}></Link> */}
                      Home
                    </button>
                    <button
                      onClick={() => {
                        document.location.href = "/home/searchProfessionals";
                      }}
                      className="flex items-center hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full"
                    >
                      <img src={Work} className="pr-3  w-14"></img>
                      {/* <Link to='/home/searchProfessionals'></Link> */}
                      Profissionais
                    </button>
                    {/* <button
                      onClick={() => {
                        document.location.href = "/profile/appointmentView";
                      }}
                      className="flex items-center hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full"
                    >
                      <img src={Blog} className="pr-3 w-14"></img>
                      Blog
                    </button> */}
                    <button
                      onClick={<Link to="/home/aboutUs"></Link>}
                      className="flex items-center hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full"
                    >
                      <img src={Info} className="pr-3 w-14"></img>
                      {/* () => { document.location.href = '/home/aboutUs' } */}
                      {/* <Link to='/home'></Link> */}
                      Sobre nós
                    </button>
                    <button
                      onClick={() => {
                        document.location.href = "/profile/appointmentView";
                      }}
                      className="flex items-center hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full"
                    >
                      <img src={Calendary} className="pr-3  w-14"></img>
                      Consultas
                    </button>
                  </ul>
                  <h3 className="pt-5 pl-5 text-left  text-2xl font-semibold">
                    Configurações
                  </h3>
                  <ul className="flex flex-col items-center w-full text-base cursor-pointer pt-5 space-y-3">
                    <button
                      onClick={() => {
                        document.location.href = "/profile/editPerson";
                      }}
                      className="flex items-center hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full"
                    >
                      <img src={Person} className="pr-3 w-14"></img>
                      Perfil
                    </button>
                    <button
                      onClick={() => {
                        document.location.href = "/profile/editProfile";
                      }}
                      className="flex items-center hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9]  h-30 w-5/6 text-left rounded-full "
                    >
                      <img src={Lock} className="pr-3 w-14"></img>
                      Segurança
                    </button>
                    <div className="border-2 border-[#B3261E] rounded-full py-5 px-5 h-30 w-80  text-[#B3261E] font-semibold">
                      <div className="flex flex-row">
                        <img src={Logout} alt="" className="pr-3 w-10"/>
                        Sair
                      </div>
                    </div>
                  </ul>
                </div>
              </button>
              <Link to='../home' className=" md:pt-1 text-1xl sm:flex justify-start font-bold">
                PetSaúde
              </Link>
              <Link to={linkTo} className=" md:flex flex-row gap-2">
                <img
                  className="w-14 h-14 p-2 md:p-0 rounded-full"
                  src={userFoto}
                />
                <p className=" items-center hidden md:flex home-btn text-2xl mr-3 text-black">
                  {userNome}
                </p>
              </Link>
            </div>
          </header>
                <div className="flex flex-col justify-items-center text-center  gap-20 bg-[#9ED1B7]  ">
                  <div className="flex flex-col justify-center w-full basis-1/4 content-center items-center gap-20 ">
                      <h1 className="font-bold text-7xl h-3/4 rounded-3xl bg-[#78A890] xl:text-9xl mt-20  hidden md:flex justify-center content-center items-center px-20 py-10"> {props.title}</h1>
                      <p className="md:flex justify-center xl:text-center text-4xl  w-full  hidden "> {props.description} </p>
                  </div>
                  <img className=" mr-80 pr-20 pt-0 w-full" src={FootHeader}/>          
                </div>
               
        
            {/* <div className=" bg-[#9ED1B7] w-full h-full ">
                <div className="flex font-normal items-center justify-around xl:p-5 h-30 text-4xl ">
                <button className=" md:hidden py-3 px-4 mx-2 rounded focus:outline-none group">
            <div className="w-5 h-1 bg-gray-600 mb-1"></div>
            <div className="w-5 h-1 bg-gray-600 mb-1"></div>
            <div className="w-5 h-1 bg-gray-600 mb-1"></div>
          <div className="absolute top-0 -left-full opacity-0 h-screen w-8/12 bg-[#ECECEC] border transform 
            group-focus:left-0 group-focus:opacity-100 transition-all duration-300">
            <h2 className="pt-10 pl-5 text-left  text-2xl font-semibold">Menu</h2>
>>>>>>> 10edbe5b9810994cde525a43f20a63d717fa502d
                <ul className="flex flex-col items-center w-full text-base cursor-pointer pt-5 space-y-3">
                  <li className="flex hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">
                    <img src={Person} className="pr-3"></img>
                    <Link to="/profile/editPerson">Perfil</Link>  
                  </li>
                  <li className="flex hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">
                    <img src={Lock} className="pr-3"></img>
                      <Link to="/profile/editProfile">Segurança</Link>   
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
                            <li class="mx-4 my-6 md:my-0">
                              <Link className="text-2xl duration-500 flex flex-col-reverse relative transition-all
                              after:h-0.5 after:absolute after:w-0 after:bg-green-300 after:transition
                              hover:after:w-full" to="/home/searchProfessionals">Profissionais
                              </Link>
                            </li>
                            <li class="mx-4 my-6 md:my-0">
                              <Link to="/profile/blogProfile" className="text-2xl duration-500 flex flex-col-reverse relative transition-all
                              after:h-0.5 after:absolute after:w-0 after:bg-green-300 after:transition
                              hover:after:w-full">Blog
                              </Link>
                            </li>
                            <li class="mx-4 my-6 md:my-0">
                              <Link to="/home/aboutUs" className="text-2xl duration-500 flex flex-col-reverse relative transition-all
                              after:h-0.5 after:absolute after:w-0 after:bg-green-300 after:transition
                              hover:after:w-full">Sobre nós
                              </Link>
                            </li>
                        </ul>
                        <div class="menu">
                            <span class="bar"></span>
                            <span class="b`ar"></span>
                            <span class="bar"></span>
                        </div>
                    </nav>
                    <div className=" w-10 md:flex flex-direction " >
                        <img className="pt-10 pr-1 md:pt-1 " src={userFoto} />
                        <Link to="/profile/editProfile" class=" invisible xl:visible home-btn p-1 ">
                            {userNome}
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col justify-items-center text-center  gap-20">
                    <div className="flex flex-col justify-center w-full basis-1/4 content-center items-center gap-20 ">
                        <h1 className="font-bold text-7xl h-3/4 rounded-3xl bg-[#78A890] xl:text-8xl mt-20  hidden md:flex justify-center content-center items-center px-20 py-10"> {props.title}</h1>
                        <p className="md:flex justify-center xl:text-center text-3xl  w-full  hidden "> {props.description} </p>
                    </div>
                    <img className=" mr-80 pr-20 pt-0 w-full" src={FootHeader}/>
                </div>

            </div> */}
        </>
    )
};