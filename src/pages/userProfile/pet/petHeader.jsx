import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {SideBarMenu} from "../../../components/sideBarMenu";

export const PetHeader = () => {
	const [userNome, setUserNome] = useState("");
	const [userFoto, setUserFoto] = useState("");
	const [linkTo, setLinkTo] = useState("/login");
	const token = localStorage.getItem("__user_JWT");
	const decoded = jwt_decode(token);

	useEffect(() => {
		if (decoded) {
			if (decoded.userName === '')
				document.location.href = '/profile/edit-profile'
			setUserNome(decoded.userName);
			setUserFoto(
				decoded.profilePhoto !== ""
					? decoded.profilePhoto
					: "https://www.svgrepo.com/show/335455/profile-default.svg"
			);
			if (decoded.userName === "") setLinkTo("/profile/edit-profile");
			setLinkTo("/profile");
		}
	}, [decoded, token]);

	return (
		<header>
			<div className="flex font-normal items-center justify-between bg-transparent shadowxl:p-10 p-4 h-30 text-4xl md:p-5">
				<button id='menu-button' className=" mx-2 rounded focus:outline-none group">
					<div className="w-8 h-1.5 bg-[#000] mb-1 md:w-10 md:h-1.5"></div>
					<div className="w-8 h-1.5 bg-[#000] mb-1 md:w-10 md:h-1.5"></div>
					<div className="w-8 h-1.5 bg-[#000] md:w-10 md:h-1.5"></div>
				</button>
				<SideBarMenu />
				<Link
					to="/"
					className=" md:pt-1 text-1xl sm:flex justify-start font-bold my-0 mx-auto"
				>
					PetSaúde
				</Link>
				<Link to={linkTo} className=" md:flex flex-row gap-2">
					<img className="w-14 h-14 p-1 md:p-0 rounded-full" src={userFoto} alt='Profile' />
					<p className=" items-center hidden md:flex home-btn text-2xl mr-3 text-black">
						{userNome}
					</p>
				</Link>
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

