import React from 'react';
import {UpgradeUser} from '../../../upgradeUser'
import { Config } from '../headerConfig';

export const AddressInfos = (props) => {
	let largura = window.innerWidth
	if(largura > 768){
		return(
			<UpgradeUser/>
		);
	} else{
		return (
			<section>
				<Config/>
				<main className='p-2'>
					<fieldset className="border border-solid border-black p-3 rounded-lg">
						<legend className="text-sm">CEP</legend>
						<input type="text" name="cep" placeholder='000.000.000-00' className='bg-transparent border-none text-2xl text-[#000]' />
					</fieldset>
					<fieldset className="border border-solid border-black p-3 rounded-lg">
						<legend className="text-sm">Cidade</legend>
						<input type="text" name="cep" placeholder='São Paulo' className='bg-transparent border-none text-2xl text-[#000]' />
					</fieldset>
					<fieldset className="border border-solid border-black p-3 rounded-lg">
						<legend className="text-sm">Estado</legend>
						<input type="text" name="cep" placeholder='São Paulo' className='bg-transparent border-none text-2xl text-[#000]' />
					</fieldset>
					<fieldset className="border border-solid border-black p-3 rounded-lg">
						<legend className="text-sm">Rua</legend>
						<input type="text" name="cep" placeholder='Rua xxx' className='bg-transparent border-none text-2xl text-[#000]' />
					</fieldset>
					<fieldset className="border border-solid border-black p-3 rounded-lg">
						<legend className="text-sm">Bairro</legend>
						<input type="text" name="cep" placeholder='Vila xxx yyy' className='bg-transparent border-none text-2xl text-[#000]' />
					</fieldset>
					<fieldset className="border border-solid border-black p-3 rounded-lg">
						<legend className="text-sm">Número</legend>
						<input type="text" name="cep" placeholder='000' className='bg-transparent border-none text-2xl text-[#000]' />
					</fieldset>
					<fieldset className="border border-solid border-black p-3 rounded-lg">
						<legend className="text-sm">Complemento</legend>
						<input type="text" name="cep" placeholder='...' className='bg-transparent border-none text-2xl text-[#000]' />
					</fieldset>
				</main>
			</section>
		);
	}
}
