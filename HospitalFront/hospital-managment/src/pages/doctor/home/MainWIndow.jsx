import React from 'react'
import {useAuth} from "../../../components/UseContext.js";
import Button from "../../../components/controls/Button";
import {useNavigate, Outlet, Navigate,Link} from "react-router-dom";
import HeaderMenu from '../../../components/HeaderComponents/HeaderMenu.js';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman';
import HealingIcon from '@mui/icons-material/Healing';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import GroupsIcon from '@mui/icons-material/Groups';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {ENDPOINTS, createApiEndpoint} from "../../../appi/Api.js";
import Notification from '../../../components/Notification';
import Error from "../../error/Error.js"
import {doctorsPatients,doctorsHospitals, updatePatientsCard,getAllRegisteredWardsName} from "../../../apiData/doctor/doctorData"
import Tilt from 'react-vanilla-tilt'
import MainCard from '../../../components/mainCard/MainCard.js';
import Progressbar from '../../../components/progressBar/Progressbar.js';
import {sortByDates,SortPatientsCardByDatesAndGetTheNewest} from "../../../helperMethod/SortData.js";
import ListOfItems from '../../../components/controls/displayListOfItems/ListOfItems.js';
import DisplayDataTable from '../../../components/controls/table/DisplayDataTable.js';
import DataGridTable from '../../../components/controls/table/DataGridTable.js';
import Popup from '../../../components/Popup.js';
import { Paper } from '@material-ui/core';
import PatientCardModification from '../../patientCardModification/PatientCardModification.js';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import ModifyProfile from '../../modifyProfile/ModifyProfile.js';


