import React, {useState} from "react";
import { Link } from 'react-router-dom';
import { Header } from '../../components/headers/headerEdits'
import { signup } from "../../services/integrations/authentication";
import { useForm } from "react-hook-form";



const userId = async () => {

  const apiResponse = await signup(localStorage.getItem('__user_JWT'))

  console.log(apiResponse);

  localStorage.setItem('__user_id', apiResponse.user.id)

}

userId()







export const HomePage = () => {

  let tipoUser

  return (
    <>
      <Header />

      <p>home</p>
      <Link to="/register/veterinary">Cadastro do veterinario</Link>/
      <Link to="/login">Login do usuario</Link>/
      <Link to="/register/address">Endereço do usuario</Link>/
      <Link to="/register">Main Login</Link>/
      <Link to="/home/HeaderWeb">Header das telas Web</Link>/
      <Link to="/home">Landing Page</Link>/
      <Link to="/profile/veterinary">profile veterinary</Link>/
      <Link to="/home/HeaderInfo">Header with Infos</Link>/
      <Link to="/home/Footer">Footer</Link>/
      <Link to="/home/aboutUs">About Us</Link>/
      <Link to="/profile/upgradeUser" onClick={() => {
        tipoUser = "veterinario"
        localStorage.setItem("user", tipoUser)
      }}>Upgrade User Vets</Link>/
      <Link to="/profile/upgradeUser" onClick={() => {
        tipoUser = "cliente"
        localStorage.setItem("user", tipoUser)
      }}>Upgrade User Not vets</Link>/
      <Link to="/profile/infosPerson">Infos Person</Link>/
      <Link to="/profile/headerConfig">Header Config</Link>/
      <Link to="/profile/pet/Add">Pet add</Link>/
      <Link to="/profile/pet/Config"> Pet Config</Link>/
      <Link to="/profile/editProfile">editProfile</Link>/
      <Link to="/profile/appointment">Appointment</Link>/
      <Link to="/home/searchProfessionals">Procurar profissionais</Link>/
    </>
  );

};
