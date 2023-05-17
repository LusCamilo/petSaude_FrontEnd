import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {SideBarMenu} from "../../../components/sideBarMenu";
import getUserInfos from "../../../utils/getUserInfos";

export const PetHeader = () => {
	const [userName, setUserName] = useState("");
	const [userPhoto, setUserPhoto] = useState("");
	const [linkTo, setLinkTo] = useState("/login");
	const token = localStorage.getItem("__user_JWT");
	const decoded = jwt_decode(token);

	useEffect(() => {
<<<<<<< HEAD
		if (decoded) {
			setUserName(decoded.userName);
			setUserPhoto(
				decoded.profilePhoto !== ""
					? decoded.profilePhoto
					: "https://www.svgrepo.com/show/335455/profile-default.svg"
			);
			if (decoded.userName === "") setLinkTo("/profile/edit-profile");
			setLinkTo("/profile");
=======
		async function loadUserInfos() {
			const userInfos = await getUserInfos()
			if (userInfos) {
				setUserNome(userInfos.userName)
				if (userInfos.profilePhoto !== '') setUserFoto(userInfos.profilePhoto)
				else setUserFoto('https://www.svgrepo.com/show/335455/profile-default.svg')
				if (userInfos.userName === "") setLinkTo("/profile/edit-profile");
				else setLinkTo('/profile')
			}
>>>>>>> ab819adc1db3047d2096a3bebf438a77f5a859ce
		}

		loadUserInfos()
	}, [decoded, token]);

	console.log(linkTo)

	return (
		<header>
			<div className="flex font-normal items-center justify-between bg-transparent shadowxl:p-10 p-4 h-30 text-4xl md:p-5 relative">
				<button id='menu-button' className=" mx-2 rounded focus:outline-none group">
					<div className="w-8 h-1.5 bg-[#000] mb-1 md:w-10 md:h-1.5"></div>
					<div className="w-8 h-1.5 bg-[#000] mb-1 md:w-10 md:h-1.5"></div>
					<div className="w-8 h-1.5 bg-[#000] md:w-10 md:h-1.5"></div>
				</button>
				<SideBarMenu />
				<Link to="/" className="text-1xl font-bold">
					PetSaúde
				</Link>
<<<<<<< HEAD
				<Link to={linkTo} className=" md:flex flex-row gap-2">
					<img className="w-14 h-14 p-1 md:p-0 rounded-full" src={userPhoto} alt='Profile' />
					<p className=" items-center hidden md:flex home-btn text-2xl text-black">
						{userName}
=======
				<Link to={linkTo} className="flex flex-row gap-2 z-10">
					<img className="w-14 h-14 p-1 md:p-0 rounded-full" src={userFoto} alt='Profile' />
					<p className=" items-center hidden md:flex home-btn text-2xl mr-3 text-black">
						{userNome}
>>>>>>> ab819adc1db3047d2096a3bebf438a77f5a859ce
					</p>
				</Link>
			</div>
		</header>
	);
};

