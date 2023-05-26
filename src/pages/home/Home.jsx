import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components/headers/headerEdits";
import { signup } from "../../services/integrations/authentication";

const userId = async () => {
	const apiResponse = await signup(localStorage.getItem("__user_JWT"));

	localStorage.setItem("__user_id", apiResponse.user.id);
	localStorage.setItem("__user_isVet", apiResponse.user.isVet);
};

export const HomePage = () => {
	useEffect(() => {
		userId();
	}, []);

	return (
		<>
			<Header />

			<p>home</p>
			<div className="flex flex-col">
				<div className="flex flex-col gap-5 content-center bg-green-500">
					<p className="font-bold text-2xl">Já tá pronta</p>
					<Link to="/login">Login do usuario</Link>
					<Link to="/register/address">Endereço do usuario</Link>
					<Link to="/register/veterinary">Cadastro do veterinario</Link>
					<Link to="/">Home</Link>
					<Link to="/home/about-us">Sobre nós</Link>
					<Link to="/profile/pet/add">Criar pet</Link>
					<Link to="/home/search-professionals">Procurar profissionais</Link>
				</div>
				<div className="flex flex-col gap-5 content-center bg-purple-600">
					<p className="font-bold text-2xl">Tela em produção</p>
					<Link to="/profile/configuration">Configuração de usuário</Link>
					<Link to="/profile/pet/edit">Configuração de pet</Link>
					<Link to="/profile/edit-profissionais">Editar perfil</Link>
					<Link to="/profile/veterinary">Perfil do veterinário</Link>
					<Link to="/profile/appointment-view">Tela de visualização dos agendamentos</Link>
				</div>
				<div className="flex flex-col gap-5 content-center bg-yellow-300">
					<p className="font-bold text-2xl">Apenas componentes</p>
					<Link to="/pet/petHeader">Header das telas Web</Link>
					<Link to="/home/resource/HeaderInfo">Header with Infos</Link>
					<Link to="/home/resource/Footer">Footer</Link>
					<Link to="/pages/userProfile/resource/editUser/headerConfig">Header config infos profile</Link>
					<Link to="/profile/appointment">Appointment</Link>
					<Link to="/pages/userProfile/resource/header">Header config veterinary</Link>
				</div>
			</div>
		</>
	);
};
