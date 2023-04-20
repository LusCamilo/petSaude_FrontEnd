import React, { useState, useEffect } from "react";
import { CardProfessionals } from "./resource/CardProfessionals";
import { Footer } from "./resource/Footer";
import { HeaderInfo } from "./resource/HeaderInfo";
import { getUsers, getAllVets } from "../../services/integrations/filters";
import { useForm } from "react-hook-form";
import search from "../../assets/svg/lupa.svg";
import * as RadioGroup from '@radix-ui/react-radio-group';
import './radixSearch.css'


export const SearchProfessional = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [vets, setVets] = useState([]);
  const [inputSearch, setInputSearch] = useState(
    localStorage.getItem("__Vet_Search") || ""
  );

  const [whenSearch, setWhenSearch] = useState(
    localStorage.getItem("__Vet_WhenSearch") || ""
  );

  console.log(whenSearch);

  const [wSearch, setwSearch] = useState("userName");


  const setMudarFiltro = (value) => {

    setwSearch(value)

    onSearchIt({ search:  inputSearch, searchIt: value})
  };

  const onSearch = async (data) => {
    try {
      if (data.search == "") {
        {
          let response = await getAllVets();
          console.log(response);
          let result = response.response;
          console.log(result);
          let json = Object.values(result);
          console.log(json);
          setVets(json);
        }
      } else {
        let response = await getUsers(data.search, wSearch);
        let result = response.response;
        let json = result.filter(
          (item) =>
            item.personName.toLowerCase().includes(data.search.toLowerCase()) ||
            item.userName.toLowerCase().includes(data.search.toLowerCase())
        );
        setVets(json);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSearchIt = async (data) => {
    try {
      if (data.search === "") {
        setVets([]);
      } else {
        let response = await getUsers(data.search, data.searchIt);
        let result = response.response;
        let json = result.filter(
          (item) =>
            item.personName.toLowerCase().includes(data.search.toLowerCase()) ||
            item.userName.toLowerCase().includes(data.search.toLowerCase())
        );
        setVets(json);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    onSearch({ search: inputSearch });
  }, []);

  const handleRadioChange = () => {

    console.log();

  };

  

  return (
    <>
      <HeaderInfo
        title="Profissionais"
        description="Temos os melhores e mais confiaveis profissionais em nosso site."
      />
      <div className={`p-20 container mx-auto px-4 flex flex-col gap-10`}>
        <div className="flex flex-row w-full" >
          <div className="flex flex-row gap-2 w-full border-4 border-black rounded-lg items-center align-middle  content-center">
          <img className="w-10" src={search} />
          <form
            onChange={handleSubmit(onSearch)}
            className="w-full flex pt-3 items-center content-center align-middle"
          >
            <input
              className="xl:w-full h-10 text-2xl flex items-center content-center"
              placeholder="Pesquisar especialistas"
              defaultValue={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
              {...register("search")}
            />
          </form>
        </div>
        <form className="w-3/12">
            <RadioGroup.Root className="RadioGroupRoot" defaultValue="userName" onChange={handleRadioChange} aria-label="View density">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <RadioGroup.Item className="RadioGroupItem" onClick={() => setMudarFiltro("userName")} name="userName" defaultValue="userName" id="r1">
                    <RadioGroup.Indicator className="RadioGroupIndicator" />
                    </RadioGroup.Item>
                    <label className="Label" htmlFor="r1">
                    Procurar por nome
                    </label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <RadioGroup.Item className="RadioGroupItem" onClick={() => setMudarFiltro("speciality")} name="speciality" defaultValue="speciality" id="r2">
                    <RadioGroup.Indicator className="RadioGroupIndicator" />
                    </RadioGroup.Item>
                    <label className="Label" htmlFor="r2">
                    Procurar por especialização
                    </label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <RadioGroup.Item className="RadioGroupItem" onClick={() => setMudarFiltro("animal")} name="animal" defaultValue="animal" id="r3">
                    <RadioGroup.Indicator className="RadioGroupIndicator" />
                    </RadioGroup.Item>
                    <label className="Label" htmlFor="r3">
                    Procurar por animal que atende
                    </label>
                </div>
            </RadioGroup.Root>
        </form>
        </div>
        <div>
          {vets.map((vet) => {
            console.log(vet);
            return (
              <CardProfessionals
                key={vet.id}
                nome={vet.personName}
                idade="24"
                cep={vet.Address.cep}
                formacao={vet.formation}
                instituicao={vet.institution}
                especializacao={vet.VeterinaryEspecialities[0].specialities.name}
                image={vet.profilePhoto}
                umCorteRapido=""
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};