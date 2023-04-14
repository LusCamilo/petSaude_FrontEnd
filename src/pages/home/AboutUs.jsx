import React from 'react';
import groupTalking from "../../assets/grupo_conversando.png"
import catFoot from "../../assets/svg/Cat Footprint.svg"
import planejamento from "../../assets/roda de conversa.png"
import { HeaderInfo } from "./resource/HeaderInfo";
import { Footer } from "./resource/Footer";

//

export const AboutUs = () => {
    return (
        <>
            <HeaderInfo title="Sobre nós" description="A startup que está revolucionando o mercado veterinário e proporcionando os melhores serviços."/>
            <div className="w-full h-full p-0 xl:p-10 mt-10">
                <div className="bg-[#9ED1B7] p-3 md:p-20">
                    <img src={groupTalking} alt="Imagem decorativa" className="w-full"/>
                    <div>
                        <div className="flex flex-row items-center h-1/4 gap-4 align-middle">
                            <img src={catFoot} alt="" className=""/>
                            <h3 className="text-2xl md:text-4xl font-medium">O que oferecemos:</h3>
                        </div>
                        <div className="">
                            <p className="text-sm md:text-2xl w-full font-semibold text-justify break-words font-montserrat mb-3">Nossos produtos e serviços são desenvolvidos com rigorosos padrões de qualidade e segurança, atendendo às necessidades e demandas 
                                mercado veterinário. Buscamos sempre estar atualizados em relação às tendências e avanços da área, a fim de oferecer aos nossos clientes 
                                melhores soluções disponíveis.
                            </p>
                            <p className="text-sm md:text-2xl font-semibold text-justify break-words font-montserrat">
                                A NovaDev acredita que a medicina veterinária é uma área vital e que merece toda a atenção e investimento necessários. É por isso que trabalham
                                os incansavelmente para inovar e contribuir para o aprimoramento dos serviços oferecidos pelos profissionais da área. Nossa visão é de um mundo em que os animais recebam os melhores cuidados possíveis e tenham uma vida saudável e feliz.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex h-full flex-col w-full md:flex-row md:items-center break-words pt-10">
                <img src={planejamento} alt="" className="w-60 md:w-1/3"/>
                <div className="flex h-full w-full justify-end md:justify-start items-end md:items-center mx-1 flex-col gap-5 p-5">
                    <h2 className="text-5xl font-semibold">PetSaúde</h2>
                    <div >
                            <p className="text-sm md:text-2xl w-full font-semibold text-justify break-words font-montserrat mb-3">Nossos produtos e serviços são desenvolvidos com rigorosos padrões de qualidade e segurança, atendendo às necessidades e demandas 
                            A NovaDev é uma startup que está comprometida em levar soluções inovadoras para a área da medicina veterinária. Fundada por
                        profissionais experientes e apaixonados por animais, nossa empresa tem como objetivo principal contribuir para o bem-estar 
                        animais e aprimorar os serviços oferecidos pelos profissionais da área.
                            </p>
                            <p className="text-sm md:text-2xl font-semibold text-justify break-words font-montserrat">
                            Com uma equipe multidisciplinar e altamente qualificada, a NovaDev investe em tecnologia de ponta e em constante pesquisa 
                        desenvolvimento para oferecer as melhores soluções para o setor veterinário. Nosso foco está em proporcionar praticidade e eficiência 
                        os profissionais da área, facilitando o diagnóstico e o tratamento dos animais.
                            </p>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}
 