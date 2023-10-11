import "./patientCircularMainWindow.css";
import ShareIcon from '@mui/icons-material/Share';
import React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import List from '@mui/material/List';
import {useNavigate, Outlet, Navigate,Link} from "react-router-dom";
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import YouTubeIcon from '@mui/icons-material/YouTube';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import MasksIcon from '@mui/icons-material/Masks';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import {getPatientsData,getPatientCard} from "../../../apiData/patient/patientData"
import {useAuth} from "../../../components/UseContext.js"
import Popup from "../../../components/Popup";
import PatientsProfileData from "../../../components/patientsProfileData/PatientsProfileData";
import PatientHospitalData from "../../../components/patientsHospitalData/PatientHospitalData";
import PatientWardData from "../../../components/patientWardData/PatientWardData";
import PatientDoctorData from "../../../components/patientDoctorData/PatientDoctorData";
import PatientCardData from "../../../components/patientCardData/PatientCardData";
import BarChartIcon from '@mui/icons-material/BarChart';
import PatientStatistics from "../../../components/patientStatistics/PatientStatistics";
import LogoutIcon from '@mui/icons-material/Logout';


function PatientCircularMainWindow() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [patientData,setPatientData] = React.useState({});
  const [patientCard, setPatientCard] = React.useState({});
  const [openProfileWindow, setOpenProfileWindow] = React.useState(false);
  const [openHospitalWindow, setOpenHospitalWindow] = React.useState(false);
  const [openWardWindow, setOpenWardWindow] = React.useState(false);
  const [openDoctorWindow, setOpenDoctorWindow] = React.useState(false);
  const [openPatientCardWindow, setOpenPatientCardWindow] = React.useState(false);
  const [openStatsWindow, setOpenStatsWindow] = React.useState(false);

  const handleLogout = ()=>{
    auth.logout();
    auth.resetToken();
    navigate("/api/auth/register");
  }

  const preparePieData = ()=>{
    let availableBeds =patientData.ward.maxCapacity - patientData.ward.occupiedBeds;
    let dataToReturn = [
            {name:"Occupied Beds",value:patientData.ward.occupiedBeds},
            {name:"Free Beds", value: availableBeds >0?availableBeds:(-1*availableBeds) }
          ]
    return dataToReturn;
  }

  const addClassName = ()=>{
    let toggle = document.querySelector('.toggle');
    let menu = document.querySelector('.patientMenu');
    toggle.onclick = ()=>{
      menu.classList.toggle('active');
    }
  }
  
  const profileClick = ()=>{
    setOpenProfileWindow(true);
  }

  const hospitalClick = ()=>{
    setOpenHospitalWindow(true);
  }

  const wardClick = ()=>{
    setOpenWardWindow(true);
  }

  const doctorClick = ()=>{
    setOpenDoctorWindow(true);
  }

  const patientCardClick = ()=>{
    setOpenPatientCardWindow(true);
  }

  const statsClick = ()=>{
    setOpenStatsWindow(true);
  }

  React.useEffect(()=>{
    getPatientsData(setPatientData, auth.setError, auth.token);
    getPatientCard(setPatientCard,auth.setError, auth.token);
  },[])

  return (
    <>
    {auth.error!="" ? (<Navigate to = "/api/error" />) : null}
    <div className="mainContentView">
      <div className="patientMenu">
        <div className="toggle">
          <ShareIcon fontSize="large" onClick = {()=>addClassName()}/>
          
        </div>
        {/* {displayText ? <div className="pulsate">CLICK ME</div> : null} */}
        <List>
          <ListItemButton className="itemButtonPatientMenu" style={{"--i":0,"--clr":"#1877f2"}} onClick = {()=>profileClick()}>
            <ListItemIcon className="itemButtonIcon"> 
              <AccountCircleIcon fontSize="large"/>
            </ListItemIcon>
          </ListItemButton>

          <ListItemButton className="itemButtonPatientMenu" style={{"--i":1,"--clr":"#25d366"}} onClick={()=>hospitalClick()}>
            <ListItemIcon className="itemButtonIcon">
              <LocalHospitalIcon fontSize="large" />
            </ListItemIcon>
          </ListItemButton>

          <ListItemButton className="itemButtonPatientMenu" style={{"--i":2,"--clr":"#1da1f2"}} onClick = {()=>wardClick()}>
            <ListItemIcon className="itemButtonIcon">
              <BloodtypeIcon fontSize="large" />
            </ListItemIcon>
          </ListItemButton>

          <ListItemButton className="itemButtonPatientMenu" style={{"--i":3,"--clr":"#ea4c89"}} onClick={()=>doctorClick()}>
            <ListItemIcon className="itemButtonIcon">
              <MasksIcon fontSize="large" />
            </ListItemIcon>
          </ListItemButton>

          <ListItemButton className="itemButtonPatientMenu" style={{"--i":4,"--clr":"#0a66c2"}} onClick={()=>patientCardClick()}>
            <ListItemIcon className="itemButtonIcon">
              <FilePresentIcon fontSize="large" />
            </ListItemIcon>
          </ListItemButton>

          <ListItemButton className="itemButtonPatientMenu" style={{"--i":5,"--clr":"#c32aa3"}} onClick={()=>statsClick()}>
            <ListItemIcon className="itemButtonIcon">
              <BarChartIcon fontSize="large" />
            </ListItemIcon>
          </ListItemButton>

          <ListItemButton className="itemButtonPatientMenu" style={{"--i":6,"--clr":"#ff0000"}} onClick={()=>handleLogout()}>
            <ListItemIcon className="itemButtonIcon">
              <LogoutIcon />
            </ListItemIcon>
          </ListItemButton>

        </List>
      </div>
    </div>
    <Popup title = "USER PROFILE" 
           openPopup = {openProfileWindow} 
           setOpenPopup = {setOpenProfileWindow} 
           avatar = {<AccountCircleIcon fontSize="large"/>} 
           children = {<PatientsProfileData patientData = {patientData}/>}
    />
    <Popup title="YOUR HOSPITAL" 
           openPopup = {openHospitalWindow} 
           setOpenPopup = {setOpenHospitalWindow} 
           avatar = {<LocalHospitalIcon fontSize="large"/>} 
           children={<PatientHospitalData patientData = {patientData} />}
    />
    <Popup title="YOUR WARD" 
           openPopup = {openWardWindow} 
           setOpenPopup = {setOpenWardWindow} 
           avatar = {<BloodtypeIcon fontSize="large"/>} 
           children={<PatientWardData patientData = {patientData} />}
    />
    <Popup title="YOUR DOCTOR" 
           openPopup = {openDoctorWindow} 
           setOpenPopup = {setOpenDoctorWindow} 
           avatar = {<MasksIcon fontSize="large"/>} 
           children={<PatientDoctorData patientData = {patientData} />}
    />
    <Popup title="YOUR CARD" 
           openPopup = {openPatientCardWindow} 
           setOpenPopup = {setOpenPatientCardWindow} 
           avatar = {<FilePresentIcon fontSize="large"/>} 
           children={<PatientCardData patientData = {patientCard} />}
    />
    <Popup title="YOUR STATISTICS" 
           openPopup = {openStatsWindow} 
           setOpenPopup = {setOpenStatsWindow} 
           avatar = {<BarChartIcon fontSize="large"/>} 
           children={<PatientStatistics pieData ={()=>preparePieData()} />}
    />
    
    </>
  )
}

export default PatientCircularMainWindow