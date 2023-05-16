import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomeWeb } from "./pages/home/HomeWeb";
import { HeaderInfo } from "./pages/home/resource/HeaderInfo";
import { Footer } from "./pages/home/resource/Footer";
import { Login } from "./pages/login";
import { Register } from "./pages/register/Register";
import { RegisterAddress } from "./pages/register/RegisterAddress";
import { RegisterVeterinary } from "./pages/register/RegisterVeterinary";
import { VeterinaryProfile } from "./pages/userProfile/veterinaryProfile";
import { UpgradeUser } from "./pages/userProfile/upgradeUser";
import { PetAdd } from "./pages/userProfile/pet/petAdd";
import { ConsultasInfo } from "./pages/userProfile/resource/editUser/responseUser/consults";
import { PessoaisInfos } from "./pages/userProfile/resource/editUser/responseUser/infosPerson";
import { ProfissonaisInfos } from "./pages/userProfile/resource/editUser/responseUser/infosProfissionais";
import { SegurancaInfo } from "./pages/userProfile/resource/editUser/responseUser/security";
import { AddressInfos } from "./pages/userProfile/resource/editUser/responseUser/address";
import { EditProfile } from "./pages/userProfile/editProfile";
import { Appointment } from "./pages/userProfile/resource/appointment/appointment";
import { AppointmentView } from "./pages/userProfile/resource/appointment/appointmentView";
import { SearchProfessional } from "./pages/home/searchProfessional";
import { AppointmentAsk } from "./pages/userProfile/resource/appointment/appointments/appointmentAsk";
import { BlogProfile } from "./pages/home/BlogProfile";
import { Profile } from "./pages/userProfile/profile";
import { AboutUs } from "./pages/home/AboutUs";
import { PetHeader } from "./pages/userProfile/pet/petHeader";
import { PetConfig } from "./pages/userProfile/pet/petConfig";
import { Config } from "./pages/userProfile/resource/editUser/headerConfig";
import { HeaderProfile } from "./pages/userProfile/resource/header"

export const Rotas = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomeWeb />} />
				<Route path="/home" element={<HomeWeb />} />
				<Route path="/home/about-us" element={<AboutUs />} />
				<Route path="/home/resource/HeaderInfo" element={<HeaderInfo/>} />
				<Route path="/home/resource/Footer" element={<Footer />} />


				<Route path="/pet/petHeader" element={<PetHeader />} />
				<Route path="/pet/PetConfig" element={<PetConfig />} />


				<Route path="/pages/userProfile/resource/editUser/headerConfig" element={<Config  />} />
				<Route path="/pages/userProfile/resource/header" element={<HeaderProfile  />} />

				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/register/address" element={<RegisterAddress />} />
				<Route path="/register/veterinary" element={<RegisterVeterinary />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/profile/veterinary" element={<VeterinaryProfile />} />
				<Route path="/profile/configuration" element={<UpgradeUser />} />
				<Route path="/profile/pet/add" element={<PetAdd />} />
				<Route path="/profile/pet/edit" element={<PetConfig />} />
				<Route path="/profile/appointments" element={<ConsultasInfo />} />
				<Route path="/profile/edit-profile" element={<EditProfile />} />
				<Route path="/profile/edit-adress" element={<AddressInfos />} />
				<Route path="/profile/edit-person" element={<PessoaisInfos />} />
				<Route path="/profile/edit-security" element={<SegurancaInfo />} />
				<Route
					path="/profile/edit-profissionais"
					element={<ProfissonaisInfos />}
				/>
				<Route path="/profile/appointment" element={<Appointment />} />
				<Route path="/profile/appointment-view" element={<AppointmentView />} />
				{/*<Route path="/profile/appointment-menu" element={<AppointmentMenu />} />*/}
				<Route
					path="/home/search-professionals"
					element={<SearchProfessional />}
				/>
				<Route path="/profile/pending-appointments" element={<AppointmentAsk />} />
				<Route path="/profile/blog-profile" element={<BlogProfile />} />

			</Routes>
		</Router>
	);
};
