import React from 'react'
import webVet from "../../assets/svg/webVet.svg"

export const ChatInfos = () => {
	return (
		<>
			{/* <div className="flex h-full flex-col w-full md:flex-row md:items-center break-words pt-40 pb-20 sm:pb-56 ">
                <div className="flex h-full xl:w-4/6 sm:ml-20 justify-end md:justify-start items-end md:items-center mx-1 flex-col gap-5 p-5">
                    <h2 className="text-5xl font-semibold">Converse com um veterinário</h2>
                    <div>
                            <p className="text-xl md:text-4xl w-full font-normal text-justify break-words font-montserrat mb-3 pt-5">Nossos produtos e serviços são desenvolvidos com rigorosos padrões de qualidade e segurança, atendendo às necessidades e demandas 
                            No PetSaúde todos possuem o acesso a falar com o
                            venterinário do pet sem precisar sair de casa, através 
                            de um chat onde podemos tirar dúvidas, mandar as 
                            fotos do pet e agendar consultas!
                            </p>
                            <p className="text-xl md:text-4xl font-normal text-justify break-words font-montserrat pt-5">
                            Perguntas frequentes:  Quanto é sua consulta? 
                                Seu atendimento é domiciliar ou tenho que me
                                dirigir até seu consultório?  Qual á a melhor ração
                                para um filhote?
                            </p>
                    </div>
                </div>
                <img src={webVet} alt="" className="hidden md:flex w-60 md:w-1/4 ml-32"/>
            </div> */}
			<div className="flex h-full flex-col w-full md:flex-row md:items-center break-words pt-10 pb-10">

				<div className="flex h-full w-full justify-end md:justify-start items-start md:items-center mx-1 flex-col gap-5 p-5">
					<h2 className="text-5xl font-semibold">Converse com um veterinário</h2>
					<div >
						<p className="text-sm md:text-2xl w-full font-semibold text-justify break-words font-montserrat mb-3">Nossos produtos e serviços são desenvolvidos com rigorosos padrões de qualidade e segurança, atendendo às necessidades e demandas
							No PetSaúde todos possuem o acesso a falar com o
							venterinário do pet sem precisar sair de casa, através
							de um chat onde podemos tirar dúvidas, mandar as
							fotos do pet e agendar consultas!
						</p>
						<p className="text-sm md:text-2xl font-semibold text-justify break-words font-montserrat">
							Perguntas frequentes:  Quanto é sua consulta?
							Seu atendimento é domiciliar ou tenho que me
							dirigir até seu consultório?  Qual á a melhor ração
							para um filhote?
						</p>
					</div>
				</div>
				<img src={webVet} alt="" className="hidden md:flex w-60 md:w-1/3"/>
			</div>
		</>
	);
}
    
