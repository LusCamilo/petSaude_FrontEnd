import React, { useState, useRef, useEffect } from 'react';
import { getUser } from '../../../../services/integrations/user';
import arrow from '../img/arrow.png';
import { CardPets } from './cardPets';

const jsonAnimais = [
    {
        animalName: "Billy",
        animalImage: "http://patrocinados.estadao.com.br/portal-animal/wp-content/uploads/sites/8/2015/12/lhasa_apso.jpg"
    },
    {
        animalName: "Darwin",
        animalImage: "https://i.pinimg.com/736x/71/ce/60/71ce60a47faa118f4b117313ba1b64a1.jpg"
    },
    {
        animalName: "Anais",
        animalImage: "https://w7.pngwing.com/pngs/905/223/png-transparent-anais-watterson-gumball-watterson-drawing-cartoon-the-amazing-world-of-gumball-face-head-cartoon-thumbnail.png"
    },
    {
        animalName: "Ucraniano",
        animalImage: "https://i.ytimg.com/vi/96TcazjCTBI/maxresdefault.jpg"
    },
    {
        animalName: "HonneyBottom",
        animalImage: "https://i.ytimg.com/vi/OUwL6-K6cs8/maxresdefault.jpg"
    },
    {
        animalName: "Pato Donald",
        animalImage: "https://img.elo7.com.br/product/original/135DA2A/painel-pato-donald-g-frete-gratis-painel-festa-infantil.jpg"
    },
    {
        animalName: "Mani",
        animalImage: "https://imgpt.hellokids.com/_uploads/wallpaper/13046_capture.jpg"
    },
    {
        animalName: "Esther",
        animalImage: "https://i.ytimg.com/vi/xW5zC_CuFhc/maxresdefault.jpg"
    },
    {
        animalName: "Miolos Gelados",
        animalImage: "https://media.contentapi.ea.com/content/dam/eacom/en-us/migrated-images/2016/10/play-pvzheroes-brainfree-lineup.jpg.adapt.crop16x9.320w.jpg"
    },
    {
        animalName: "Tricarrotops",
        animalImage: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c8c96813-e369-41d5-bbfe-1f1eff18a4ba/de54yq2-7d60d3dc-9a63-4446-ad47-67fa076bae6d.jpg/v1/fill/w_1095,h_730,q_70,strp/pvz_tricarrotops_by_canvasbirdie_de54yq2-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAwMCIsInBhdGgiOiJcL2ZcL2M4Yzk2ODEzLWUzNjktNDFkNS1iYmZlLTFmMWVmZjE4YTRiYVwvZGU1NHlxMi03ZDYwZDNkYy05YTYzLTQ0NDYtYWQ0Ny02N2ZhMDc2YmFlNmQuanBnIiwid2lkdGgiOiI8PTE1MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.Y_MfK9r-hAsnhuolrrYcOqjmHino1mRndpaHMLa3-pg"
    },
]


const infosPet = async () => {

    const response = await getUser(localStorage.getItem('__user_id'))

    return response.user.Pet

}



export const Pets = (props) => {

    const [pet, setPet] = useState([]);

    useEffect(() => {
        async function fetchData() {
           
            const PetsInfos = await infosPet()
            setPet(PetsInfos);
        }
        fetchData();
    }, []);

    console.log(pet);


    const carrossel = useRef(null)

    const handleLeftClick = (e) => {
        carrossel.current.scrollLeft -= carrossel.current.offsetWidth
    }
    const handleRightClick = (e) => {
        carrossel.current.scrollLeft += carrossel.current.offsetWidth
    }

    return (
        <div className='flex flex-col gap-2 border-2 rounded-lg border-black py-8'>
            <div className='flex justify-between items-center pt-4 pb-3 px-20'>
                <h2 className='text-6xl font-bold'>Pets</h2>
                <button className='text-[#09738A] p-3 rounded-full border border-[#91B0B2]'
                    onClick={() => {
                        document.location.href = '/profile/pet/Add'
                    }
                    }>
                    + Adicionar
                </button>
            </div>
            <div className='flex items-center'>
                <img src={arrow} onClick={handleLeftClick} className='border cursor-pointer py-3 px-4 rounded-full drop-shadow-[0px 4px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.3)]' />
                <div className='flex overflow-x-auto scroll-smooth gap-2' ref={carrossel}>
   
                    {pet.map((item) => {
                        return <CardPets personImage={props.personImage} animalName={item.name} animalImage={item.photo} />
                    })}                 
            
                       
                
                </div>
                <img src={arrow} onClick={handleRightClick} className='border rotate-180 cursor-pointer py-3 px-4 rounded-full' />
            </div>
        </div>

    );
}
