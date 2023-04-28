import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/home/Home";
import { HeaderWeb } from "./pages/home/resource/HeaderWeb";
import { LandingPage } from "./pages/home/LandingPage";
import { HomeWeb } from "./pages/home/Home-Web";
import { WebFunction} from "./pages/home/WebFunction";
import { ChatInfos} from "./pages/home/chatInfos";
import { BlogPreview } from "./pages/home/BlogPreview";
import { PraisedDoctors } from "./pages/home/PraisedDoctors";
import { Assessments } from "./pages/home/Assessments";
import { AppPreview } from "./pages/home/AppPreview";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { RegisterAddress } from "./pages/register/RegisterAddress";
import { RegisterVeterinary } from "./pages/register/RegisterVeterinary";
import { UserVet } from "./pages/profile/userVet";
import { HeaderInfo } from "./pages/home/resource/HeaderInfo";
import { Footer } from "./pages/home/resource/Footer";
import { AboutUs } from "./pages/home/AboutUs";
import { UpgradeUser } from "./pages/profile/upgradeUser";
import { Pessoais } from "./pages/profile/resource/editUser/infosPerson";
import { Config } from "./pages/profile/resource/editUser/headerConfig";
import { PetAdd } from "./pages/profile/pet/petAdd";
import { PetConfig } from "./pages/profile/pet/petConfig";
import { ConsultasInfo } from "./pages/profile/resource/editUser/responseUser/consults";
import { PessoaisInfos } from "./pages/profile/resource/editUser/responseUser/infosPerson";
import { ProfissonaisInfos } from "./pages/profile/resource/editUser/responseUser/infosProfissionais";
import { SegurancaInfo } from "./pages/profile/resource/editUser/responseUser/security";
import { AddressInfos } from "./pages/profile/resource/editUser/responseUser/address";
import { EditProfile } from "./pages/profile/editProfile";
import { Appointment } from "./pages/profile/resource/appointment/appointment";
import { AppointmentView } from "./pages/profile/resource/appointment/appointmentView";
import { AppointmentMenu } from "./pages/profile/resource/appointment/appointmentMenu";
import { SearchProfessional } from "./pages/home/searchProfessional";
import { AppointmentAsk } from "./pages/profile/resource/appointment/appointments/appointmentAsk";

export const Rotas = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/home" element={<LandingPage />}/>
            <Route path="/home/chatInfos" element={<ChatInfos />} />
            <Route path="/home/WebFunction" element={<WebFunction />} />
            <Route path="/home/BlogPreview" element={<BlogPreview />} />
            <Route path="/home/PraisedDoctors" element={<PraisedDoctors />} />
            <Route path="/home/Assessments" element={<Assessments/>} />
            <Route path="/home/AppPreview" element={<AppPreview/>} />
            <Route path="/home/Home-Web" element={<HomeWeb />} />
            <Route path="/home/HeaderWeb" element={<HeaderWeb />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />}/>
            <Route path="/register/address" element={<RegisterAddress />} />
            <Route path="/register/veterinary" element={<RegisterVeterinary />} />
            <Route path="/profile/veterinary" element={<UserVet />} />
            <Route path="/home/HeaderInfo" element={<HeaderInfo />} />
            <Route path="/home/Footer" element={<Footer />} />
            <Route path="/home/aboutUs" element={<AboutUs />} />
            <Route path="/profile/upgradeUser" element={<UpgradeUser />} />
            <Route path="/profile/infosPerson" element={<Pessoais />} />
            <Route path="/profile/headerConfig" element={<Config />} />
            <Route path="/profile/pet/Add" element={<PetAdd />} />
            <Route path="/profile/pet/Config" element={<PetConfig />} />
            <Route path="/profile/Consultas" element={<ConsultasInfo />} />
            <Route path="/profile/editProfile" element={<EditProfile />} />
            <Route path="/profile/editAdress" element={<AddressInfos />} />
            <Route path="/profile/editPerson" element={<PessoaisInfos />} />
            <Route path="/profile/editSecurity" element={<SegurancaInfo />} />
            <Route path="/profile/editProfissionais" element={<ProfissonaisInfos />} />
            <Route path="/profile/appointment" element={<Appointment />} />
            <Route path="/profile/appointmentView" element={<AppointmentView />} />
            <Route path="/profile/appointmentMenu" element={<AppointmentMenu />} />
            <Route path="/home/searchProfessionals" element={<SearchProfessional />} />
            <Route path="/profile/AppointmentAsk" element={<AppointmentAsk />} />
        </Routes>
    </Router>

  );
};
