import React from 'react'
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import GroupsIcon from '@mui/icons-material/Groups';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import HeaderMenu from '../../../components/HeaderComponents/HeaderMenu';
import {useNavigate, Outlet, Navigate,Link} from "react-router-dom";
import {useAuth} from "../../../components/UseContext";
import ProgressBar from '../../../components/controls/dataProgressBar/ProgressBar.js';
import {getAllDoctorsWards, getAllRegisteredWardsName, removeWardFromDoctor,getAllAvailableRegisteredHospitals,doctorsPatients,doctorsHospitals} from "../../../apiData/doctor/doctorData"
import { Box } from '@mui/system';
import WardsGridTable from '../../../components/controls/table/WardsGridTable';
import ConfirmDialog from '../../../components/confirmDialog/ConfirmDialog';
import Notification from '../../../components/Notification';
import Popup from '../../../components/Popup';
import UserCard from '../../../components/userCard/UserCard';
import AddNewWard from '../../../components/controls/addNewWard/AddNewWard';
import HealingOutlinedIcon from '@mui/icons-material/HealingOutlined';
import VaccinesSharpIcon from '@mui/icons-material/VaccinesSharp';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import { makeStyles } from '@material-ui/core'
import { Circle } from '@mui/icons-material';
import DynamicLineChart from '../../../components/charts/DynamicLineChart';
import DynamicPieChart from '../../../components/charts/DynamicPieChart';

const useStyle = makeStyles(theme=>({
  addWardButton:{
    color:"#fff",
    "MuiSvgIcon-root":{
      "& circle":{
        stroke:"#fff"
      }
    },
    circle:"#fff"
  },
  chart:{
    display:'flex',
    justifyContent:'center',
    alignContent:'center',
  }
}))

