import React, { useState, useEffect } from "react";
import { getVet } from "../../../services/integrations/filters";
import { HeaderProfile } from "../resource/header.jsx";
import { Cards } from "../resource/cards/cards.jsx"
import { TopContainer } from '../resource/topContainer.jsx';
import { AcademicInfos } from '../resource/academicInfo.jsx';
import { Maps } from '../resource/maps.jsx';

export const VeterinaryProfile = () => {
	const [vets, setVets] = useState([]);
	const onSearch = async () => {
		try {
			let vetId = localStorage.getItem("__Vet_correctId");
			let response = await getVet(vetId);
			let result = response.response;
			let json
			if (result == "Nenhum veterinário atende aos filtros de pesquisa" ) {
				json = []
			} else {
				json = result.user
			} 
			setVets(json)
			if (vets.isVet == true) { 
				localStorage.setItem('__register_type', "professional")
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		onSearch();
	}, []);

	return (
		<div>
			<HeaderProfile />
			<div>
				<TopContainer
					name={vets.personName}
					profilePhoto={vets.profilePhoto}
					profileBannerPhoto={vets.profileBannerPhoto}
					biografia={vets.biography}
					id={vets.id}
					isVet={vets.isVet}
					myProfile={false}
					 />
				<Cards 
					id={vets.id}
					isVet={vets.isVet}
				/>
				<div className='flex flex-col md:flex-row justify-between gap-[10%] px-10 md:px-44 mb-16'>
					<AcademicInfos formacao={vets.formation} dataFormacao={vets.formationDate} instituicao={vets.institution} carreiraInicio={vets.startActingDate} />
					<Maps/>
				</div>
			</div>
		</div>
	);
}
