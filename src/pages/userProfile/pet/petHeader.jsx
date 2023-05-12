import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Hayley from "../../../assets/svg/Hayley.svg";
import Home from "../../../assets/svg/Home.svg";
import Work from "../../../assets/svg/Work.svg";
import Blog from "../../../assets/svg/Blog.svg";
import Info from "../../../assets/svg/InfoOutline.svg";
import Calendary from "../../../assets/svg/Calendar today.svg";
import Person from "../../../assets/svg/Person.svg";
import Lock from "../../../assets/svg/Lock.svg";
import { HomeWeb } from "../../home/HomeWeb";
import jwt_decode from "jwt-decode";
import Logout from "../../../assets/svg/Logout.svg";
import Notifications from "../../../utils/notifications";

export const PetHeader = () => {
  const [userNome, setUserNome] = useState("");
  const [userFoto, setUserFoto] = useState("");
  const [linkTo, setLinkTo] = useState("../login");
  const token = localStorage.getItem("__user_JWT");
  const decoded = jwt_decode(token);

  useEffect(() => {
    if (decoded) {
      console.log(decoded)
      setUserNome(decoded.userName);
      setUserFoto(decoded.profilePhoto !== '' ? decoded.profilePhoto : 'https://www.svgrepo.com/show/335455/profile-default.svg');
      if (decoded.userName === '')
        setLinkTo('../profile/edit-profile')
      setLinkTo('../profile')
    }
  }, [decoded, token]);

  return (
    <header>
      <div className="flex font-normal items-center justify-between bg-transparent shadowxl:p-10 p-4 h-30 text-4xl md:p-5">
        <button className=" mx-2 rounded focus:outline-none group">
          <div className="w-8 h-1.5 bg-[#000] mb-1 md:w-10 md:h-1.5"></div>
          <div className="w-8 h-1.5 bg-[#000] mb-1 md:w-10 md:h-1.5"></div>
          <div className="w-8 h-1.5 bg-[#000] md:w-10 md:h-1.5"></div>
          <div className="absolute top-0 -left-full opacity-0 h-full w-96 bg-[#ECECEC] border transform group-focus:left-0 group-focus:opacity-100 transition-all duration-300 z-10">
            <h2 className="pt-10 pl-5 text-left  text-2xl font-semibold md:font-5xl">
              Menu
            </h2>
            <ul className="flex flex-col items-center w-full text-base cursor-pointer pt-5 space-y-3">
              <button onClick={() => { document.location.href = "/home"; }}
                className="flex items-center hover:bg-[#9ED1B7]  py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full"
              >
                <img src={Home} className="pr-3  w-14"></img>
                Home
              </button>
              <button
                onClick={() => {
                  document.location.href = "/home/search-professionals";
                }}
                className="flex items-center hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full"
              >
                <img src={Work} className="pr-3  w-14"></img>
                Profissionais
              </button>
              {/* <button
                  onClick={() => {
                    document.location.href = "/userProfile/appointmentView";
                  }}
                  className="flex items-center hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full"
                >
                  <img src={Blog} className="pr-3 w-14"></img>
                  Blog
                </button> */}
              <button
                onClick={<Link to="/home/about-us"></Link>}
                className="flex items-center hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full"
              >
                <img src={Info} className="pr-3 w-14"></img>
                Sobre nós
              </button>
              <button
                onClick={() => {
                  document.location.href = "/profile/appointment-view";
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
                  document.location.href = "/profile/configuration";
                }}
                className="flex items-center hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full"
              >
                <img src={Person} className="pr-3 w-14"></img>
                Perfil
              </button>
              <button
                onClick={() => {
                  document.location.href = "/profile/edit-profile";
                }}
                className="flex items-center hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9]  h-30 w-5/6 text-left rounded-full "
              >
                <img src={Lock} className="pr-3 w-14"></img>
                Segurança
              </button>
              <div className="border-2 border-[#B3261E] hover:bg-[#f7b9b6] rounded-full py-2 px-6  flex flex-row h-30 text-[#B3261E] font-semibold">
                <div className="flex flex-row gap-3 items-center">
                  <img src={Logout} alt="" /> Sair
                </div>
              </div>
            </ul>
          </div>
        </button>
        <Link to='../home' className=" md:pt-1 text-1xl sm:flex justify-start font-bold my-0 mx-auto">
          PetSaúde
        </Link>
        <Link to={linkTo} className=" md:flex flex-row gap-2">
          <img
            className="w-14 h-14 p-1 md:p-0 rounded-full"
            src={userFoto}
          />
        </Link>
        {/* <Link to="../login">
          <p className=" items-center hidden md:flex home-btn text-2xl mr-3 text-black">
            {userNome}
          </p>
        </Link> */}
      </div>
    </header>
  //   </>

  // <p
  //   className=" items-center hidden md:flex home-btn text-2xl mr-3 text-black"
  // >
  //   {userNome}
  // </p>
  //         </Link >
  //       </div >
  //     </header >
  );
};
