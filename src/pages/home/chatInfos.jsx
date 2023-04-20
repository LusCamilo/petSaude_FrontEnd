import React from 'react'
import webVet from "../../assets/svg/webVet.png"



export const ChatInfos = () => {
    return (
        <>
            <div className="flex h-full flex-col w-full md:flex-row md:items-center break-words pt-10">
                <div className="flex h-full w-4/6 justify-end md:justify-start items-end md:items-center mx-1 flex-col gap-5 p-5">
                    <h2 className="text-5xl font-semibold">Converse com um veterinário</h2>
                    <div className='pl-40'>
                            <p className="text-sm md:text-3xl w-full font-normal text-justify break-words font-montserrat mb-3">Nossos produtos e serviços são desenvolvidos com rigorosos padrões de qualidade e segurança, atendendo às necessidades e demandas 
                            No PetSaúde todos possuem o acesso a falar com o
                            venterinário do pet sem precisar sair de casa, através 
                            de um chat onde podemos tirar dúvidas, mandar as 
                            fotos do pet e agendar consultas!
                            </p>
                            <p className="text-sm md:text-3xl font-normal text-justify break-words font-montserrat">
                            Perguntas frequentes:  Quanto é sua consulta? 
                                Seu atendimento é domiciliar ou tenho que me
                                dirigir até seu consultório?  Qual á a melhor ração
                                para um filhote?
                            </p>
                    </div>
                </div>
                <img src={webVet} alt="" className="w-60 md:w-1/5 ml-96"/>
            </div>
        </>
    );
}
    
