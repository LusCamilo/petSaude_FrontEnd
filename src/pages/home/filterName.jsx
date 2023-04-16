import React from "react";
import styled from 'styled-components';
import { InputGroup, FormControl, Button, Form, Col } from 'react-bootstrap';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
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
            <img className="w-10" src={Local}/>
            <input className="xl:w-full h-10 text-2xl" placeholder="Pesquisar veterinários próximos" />
        </div>

    );


};