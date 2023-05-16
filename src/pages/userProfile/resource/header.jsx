import React from 'react';
import { Link } from "react-router-dom";
import configIcon from "./img/configIcon.png";
import Menu from "../../../assets/svg/leading-icon.svg";


export const HeaderProfile = () => {
	return (

		<header className=" flex font-normal justify-between md:pb-5 md:h-30 text-4xl items-center md:px-12 md:pt-5">
			<img className="visible md:h-40 w-20 md:hidden " src={Menu} alt='Menu' />
			<Link to="../home">
				<h1 className=" text-1xl hidden xl:flex sm:flex justify-start font-bold">PetSaúde</h1>
			</Link>
			<nav>
				<div className="flex justify-between items-center ">
                    <span className="text-3xl cursor-pointer mx-2 md:hidden block">
                        <ion-icon name="menu" onclick="Menu(this)"></ion-icon>
                    </span>
				</div>
				<ul className="md:flex md:items-center z-[-1] md:z-auto md:static absolute w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500 ">
					<li className="flex mx-4 my-6 md:my-0 h-fit">
						<Link to="/" className="text-2xl hover:text-green-300 duration-500">Home</Link>
					</li>
					<li className="flex mx-4 my-6 md:my-0 h-fit">
						<Link to="/home/search-professionals" className="text-2xl hover:text-green-300 duration-500">Profissionais</Link>
					</li>
					<li className="flex mx-4 my-6 md:my-0 h-fit">
						<Link to="/home/about-us" className="text-2xl hover:text-green-300 duration-500 flex-row justify-center ">Sobre nós</Link>
					</li>
				</ul>
				<div className="menu">
					<span className="bar"></span>
					<span className="bar"></span>
					<span className="bar"></span>
				</div>
			</nav>
			<Link to='/profile/configuration' className="flex items-center gap-x-3 justify-center p-2 md:pt-2" >
				<img className='flex border justify-center rounded-full p-3' src={configIcon} alt='Configuration gear' />
				<p className='hidden md:flex xl:flex home-btn text-3xl'>Configurações</p>
			</Link>
		</header>

	);
}

