import './App.css';
import Login from "./pages/login/Login.jsx";
import Register from "./pages/Register/Register.jsx"
import Layout from "./pages/publicAccesLayout/Layout";
import Test from "./pages/test/Test"
import {AuthProvider} from "./components/UseContext";
import RequireAuth from "./components/RequireAuth"
import Unauthorized from './pages/unauthorized/Unauthorized';
import Error from "./pages/error/Error";
import ErrorLogin from "./pages/error/ErrorLogin";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import MainWIndow from './pages/doctor/home/MainWIndow';
import MainCard from './components/mainCard/MainCard';
import PatientCircularMainWindow from "./pages/patient/home/PatientCircularMainWindow";
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import Hospitals from './pages/doctor/hospitals/Hospitals';
import Wards from './pages/doctor/wards/Wards';
import Patients from './pages/doctor/patients/Patients';
import Card from './pages/doctor/cards/Card';
import AdminPanel from './pages/admin/home/AdminPanel';
import AddNewHospital from './pages/admin/newHospital/AddNewHospital';
import AddWardToHospital from './pages/admin/addWardToHospital/AddWardToHospital';
import UpdateWard from './pages/admin/updateWard/UpdateWard';
import UpdateHospital from './pages/admin/updateHospital/UpdateHospital';
//import LoginLight from "./pages/test/LoginLight";

function App() {

  const ROLES = {
    "Doctor":0,
    "Patient":1,
    "Admin":2
  }
  
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path='/api/Auth/' element={<Layout/>}>
            <Route path='register' index element = {<Register />}/>
            <Route path='login' element = {<Login />} />
          </Route>
          <Route path='/api/unauthorized' element = {<Unauthorized />}/>
          <Route path='/api/mainWindow' 
                 element= {<RequireAuth allowedRoleId = {ROLES.Doctor}>
                              <MainWIndow />
                           </RequireAuth>}>
              {/* <Route path='hospitals' element={<RequireAuth allowedRoleId={ROLES.Doctor}><Hospitals /></RequireAuth>}/> */}
          </Route>
          <Route path='/api/hospitals' element={<RequireAuth allowedRoleId={ROLES.Doctor}><Hospitals /></RequireAuth>}/>
          <Route path='/api/hospitals/UpdateHospital' element={<RequireAuth allowedRoleId={ROLES.Admin}><UpdateHospital /></RequireAuth>}></Route>
          <Route path='/api/wards' element={<RequireAuth allowedRoleId={ROLES.Doctor}><Wards /></RequireAuth>}/>
          <Route path='/api/patients' element={<RequireAuth allowedRoleId={ROLES.Doctor}><Patients /></RequireAuth>}/>
          <Route path='/api/cards' element={<RequireAuth allowedRoleId={ROLES.Doctor}><Card /></RequireAuth>}/>
          {/* <Route path='/api/Doctor/updatePatientNote' element = {<RequireAuth allowedRoleId = {ROLES.Doctor}/>} /> */}
          <Route path='/api/patient/:patientId' element = {<RequireAuth allowedRoleId={ROLES.Patient}><PatientCircularMainWindow /></RequireAuth>}></Route>
          <Route path='/api/Admin' element = {<RequireAuth allowedRoleId={ROLES.Admin}><AdminPanel /></RequireAuth>}></Route>
          <Route path='/api/Admin/NewHospital' element={<RequireAuth allowedRoleId={ROLES.Admin}><AddNewHospital /></RequireAuth>}></Route>
          <Route path='/api/Admin/AddWard' element={<RequireAuth allowedRoleId={ROLES.Admin}><AddWardToHospital /></RequireAuth>}></Route>
          <Route path='/api/Ward/UpdateWardHospital' element={<RequireAuth allowedRoleId={ROLES.Admin}><UpdateWard /></RequireAuth>}></Route>
          <Route path='/api/error' element = {<Error />} />
          <Route path='/api/errorLogin' element = {<ErrorLogin />} />
          {/* <Route path = "/api/test" element = {<LoginLight />} /> */}
          <Route path="/*" element = {<Error />}/>
          
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
