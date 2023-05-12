import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components/headers/headerEdits";
import { signup } from "../../services/integrations/authentication";

const userId = async () => {
  const apiResponse = await signup(localStorage.getItem("__user_JWT"));

  localStorage.setItem("__user_id", apiResponse.user.id);
  localStorage.setItem("__user_isVet", apiResponse.user.isVet);
};

export const HomePage = () => {
  useEffect(() => {
    userId();
  }, []);

  return (
    <>
      <Header />

      <p>home</p>
      <div className="flex flex-col">
        <div className="flex flex-col gap-5 content-center bg-green-500">
          <p className="font-bold text-2xl">Já tá pronta</p>
          <Link to="/login">Login do usuario</Link>
          <Link to="/register/address">Endereço do usuario</Link>
          <Link to="/register/veterinary">Cadastro do veterinario</Link>
          <Link to="/home">Landing Page</Link>
          <Link to="/home/aboutUs">About Us</Link>
          <Link to="/profile/pet/Add">Pet add</Link>
          <Link to="/home/searchProfessionals">Procurar profissionais</Link>
        </div>
        <div className="flex flex-col gap-5 content-center bg-purple-600">
          <p className="font-bold text-2xl">Tela em produção</p>
          <Link to="/profile/upgradeUser">Upgrade User</Link>
          <Link to="/profile/pet/Config"> Pet Config</Link>
          <Link to="/profile/editProfile">editProfile</Link>
          <Link to="/profile/veterinary">profile veterinary</Link>
          <Link to="/home/Home-Web">Home principal</Link>
          <Link to="/profile/appointmentView">AppointmentView</Link>
          <Link to="/profile/blogProfile">Blog Profile</Link>
        </div>
        <div className="flex flex-col gap-5 content-center bg-yellow-300">
          <p className="font-bold text-2xl">Apenas componentes</p>
          <Link to="/home/HeaderWeb">Header das telas Web</Link>
          <Link to="/home/HeaderInfo">Header with Infos</Link>
          <Link to="/home/Footer">Footer</Link>
          <Link to="/profile/infosPerson">Infos Person</Link>
          <Link to="/profile/headerConfig">Header Config</Link>
          <Link to="/profile/appointment">Appointment</Link>
        </div>
      </div>
    </>
  );
};