function Wards() {
  const auth = useAuth();
  const handleLogout = ()=>{
    auth.logout();
    auth.resetToken();
    navigate("/api/auth/register");
  }
  const classes = useStyle();
  const navigate = useNavigate();
  const tabs = ["Home","Hospitals", "Wards","Patients", "Cards", "Logout"];
  const icons = [<HomeIcon />,<ApartmentIcon />,<BloodtypeIcon />,<GroupsIcon />,<TextSnippetOutlinedIcon />,<LogoutOutlinedIcon /> ];
  const actions = [()=>(navigate("/api/MainWindow")),()=>(navigate("/api/hospitals")),()=>(navigate("/api/wards")),()=>(navigate("/api/patients")),()=>(navigate("/api/cards")),handleLogout]
  const [doctorsWards, setDoctorsWards] = React.useState([]);
  const [wardsOccupation, setWardsOccupation] = React.useState([]);
  const [allWardsNames, setAllWardsNames] = React.useState([]);
  const [confirmDeleteWard, setConfirmDeleteWard] = React.useState({isOpen:false, title:"", subtitle:""});
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [deleteWardClickedRow, setDeleteWardClickedRow] = React.useState({})
  const [deleteWardNotifications, setDeleteWardNotifications] = React.useState({isOpen:false, message:"", type:"error"})
  const [openAddWardWindow, setOpenAddWardWindow] = React.useState(false);
  const [allRegisteredHospitals,setAllRegisteredHospitals] = React.useState([]);
  const [allRegisteredHospitalsErrornotification, setAllRegisteredHospitalsErrornotification] = React.useState({isOpen:false, message:"", type:"error"})
  const [addWardNotification, setAddWardNotification] = React.useState({isOpen:false, message:"", type:"error"});
  const [showDeleteWardTable, setShowDeleteWardTable] = React.useState(false);
  const [pieChartData, setPieChartData] = React.useState([]);
  const [yourHospitals, setYourHospitals] = React.useState([]);
  

  React.useEffect(()=>{
    doctorsPatients(auth.setNewPatientsList,auth.setErrorLogin,auth.token);
    getAllDoctorsWards(auth.setError, auth.token,setDoctorsWards)
    getAllRegisteredWardsName(auth.setError,auth.token,setAllWardsNames);
    setDataToProgressBar();
    getAllRegisteredHospitals();
    prepareDataForPieChart();
    doctorsHospitals(setYourHospitals,auth.setError,auth.token);
  },[])

  React.useEffect(()=>{
    getAllRegisteredWardsName(auth.setError,auth.token,setAllWardsNames);
    setDataToProgressBar();
    prepareDataForPieChart();
  },[doctorsWards, openAddWardWindow])

  React.useEffect(()=>{
    getAllRegisteredWardsName(auth.setError,auth.token,setAllWardsNames);
    getAllDoctorsWards(auth.setError, auth.token,setDoctorsWards)
    setDataToProgressBar();
    prepareDataForPieChart();
  },[addWardNotification.isOpen, auth.patientsList])

  React.useEffect(()=>{
    getAllRegisteredWardsName(auth.setError,auth.token,setAllWardsNames);
    getAllDoctorsWards(auth.setError, auth.token,setDoctorsWards)
    setDataToProgressBar();
    prepareDataForPieChart();
  },[deleteWardNotifications.isOpen])

  const getAllRegisteredHospitals = ()=>{
    getAllAvailableRegisteredHospitals(auth.setError,auth.token,setAllRegisteredHospitals,setAllRegisteredHospitalsErrornotification);
    //doctorsHospitals(setYourHospitals,auth.setError,auth.token);
  }

  const setDataToProgressBar = ()=>{
    setWardsOccupation([]);
    for(let i =0; i<doctorsWards.length; i++){
      let percent = Math.round((doctorsWards[i].occupiedBeds / doctorsWards[i].maxCapacity)*100);
      setWardsOccupation(prev=>([...prev, {hospitalName:doctorsWards[i].hospital.name, occupation:percent,wardName:doctorsWards[i].wardName}]));
    }
  }

  

  const deleteWardFromDoctorsWardsList = (id)=>{
    let temporaryDoctorsWardsList = [];
    doctorsWards.forEach(element => {
      if(element.wardId!=id){
        temporaryDoctorsWardsList.push(element);
      }
      
    });
      setDoctorsWards([]);
      setDoctorsWards([...temporaryDoctorsWardsList]);
      doctorsPatients(auth.setNewPatientsList,auth.setErrorLogin,auth.token);
      prepareDataForPieChart();
      setSuccess(false);
  }

  const handleSubmitDeleteWard = (id)=>{
    removeWardFromDoctor(auth.setError,auth.token,id,setLoading,setSuccess,setDeleteWardNotifications,doctorsWards, setDoctorsWards);
    setTimeout(()=>deleteWardFromDoctorsWardsList(id),2000);
    setConfirmDeleteWard({isOpen:false, title:"", subtitle:""});
  }  

  const prepareDataForPieChart = ()=>{
    let doctorWards = [];
    
    auth.patientsList.forEach(patientData=>{
        if(doctorWards.some(item=>patientData.ward.hospitalId==item.hospitalId)){
          let indexOfWard = doctorWards.findIndex(item=>item.wardNameId==patientData.ward.wardName);
          doctorWards[indexOfWard].patientsNumber++;
        }else{
          let temporaryWardData = {wardNameId:"", patientsNumber:1, hospitalId:"", hospitalName:""};
          temporaryWardData.wardNameId = patientData.ward.wardName;
          temporaryWardData.hospitalId = patientData.ward.hospitalId;
          temporaryWardData.hospitalName = auth.hospitalsList[auth.hospitalsList.findIndex(item=>item.hospitalId==patientData.ward.hospitalId)].name;
          doctorWards.push(temporaryWardData);
        }
      
    })
    let wardOccupationData = [];
    doctorWards.forEach(introWardData=>{
      let data= {wardName:"", hospitalName:"", percentOccupation:0};
      let nameOfSearchWard = auth.allRegisteredApplicationWards.find(name=>name.id==introWardData.wardNameId);
      let nameOfSearchHospital = introWardData.hospitalName;
      data.wardName = nameOfSearchWard.name;
      data.percentOccupation = introWardData.patientsNumber;
      data.hospitalName = nameOfSearchHospital;
      wardOccupationData.push(data);
    })
    //let doctorWardPercentOccupation = {wardName:item.wardName, percentOccupation:percent}
    setPieChartData(wardOccupationData);
  }
  
  return (
    <>
      {auth.error!="" ? (<Navigate to = "/api/error" />) : null}
      <HeaderMenu tabsList = {tabs} listIcons = {icons} actions = {actions}/>
      <Box style={{display:"flex", alignItems:"center", justifyContent:"center", flexWrap:'wrap', gap:"20px"}}>

        {wardsOccupation.map((item,idx)=>(
          <div key={idx}><ProgressBar occupation = {item}/></div>
        ))}
        <DynamicPieChart pieChartData= {pieChartData} />
      </Box>
      <Box style={{display:"flex", flexDirection:"row", gap:"10px", justifyContent:'space-evenly', flexWrap:'wrap', alignItems:'center', height:"300px"}}>
        <UserCard className={classes.addWardButton}  
                  imageButton = {<VaccinesSharpIcon fontSize='large' sx={{fontSize:"100px", color:'#fff'}}/>} 
                  imageButtonColor = {'info'} text ={"Add Ward"} 
                  onClickFunction = {()=>setOpenAddWardWindow(!openAddWardWindow)} snakeColorBorder = {"#fff"} 
        />
        <UserCard imageButton = {<BloodtypeIcon fontSize='large' sx={{fontSize:"100px"}}/>} 
                  imageButtonColor={'error'}
                  text = {"Delete Ward"} 
                  onClickFunction = {()=>setShowDeleteWardTable(!showDeleteWardTable)} 
                  snakeColorBorder = {"#d32f2f"}
        />
      </Box>
      
      <Box style={{height:400, width:"100%", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", margin:'auto'}}>
        {showDeleteWardTable && <WardsGridTable doctorsWards = {doctorsWards} allWardsNames = {allWardsNames} title = {"Delete Wards"} setConfirmDialog = {setConfirmDeleteWard} setDeleteWardClickedRow={setDeleteWardClickedRow} success={success}/>}
      </Box>
      
      
      <ConfirmDialog confirmDialog = {confirmDeleteWard} setConfirmDialog = {setConfirmDeleteWard} handleConfirm = {()=>handleSubmitDeleteWard(deleteWardClickedRow.id)} />
      <Notification notify = {deleteWardNotifications} setNotify={setDeleteWardNotifications} resetError = {auth.resetError} />
      <Popup title = {"Add Ward"} children = {<AddNewWard allRegisteredHospitals = {allRegisteredHospitals} setOpenAddWardWindow = {()=>setOpenAddWardWindow((prev)=>!prev)} setAddWardNotification= {setAddWardNotification} yourHospitals = {yourHospitals} />} openPopup = {openAddWardWindow} setOpenPopup = {()=>setOpenAddWardWindow(!openAddWardWindow)} avatar = {<BloodtypeIcon  fontSize='large' style={{color:"#d32f2f"}}/>}/>
      <Notification notify = {allRegisteredHospitalsErrornotification} setNotify = {setAllRegisteredHospitalsErrornotification} resetError = {auth.resetError} />
      <Notification notify = {addWardNotification} setNotify = {setAddWardNotification} resetError = {auth.resetError}/> 
    </>
    
  )
}

export default Wards