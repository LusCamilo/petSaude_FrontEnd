import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useForm } from "react-hook-form";
import { PetHeader } from "./petHeader";
import addMais from "../resource/img/AddMais.png";
import cuidado from '../resource/img/Cuidado.png'
import "../../reset.css";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { styled } from "@stitches/react";
import certo from "../resource/img/Certo.jpg";
import lixeira from "../resource/img/Excluir.png";
import { PetAddSucess } from "./cards/sucess";
import * as Dialog from "@radix-ui/react-dialog";
import "./css/pet.css";
import lapis from "../../../assets/svg/pencil.svg";
import { getSpecialtiesPet } from "../../../services/integrations/specialtiesPet";
import { getPet, petUpdate } from "../../../services/integrations/pet";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import { petDelete } from "../../../services/integrations/pet";
import { AiOutlineCheck } from 'react-icons/ai';
import { IoMdTrash } from "react-icons/io";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "4px solid transparent",
    borderRadius: "10px",
    backgroundColor: "#E3EFF0",
    width: "510px",
    height: "360px",
    padding: "0",
    display: "flex",
    justifyContent: "center",
  },
  overlay: {
    backgroundColor: "#0000",
  },
};

const deletingPet = () => {
  toast.warn("Deletando pet", {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const updatingPet = () => {
  toast.success("Editando pet", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};


const firebaseConfig = {
  apiKey: "AIzaSyDidn9lOpRvO7YAkVjuRHvI88uLRPnpjak",
  authDomain: "petsaude-6ba51.firebaseapp.com",
  projectId: "petsaude-6ba51",
  storageBucket: "petsaude-6ba51.appspot.com",
  messagingSenderId: "965774218063",
  appId: "1:965774218063:web:51d112960710c8481ceb3a",
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const maskPetSize = (tamanho) => {
  let tamanhoBr;
  if (tamanho === "MEDIUM" || tamanho === "Médio") tamanhoBr = "Médio";
  else if (tamanho === "BIG" || tamanho === "Grande") tamanhoBr = "Grande";
  else tamanhoBr = "Pequeno";
  return tamanhoBr;
};

const dataFormation = (date) => {
  let data = date.split("-");
  const dataReverse = data.reverse();
  return dataReverse.join("-");
};

const InfosUser = async () => {
  const response = await getPet(localStorage.getItem("__pet_id"));
  return {
    id: response.id,
    name: response.name,
    birthDate: response.birthDate,
    photo: response.photo,
    microship: response.microship,
    petSize: response.petSize,
    petGender: response.petGender,
    ownerId: response.ownerId,
    idSpecie: response.petSpecie.id,
    nameSpecie: response.petSpecie.name,
  };
};

const checkboxSpecialitiesPet = async () => {
  const response = await getSpecialtiesPet();
  return {
    allSpecialitiesPet: response.response,
  };
};

export const PetConfig = () => {
  // State variables
  const [especialidadesPet, setEspecialidadesPet] = useState([]);
  const [animalType, setAnimalType] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [tamanho, setTamanho] = useState("");
  const [name, setName] = useState("");
  const [sexo, setSexo] = useState("");
  const [dateBorn, setDateBorn] = useState();
  const [infos, setInfos] = useState({});
  const [petInfosDisable, petInfosDisableState] = useState({
    disable: true,
<<<<<<< HEAD
    class: "text-slate-400",
=======
    class: "opacity-50",
>>>>>>> 3dc45df7c04d17fec850479a16e8fc80f7285f4b
  });
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsClose, setIsClose] = React.useState(false);

  // Form validation
  const { register, handleSubmit, formState: errors, setValue } = useForm();

  // Styled components
  const StyledContent = styled(DropdownMenu.Content, {
    minWidth: 130,
    backgroundColor: "white",
    borderRadius: 6,
    padding: 5,
    boxShadow: "0px 5px 15px -5px hsla(206,22%,7%,.15)",
  });
  const StyledItem = styled(DropdownMenu.Item, {
    fontSize: 13,
    padding: "5px 10px",
    borderRadius: 3,
    cursor: "default",

    "&:focus": {
      outline: "none",
      backgroundColor: "dodgerblue",
      color: "white",
    },
  });
  const StyledArrow = styled(DropdownMenu.Arrow, {
    fill: "white",
  });

  // Event handlers
  function newName(event) {
    setName(event.target.value);
  }

  function newDateBorn(event) {
    setDateBorn(event.target.value);
  }

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const storageRef = ref(storage, `Pet/${file.name}`);
    uploadBytes(storageRef, file)
      .then(() => {
        return getDownloadURL(storageRef);
      })
      .then((url) => {
        setSelectedFile(url);
      });
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModalError() {
    console.log("Fechar close");
    setIsClose(false);
    console.log(modalIsOpen);
  }

  function openModal() {
    setIsClose(true);
  }

  function closeModal() {
    console.log("Fechar close");
    setIsOpen(false);
    console.log(modalIsOpen);
  }

  function afterOpenModal() {}

  // Fetch data and initialization
  useEffect(() => {
    setSelectedFile(infos.photo ? infos.photo : "");
    setName(infos.name ? infos.name : "");
    setAnimalType(infos.specie ? infos.specie : "");
    setTamanho(infos.size ? infos.size : "");
    setSexo(infos.gender ? infos.gender : "");
    setDateBorn(infos.birthDate ? infos.birthDate : "");

    async function fetchDataSpecialities() {
      const dadosPet = await checkboxSpecialitiesPet();
      setEspecialidadesPet(dadosPet.allSpecialitiesPet);
    }

    async function fetchData() {
      const allInfosPet = await InfosUser();
      const dataFormation = allInfosPet.birthDate.split("T");
      let data = dataFormation[0].split("-");
      const newData = new Date(data[0], data[1], data[2]);

      setInfos({
        id: allInfosPet.id,
        name: allInfosPet.name,
        birthDate: newData.toISOString().slice(0, 10),
        photo: allInfosPet.photo,
        microship: allInfosPet.microship,
        size: allInfosPet.petSize,
        gender: allInfosPet.petGender,
        ownerID: allInfosPet.ownerId,
        specie: allInfosPet.nameSpecie,
      });
    }

    fetchData();
    fetchDataSpecialities();
  }, [
    infos.photo,
    infos.name,
    infos.specie,
    infos.size,
    infos.gender,
    infos.birthDate,
  ]);

  // Other functions
  let hoje = new Date();
  let ano = hoje.getFullYear();
  let mes = hoje.getMonth() + 1;
  let dia = hoje.getDate();
  if (mes < 10) mes = "0" + mes;
  if (dia < 10) dia = "0" + dia;
  let dataFormatada = `${ano}-${mes}-${dia}`;

  const editarPetizinho = async (id, infosPet) => {
    const result = await petUpdate(id, infosPet);

    const error = result;
    if (error.response == "Item atualizado com sucesso no Banco de Dados") {
      updatingPet();
      setTimeout(() => {
        openModal();
        setTimeout(() => {
          document.location.href = "/profile/configuration";
        }, 1000);
      }, 2000);
    } else {
      toast.error("Erro ao editar", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      window.location.reload();
    }
    return result;
  };

  return (
    <section>
      <PetHeader />
      <main className="static w-full">
        <div>
          <div className="flex justify-start p-3 sm:p-10 flex-row items-center content-center align-middle h-30 sm:h-80">
            <div className="h-20 w-20 md:h-48 md:w-48 rounded-full">
              <input
                type="file"
                accept="image/*"
                name="photo"
                id="photoProfile"
                className="hidden"
                onChange={handleFileInputChange}
              />
              <label
                htmlFor="photoProfile"
                style={{ backgroundImage: `url(${selectedFile})` }}
                className="flex justify-center items-center rounded-full bg-slate-900 w-full h-full bg-center bg-origin-content bg-no-repeat bg-cover cursor-pointer hover:bg-blend-darken "
              >
                <img className src={addMais} alt="Add icon" />
              </label>
            </div>
            {infos.id && (
              <div className="flex flex-col w-2/3 sm:w-fit p-3 sm:p-10">
                <p className="md:text-5xl font-medium ">{name}</p>
                <p className="md:text-3xl font-normal text-[#A9A9A9]">
                  {animalType}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="w-full h-full border-none sm:border-solid border-2 rounded-lg border-black flex flex-col gap-5 md:p-10">
          <h2 className="font-bold text-5xl flex justify-center sm:justify-start sm:text-6xl font-sans">
            Informações{" "}
          </h2>
          <div className="flex flex-col sm:flex-row justify-between pr-20">
            <div className="flex flex-col gap-3 sm:gap-5 justify-start w-full sm:w-1/3 mb-2">
              <div>
                <label className="flex flex-col text-2xl text-[#A9A9A9]">
                  Nome
                  <input
                    type="text"
                    onBlur={newName}
                    disabled={petInfosDisable.disable}
                    name="nameAnimal"
                    placeholder="Nome"
                    className={`h-fit bg-transparent placeholder:text-black placeholder:text-2xl border-none text-2xl ${petInfosDisable.class}`}
                    defaultValue={infos.name}
                    id="petInfos"
                  />
                </label>
              </div>
              <div>
                <label className="flex flex-col text-xl text-[#A9A9A9]">
                  Sexo
                  <DropdownMenu.Root className="w-full">
                    <DropdownMenu.Trigger
                      disabled={petInfosDisable.disable}
                      className={`flex justify-start  text-2xl ${petInfosDisable.class}`}
                      {...register("name", { required: true })}
                    >
                      {sexo}
                    </DropdownMenu.Trigger>
                    <StyledContent>
                      <StyledItem onSelect={() => setSexo("F")}>
                        Feminino
                      </StyledItem>
                      <StyledItem onSelect={() => setSexo("M")}>
                        Masculino
                      </StyledItem>
                      <StyledArrow />
                    </StyledContent>
                  </DropdownMenu.Root>
                </label>
              </div>
              <div>
                <label className="flex flex-col text-xl text-[#A9A9A9]">
                  Espécie
                  <DropdownMenu.Root className="w-full">
                    <DropdownMenu.Trigger
                      disabled={petInfosDisable.disable}
                      className={`flex justify-start  text-2xl ${petInfosDisable.class}`}
                    >
                      {animalType}
                    </DropdownMenu.Trigger>
                    <StyledContent>
                      {especialidadesPet.map((item) => {
                        return (
                          <StyledItem onSelect={() => setAnimalType(item.name)}>
                            {item.name}
                          </StyledItem>
                        );
                      })}
                      <StyledArrow />
                    </StyledContent>
                  </DropdownMenu.Root>
                </label>
              </div>
            </div>
            <div className="flex flex-col sm:flex-col gap-3 mb-5 sm:gap-5 justify-start content-center w-full sm:w-1/3">
              <div className="w-2/4">
                <label className="flex flex-col text-xl text-[#A9A9A9]">
                  Data de Nascimento
                  <input
                    type="date"
                    disabled={petInfosDisable.disable}
                    onChange={newDateBorn}
                    name="dateBorn"
                    defaultValue={infos.birthDate}
                    className={`h-fit bg-transparent border-none text-2xl text-[#000] w-full ${petInfosDisable.class}`}
                    max={dataFormatada}
                  />
                </label>
              </div>
              <div>
                <label className="flex flex-col text-xl text-[#A9A9A9] ">
                  Tamanho
                  <DropdownMenu.Root className="w-full">
                    <DropdownMenu.Trigger
                      disabled={petInfosDisable.disable}
                      className={`flex justify-start  text-2xl  ${petInfosDisable.class}`}
                      {...register("tamanho", { required: true })}
                    >
                      {maskPetSize(tamanho)}
                    </DropdownMenu.Trigger>
                    <StyledContent>
                      <StyledItem
                        onSelect={() => setTamanho("Grande")}
                        selected={tamanho === "Grande"}
                      >
                        Grande
                      </StyledItem>
                      <StyledItem
                        onSelect={() => setTamanho("Médio")}
                        selected={tamanho === "Médio"}
                      >
                        Médio
                      </StyledItem>
                      <StyledItem
                        onSelect={() => setTamanho("Pequeno")}
                        selected={tamanho === "Pequeno"}
                      >
                        Pequeno
                      </StyledItem>
                      <StyledArrow />
                    </StyledContent>
                  </DropdownMenu.Root>
                </label>
              </div>
            </div>
            <div className="w-full sm:w-1/3 h-fit flex justify-end content-center">
              <button className='w-fit px-14 h-14 flex-row justify-center items-center cursor-pointer gap-4 bg-[#ECECEC] rounded-full drop-shadow-lg hidden md:flex text-2xl' 
                onClick={() => {
                  if (document.getElementById("petInfos").disabled === true) {
                    petInfosDisableState({
                      disable: false,
                      class: "text-black",
                    });
                  } else {
                    petInfosDisableState({
                      disable: true,
                      class: "opacity-50 bg-white",
                    });
                  }
                }}
              >
                <img src={lapis} alt="Edit" className='h-7'/>
                {/* <MdEdit className='text-4xl'/> */}
                Editar	
              </button>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between mb-30">
          <Dialog.Root>
<<<<<<< HEAD
            <Dialog.Trigger asChild className="w-full flex justify-between">
              <button className="mt-3" asChild onClick={ 
                () => {
                  console.log("bah rato");
                  deletingPet(infos.id)
                  petDelete(localStorage.getItem('__pet_id'))
                  setTimeout(() => {
                    document.location.href = "/profile/configuration";
                  }, 3000); 
                }}>
                <img src={lixeira} alt="" />
=======
            <Dialog.Trigger asChild>
              <button 
                className="md:flex justify-center items-center h-20 w-20 self-start rounded-2xl text-[#410E0B] bg-[#F9DEDC] mt-5 shadow-md mb-7" 
                asChild
              >
                <IoMdTrash className='text-6xl'/>
>>>>>>> 3dc45df7c04d17fec850479a16e8fc80f7285f4b
              </button>
              {/* <button 
                className="mt-3" 
                asChild
              >
                <img src={lixeira} alt="" />
              </button> */}
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="DialogOverlay" />
              <Dialog.Content className="DialogContent" class="cardPet">
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className='md:flex justify-center items-center h-20 w-20 self-end rounded-2xl bg-[#9ED1B7] mt-5 shadow-md mb-7'
                asChild
                onClick={() => {
                  const data = dataFormation(dateBorn);

                  let tamanhoPut;

                  if (tamanho === "Grande") tamanhoPut = "BIG";
                  else if (tamanho === "Médio") tamanhoPut = "MEDIUM";
                  else tamanhoPut = "SMALL";

                  let infosPet = {
                    name: name,
                    birthDate: data,
                    photo: selectedFile,
                    microship: infos.microship,
                    size: tamanhoPut,
                    gender: sexo,
                    ownerID: infos.ownerID,
                    specie: animalType,
                  };

                  const { id } = infos;
                  editarPetizinho(id, infosPet);
                }}
              >
                <AiOutlineCheck className='text-5xl'/>
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="DialogOverlay" />
              <Dialog.Content className="DialogContent" class="cardPet">
                <Modal
                  isOpen={modalIsOpen}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <PetAddSucess
                    className="cardPet"
                    title="Sucesso"
                    what="Pet editado"
                    aparecer="hidden"
                  />
                </Modal>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
          <ToastContainer
            position="top-right"
            autoClose={100}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
        </div>
      </main>
    </section>
  );
};
