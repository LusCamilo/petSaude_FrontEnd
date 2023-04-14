import React from "react";
import { Link } from "react-router-dom";
import { HeaderWeb } from "./resource/HeaderWeb";
import Footprint from "../../assets/svg/petPaws.svg";
import Dog from "../../assets/svg/dogAndCat.svg";
import Doctor from "../../assets/svg/medico 1.svg";
import "./css/LandingPage.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { ListItem } from "./resource/searchArea";
import { useEffect, useState } from 'react';
import { FilterByName } from "./filterName";
import Local from "../../assets/svg/Gps.svg"
import { getUsers} from "../../services/integrations/filters";
import { useForm } from 'react-hook-form';

export const LandingPage = () => {
	//https://www.luiztools.com.br/post/tutorial-listagem-com-busca-em-reactjs/
	//<ListItem Name="Yasmini" bairro="Novo Osasco" />

	const { register, handleSubmit, formState: { errors } } = useForm();	

	let [vets, setVets] = useState([]);
	let json
	const onSearch = async (data) => {
	  console.log(data);
	  try {
		  if(data.search == ''){
			setVets([])
		  }else {
			let response = await getUsers(data.search);
			console.log(response);
			let result = response.response
			console.log(result);
			json = result.filter(item => item.personName.toLowerCase().includes(data.search.toLowerCase()) || item.userName.toLowerCase().includes(data.search.toLowerCase()));;
			result.map(item => console.log('marmita'))
			console.log(json);
			setVets(json)
			console.log(vets);
		  }
		
	  } catch (error) {
		console.error(error);
	  }
	};

	function handleClick(event) {
		document.location.href = "/profile/veterinary";
		localStorage.setItem("__Vet_Id", event);
	  }

	return (
		<section className="">
			<HeaderWeb />
			<div className=" flex flex-col pt-20  ml-10 justify-center gap-5 pl-10
    xl:flex-row font-normal texto-2xl  md:flex-row">
				<div className="w-80 md:w-1/2 xl:w-1/4 static">
					<div className="w-full static flex flex-col bg-white border rounded-lg border-black transition hover:border-green-200  p-5  ">
						<div className="flex flex-row gap-10 w-full">
							<img className="w-10" src={Doctor} />
							<form onChange={handleSubmit(onSearch)} className="w-full">
								<input className="xl:w-full h-10 text-2xl" placeholder="Pesquisar especialistas" {...register("search")}/>
							</form>
						</div>
						<div className="absolute w-1/5 bg-white border-2 border-black  mt-16">
						{vets.map(vet => {
								console.log(vet);
								return (
								<ListItem
									key={vet.id}
									Name={vet.userName}
									image={vet.profilePhoto}
									bairro={vet.Address.cep}
									formacao={vet.formation}
									onChange={handleClick(vet.id)}
								/>
							)
						})}
					</div>
					</div>
				</div>
				<div className="static flex flex-row gap-5 bg-white border rounded-lg border-black transition hover:border-green-200 p-5 pl-5 w-80 md:w-1/2 xl:w-1/4">
					<div className="flex flex-row gap-10 w-full">
						<img className="w-10" src={Local} />
						<form  className="w-full">
							<input className="xl:w-full h-10 text-2xl" placeholder="Pesquisar veterinários próximos " />
						</form>
					</div>
				</div>
			</div>
			<div className="flex flex-row justify-between content center w-auto h-4/5 mt-10 ml-10 ">

				<div className=" flex flex-col justify-center items-center w-50 ">
					<h1
						className="basis-2/4 flex justify-center items-center font-bold text-3xl h-20 w-full lg:pl-60 pl-4 xl:text-7xl ">Agende
						suas consultas e forneça o melhor para o seu Pet!</h1>
					<Link 
						className="flex text-center justify-center items-center border-2 rounded-xl border-[#9ED1B7] p-1 xl: basis-1-6 mt-10 xl:h-20 w-96 basis-1/6 text-3xl transition hover:bg-[#9ED1B7] hover:text-white hover:shadow-xl hover:scale-110"
						to="/home/searchProfessionals">Procure um veterinário próximo!</Link>
				</div>


				<div className="invisible md:flex justify-end content-center basis-1/2 lg:bg-none ">
					<img className="mt-10 invisible md:visible xl:visible w-5/6" src={Dog} />
				</div>
			</div>

			<div>
				<img className=" w-3/2 mt-5 xl:w-2/4" src={Footprint} />
			</div>
		</section>
	);
};

