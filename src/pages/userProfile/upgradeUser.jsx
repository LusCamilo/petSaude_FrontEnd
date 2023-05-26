import React, {useEffect, useState} from 'react';
// import {Link} from 'react-router-dom';
import { Address } from './resource/editUser/address';
import { Pessoais } from './resource/editUser/infosPerson';
import { Prossionais } from './resource/editUser/infosProfissional';
import './css/UpgradeUser.css';
import { Pets } from './resource/editUser/allPets';
import { Config } from "./resource/editUser/headerConfig.jsx";
import { deleteClient, deleteVeterinary, getUser, getVeterinary } from '../../services/integrations/user';
import Notifications from "../../utils/Notifications";
// import {BsFillPersonFill} from "react-icons/bs";
import { IoMdTrash } from "react-icons/io";


const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		borderRadius: '10px',
		width: '40vw',
		height: '40vh',
		display: "flex",
		justifyContent: "center",
		backgroundColor: "#F9DEDC"
	}
};

const dataFormation = (date) => {
	const dataFormation = date.split("T")
	return dataFormation[0]
}
const InfosUser = async () => {
	const token = localStorage.getItem('__user_JWT')
	if (localStorage.getItem('__user_isVet') === 'false') {
		const response = await getUser(localStorage.getItem('__user_id'))
		const [nome, ...sobrenomes] = response.response.user.personName.split(' ');
		const sobrenome = sobrenomes.join(' ');
		return {
			id: response.response.user.id,
			personName: response.response.user.personName,
			firstName: nome,
			lastName: sobrenome,
			userName: response.response.user.userName,
			cpf: response.response.user.cpf,
			rg: response.response.user.rg,
			profilePhoto: response.response.user.profilePhoto,
			profileBannerPhoto: response.response.user.profileBannerPhoto,
			email: response.response.user.email,
			password: response.response.user.password,
			phoneNumber: response.response.user.phoneNumber,
			cellphoneNumber: response.response.user.cellphoneNumber,
			biography: response.response.user.biography,
			addressId: response.response.user.addressId,
			cep: response.response.user.Address.cep,
			number: response.response.user.Address.number,
			complement: response.response.user.Address.complement,
		}
	} else {
		const response = await getVeterinary(localStorage.getItem('__user_id'))
		const [nome, ...sobrenomes] = response.response.user.personName.split(' ');
		const sobrenome = sobrenomes.join(' ');
		const formation = dataFormation(response.response.user.formationDate)
		const actingDate = dataFormation(response.response.user.startActingDate)
		return {
			id: response.response.user.id,
			personName: response.response.user.personName,
			firstName: nome,
			lastName: sobrenome,
			userName: response.response.user.userName,
			cpf: response.response.user.cpf,
			rg: response.response.user.rg,
			profilePhoto: response.response.user.profilePhoto,
			profileBannerPhoto: response.response.user.profileBannerPhoto,
			email: response.response.user.email,
			password: response.response.user.password,
			phoneNumber: response.response.user.phoneNumber,
			cellphoneNumber: response.response.user.cellphoneNumber,
			biography: response.response.user.biography,
			addressId: response.response.user.addressId,
			cep: response.response.user.Address.cep,
			number: response.response.user.Address.number,
			complement: response.response.user.Address.complement,
			crmv: response.response.user.crmv,
			formationDate: formation,
			startActingDate: actingDate,
			occupationArea: response.response.user.occupationArea,
			formation: response.response.user.formation,
			institution: response.response.user.institution,
			PetSpecieVeterinary: response.response.user.PetSpecieVeterinary,
			VeterinaryEspecialities: response.response.user.VeterinaryEspecialities
		}
	}
}
const getAddressFromZipCode = async (cep) => {
	return (await fetch(`https://viacep.com.br/ws/${cep}/json/`)).json()
}
export const UpgradeUser = () => {
	const [infos, setInfos] = useState({})
	useEffect(() => {
		async function fetchData() {
			const allInfosUser = (await InfosUser())
			const address = (await getAddressFromZipCode(allInfosUser.cep))
			console.log(allInfosUser.number);
			setInfos(
				{
					userName: allInfosUser.userName,
					personName: allInfosUser.personName,
					firstName: allInfosUser.firstName,
					lastName: allInfosUser.lastName,
					profilePhoto: allInfosUser.profilePhoto,
					cpf: allInfosUser.cpf,
					rg: allInfosUser.rg,
					celular: allInfosUser.cellphoneNumber,
					telefone: allInfosUser.phoneNumber,
					text: allInfosUser.biography,
					cep: allInfosUser.cep,
					addressId: allInfosUser.addressId,
					rua: address.logradouro,
					bairro: address.bairro,
					estado: address.uf,
					cidade: address.localidade,
					complemento: allInfosUser.complement,
					number: allInfosUser.number,
					profileBannerPhoto: allInfosUser.profileBannerPhoto,
					institution: allInfosUser.institution,
					crmv: allInfosUser.crmv,
					formationDate: allInfosUser.formationDate,
					startActingDate: allInfosUser.startActingDate,
					occupationArea: allInfosUser.occupationArea,
					formation: allInfosUser.formation,
					PetSpecieVeterinary: allInfosUser.PetSpecieVeterinary,
					VeterinaryEspecialities: allInfosUser.VeterinaryEspecialities
				}
			)
		}

		fetchData()
	}, [])

	async function handleDeleteUser() {
		await Notifications.warningConfirmOrCancel('Tem certeza que deseja excluir o seu perfil?', 'Essa ação é irreversível', async (result) => {
			if (result.isConfirmed) {
				document.location.href = '/login'
				await deleteClient(localStorage.getItem('__user_JWT'))
			}
		})
	}

	return (
		<section>
			<Config userName={infos.userName} personName={infos.personName} profilePhoto={infos.profilePhoto}/>
			<main className='flex flex-col gap-10'>
				<Pessoais name={infos.firstName} lastName={infos.lastName} cpf={infos.cpf} rg={infos.rg} celular={infos.celular}
									telefone={infos.telefone} text={infos.text} className=''/>
				<Address id={infos.addressId} viaCep={getAddressFromZipCode} cep={infos.cep} bairro={infos.bairro}
								 rua={infos.rua} estado={infos.estado} cidade={infos.cidade} number={infos.number} complemento={infos.complemento}
								 className=''/>

				{localStorage.getItem("__user_isVet") === 'true' ?
					<>
						<Prossionais area={infos.occupationArea} instituicao={infos.institution} dataFormacao={infos.formationDate}
									formacao={infos.formation} crmv={infos.crmv} dataInicioAtuacao={infos.startActingDate}
									className='' 
						/>
						<div className='w-full sm:flex justify-end'>
							<button
								className='p-3 flex flex-row content-center items-center gap-3 text-[#410E0B] bg-[#F9DEDC] text-3xl h-16 rounded-xl w-64'
								onClick={() => {
									deleteVeterinary(localStorage.getItem('__user_id'), localStorage.getItem('__user_JWT'))
									document.location.href = '/login'
								}}>
								<IoMdTrash className='text-7xl'/>
								Excluir perfil
							</button>
						</div>
					</>
					:
					<>
						<Pets personImage={infos.profilePhoto}/>
						<div className='w-full sm:flex justify-end'>
							<button
								className='p-3 flex flex-row content-center items-center gap-3 text-[#410E0B] bg-[#F9DEDC] text-3xl h-16 rounded-xl w-64'
								onClick={handleDeleteUser}>
								<IoMdTrash className='text-7xl'/>
								Excluir perfil
							</button>
							{/*<Modal*/}
							{/*	isOpen={modalIsOpen}*/}
							{/*	onAfterOpen={afterOpenModal}*/}
							{/*	onRequestClose={closeModal}*/}
							{/*	style={customStyles}*/}
							{/*	contentLabel="Example Modal"*/}
							{/*>*/}
							{/*	<WarnRequest onClose={closeModal} description="Tem certeza que deseja excluir seu perfil?"*/}
							{/*							 onSave={deletePetzinho} href="/login"/>*/}
							{/*</Modal>*/}
						</div>
					</>
				}
			</main>
		</section>
	);
}
