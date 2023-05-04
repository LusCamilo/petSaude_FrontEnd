import React, { useState, useEffect } from 'react';
import lapis from "../../../../assets/svg/pencil.svg"
import { set, useForm } from 'react-hook-form';
import { updateProfessionalInfos } from '../../../../services/integrations/user';


{/* 
<label className='flex flex-col text-xl text-[#A9A9A9]'>
    Celular
    <input type="text" name="firstName" defaultValue={props.celular} className={`bg-transparent border-none text-3xl text-[#000] ${professionalInfos.textColor}`} />
</label> 
*/
}

export const Prossionais = (props) => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const [professionalInfos, setProfessionalInfos] = useState({ disabled: true, textColor: 'opacity-50' })

    const [areaAtuacao, setAreaAtuacao] = useState(props.area)
    const [formacao, setformacao] = useState(props.formacao)
    const [instituicao, setinstituicao] = useState(props.instituicao)
    const [CRMV, setCRMV] = useState(props.crmv)
    const [dataFormacao, setDataFormacao] = useState(props.dataFormacao)
    const [dataInicioAtuacao, setDataInicioAtuacao] = useState(props.dataInicioAtuacao)

    useEffect(() => {

        setAreaAtuacao(props.area)
        setformacao(props.formacao)
        setinstituicao(props.instituicao)
        setCRMV(props.crmv)
        setDataFormacao(props.dataFormacao)
        setDataInicioAtuacao(props.dataInicioAtuacao)



    }, [props.area, props.formacao, props.instituicao, props.crmv, props.dataFormacao, props.dataInicioAtuacao])



    const handleAreaAtuacaoChange = (e) => {
        setAreaAtuacao(
            e.target.value
        )
        console.log(e.target.value);
    }
    const handleFormacaoChange = (e) => {
        setformacao(
            e.target.value
        )
        console.log(e.target.value);
    }
    const handleInstituicaoChange = (e) => {
        setinstituicao(
            e.target.value
        )
        console.log(e.target.value);
    }
    const handleCRMVChange = (e) => {
        setCRMV(
            e.target.value
        )
        console.log(e.target.value);
    }
    const handleDataFormacaoChange = (e) => {
        setDataFormacao(
            e.target.value
        )
        console.log(e.target.value);
    }
    const handleDataAtuacaoChange = (e) => {
        setDataInicioAtuacao(
            e.target.value
        )
        console.log(e.target.value);
    }


    return (
        <div className='w-full h-full border-none sm:border-solid border-2 rounded-lg border-black flex flex-col gap-10 pl-2 sm:pl-20 py-8'>
            <h2 className='text-5xl md:text-6xl font-bold font-sans text-center sm:text-left'>Informações Profissonais</h2>
            <div className='flex flex-row justify-between '>
                <div className='gap-1 sm:gap-10 mt-10  grid grid-cols-1 sm:grid-cols-2 sm:w-4/5'>
                    <div className='0'>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            Área de Atuação
                            <input type="text" id='cep' name="area" defaultValue={props.area} onChange={handleAreaAtuacaoChange} disabled={professionalInfos.disabled} className={`bg-transparent border-none text-3xl text-[#000] ${professionalInfos.textColor}`} />
                        </label>
                    </div>
                    <div className='flex justify-start md:ml-24 '>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            Formação
                            <input type="text" id='cep' name="area" defaultValue={props.formacao} onChange={handleDataFormacaoChange} disabled={professionalInfos.disabled} className={`bg-transparent border-none text-3xl text-[#000] ${professionalInfos.textColor}`} />
                        </label>
                    </div>
                    <div>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            Instituição
                            <input type="text" id='cep' name="area" defaultValue={props.instituicao} onChange={handleInstituicaoChange} disabled={professionalInfos.disabled} className={`bg-transparent border-none text-3xl text-[#000] ${professionalInfos.textColor}`} />
                        </label>
                    </div>
                    <div className='flex justify-start md:ml-24'>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            CRMV
                            <input type="text" id='cep' name="area" defaultValue={props.crmv} onChange={handleCRMVChange} disabled={professionalInfos.disabled} className={`bg-transparent border-none text-3xl text-[#000] ${professionalInfos.textColor}`} />
                        </label>
                    </div>
                    <div>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            Data de Formação
                            <input type="date" id='cep' name="area" defaultValue={props.dataFormacao} onChange={handleDataFormacaoChange} disabled={professionalInfos.disabled} className={`bg-transparent border-none text-3xl text-[#000] ${professionalInfos.textColor}`} />
                        </label>
                    </div>
                    <div className='flex justify-start md:ml-24'>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            Início de atuação
                            <input type="date" id='cep' name="area" defaultValue={props.dataInicioAtuacao} onChange={handleDataAtuacaoChange} disabled={professionalInfos.disabled} className={`bg-transparent border-none text-3xl text-[#000] ${professionalInfos.textColor}`} />
                        </label>
                    </div>

                    <div className='flex flex-col gap-10'>
                        <div className='w-full flex flex-col items-start'>
                            <span className='font-normal text-xl text-[#A9A9A9]'>Especialidades</span>
                            <div className='flex flex-wrap pt-2 md:grid md:grid-rows-2 grid-flow-col w-full  gap-5'>
                                <div>
                                    <label className='flex gap-2 items-center text-2xl'>
                                        <input className='w-5 h-5 rounded' type="checkbox" {...register('surgeon')} />
                                        Cirurgião
                                    </label>
                                </div>
                                <div>
                                    <label className='flex gap-2 items-center text-2xl '>
                                        <input className='w-5 h-5 rounded' type="checkbox" {...register('clinic')} />
                                        Clínica
                                    </label>
                                </div>
                                <div>
                                    <label className='flex gap-2 items-center text-2xl '>
                                        <input className='w-5 h-5 rounded' type="checkbox" {...register('laboratory')} />
                                        Laboratorial
                                    </label>
                                </div>
                                <div>
                                    <label className='flex gap-2 items-center text-2xl '>
                                        <input className='w-5 h-5 rounded ' type="checkbox" {...register('research')} />
                                        Pesquisa
                                    </label>
                                </div>
                                <div>
                                    <label className='flex gap-2 items-center text-2xl '>
                                        <input className='w-5 h-5 rounded' type="checkbox" {...register('anesthetist')} />
                                        Anestesista
                                    </label>
                                </div>
                                <div>
                                    <label className='flex gap-2 items-center text-2xl '>
                                        <input className='w-5 h-5 rounded' type="checkbox" {...register('anesthetist')} />
                                        Farmácia Veterinária
                                    </label>
                                </div>
                                <div>
                                    <label className='flex gap-2 items-center text-2xl '>
                                        <input className='w-5 h-5 rounded' type="checkbox" {...register('anesthetist')} />
                                        Técnico em Zoo
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className='w-full flex flex-col items-start'>
                            <span className='font-normal text-xl text-[#A9A9A9]'>Animais que atende</span>
                            <div className='flex flex-wrap gap-5'>
                                <label className='flex gap-2 items-center text-2xl '>
                                    <input className='w-5 h-5 rounded' type="checkbox" {...register('dog')} />
                                    Cachorro
                                </label>
                                <label className='flex gap-2 items-center text-2xl '>
                                    <input className='w-5 h-5 rounded' type="checkbox" {...register('cat')} />
                                    Gato
                                </label>
                                <label className='flex gap-2 items-center text-2xl '>
                                    <input className='w-5 h-5 rounded' type="checkbox" {...register('birds')} />
                                    Aves
                                </label>
                                <label className='flex gap-2 items-center text-2xl '>
                                    <input className='w-5 h-5 rounded' type="checkbox" {...register('reptiles')} />
                                    Répteis
                                </label>
                                <label className='flex gap-2 items-center text-2xl '>
                                    <input className='w-5 h-5 rounded' type="checkbox" {...register('exoctics')} />
                                    Exóticos
                                </label>
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
                            const infos = {
                                occupationArea: areaAtuacao,
                                formation: formacao,
                                institution: instituicao,
                                crmv: CRMV,
                                startActingDate: dataInicioAtuacao,
                                formationDate: dataFormacao,
                            }
 
                            updateProfessionalInfos(localStorage.getItem('__user_id'), infos)
                            

                            // window.alert('dados atualizados com sucesso')
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
