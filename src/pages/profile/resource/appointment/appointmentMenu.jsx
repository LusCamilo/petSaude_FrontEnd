import React from 'react';

export const AppointmentMenu = () => {


    return (
        <section>
          
               
                    <div className='flex flex-row gap-5 h-screen'>
                        <div className='flex flex-col w-96 bg-[#91B0B2] rounded-lg pb-96 h-full'>
                            <ul className="flex flex-col items-center w-full text-base cursor-pointer pt-5 space-y-3">
                                <li className="flex items-center border border-black py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">       
                                    Pedidos de consultas
                                </li>
                                 <li className="flex items-center border border-black py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">
                                    Consultas pendentes
                                </li>
                                <li className="flex items-center border border-black py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">
                                    Consultas arquivadas
                                 </li>
                                 <li className="flex items-center border border-black py-2 px-6 bg-[#D9D9D9] h-30 w-5/6 text-left rounded-full">      
                                   Configurações de consulta
                                 </li>
                            </ul>                
                        </div>
                    </div>
            </section>
    );
};