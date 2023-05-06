import React, {useState, useEffect} from 'react';
import lapis from "../../../../assets/svg/pencil.svg"
import { updateAddress } from "../../../../services/integrations/address.js";

export const Address = (props) => {

    
    const [address, setaddress] = useState({ disabled: true, textColor: 'opacity-50' })
    const [cep, setCep] = useState('')
    const [complement, setComplement] = useState('')

    function handleCepChange(event) {
        setCep(event.target.value);
    }
    function handleComplementChange(event) {
        setComplement(event.target.value);
    }

    useEffect(() => {

        setCep(props.cep)
        setComplement(props.complemento)

    }, [
        props.cep,
        props.complement,
        props.number
    ])


    return (  
        <div className='w-full h-full border-none sm:border-solid border-2 rounded-lg border-black flex flex-col gap-10 pl-2 sm:pl-20 py-8'>
            <h2 className='text-5xl md:text-6xl font-bold text-center sm:text-left'>Endereço</h2>
            <div className='flex flex-row justify-between '>
                <div className='gap-1 sm:gap-10 mt-10 grid grid-cols-1 sm:grid-cols-2 sm:w-4/5'>
                    <div className=''>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            CEP
                            <input disabled={address.disabled} type="text" onChange={handleCepChange} name="firstName" defaultValue={cep} className={`bg-transparent border-none text-2xl text-[#000]${address.textColor}`} />
                        </label>
                    </div>
                    <div className='flex justify-start md:ml-24'>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            Cidade
                            <input disable="true" type="text" name="firstName" defaultValue={props.cidade} className={`bg-transparent border-none text-2xl text-[#000] opacity-50`} />
                        </label>
                    </div>
                    <div className=''>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            Estado
                            <input disabled="true" type="text" name="firstName" defaultValue={props.estado} className={`bg-transparent border-none text-2xl text-[#000] opacity-50`} />
                        </label>
                    </div>
                    <div className='flex justify-start md:ml-24'>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            Bairro
                            <input disabled="true" type="text" name="firstName" defaultValue={props.bairro} className={`bg-transparent border-none text-2xl text-[#000] opacity-50`} />
                        </label>
                    </div>
                    <div className=''>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            Rua
                            <input disabled="true" type="text" name="firstName" defaultValue={props.rua} className={`bg-transparent border-none text-2xl text-[#000] opacity-50`} />
                        </label>
                    </div>
                    <div className='flex justify-start md:ml-24'>
                        <label className='flex flex-col text-xl text-[#A9A9A9]'>
                            Complemento
                            <input disabled={address.disabled} onChange={handleComplementChange} type="text" name="firstName" defaultValue={complement} className={`bg-transparent border-none text-2xl text-[#000]${address.textColor}`} />
                        </label>
                    </div>
                </div>
                <div className='hidden sm:flex flex-col content-end aling-end pr-10 '>
                    <button className='w-52 h-12 flex flex-row justify-center items-center gap-4 bg-[#ECECEC] rounded-full drop-shadow-lg' onClick={() => {
                         if (address.disabled == true) {
                            setaddress({ disabled: false, textColor: '' })
                        } else {
                            setaddress({ disabled: true, textColor: 'opacity-50' })

                            props.viaCep(cep).then((response) => {
                                if (response != {'erro': 'true'} && response != Error)
                                    updateAddress({zipCode: cep, number: `${props.number}`, complement: complement}, props.id).then((response) => window.alert(response.response))
                                else
                                    window.alert(response)
                            })

                            
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
 