import React from "react";
import { useState } from 'react';
import Local from "../../assets/svg/localizacao.svg";
import { unstable_HistoryRouter } from "react-router-dom";

export const FilterByName = (props) => {
	const [search, setSearch] = useState('');
	const history = unstable_HistoryRouter();

	function newVet() {
		history.push('/vets/new');
	}

	function handleSearchChange(event) {
		setSearch(event.target.value.toLowerCase());
	}

	return (
		<div className="flex flex-row gap-10">
			<img className="w-10" src={Local} alt='Location pin'/>
			<input className="xl:w-full h-10 text-2xl" placeholder="Pesquisar veterinários próximos" />
		</div>

	);


};