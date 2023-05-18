import {Link} from "react-router-dom";
import React, { useState} from "react";
import {AiFillHome, AiFillInfoCircle, AiOutlineClose} from "react-icons/ai";
import {BsBriefcaseFill, BsFillCalendarFill, BsPersonFill} from "react-icons/bs";
import {FaLock} from "react-icons/fa";
import {IoExit} from "react-icons/io5";
import signOutUser from "../../utils/signOutUser";

export const SideBarMenu = (props) => {
	const [showMenu, setShowMenu] = useState(false)

	function toggleMenu() {
		if (showMenu) setShowMenu(false)
		else setShowMenu(true)
	}

	const activationbutton = document.querySelector("#menu-button")
	if (activationbutton) activationbutton.addEventListener('click', toggleMenu)

	return (
		<div
			className={showMenu
			? "pt-5 px-4 fixed top-0 left-0 opacity-100 h-screen w-96 bg-[#ECECEC] border transform transition-all duration-300 z-10"
			: "fixed top-0 hidden -left-0 opacity-0 h-screen w-96 bg-[#ECECEC] border transform transition-all duration-300 z-10"}>
			<AiOutlineClose onClick={toggleMenu} className='cursor-pointer'/>
			<h2 className="pt-5 pl-5 text-left  text-2xl font-semibold">
				Menu
			</h2>
			<ul className="flex flex-col items-center w-full text-base space-y-3 mt-2">
				<Link to="/" className="flex items-center hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-full text-left rounded-full">
					<AiFillHome className='pr-3 w-14 h-12 text-[#49454F]' />
					Home
				</Link>
				<Link to="/home/search-professionals" className="flex items-center hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-full text-left rounded-full">
					<BsBriefcaseFill className='pr-3 w-14 h-12 text-[#49454F]' />
					Profissionais
				</Link>
				<Link to="/home/about-us" className="flex items-center hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-full text-left rounded-full">
					<AiFillInfoCircle className='pr-3 w-14 h-12 text-[#49454F]' />
					Sobre nós
				</Link>
				<Link to="/profile/appointment-view" className="flex items-center hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-full text-left rounded-full">
					<BsFillCalendarFill className='pr-3 w-14 h-12 text-[#49454F]' />
					Consultas
				</Link>
			</ul>
			<h3 className="pt-5 pl-5 text-left text-2xl font-semibold">
				Configurações
			</h3>
			<ul className="flex flex-col items-center w-full text-base space-y-3 mt-2">
				<Link to="/profile/configuration" className="flex items-center hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-full text-left rounded-full">
					<BsPersonFill className='pr-3 w-14 h-12 text-[#49454F]'/>
					Perfil
				</Link>
				<Link to="/profile/edit-profile" className="flex items-center hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9]  h-30 w-full text-left rounded-full ">
					<FaLock className='pr-3 w-14 h-12 text-[#49454F]' />
					Segurança
				</Link>
				<span className="border-2 border-[#B3261E] hover:bg-[#f7b9b6] rounded-full py-2 px-6 w-full flex flex-row h-30 text-[#B3261E] font-semibold gap-3 items-center cursor-pointer" onClick={signOutUser}>
					<IoExit className='pr-3 w-14 h-12' />
					Sair
				</span>
			</ul>
		</div>
	)
}
