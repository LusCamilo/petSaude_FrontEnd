import React, { useState, useEffect } from "react";
import "./css/cadastroVet.css";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { getSpecialties, updateSpecialities } from "../../services/integrations/specialties";
import { getSpecialtiesPet, updateSpecialitiesPet } from "../../services/integrations/specialtiesPet";
import backgroundImage from "../../assets/svg/imgVetCadastro.svg";
import { AuthHeader } from "../../components/headers/AuthHeader";
import { registerVet } from "../../services/integrations/user";
import 'react-toastify/dist/ReactToastify.css';
import Notifications from "../../utils/Notifications";

const checkboxSpecialities = async () => {
	const response = await getSpecialties()
	return {
		allSpecialities: response.response,
	}

}
const checkboxSpecialitiesPet = async () => {
	const response = await getSpecialtiesPet()
	return {
		allSpecialitiesPet: response.response,
	}
}

export const RegisterVeterinary = () => {
	const [especialidades, setEspecialidades] = useState([])
	const [especialidadesPet, setEspecialidadesPet] = useState([])
	const [checkedBoxes, setCheckedBoxes] = useState([]);
	const [checkedBoxesEspecialidades, setCheckedBoxesEspecialidades] = useState([]);

	let hoje = new Date();
	let ano = hoje.getFullYear();
	let mes = hoje.getMonth() + 1;
	let dia = hoje.getDate();
	if (mes < 10) mes = '0' + mes
	if (dia < 10) dia = '0' + dia
	let dataFormatada = `${ano}-${mes}-${dia}`;


	useEffect(() => {
		async function fetchDataAll() {
			const dados = await checkboxSpecialities()
			const dadosPet = await checkboxSpecialitiesPet()
			setEspecialidades(dados.allSpecialities)
			setEspecialidadesPet(dadosPet.allSpecialitiesPet)
		}

		fetchDataAll()
	}, [])

	const handleCheckBoxEspecialidadesChange = async (event) => {
		const { id } = event.target;
		const isChecked = event.target.checked;
		const index = checkedBoxesEspecialidades.findIndex((item) => item.id === parseInt(id));

		if (isChecked) {
			if (index === -1) {
				setCheckedBoxesEspecialidades((prevState) => [...prevState, { specialtiesId: parseInt(id) }]);
			}
		} else {
			if (index !== -1) {
				setCheckedBoxesEspecialidades((prevState) =>
					prevState.filter((item) => item.id !== parseInt(id))
				);
			}
		}
	};

	const handleCheckBoxPetChange = (event) => {
		const { id } = event.target;
		const isChecked = event.target.checked;
		const index = checkedBoxes.findIndex((item) => item.id === parseInt(id));

		if (isChecked) {
			if (index === -1) {
				setCheckedBoxes((prevState) => [...prevState, { animalTypesId: parseInt(id) }]);
			}
		} else {
			if (index !== -1) {
				setCheckedBoxes((prevState) =>
					prevState.filter((item) => item.id !== parseInt(id))
				);
			}
		}
	};

	useEffect(() => {
	}, [checkedBoxes, checkedBoxesEspecialidades]);

	const { register, handleSubmit, formState: { errors } } = useForm()
	const [formation, setFormation] = useState('1900-01-01')

	const minStartActivy = (date) => {
		setFormation(date);
	};

	const handleCRMVChange = (event) => {
		let inputValue = event.target.value;
		inputValue = inputValue.replace(/\D/g, '');
		if (inputValue.length > 4) {
			inputValue = inputValue.substr(0, 4);
		}

		event.target.value = inputValue

	}


	const submitForm = async data => {
		const userInfos = JSON.parse(localStorage.getItem('__user_register_infos'))

		const allInfos = {
			personName: `${userInfos.firstName} ${userInfos.lastName}`,
			cpf: userInfos.cpf,
			email: userInfos.email,
			password: userInfos.password,
			cellphoneNumber: userInfos.cellphoneNumber,
			phoneNumber: userInfos.phoneNumber,
			isVet: false,
			address: {
				...userInfos.address
			},
			crmv: data.crmv,
			occupationArea: data.occupationArea,
			formation: data.formation,
			institution: data.institution,
			formationDate: data.formationDate,
			startActingDate: data.startActingDate
		}

		if (validateForm(data)) {
			const { response } = await registerVet(allInfos);

			if (response.id) {

				const specialities = checkedBoxesEspecialidades.map(item => {
					return { ...item, veterinaryId: response.id };
				});
				const attendedAnimals = checkedBoxes.map(item => {
					return { ...item, veterinaryId: response.id };
				});
				console.log(specialities);
				console.log(attendedAnimals);

				await updateSpecialitiesPet(JSON.stringify({ AnimalTypesVetInfos: attendedAnimals }));
				await updateSpecialities(JSON.stringify({ specialties: specialities }));

				await Notifications.success('Veterinário criado com sucesso');
				setTimeout(function () { document.location.href = '/login'; }, 3500);

			} else {
				if (response.error)
					if (response.error.toLowerCase().includes('crmv')) await Notifications.error('O CRMV já está em uso')
				if (response.toLowerCase().includes('e-mail')) await Notifications.error('O e-mail já está em uso')
				else await Notifications.error('Não foi possível criar o usuário')
				setTimeout(function () {
					// document.location.href = '/register'
				}, 2000);
			}
		} else await Notifications.error('Dados inválidos')
	}


	const validateForm = (data) => {
		return !!data;
	}

	return (
		<section className='flex flex-row-reverse w-screen h-screen bg-gradient-to-br from-[#092b5a] to-[#9ed1b7] opacity-90 overflow-x-hidden'>
			<div className='absolute w-full h-full overflow-hidden flex items-center justify-start'>
				<img src={backgroundImage} alt="" className='w-1/2 h-fit p-4' />
			</div>
			<div className='lg:w-1/2 md:w-full w-full min-h-screen h-fit bg-white flex flex-col md:justify-center justify-between items-center lg:gap-6 md:gap-4 sm:gap-2 z-10 p-4'>
				<AuthHeader title='Cadastro de profissionais' subtitle='Por favor, insira as informações abaixo e aproveite a plataforma! ' firebaseFeature={false} />
				<form className='h-fit lg:w-3/4 w-full gap-2 p-0 lg:mt-10 md:mt-6' onSubmit={handleSubmit(submitForm)}>
					<div className='w-full flex flex-col items-start m-1'>
						<span className='font-normal md:text-xl text-lg'>Especialidades</span>
						<div className='flex flex-wrap gap-2 m-1'>
							<div className='flex flex-wrap pt-2 md:grid md:grid-rows-2 grid-flow-col w-full  gap-5' onClick={handleCheckBoxEspecialidadesChange}>
								{especialidades.map((item) => {
									return (
										<label className='flex gap-2 items-center text-2xl'>
											<input id={item.id} className='w-5 h-5 rounded text-[#000000]' type="checkbox" />
											{item.name}
										</label>
									)
								})}
							</div>
						</div>
					</div>
					<div className='w-full flex flex-col items-start m-1'>
						<span className='font-normal md:text-xl text-lg'>Animais que atende</span>
						<div className='flex flex-wrap gap-2 m-1' onClick={handleCheckBoxPetChange}>
							{especialidadesPet.map((item) => {
								return (
									<label className='flex gap-2 items-center text-2xl'>
										<input id={item.id} className='w-5 h-5 rounded text-[#000000]' type="checkbox" />
										{item.name}
									</label>
								)
							})}
						</div>
					</div>
					<div className='flex xl:flex-row flex-col justify-between lg:gap-8 gap-2 w-full'>
						<label className='w-full flex flex-col md:text-xl text-lg'>
							Área de atuação
							<input className={errors.occupationArea ? 'h-12 px-2 border-b-2 border-b-red-700 bg-red-200 w-full' : 'h-12 px-2 w-full'} type="text" name="occupationArea" {...register('occupationArea', { required: true })} />
						</label>
						<label className='w-full flex flex-col md:text-xl text-lg'>
							CRMV
							<input className={errors.crmv ? 'h-12 px-2 border-b-2 border-b-red-700 bg-red-200 w-full' : 'h-12 px-2 w-full'} type="text" name="crmv" {...register('crmv', { required: true })} onChange={handleCRMVChange} />
						</label>
					</div>
					<label className='w-full flex flex-col md:text-xl text-lg'>
						Formação
						<input className={errors.formation ? 'h-12 px-2 border-b-2 border-b-red-700 bg-red-200 w-full' : 'h-12 px-2 w-full'} type="text" name="formation" {...register('formation', { required: true })} />
					</label>
					<label className='w-full flex flex-col md:text-xl text-lg'>
						Instituição
						<input className={errors.institution ? 'h-12 px-2 border-b-2 border-b-red-700 bg-red-200 w-full' : 'h-12 px-2 w-full'} type="text" name="institution" {...register('institution', { required: true })} />
					</label>
					<div className='flex xl:flex-row flex-col justify-between lg:gap-8 gap-2 w-full'>
						<label className='w-full flex flex-col md:text-xl text-lg'>
							Data de formação
							<input
								className={errors.formationDate ? 'h-12 px-2 border-b-2 border-b-red-700 bg-red-200 w-full' : 'h-12 px-2 w-full'}
								type="date"
								name="formationDate"
								max={dataFormatada}
								onChange={(e) => minStartActivy(e)}
								{...register('formationDate', { required: true })}
							/>
						</label>
						<label className='w-full flex flex-col md:text-xl text-lg'>
							Início de atuação
							<input
								className={errors.startActingDate ? 'h-12 px-2 border-b-2 border-b-red-700 bg-red-200 w-full' : 'h-12 px-2 w-full'}
								type="date"
								name="startActingDate"
								max={dataFormatada}
								min={formation}
								{...register('startActingDate', { required: true })}
							/>
						</label>
					</div>
					<button type="submit" className='w-full h-fit bg-[#09738A] text-center text-white font-bold text-2xl rounded transition drop-shadow-xl py-3 hover:bg-[#78A890] mt-4'>Cadastrar-se</button>
				</form>
				<p className='mt-8 mb-4'>Já tem uma conta?<Link to='/login' className='pl-1 font-bold'>Faça login</Link></p>
			</div>
		</section>
	);
};
