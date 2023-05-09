import React, { useState, useEffect } from 'react';
import lapis from "../../../../assets/svg/pencil.svg"
import { set, useForm } from 'react-hook-form';
import { updateProfessionalInfos } from '../../../../services/integrations/user';
import { getSpecialties, getSpecialtiesById } from '../../../../services/integrations/specialties';
import { getSpecialtiesPet, getSpecialtiesPetById } from '../../../../services/integrations/specialtiesPet';


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
    const [checkedBoxesPet, setCheckedBoxesPet] = useState([]);



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

    const handleInputChange = (event) => {
        const { id } = event.target;
        const index = checkedBoxes.findIndex((item) => item.id === parseInt(id));

        if (event.target.checked) {
            if (index === -1) {
                setCheckedBoxes([...checkedBoxes, { id: parseInt(id) }]);
            }
        } else {
            if (index !== -1) {
                setCheckedBoxes(
                    checkedBoxes.filter((item) => item.id !== parseInt(id))
                );
            }
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
    const handleCRMVChange = (e) => {
        setCRMV(
            e.target.value
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
        <div className='w-full h-full border-none sm:border-solid border-2 rounded-lg border-black flex flex-col gap-10 pl-2 sm:pl-20 py-8'>
            <h2 className='text-5xl md:text-6xl font-bold font-sans text-center sm:text-left'>Informações Profissonais</h2>
            <div className='flex flex-row justify-between '>
                <div className='gap-1 sm:gap-10 mt-10  grid grid-cols-1 sm:grid-cols-2 sm:w-4/5'>
                    <div className='0'>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            Área de Atuação
                            <input type="text" id='cep' name="area" defaultValue={areaAtuacao} onChange={handleAreaAtuacaoChange} disabled={professionalInfos.disabled} className={`bg-transparent border-none text-3xl text-[#000] ${professionalInfos.textColor}`} />
                        </label>
                    </div>
                    <div className='flex justify-start md:ml-24 '>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            Formação
                            <input type="text" id='cep' name="area" defaultValue={formacao} onChange={handleFormacaoChange} disabled={professionalInfos.disabled} className={`bg-transparent border-none text-3xl text-[#000] ${professionalInfos.textColor}`} />
                        </label>
                    </div>
                    <div>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
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
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            Data de Formação
                            <input type="date" id='cep' name="area" defaultValue={dataFormacao} onChange={handleDataFormacaoChange} disabled={professionalInfos.disabled} className={`bg-transparent border-none text-3xl text-[#000] ${professionalInfos.textColor}`} />
                        </label>
                    </div>
                    <div className='flex justify-start md:ml-24'>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            Início de atuação
                            <input type="date" id='cep' name="area" defaultValue={dataInicioAtuacao} onChange={handleDataAtuacaoChange} disabled={professionalInfos.disabled} className={`bg-transparent border-none text-3xl text-[#000] ${professionalInfos.textColor}`} />
                        </label>
                    </div>

                    <div className='flex flex-col gap-10'>
                        <div className='w-full flex flex-col items-start'>
                            <span className='font-normal text-xl text-[#A9A9A9]'>Especialidades</span>
                            <div className='flex flex-wrap pt-2 md:grid md:grid-rows-2 grid-flow-col w-full  gap-5'>
                                {especialidades.map((item) => {
                                    const isChecked = especialidadesVet.findIndex(vetItem => vetItem.id === item.id) !== -1;
                                    return (
                                        <label id={item.id} className='flex gap-2 items-center text-2xl'>
                                            <input className='w-5 h-5 rounded text-[#000000]' type="checkbox" defaultChecked={isChecked} onClick={handleInputChange} />
                                            {item.name}
                                        </label>
                                    )
                                })}
                            </div>
                        </div>

                        <div className='w-full flex flex-col items-start'>
                            <span className='font-normal text-xl text-[#A9A9A9]'>Animais que atende</span>
                            <div className='flex flex-wrap gap-5'>
                                {especialidadesPet.map((item) => {
                                    const isChecked = especialidadesPetVet.findIndex(vetItem => vetItem.petSpecieId === item.id) !== -1;
                                    return (
                                        <label id={item.specialtiesPet} className='flex gap-2 items-center text-2xl'>
                                            <input className='w-5 h-5 rounded text-[#000000]' type="checkbox" defaultChecked={isChecked} onClick={handleInputChange} />
                                            {item.name}
                                        </label>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='hidden sm:flex flex-col content-end aling-end pr-10 '>
                    <button className='w-52 h-12 flex flex-row justify-center items-center gap-4 bg-[#ECECEC] rounded-full drop-shadow-lg' onClick={() => {
                        if (professionalInfos.disabled == true) {
                            setProfessionalInfos({ disabled: false, textColor: '' })
                        } else {
                            setProfessionalInfos({ disabled: true, textColor: 'opacity-50' })

                            if (window.confirm('deseja atualizar os seus dados profissionais?')) {
                                updateProfessionalInfos(localStorage.getItem('__user_id'),
                                    {
                                        occupationArea: areaAtuacao,
                                        formation: formacao,
                                        institution: instituicao,
                                        crmv: crmv,
                                        startActingDate: `${dataInicioAtuacao}T00:00:00.000Z`,
                                        formationDate: `${dataFormacao}T00:00:00.000Z`,
                                    }).then(window.location.reload())
                            }
                        }
                    }}>
                        <img src={lapis} alt="" />
                        Editar
                    </button>
                </div>
            </div>
        </div>
    );
}