function MainWIndow() {
  const {user, token} = useAuth();
  const auth = useAuth();
  const navigate = useNavigate();
  const [patientsList, setPatientsList] = React.useState([]);
  const tabs = ["Home","Hospitals", "Wards","Patients", "Cards", "Logout"];
  const icons = [<HomeIcon />,<ApartmentIcon />,<BloodtypeIcon />,<GroupsIcon />,<TextSnippetOutlinedIcon />,<LogoutOutlinedIcon /> ]
  const [notify, setNotify] = React.useState({isOpen:false, message:"", type:"error"});
  const [modifyLstPatientCard, setModifyLastPatientCard] = React.useState(false);
  const [openPatientCardNotification, setOpenPatientCardNotification] = React.useState({isOpen:false, message:"", type:"success"});
  const [refreshDataGridTable, setRefreshDataGridTable] = React.useState(false);
  const [openModifyAccountWindow, setOpenModifyAccountWindow] = React.useState(false);
  const [openNotificationUserCredentials,setOpenNotificationUserCredentials] = React.useState({isOpen:false, message:"", type:"error"});
  const handleLogout = ()=>{
    auth.logout();
    auth.resetToken();
    navigate("/api/auth/register");
  }
  const actions = [()=>(navigate("/api/MainWindow")),()=>(navigate("/api/hospitals")),()=>(navigate("/api/wards")),()=>(navigate("/api/patients")),()=>(navigate("/api/cards")),handleLogout]

   React.useEffect(()=>{
    if(auth.error.length>0){
      setNotify(()=>{return{isOpen:true, message:auth.error, type:"error"}});
    }
     
  },[auth.error])

  React.useEffect( ()=>{
    doctorsPatients(setPatientsList,auth.setErrorLogin,auth.token);
    doctorsHospitals(auth.setNewHospitalList,auth.setErrorLogin,auth.token);
    getAllRegisteredWardsName(auth.setError, auth.token, auth.setAllRegisteredApplicationWards);
    auth.setChoosenPatientGridTableData(patientsList[0])
    console.log("patientList in minWIndow")
    console.log(patientsList)
    auth.setNewPatientsList(patientsList);
    
  } ,[]);

  React.useEffect(()=>{
    auth.setNewPatientsList(patientsList);
    //doctorsPatients(setPatientsList,auth.setErrorLogin,auth.token);
  },[patientsList])
  
  const dataGridParentComponentStyle = {
    marginLeft:'auto',
    marginRight:"auto",
    marginTop:'4rem',
    marginBottom:'4rem',
    height:'500px'
  };
  return (
    <>
    {console.log(auth.patientsList)}
    <HeaderMenu tabsList = {tabs} listIcons = {icons} actions = {actions} />
    {/* <Button onClick = {getAllPatients}  text="Get patients"/> */}
    {auth.error.length>0? <Navigate to = "/api/error" /> :<Outlet />}
    {auth.errorLogin.length>0? <Navigate to = "/api/errorLogin" /> :<Outlet />}
    {auth.error.length>0||auth.errorLogin.length>0?<Navigate to = "/api/error"/>:(
                                                                                <div style={{height:1000, width:"100%"}}>
                                                                                  <div>
                                                                                    <MainCard title="Doctor" subtitle = {`${auth.user.name} ${auth.user.surname}`} titleContent="Application to manage patients and their data. Asign Yourself to Hospital and Ward. Create Patient's card, create for them notes and filter your data" setOpenModifyAccountWindow = {setOpenModifyAccountWindow}/>
                                                                                  </div>
                                                                                  <div style={{display:"flex", flexWrap:"wrap", justifyContent:"center"}}>
                                                                                  
                                                                                    <Progressbar number={auth.patientsList.length} description="Patients No."/>
                                                                                    <Progressbar number={auth.getNumberOfPatientsCard()} description="Patients Cards No."/>
                                                                                    <Progressbar number={auth.getNumberOfPatientsNotes()} description="Doctors notes No."/>
                                                                                    <Progressbar number={auth.hospitalsList.length} description="Hospitals No."/>
                                                                                  </div>
                                                                                  <div style={{display:'flex',flexDirection:'column', justifyContent:'center', height:"500px", width:"70%", marginLeft:'auto',marginRight:"auto", maringBottom:"50px"}}>
                                                                                    
                                                                                      <h2>LAST 5 DAYS OF PATIENT CARD MODIFICATION</h2>
                                                                                      <DataGridTable theNewestObjectNotes = {SortPatientsCardByDatesAndGetTheNewest(patientsList)}
                                                                                                     setError = {auth.setError} 
                                                                                                     setChoosenPatientGridTableData = {auth.setChoosenPatientGridTableData}
                                                                                                     token = {auth.token}
                                                                                                     setOpenPopup = {setModifyLastPatientCard}
                                                                                                     editMode = "row"
                                                                                                     refreshDataGridTable = {refreshDataGridTable}
                                                                                                     setRefreshDataGridTable = {setRefreshDataGridTable}
                                                                                      />
                                                                                    
                                                                                  </div>
                                                                                  
                                                                                </div>
                                                                                )}
    <Notification notify = {notify} setNotify = {setNotify} resetError = {auth.resetError}/>
    <Notification notify = {openPatientCardNotification} setNotify={setOpenPatientCardNotification} resetError={auth.resetError} />
    <Notification notify = {openNotificationUserCredentials} setNotify = {setOpenNotificationUserCredentials} resetError = {auth.resetError} />
    <Popup openPopup = {openModifyAccountWindow} setOpenPopup = {setOpenModifyAccountWindow} title = {`${auth.user.name} ${auth.user.surname} Account`} children = {<ModifyProfile setOpenNotificationUserCredentials = {setOpenNotificationUserCredentials} setOpenModifyAccountWindow = {setOpenModifyAccountWindow}/>} avatar = {<PersonOutlineIcon color='info' fontSize='large'/>} />
    <Popup openPopup = {modifyLstPatientCard} setOpenPopup = {setModifyLastPatientCard} title="Patient Card Modification" 
           children = {(auth.choosenPatientGridTableData===null || auth.choosenPatientGridTableData===undefined) 
                                                                ?<TextareaAutosize minRows={5} 
                                                                                   maxRows = {10}
                                                                                   style = {{width:250}}
                                                                  />
                                                                :<PatientCardModification choosenPatientGridTableData={auth.choosenPatientGridTableData}
                                                                                          setOpenPopup = {setModifyLastPatientCard}
                                                                                          setOpenPatientCardNotification = {setOpenPatientCardNotification}
                                                                                          setPatientsList={setPatientsList}
                                                                                          patientsList = {patientsList}
                                                                                          setRefreshDataGridTable = {setRefreshDataGridTable}
                                                                  />}
    />
    </>
  )
}
export default MainWIndow