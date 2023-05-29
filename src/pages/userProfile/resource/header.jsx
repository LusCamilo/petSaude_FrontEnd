import React from 'react';
import { Link } from "react-router-dom";
import {SideBarMenu} from "../../../components/sideBarMenu";
import {BsFillGearFill} from "react-icons/bs";

export const HeaderProfile = () => {
	return (
		<header className="flex font-normal justify-between md:pb-5 text-4xl items-center md:px-12 md:pt-5 relative">
			<button id='menu-button' className="block py-3 md:px-4 mx-2 focus:outline-none hover-bg-gray-200 group z-10">
					<div className="w-8 h-1.5 bg-[#000] mb-1 md:w-10 md:h-1.5 block rounded"></div>
					<div className="w-8 h-1.5 bg-[#000] mb-1 md:w-10 md:h-1.5 block rounded"></div>
					<div className="w-8 h-1.5 bg-[#000] md:w-10 md:h-1.5 block rounded"></div>
				</button>
			<SideBarMenu />
			<Link to="/" className="text-1xl hidden xl:flex sm:flex font-bold left-0 right-0 top-0 bottom-0 justify-center items-center absolute">
				PetSaúde
			</Link>
			<Link to='/profile/configuration' className="flex items-center gap-2 justify-center py-1 z-10" >
				<BsFillGearFill className='border justify-center rounded-full p-3 w-14 h-14' />
				<p className='hidden md:flex home-btn text-3xl'>Configurações</p>
			</Link>
		</header>
	);
}
