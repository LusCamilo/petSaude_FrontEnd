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
		async function loadUserInfos() {
			const userInfos = await getUserInfos()
			if (userInfos) {
				setUserName(userInfos.userName)
				if (userInfos.profilePhoto !== '') setUserPhoto(userInfos.profilePhoto)
				else setUserPhoto('https://www.svgrepo.com/show/335455/profile-default.svg')
				if (userInfos.userName === "") setLinkTo("/profile/edit-profile");
				else setLinkTo('/profile')
			}
		}

		loadUserInfos()
	}, [decoded, token]);

	return (
		<header>
			<div className="flex font-normal justify-between md:pb-5 md:h-30 text-4xl items-center md:px-12 md:pt-5">
				<button id='menu-button' className="block py-3 md:px-4 mx-2 focus:outline-none hover-bg-gray-200 group">
					<div className="w-8 h-1.5 bg-[#000] mb-1 md:w-10 md:h-1.5 block rounded"></div>
					<div className="w-8 h-1.5 bg-[#000] mb-1 md:w-10 md:h-1.5 block rounded"></div>
					<div className="w-8 h-1.5 bg-[#000] md:w-10 md:h-1.5 block rounded"></div>
				</button>
				<SideBarMenu />
				<Link to="/">
					<h1 className=" text-1xl hidden xl:flex sm:flex font-bold">PetSaúde</h1>
				</Link>
				<Link to={linkTo} className="flex items-center gap-2 justify-center py-1 z-10">
					<img className="w-14 h-14 rounded-full" src={userPhoto} alt='Profile' />
					<p className=" items-center hidden md:flex home-btn text-3xl">
						{userName}
					</p>
				</Link>
			</div>
		</header>
	);
};

