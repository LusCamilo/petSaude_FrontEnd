import React, {useState, useEffect} from 'react';
import lapis from "../../../../assets/svg/pencil.svg"
import lapisConfirm from "../../../../assets/svg/pencilConfirm.svg"
import {updateAddress} from "../../../../services/integrations/address.js";
import Notifications from "../../../../utils/Notifications";


export const Address = (props) => {
	const [address, setAddress] = useState({disabled: true, textColor: 'opacity-50'})
	const [button, setButton] = useState({text: 'Editar', color: '#000', bgColor: '#ECECEC', icon: lapis})

	const [cep, setCep] = useState('')
	const [complement, setComplement] = useState('')
	const [number, setNumber] = useState('')

	function handleCepChange(event) {
		let inputValue = event.target.value;
		inputValue = inputValue.replace(/\D/g, '');

		if (inputValue.length > 8) {
			inputValue = inputValue.substr(0, 8);
		}
		inputValue = inputValue.replace(/(\d{5})(\d{3})/, '$1-$2');

		setCep(inputValue);
	}

	function handleComplementChange(event) {
		setComplement(event.target.value);
	}

	function handleNumberChange(event) {
		setNumber(event.target.value);
	}

	useEffect(() => {
		setCep(props.cep)
		setComplement(props.complemento)
		setNumber(props.number)
	}, [
		props.cep,
		props.complement,
		props.number
	])

	async function validateCep(zipCode) {
		let parsedZipCode = zipCode.split('-').join('')
		return fetch(`https://opencep.com/v1/${parsedZipCode}`)
			.then(response => response.json())
	}

	async function validateForm() {
		try {
			if (cep !== '' || cep !== null) {
				const apiResponse = await validateCep(cep)
				if (apiResponse.error) {
					await Notifications.error('CEP inválido ou não encontrado')
					return false
				}
				return true
			}
			await Notifications.error('O CEP deve ser preenchido')
			return false
		} catch (err) {
			return false
		}
	}

	async function handleSubmit() {
		try {
			await Notifications.confirmOrCancel('Deseja atualizar o endereço?', async (result) => {
				if (result.isConfirmed) {
					if (await validateForm()) {
						updateAddress({zipCode: cep, number, complement}, props.id)
							.catch(err => Notifications.error(err.message))
						await Notifications.success('Endereço atualizado com sucesso')
					}
				} else await Notifications.success('Nenhum dado alterado')
			})
		} catch (err) {
			if (err instanceof Error) await Notifications.error(err.message)
		}
	}

	return (
		<div
			className='w-full h-full border-none sm:border-solid border-2 rounded-lg border-black flex flex-col pl-2 md:p-10'>
			<h2 className='text-5xl md:text-6xl font-bold text-center sm:text-left'>Endereço</h2>
			<div className='flex flex-row justify-between '>
				<div className='gap-1 sm:gap-10 mt-10 grid grid-cols-1 sm:grid-cols-2 sm:w-4/5'>
					<div className=''>
						<label className='flex flex-col text-2xl text-[#A9A9A9]'>
							CEP
							<input disabled={address.disabled} type="text" onBlurCapture={handleCepChange}
										 onChange={handleCepChange}
										 name="firstName" value={cep}
										 className={`bg-transparent border-none text-2xl text-[#000] ${address.textColor}`}/>
						</label>
					</div>
					<div className='flex justify-start md:ml-24'>
						<label className='flex flex-col text-2xl text-[#A9A9A9]'>
							Cidade
							<input disabled="true" type="text" name="firstName" defaultValue={props.cidade}
										 className={`bg-transparent border-none text-2xl opacity-50`}/>
						</label>
					</div>
					<div className=''>
						<label className='flex flex-col text-2xl text-[#A9A9A9]'>
							Rua
							<input disabled="true" type="text" name="firstName" defaultValue={props.rua}
										 className={`bg-transparent border-none text-2xl opacity-50`}/>
						</label>
					</div>
					<div className='flex justify-start text-2xl md:ml-24'>
						<label className='flex flex-col text-xl text-[#A9A9A9] w-full'>
							Bairro
							<input disabled="true" type="text" name="firstName" defaultValue={props.bairro}
										 className={`bg-transparent border-none text-2xl opacity-50 w-full`}/>
						</label>
					</div>
					<div className=''>
						<label className='flex flex-col text-2xl text-[#A9A9A9]'>
							Número
							<input disabled={address.disabled}onChange={handleNumberChange} type="text" name="número"
								defaultValue={number}
										 className={`bg-transparent border-none text-2xl text-[#000]${address.textColor}`}/>
						</label>
					</div>
					<div className='flex justify-start md:ml-24'>
						<label className='flex flex-col text-2xl text-[#A9A9A9]'>
							Complemento
							<input disabled={address.disabled} onChange={handleComplementChange} type="text" name="complemento"
										 defaultValue={complement}
										 className={`bg-transparent border-none text-2xl text-[#000]${address.textColor}`}/>
						</label>
					</div>
				</div>
				<div className='hidden sm:flex flex-col content-end aling-end pr-10 '>
					<button
						className={`w-fit px-14 h-14 flex-row justify-center items-center cursor-pointer gap-4 rounded-full drop-shadow-lg hidden md:flex text-2xl bg-[${button.bgColor}] text-[${button.color}]`}
						onClick={() => {
							if (address.disabled === true) {
								setButton({text: 'Confirmar', bgColor: '#49454F', color: '#A9A9A9', icon: lapisConfirm})
								setAddress({disabled: false, textColor: ''})
							} else {
								setAddress({disabled: true, textColor: 'opacity-50', text: 'Editar'})
								setButton({text: 'Editar', color: '#000', bgColor: '#ECECEC', icon: lapis})
								handleSubmit()

							}
						}}>
						<img src={button.icon} alt="" className='h-7'/>
						{button.text}
					</button>
				</div>
			</div>
		</div>
	);
}

