import React from 'react';
import { Link } from "react-router-dom";
import {SideBarMenu} from "../../../components/sideBarMenu";
import {BsFillGearFill} from "react-icons/bs";

export const HeaderProfile = () => {
	return (
		<header className="flex font-normal justify-between md:pb-5 md:h-30 text-4xl items-center md:px-12 md:pt-5 relative">
			<button id='menu-button' className="block py-3 md:px-4 mx-2 rounded focus:outline-none hover-bg-gray-200 group">
				<span className="w-8 h-1.5 bg-[#000] mb-1 md:w-10 md:h-1.5 block"></span>
				<span className="w-8 h-1.5 bg-[#000] mb-1 md:w-10 md:h-1.5 block"></span>
				<span className="w-8 h-1.5 bg-[#000] md:w-10 md:h-1.5 block"></span>
			</button>
			<SideBarMenu />
			<Link to="/">
				<h1 className=" text-1xl hidden xl:flex sm:flex font-bold left-0 right-0 top-0 bottom-0 justify-center items-center absolute">PetSaúde</h1>
			</Link>
			<Link to='/profile/configuration' className="flex items-center gap-2 justify-center p-2 md:pt-2" >
				<BsFillGearFill className='border justify-center rounded-full p-2 w-10 h-10' />
				<p className='hidden md:flex xl:flex home-btn text-3xl'>Configurações</p>
			</Link>
		</header>
	);
}
