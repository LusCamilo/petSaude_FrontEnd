import React, {useState, useEffect} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import lapis from "../../../../assets/svg/pencil.svg"
import {updatePersonalInfosClient, updatePersonalInfosVeterinary} from '../../../../services/integrations/user';
import Notifications from "../../../../utils/Notifications";
import {login} from "../../../../services/integrations/authentication";
import jwt_decode from "jwt-decode";

export const Pessoais = (props) => {

	const [personalInfos, setPersonalInfos] = useState({disabled: true, textColor: 'opacity-50'})
	const [name, setName] = useState('')
	const [lastName, setLastName] = useState('')
	const [cpf, setCpf] = useState('')
	const [rg, setRg] = useState('')
	const [celular, setCelular] = useState('')
	const [telefone, setTelefone] = useState('')
	const [bio, setBio] = useState('')

	function handleNameChange(event) {
		setName(event.target.value);
	}

	function handleLastNameChange(event) {
		setLastName(event.target.value);
	}

	function handleCpfChange(event) {
		let inputValue = event.target.value;
		inputValue = inputValue.replace(/\D/g, '');

		if (inputValue.length > 11) {
			inputValue = inputValue.substr(0, 11);
		}
		inputValue = inputValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

		setCpf(inputValue);
	}


	function handleRgChange(event) {
		let inputValue = event.target.value;
		inputValue = inputValue.replace(/[^a-zA-Z0-9]/g, '');
		if (inputValue.length > 10) {
			inputValue = inputValue.substr(0, 10);
		}
		inputValue = inputValue.replace(/([a-zA-Z0-9]{2})([a-zA-Z0-9]{3})([a-zA-Z0-9]{3})([a-zA-Z0-9]{1})/, '$1.$2.$3-$4');
		setRg(inputValue);
	}

	function handleCelularChange(event) {
		let inputValue = event.target.value;
		inputValue = inputValue.replace(/\D/g, '');
		if (inputValue.length > 11) {
			inputValue = inputValue.substr(0, 11);
		}
		inputValue = inputValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
		setCelular(inputValue);
	}

	function handleTelefoneChange(event) {
		let inputValue = event.target.value;
		inputValue = inputValue.replace(/\D/g, '');
		if (inputValue.length > 8) {
			inputValue = inputValue.substr(0, 8);
		}
		inputValue = inputValue.replace(/(\d{4})(\d{4})/, '$1-$2');
		setTelefone(inputValue);
	}

	function handleTextChange(event) {
		setBio(event.target.value);
	}

	useEffect(() => {
		setName(props.name)
		setLastName(props.lastName)
		setCpf(props.cpf)
		setRg(props.rg)
		setCelular(props.celular)
		setTelefone(props.telefone)
		setBio(props.text)
	}, [
		props.name,
		props.lastName,
		props.cpf,
		props.rg,
		props.celular,
		props.telefone,
		props.text
	])

	function validateForm() {
		return !(name === '' ||
			lastName === '' ||
			cpf === '' ||
			celular === '');

	}

	const handleSubmit = async () => {
		try {
			let response
			let infos
			let userType

			await Notifications.confirmOrCancel('Deseja atualizar seus dados?', async (result) => {
				if (result.isConfirmed) {
					if (!validateForm()) await Notifications.error('Existem campos vazios que devem ser preenchidos.')

					infos = {
						personName: name + ' ' + lastName,
						cpf,
						rg: rg === null ? '' : rg,
						cellphoneNumber: celular,
						phoneNumber: telefone === null ? '' : telefone,
						bio: bio === null ? '' : bio
					}

					if (localStorage.getItem('__user_isVet') === true) userType = 'veterinary'
					else userType = 'client'

					if (userType === 'client') response = await updatePersonalInfosClient(infos)
					else response = await updatePersonalInfosVeterinary(infos)

					if (response?.message?.meta) await Notifications.error(response.message.meta.cause)
					if (response.response) await Notifications.success('Informações alteradas com sucesso')
				} else {
					await Notifications.success('Nenhuma informação alterada!')
				}
			})
		} catch (err) {
			if (err instanceof Error) await Notifications.error(err.message)
		}
	}

	return (
		<section
			className='w-full h-full border-none sm:border-solid border-2 rounded-lg border-black flex flex-col gap-10 md:pl-20 py-8'>
			<h2 className='text-5xl md:text-6xl font-bold font-sans text-center sm:text-left'>Informações Pessoais</h2>
			<div className='flex flex-row'>
				<div className='flex flex-row justify-between w-full  pr-0 sm:pr-12'>
					<form className='gap-1 sm:gap-10 mt-10 grid grid-cols-1 sm:grid-cols-2 sm:w-4/5'>
						<div className=''>
							<label className='flex flex-col text-xl text-[#A9A9A9]'>
								Primeiro nome
								<input disabled={personalInfos.disabled} type="text" name="firstName" onBlurCapture={handleNameChange}
											 onChange={handleNameChange} defaultValue={name}
											 className={`bg-transparent border-none text-2xl text-[#000] ${personalInfos.textColor}`}/>
							</label>
						</div>
						<div className='flex justify-center'>
							<label className='flex flex-col text-xl text-[#A9A9A9]'>
								Sobrenome
								<input disabled={personalInfos.disabled} type="text" name="firstName"
											 onBlurCapture={handleLastNameChange} onChange={handleLastNameChange} defaultValue={lastName}
											 className={`bg-transparent border-none text-2xl text-[#000]${personalInfos.textColor}`}/>
							</label>
						</div>
						<div className=''>
							<label className='flex flex-col text-xl text-[#A9A9A9]'>
								CPF
								<input disabled={personalInfos.disabled} type="text" name="firstName" onBlurCapture={handleCpfChange}
											 onChange={handleCpfChange} value={cpf}
											 className={`bg-transparent border-none text-2xl text-[#000] ${personalInfos.textColor}`}/>
							</label>
						</div>
						<div className='flex justify-center'>
							<label className='flex flex-col text-xl text-[#A9A9A9]'>
								RG
								<input disabled={personalInfos.disabled} type="text" name="firstName" onBlurCapture={handleRgChange}
											 onChange={handleRgChange} value={rg}
											 className={`bg-transparent border-none text-2xl text-[#000]${personalInfos.textColor}`}/>
							</label>
						</div>
						<div className=''>
							<label className='flex flex-col text-xl text-[#A9A9A9]'>
								Celular
								<input disabled={personalInfos.disabled} type="text" name="firstName"
											 onBlurCapture={handleCelularChange} onChange={handleCelularChange} value={celular}
											 className={`bg-transparent border-none text-2xl text-[#000]${personalInfos.textColor}`}/>
							</label>
						</div>
						<div className='flex justify-center'>
							<label className='flex flex-col text-xl text-[#A9A9A9]'>
								Telefone
								<input disabled={personalInfos.disabled} onBlurCapture={handleTelefoneChange} type="text"
											 name="firstName" onChange={handleTelefoneChange} value={telefone}
											 className={`bg-transparent border-none text-2xl text-[#000]${personalInfos.textColor}`}/>
							</label>
						</div>
					</form>
				</div>
				<div className='hidden sm:flex flex-row w-1/5 justify-end pr-10 '>
					<button
						className='w-52 h-12 flex flex-row justify-center items-center gap-4 bg-[#ECECEC] rounded-full drop-shadow-lg'
						onClick={() => {
							if (personalInfos.disabled == true) {
								setPersonalInfos({disabled: false, textColor: ''})
							} else {
								handleSubmit()
							}
						}}>
						<img src={lapis} alt=""/>
						Editar
					</button>
				</div>
			</div>
			<div className='w-full sm:mr-10'>
				<p className='flex flex-col text-xl text-[#A9A9A9] pt-3 sm:pt-20 mr-0 sm:mr-20 w-full sm:w-10/12 '> Biografia
					<TextareaAutosize disabled={personalInfos.disabled} id="my-textarea" onBlurCapture={handleTextChange}
														onChange={handleTextChange} defaultValue={bio}
														className="block w-full p-2 rounded resize-none"/>
				</p>
			</div>
		</section>
	);
};
