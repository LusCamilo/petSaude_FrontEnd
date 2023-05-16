import {Link} from "react-router-dom";
import Home from "../../assets/svg/Home.svg";
import Work from "../../assets/svg/Work.svg";
import Info from "../../assets/svg/InfoOutline.svg";
import Calendary from "../../assets/svg/Calendar today.svg";
import Person from "../../assets/svg/Person.svg";
import Lock from "../../assets/svg/Lock.svg";
import Logout from "../../assets/svg/Logout.svg";
import React, {useEffect, useState} from "react";
import {AiOutlineClose} from "react-icons/ai";
import {BsPersonFill} from "react-icons/bs";

export const SideBarMenu = (props) => {
	const [showMenu, setShowMenu] = useState(false)
	useEffect(() => {
		setShowMenu(props.show)
	}, [props.show])
	function toggleMenu() {
		if (showMenu) setShowMenu(false)
		else setShowMenu(true)
	}

	const button = document.querySelector("#teste")
	if (button) button.addEventListener('click', toggleMenu)

	return (
		<div
			className={showMenu
			? "pt-5 px-4 absolute top-0 left-0 opacity-100 h-full w-96 bg-[#ECECEC] border transform transition-all duration-300 z-10"
			: "absolute top-0 hidden -left-0 opacity-0 h-full w-96 bg-[#ECECEC] border transform transition-all duration-300 z-10"}>
			<AiOutlineClose onClick={toggleMenu} className='cursor-pointer'/>
			<h2 className="pt-5 pl-5 text-left  text-2xl font-semibold">
				Menu
			</h2>
			<ul className="flex flex-col items-center w-full text-base space-y-3 mt-2">
				<Link to="/" className="flex items-center hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-full text-left rounded-full">
					<img src={Home} className="pr-3  w-14" alt="Home"></img>
					Home
				</Link>
				<Link to="/home/search-professionals" className="flex items-center hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-full text-left rounded-full">
					<img src={Work} className="pr-3  w-14" alt="Work"></img>
					Profissionais
				</Link>
				<Link to="/home/about-us" className="flex items-center hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-full text-left rounded-full">
					<img src={Info} className="pr-3 w-14" alt="Info"></img>
					Sobre nós
				</Link>
				<Link to="/profile/appointment-view" className="flex items-center hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-full text-left rounded-full">
					<img src={Calendary} className="pr-3  w-14" alt="Calendary"></img>
					Consultas
				</Link>
			</ul>
			<h3 className="pt-5 pl-5 text-left text-2xl font-semibold">
				Configurações
			</h3>
			<ul className="flex flex-col items-center w-full text-base space-y-3 mt-2">
				<Link to="/profile/configuration" className="flex items-center hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-full text-left rounded-full">
					<BsPersonFill className='pr-3 w-14 h-12'/>
					Perfil
				</Link>
				<Link to="/profile/edit-profile" className="flex items-center hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9]  h-30 w-full text-left rounded-full ">
					<img src={Lock} className="pr-3 w-14" alt="Lock"></img>
					Segurança
				</Link>
				<div
					className="border-2 border-[#B3261E] hover:bg-[#f7b9b6] rounded-full py-2 px-6 w-full flex flex-row h-30 text-[#B3261E] font-semibold">
					<div className="flex flex-row gap-3 items-center">
						<img src={Logout} alt=""/> Sair
					</div>
				</div>
			</ul>
		</div>
	)
}
