import React from 'react';
import { Link } from "react-router-dom";
import Home from '../../../../assets/svg/Home.svg';
import Work from '../../../../assets/svg/Work.svg';
import Info from '../../../../assets/svg/InfoOutline.svg';
import Calendary from '../../../../assets/svg/Calendar today.svg';
import Person from '../../../../assets/svg/Person.svg';
import Lock from '../../../../assets/svg/Lock.svg';
import lapis from "../../../../assets/svg/pencil.svg";
import configIcon from "../../../../assets/svg/Icon button.svg";

export const Config = (props) => {
	return (
		<section>
			<div className="flex font-normal items-center justify-between bg-white shadow pl-5 xl:p-10 h-30 text-4xl">
				<div className='flex flex-row justify-center align-center text-center'>
					<button className="block d:hidden  py-3 md:px-4 mx-2 rounded focus:outline-none hover-bg-gray-200 group ">
						<div className="w-8 h-1.5 bg-[#000] mb-1 md:w-10 md:h-1.5"></div>
						<div className="w-8 h-1.5 bg-[#000] mb-1 md:w-10 md:h-1.5"></div>
						<div className="w-8 h-1.5 bg-[#000] mb-1 md:w-10 md:h-1.5"></div>
						<div className="absolute top-0 -left-full opacity-0 h-screen w-96 bg-[#ECECEC] border transform
                group-focus:left-0 group-focus:opacity-100 transition-all duration-300">
							<h2 className="pt-10 pl-5 text-left  text-2xl font-semibold md:font-5xl">Menu</h2>
							<ul className="flex flex-col items-center w-full text-base cursor-pointer pt-5 space-y-3">
								<Link to="/home" className="flex hover:bg-[#9ED1B7]  py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">
									<img src={Home} className="pr-3  w-14" alt='Home' />
									<p className='pt-2'>Home</p>

								</Link>
								<Link to="/home/search-professionals" className="flex hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">
									<img src={Work} className="pr-3  w-14" alt='Briefing case'/>
									<p className='pt-2'>Profissionais</p>
								</Link>
								{/* <Link to="/home/BlogPreview" className="flex hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">
                  <img src={Blog} className="pr-3 w-14"></img>
                  <p className='pt-2'> Blog</p>

                </Link> */}
								<Link to="/home/aboutUs" className="flex hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">
									<img src={Info} className="pr-3 w-14" alt='Info' />
									<p className='pt-2'> Sobre nós</p>

								</Link>
								<Link to="/profile/appointment-view" className="flex hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">
									<img src={Calendary} className="pr-3  w-14" alt='Calendary'/>
									<p className='pt-2'>Consultas</p>
								</Link>
							</ul>
							<h3 className="pt-5 pl-5 text-left  text-2xl font-semibold">Configurações</h3>
							<ul className="flex flex-col items-center w-full text-base cursor-pointer pt-5 space-y-3">
								<Link to="/profile/veterinar" className="flex hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">
									<img src={Person} className="pr-3 w-14 " alt='Person' />
									<p className='pt-2'>Perfil</p>
								</Link>
								<Link to="/profile/edit-profile" className="flex hover:bg-[#9ED1B7] py-2 px-6 bg-[#D9D9D9]  h-30 w-5/6 text-left rounded-full ">
									<img src={Lock} className="pr-3 w-14" alt='Lock' />
									<p className='pt-2'>Segurança</p>
								</Link>
							</ul>
						</div>
					</button>

					<h1 className=" text-1xl justify-start font-bold hidden md:flex md:pt-1">PetSaúde</h1>
					<h1 className=" text-1xl pt-3 md:pt-5 font-normal flex md:hidden pl-24">Perfil</h1>

					<div className="flex content-items-center flex-direction md:pt-2 md:hidden pl-20" >
						<img className="flex content-center content-items-center h-20 xl:w-2/4  pt-2" src={configIcon} alt='Configuration gear' />
					</div>

				</div>
				<div className=" md:flex items-center gap-5" >
					<img className="w-20 pl-5 pt-20 pr-1 md:pt-1 md:w-20 hidden md:flex " src={props.profilePhoto} alt='Profile' />
					<Link to="../login" className="flex home-btn text-2xl">
						{props.personName}
					</Link>
				</div>
			</div>
			<div className='flex justify-between ml-5 md:ml-20'>
				<div className='flex items-center justify-center md:pt-10'>
					<img className=' md:w-60 md:h-60 rounded-full bg-slate-200' src={props.profilePhoto} alt='Profile' />
					<div className='flex flex-col pl-10 pt-5 '>
						<label>
							<h2 className='bg-transparent border-none text-2xl md:text-5xl font-semibold '>@{props.userName}</h2>
						</label>
						<label>
							<h2 className='bg-transparent border-none text-2xl md:text-1xl text-[#A9A9A9]'>{props.personName}</h2>
						</label>
					</div>
				</div>
				<div className='content-start pr-44 mt-20 justify-end hidden md:flex'>
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
