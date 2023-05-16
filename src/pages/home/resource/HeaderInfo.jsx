import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import FootHeader from "../../../assets/svg/FootHeader.svg";
import jwt_decode from "jwt-decode";
import {SideBarMenu} from "../../../components/sideBarMenu";

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
			setLinkTo('../userProfile/veterinary')
		}
	}, [decoded, token]);

	return (
		<header className=" bg-[#9ED1B7] w-full h-full ">
			<div className="flex font-normal items-center justify-around xl:p-5 h-30 text-4xl ">
				<button className="md:hidden py-3 px-4 mx-2 rounded focus:outline-none group">
					<div className="w-5 h-1 bg-gray-600 mb-1"></div>
					<div className="w-5 h-1 bg-gray-600 mb-1"></div>
					<div className="w-5 h-1 bg-gray-600 mb-1"></div>
					<SideBarMenu />
				</button>
				<Link to='/' className=" text-1xl sm:flex justify-start font-bold">PetSaúde</Link>
				<nav>
					<div className="flex justify-between items-center ">
						<span className="text-3xl cursor-pointer mx-2 md:hidden block">
							<ion-icon name="menu" onclick="Menu(this)"></ion-icon>
						</span>
					</div>
					<ul className="md:flex md:items-center z-[-1] md:z-auto md:static absolute w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500 ">
						<li className="mx-4 my-6 md:my-0">
							<Link className="text-2xl duration-500 flex flex-col-reverse relative transition-all
                             after:h-0.5 after:absolute after:w-0 after:bg-green-300 after:transition
                             hover:after:w-full" to="/home/search-professionals">Profissionais
							</Link>
						</li>
						<li className="mx-4 my-6 md:my-0">
							<Link to="/home/about-us" className="text-2xl duration-500 flex flex-col-reverse relative transition-all
                            after:h-0.5 after:absolute after:w-0 after:bg-green-300 after:transition
                            hover:after:w-full">Sobre nós
							</Link>
						</li>
					</ul>
					<div className="menu">
						<span className="bar"></span>
						<span className="bar"></span>
						<span className="bar"></span>
					</div>
				</nav>
				<button className="w-fit md:flex flex-direction "
				        onClick={() => {document.location.href = "/profile/configuration";}}>
					<img className="pt-10 pr-1 md:pt-1 w-10 rounded" src={userFoto} alt='Profile'/>
					<Link to="/profile/configuration" className=" invisible xl:visible home-btn p-1 ">
						{userNome}
					</Link>
				</button>
			</div>
			<div className="flex flex-col justify-items-center text-center  gap-20">
				<div className="flex flex-col justify-center w-full basis-1/4 content-center items-center gap-20 ">
					<h1 className="font-bold text-7xl h-3/4 rounded-3xl bg-[#78A890] xl:text-8xl mt-20  hidden md:flex justify-center content-center items-center px-20 py-10"> {props.title}</h1>
					<p className="md:flex justify-center xl:text-center text-3xl  w-full  hidden "> {props.description} </p>
				</div>
				<img className=" mr-80 pr-20 pt-0 w-full" src={FootHeader} alt='Dog paws'/>
			</div>
		</header>
	)
};
