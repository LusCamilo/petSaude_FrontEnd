import React from 'react'
import groupTalking from "../../assets/image/grupo_conversando.png"
import catFoot from "../../assets/svg/Cat Footprint.svg"
import planejamento from "../../assets/image/roda de conversa.png"
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
                                mercado veterinário. Buscamos sempre estar atualizados em relação às tendências e avanços da área, a fim de oferecer aos nossos clientes os melhores serviços do mercado.
                            </p>
                            <p className="text-sm md:text-2xl font-semibold text-justify break-words font-montserrat">
                                E com o crescente avanço desse setor decidimos investir nesse trabalho para inovar e contribuir para o aprimoramento dos serviços oferecidos pelos profissionais da área. Com isso, surgiu o projeto PetSaúde 
                                Nossa missão é através de meios tecnológicos propocionar que os animais recebam os melhores cuidados possíveis e tenham uma vida saudável e feliz.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex h-full flex-col w-full md:flex-row md:items-center break-words pt-10">
                <img src={planejamento} alt="" className="w-60  md:w-1/3"/>
                <div className="flex h-full w-full justify-end md:justify-start items-end md:items-center mx-1 flex-col gap-5 p-5">
                    <h2 className="text-5xl font-semibold">PetSaúde by INovaDev</h2>
                    <div >
                            <p className="text-sm md:text-2xl w-full font-semibold text-justify break-words font-montserrat mb-3">
                                Nossos produtos e serviços são desenvolvidos com rigorosos padrões de qualidade e segurança, atendendo às necessidades e demandas digitais, sendo atentidos pela empresa
                                INovaDev que é uma startup de tecnologia e desenvolvimento que está comprometida em levar soluções inovadoras para qualquer tipo de mercado, fundada por profissionais experientes e apaixonados pelo que fazem, garantindo que os serviços sejam feitos de modo assistido atendendo 
                                a necessidade do projeto PetSaúde que é contribuir para o bem-estar animais e aprimorar os serviços oferecidos pelos profissionais da área.
                            </p>
                            <p className="text-sm md:text-2xl font-semibold text-justify break-words font-montserrat">
                                Com uma equipe multidisciplinar e altamente qualificada, a INovaDev investe em tecnologia de ponta e em constante pesquisa e desenvolvimento para oferecer as melhores soluções para o mercado. 
                                Como nosso foco está em proporcionar praticidade e eficiência os profissionais da área, facilitando o diagnóstico e o tratamento dos animais, contatamos a A INovaDev produtora dessa solução 
                                acreditando que a medicina veterinária é uma área vital e que merece toda a atenção e investimento necessários.
                            </p>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}
 