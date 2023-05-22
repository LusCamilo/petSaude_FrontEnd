import React, { useState, useEffect } from 'react';
import lapis from "../../../../assets/svg/pencil.svg"
import lapisConfirm from "../../../../assets/svg/pencilConfirm.svg"
import { useForm } from 'react-hook-form';
import { updateProfessionalInfos } from '../../../../services/integrations/user';
import { deleteSpecialties, getSpecialties, getSpecialtiesById, updateSpecialities } from '../../../../services/integrations/specialties';
import { deleteSpecialtiesPet, getSpecialtiesPet, getSpecialtiesPetById, updateSpecialitiesPet } from '../../../../services/integrations/specialtiesPet';

const checkboxSpecialities = async () => {
	const responseVet = await getSpecialtiesById(localStorage.getItem('__user_id'))
	const response = await getSpecialties()
	return {
		allSpecialities: response.response,
		VetSpecialities: responseVet.response
	}
}

const checkboxSpecialitiesPet = async () => {
	const responseVet = await getSpecialtiesPetById(localStorage.getItem('__user_id'))
	const response = await getSpecialtiesPet()
	return {
		allSpecialitiesPet: response.response,
		VetSpecialitiesPet: responseVet.response
	}
}

export const Prossionais = (props) => {
	const { register, handleSubmit, formState: { errors } } = useForm()
	const [professionalInfos, setProfessionalInfos] = useState({ disabled: true, textColor: 'opacity-50' })
	const [button, setButton] = useState({ text: 'Editar', color: '#000', bgColor: '#ECECEC', icon: lapis })
	const [areaAtuacao, setAreaAtuacao] = useState(props.area)
	const [formacao, setformacao] = useState(props.formacao)
	const [instituicao, setinstituicao] = useState(props.instituicao)
	const [crmv, setCRMV] = useState(props.crmv)
	const [dataFormacao, setDataFormacao] = useState(props.dataFormacao)
	const [dataInicioAtuacao, setDataInicioAtuacao] = useState(props.dataInicioAtuacao)
	const [especialidades, setEspecialidades] = useState([])
	const [especialidadesVet, setEspecialidadesVet] = useState([])
	const [especialidadesPet, setEspecialidadesPet] = useState([])
	const [especialidadesPetVet, setEspecialidadesPetVet] = useState([])
	const [checkedBoxes, setCheckedBoxes] = useState([]);

	useEffect(() => {
		setAreaAtuacao(props.area)
		setformacao(props.formacao)
		setinstituicao(props.instituicao)
		setCRMV(props.crmv)
		setDataFormacao(props.dataFormacao)
		setDataInicioAtuacao(props.dataInicioAtuacao)
		async function fetchDataAll() {
			const dados = await checkboxSpecialities()
			const dadosPet = await checkboxSpecialitiesPet()
			setEspecialidadesVet(dados.VetSpecialities)
			setEspecialidades(dados.allSpecialities)
			setEspecialidadesPetVet(dadosPet.VetSpecialitiesPet)
			setEspecialidadesPet(dadosPet.allSpecialitiesPet)
		}
		fetchDataAll()
	}, [props.area, props.formacao, props.instituicao, props.crmv, props.dataFormacao, props.dataInicioAtuacao])

	let hoje = new Date();
	let ano = hoje.getFullYear();
	let mes = hoje.getMonth() + 1;
	let dia = hoje.getDate();
	if (mes < 10) mes = '0' + mes
	if (dia < 10) dia = '0' + dia
	let dataFormatada = `${ano}-${mes}-${dia}`;

	const handleCheckBoxEspecialidadesChange = async (event) => {
		const { id } = event.target;
		const index = checkedBoxes.findIndex((item) => item.id === parseInt(id));
		const storage = localStorage.getItem('__user_id');
		let json = {
			specialties: [
				{
					veterinaryId: parseInt(storage),
					specialtiesId: parseInt(id)
				}
			]
		}
		const body = JSON.stringify(json)
		try {
			if (event.target.checked) {
				await updateSpecialities(body)
				if (index === -1) {
					setCheckedBoxes([...checkedBoxes, { id: parseInt(id) }]);
				}
			} else {
				await deleteSpecialties(body)
				if (index !== -1) {
					setCheckedBoxes((prevState) =>
						prevState.filter((item) => item.id !== parseInt(id))
					);
				}
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};
	const handleCheckBoxPetChange = async (event) => {
		const { id } = event.target;
		const index = checkedBoxes.findIndex((item) => item.id === parseInt(id));
		const storage = localStorage.getItem('__user_id');

		let json = {
			AnimalTypesVetInfos: [
				{
					veterinaryId: parseInt(storage),
					animalTypesId: parseInt(id),
				},
			],
		};

		const body = JSON.stringify(json);
		try {
			if (event.target.checked) {
				await updateSpecialitiesPet(body);
				if (index === -1) {
					setCheckedBoxes([...checkedBoxes, { id: parseInt(id) }]);
				}
			} else {
				await deleteSpecialtiesPet(body);
				if (index !== -1) {
					setCheckedBoxes((prevState) =>
						prevState.filter((item) => item.id !== parseInt(id))
					);
				}
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};


	const handleAreaAtuacaoChange = (e) => {
		setAreaAtuacao(
			e.target.value
		)
	}
	const handleFormacaoChange = (e) => {
		setformacao(
			e.target.value
		)
	}
	const handleInstituicaoChange = (e) => {
		setinstituicao(
			e.target.value
		)
	}
	const handleCRMVChange = (event) => {
		let inputValue = event.target.value;
		inputValue = inputValue.replace(/\D/g, '');
		if (inputValue.length > 4) {
			inputValue = inputValue.substr(0, 4);
		}
		setCRMV(
			inputValue
		)
	}
	const handleDataFormacaoChange = (e) => {
		setDataFormacao(
			e.target.value
		)
	}
	const handleDataAtuacaoChange = (e) => {
		setDataInicioAtuacao(
			e.target.value
		)
	}


	return (
		<div className='w-full h-full border-none sm:border-solid border-2 rounded-lg border-black flex flex-col pl-2 md:p-10'>
			<h2 className='text-5xl md:text-6xl font-bold font-sans text-center sm:text-left'>Informações Profissonais</h2>
			<div className='flex flex-row justify-between'>
				<div className='flex flex-col w-4/5'>
					<div className='gap-1 sm:gap-10 mt-10 grid grid-cols-1 sm:grid-cols-2 sm:w-4/5'>
						<div className='0'>
							<label className='flex flex-col text-2xl text-[#A9A9A9]'>
								Área de Atuação
								<input type="text" id='cep' name="area" defaultValue={areaAtuacao} onChange={handleAreaAtuacaoChange} disabled={professionalInfos.disabled} className={`bg-transparent border-none text-3xl text-[#000] ${professionalInfos.textColor}`} />
							</label>
						</div>
						<div className='flex justify-start md:ml-24 '>
							<label className='flex flex-col text-2xl text-[#A9A9A9]'>
								Formação
								<input type="text" id='cep' name="area" defaultValue={formacao} onChange={handleFormacaoChange} disabled={professionalInfos.disabled} className={`bg-transparent border-none text-3xl text-[#000] ${professionalInfos.textColor}`} />
							</label>
						</div>
						<div>
							<label className='flex flex-col text-2xl text-[#A9A9A9]'>
								Instituição
								<input type="text" id='cep' name="area" defaultValue={instituicao} onChange={handleInstituicaoChange} disabled={professionalInfos.disabled} className={`bg-transparent border-none text-3xl text-[#000] ${professionalInfos.textColor}`} />
							</label>
						</div>
						<div className='flex justify-start md:ml-24'>
							<label className='flex flex-col text-xl text-[#A9A9A9]'>
								CRMV
								<input type="text" id='cep' name="area" defaultValue={crmv} onChange={handleCRMVChange} disabled={professionalInfos.disabled} className={`bg-transparent border-none text-3xl text-[#000] ${professionalInfos.textColor}`} />
							</label>
						</div>
						<div>
							<label className='flex flex-col text-2xl text-[#A9A9A9]'>
								Data de Formação
								<input	max={dataFormatada} type="date" id='cep' name="area" defaultValue={dataFormacao} onChange={handleDataFormacaoChange} disabled={professionalInfos.disabled} className={`bg-transparent border-none text-3xl w-full text-[#000] ${professionalInfos.textColor}`} />
							</label>
						</div>
						<div className='flex justify-start md:ml-24'>
							<label className='flex flex-col text-2xl text-[#A9A9A9] w-full'>
								Início de atuação
								<input max={dataFormatada} type="date" id='cep' name="area" defaultValue={dataInicioAtuacao} onChange={handleDataAtuacaoChange} disabled={professionalInfos.disabled} className={`bg-transparent border-none text-3xl text-[#000] ${professionalInfos.textColor}`} />
							</label>
						</div>
					</div>
					<div className='gap-1 sm:gap-10 mt-10 grid grid-cols-1 sm:w-4/5'>
						<div className='flex flex-col gap-10'>
							<div className='w-full flex flex-col items-start gap-4'>
								<span className='font-normal text-2xl text-[#A9A9A9]'>Especialidades</span>
								<div className='flex flex-wrap pt-2 md:grid md:grid-rows-2 grid-flow-col w-full  gap-5' onClick={handleCheckBoxEspecialidadesChange}>
									{especialidades.map((item) => {
										const isChecked = especialidadesVet.findIndex(vetItem => vetItem.specialitiesId === item.id) !== -1;
										return (
											<label className='flex gap-2 items-center text-2xl'>
												<input id={item.id} className='w-5 h-5 rounded text-[#000000]' type="checkbox" defaultChecked={isChecked} />
												{item.name}
											</label>
										)
									})}
								</div>
							</div>

							<div className='w-full flex flex-col items-start gap-4'>
								<span className='font-normal text-2xl text-[#A9A9A9]'>Animais que atende</span>
								<div className='flex flex-wrap gap-5' onClick={handleCheckBoxPetChange}>
									{especialidadesPet.map((item) => {
										const isChecked = especialidadesPetVet.findIndex(vetItem => vetItem.petSpecieId === item.id) !== -1;
										return (
											<label className='flex gap-2 items-center text-2xl'>
												<input id={item.id} className='w-5 h-5 rounded text-[#000000]' type="checkbox" defaultChecked={isChecked} />
												{item.name}
											</label>
										)
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='hidden sm:flex flex-col content-end aling-end pr-10 '>
					<button className={`w-52 h-12 flex flex-row justify-center items-center gap-4 bg-[${button.bgColor}] rounded-full drop-shadow-lg text-[${button.color}]`} onClick={() => {
						if (professionalInfos.disabled == true) {
							setProfessionalInfos({ disabled: false, textColor: '', text: 'Confirmar' })
							setButton({ text: 'Confirmar', bgColor: '#49454F', color: '#A9A9A9', icon: lapisConfirm })
						} else {
							setProfessionalInfos({ disabled: true, textColor: 'opacity-50', text: 'Editar' })
							setButton({ text: 'Editar', color: '#000', bgColor: '#ECECEC', icon: lapis })
							console.log(
								 updateProfessionalInfos(localStorage.getItem('__user_id'),
									{
										occupationArea: areaAtuacao,
										formation: formacao,
										institution: instituicao,
										crmv: crmv,
										startActingDate: `${dataInicioAtuacao}T00:00:00.000Z`,
										formationDate: `${dataFormacao}T00:00:00.000Z`,
									}
								).then(response => {
									if (response.response) {
										if (response.response == 'Unexpected token I in JSON at position 1')
											window.alert('CRMV já está em uso')
									} else
										window.alert("dados atualizados com sucesso")
									window.location.reload()

								})
							);
						}
					}}>
						<img src={button.icon} alt="" />
						{button.text}
					</button>
				</div>
			</div>
		</div >
	);
}
