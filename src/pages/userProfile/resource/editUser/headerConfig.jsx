import React from 'react';
import { Link } from "react-router-dom";
import lapis from "../../../../assets/svg/pencil.svg";
import configIcon from "../../../../assets/svg/Icon button.svg";
import {SideBarMenu} from "../../../../components/sideBarMenu";
import { PetHeader } from '../../pet/petHeader';

export const Config = (props) => {
	return (
		<section>
			{/* <div className="flex font-normal items-center justify-between bg-white shadow pl-5 xl:p-10 h-30 text-4xl">
				<div className='flex flex-row justify-center align-center text-center'>
					<button id='menu-button' className="block d:hidden  py-3 md:px-4 mx-2 rounded focus:outline-none hover-bg-gray-200 group ">
						<div className="w-8 h-1.5 bg-[#000] mb-1 md:w-10 md:h-1.5"></div>
						<div className="w-8 h-1.5 bg-[#000] mb-1 md:w-10 md:h-1.5"></div>
						<div className="w-8 h-1.5 bg-[#000] mb-1 md:w-10 md:h-1.5"></div>
					</button>
					<SideBarMenu />

					<Link to='/' className=" text-1xl justify-start font-bold hidden md:flex md:pt-1">PetSaúde</Link>
					<h1 className=" text-1xl pt-3 md:pt-5 font-normal flex md:hidden pl-24">Perfil</h1>

					<div className="flex content-items-center flex-direction md:pt-2 md:hidden pl-20" >
						<img className="flex content-center content-items-center h-20 xl:w-2/4  pt-2" src={configIcon} alt='Configuration gear' />
					</div>

				</div>
				<Link to="/profile" className="flex home-btn text-2xl items-center gap-5">
					<img className="w-20 pl-5 pt-20 pr-1 md:pt-1 md:w-20 hidden md:flex " src={props.profilePhoto} alt='Profile' />
					{props.personName}
				</Link>
			</div> */}
			<PetHeader />
			<div className='flex justify-between w-full px-36'>
				<div className='flex items-center justify-center md:pt-10'>
					<img className=' md:w-60 md:h-60 rounded-full bg-slate-200' src={props.profilePhoto} alt='Profile' />
					<div className='flex flex-col pl-10 gap-3'>
						<label>
							<h2 className='bg-transparent border-none text-2xl md:text-5xl font-semibold text-black'>@{props.userName}</h2>
						</label>
						<label>
							<h2 className='bg-transparent border-none text-2xl md:text-3xl text-[#A9A9A9]'>{props.personName}</h2>
						</label>
					</div>
				</div>
				<div className='flex items-center justify-center md:pt-10'>
					<button className='w-52 h-12 flex-row justify-center items-center cursor-pointer gap-4 bg-[#ECECEC] rounded-full drop-shadow-lg hidden md:flex' onClick={
						() => {
							document.location.href = '/profile/edit-profile'
						}
					}>
						<img src={lapis} alt="" />
						Editar	
					</button>
				</div>
			</div>
		</section>
	)
};
