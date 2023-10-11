import React from 'react'
import {useNavigate, Outlet, Navigate,Link} from "react-router-dom";
import HeaderMenu from '../../../components/HeaderComponents/HeaderMenu';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import GroupsIcon from '@mui/icons-material/Groups';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {useAuth} from "../../../components/UseContext";
import PatientsGridTable from '../../../components/controls/table/PatientsGridTable';
import {getNotAsignedPatients,getAllRegisteredWardsName,getAllDoctorsWards,removePatientFromDoctor} from "../../../apiData/doctor/doctorData";
import { Box } from '@mui/material';
import Notification from "../../../components/Notification.js";
import Popup from '../../../components/Popup';
import AddNewPatient from '../../../components/controls/addNewPatient/AddNewPatient';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from '@material-ui/core';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ConfirmDialog from '../../../components/confirmDialog/ConfirmDialog';
import { blue, grey, red } from '@mui/material/colors';
import DynamicLineChart from '../../../components/charts/DynamicLineChart';
import UserCard from '../../../components/userCard/UserCard';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const useStyles = makeStyles({
  ".MuiBox-root":{
    position:'relative',
    
    "&.MuiSvgIcon-root":{
      position:'absolute',
      top:16,
      left:26,
    },
  },

  button:{
    "&.MuiBox-root":{
        width:"35px", 
        height:"35px", 
        borderRadius:"50%", 
        backgroundColor:blue[500],
        position:'relative',
        cursor:'pointer',
        "&:hover":{
            backgroundColor:red[600]
        },
    }
 },

  iconButton:{
    "&.MuiSvgIcon-root":{
        position:'absolute',
        top:6,
        left:6,
    }
  },

  userCardButtons:{
    marginTop:30,
    marginBottom:30,
   }
   

 });

function Patients() {
  const auth = useAuth();
  const classes = useStyles();
  const navigate = useNavigate();
  const handleLogout = ()=>{
    auth.logout();
    auth.resetToken();
    navigate("/api/auth/register");
  }
  const tabs = ["Home","Hospitals", "Wards","Patients", "Cards", "Logout"];
  const icons = [<HomeIcon />,<ApartmentIcon />,<BloodtypeIcon />,<GroupsIcon />,<TextSnippetOutlinedIcon />,<LogoutOutlinedIcon /> ];
  const actions = [()=>(navigate("/api/MainWindow")),()=>(navigate("/api/hospitals")),()=>(navigate("/api/wards")),()=>(navigate("/api/patients")),()=>(navigate("/api/cards")),handleLogout]
  const [notAsignedPatients,setNotAsignedPatients] = React.useState([]);
  const [openAddPatientWindow, setOpenAddPatientWindow] = React.useState(false);
  const [openDeletePatientWindow, setOpenDeletePatientWindow] = React.useState(false);
  const [addPatientNotification, setAddPatientNotification] = React.useState({isOpen:false, type:'error', messaage:""});
  const [clickedAddPatientData,setClickedAddPatientData] = React.useState({name:"", surname:"",age:0 ,patientId:null,hospitalId:null, wardId:null});
  const [clickedDeletePatientData,setClickedDeletePatientData] = React.useState({patientId:null});
  const [confirmDeletePatient, setConfirmDeletePatient] = React.useState({isOpen:false, title:"", subtitle:""});
  const [deletePatientNotification, setDeletePatientNotification] = React.useState({isOpen:false, type:'error', messaage:""})
  const [dataToLineChart, setDataToLineChart] = React.useState([]);
  const [openAddPatientTable, setOpenAddPatientTable] = React.useState(false);
  const [openDeletePatientTable, setOpenDeletePatientTable] = React.useState(false);

  const LineChart = ()=>{
    let ageGroup = [{moreEqual:0 ,lessThan:20,count:0},{moreEqual:20 ,lessThan:40,count:0},
                   {moreEqual:40 ,lessThan:60,count:0},{moreEqual:60 ,lessThan:70,count:0},
                   {moreEqual:70 ,lessThan:80,count:0},{moreEqual:80 ,lessThan:90,count:0},
                   {moreEqual:90 ,lessThan:100,count:0},{moreEqual:100 ,lessThan:120,count:0},
                  ];
    auth.patientsList.forEach(patient=>{
      ageGroup.forEach(ageLevel=>{
        if(patient.age>=ageLevel.moreEqual && patient.age<ageLevel.lessThan){
          ageLevel.count++;
        }
      })
    })
    setDataToLineChart([]);
    ageGroup.forEach(ageLevel=>{
      let data = {name:`Age ${ageLevel.moreEqual}-${ageLevel.lessThan}`, value:ageLevel.count};
      setDataToLineChart(prev=>[...prev,data]);
    })
  }

  const setConfirmationDeletePatientWindow = ()=>{
    if(openDeletePatientWindow) setConfirmDeletePatient({isOpen:true, title:`Deleting ${clickedDeletePatientData.surname} Patient`, subtitle:"Are You Sure?"})
    setOpenDeletePatientWindow(false);
  }

  const deletePatientFromUseContextList = (patientId)=>{
      let temporaryPatientContainer = [];
      auth.patientsList.forEach(patient => {
        if(patient.id!=patientId) temporaryPatientContainer.push(patient);
      });
      auth.setNewPatientsList(temporaryPatientContainer);
  }

  const deletePatient =(patientId)=> {
    removePatientFromDoctor(auth.setError, auth.token,patientId,setDeletePatientNotification);
    setConfirmDeletePatient({isOpen:false, title:"", subtitle:""});
    deletePatientFromUseContextList(patientId);
    getNotAsignedPatients(setNotAsignedPatients,auth.setErrorLogin,auth.token);
  }

  const notAsignedPatientsColumn = ()=>{
    let dataColumn = [{field:"name",headerName:"Name", minWidth:100, flex:2},
    {field:"surname",headerName:"Surname", minWidth:100, flex:2},
    {field:"age",headerName:"Age", minWidth:200, flex:1},
    {field:'actions', type:"actions",headerName:"Add Patient",minWidth:150, flex:1, sortable:false, filterable:false,renderCell:params=>{return(
        <>
            <Box className={classes.button}>
              <AddIcon className={classes.iconButton}/>
            </Box>
        </>
    )}
    }]
    return dataColumn;
  }

  const notAsignedPatientsRow = () =>{
    let patients = notAsignedPatients==null?[]:notAsignedPatients;
    let dataRow = [];
    for(let i=0; i<patients.length;i++){
      dataRow = [...dataRow,{id:patients[i].id,name:patients[i].name ,surname:patients[i].surname,age:patients[i].age}]
    }
    return dataRow;
  }

  const yourAsignedPatientsColumns = ()=>{
    let dataColumn = [{field:"name",headerName:"Name", minWidth:100, flex:1},
    {field:"surname",headerName:"Surname", minWidth:100, flex:2},
    {field:"age",headerName:"Age", minWidth:200, flex:1},
    {field:"hospital",headerName:"Hospital", minWidth:200, flex:4},
    {field:"ward",headerName:"Ward", minWidth:200, flex:1},
    {field:'actions', type:"actions",headerName:"Delete Patient",minWidth:150, flex:1, sortable:false, filterable:false,renderCell:params=>{return(
        <>
            <Box className={classes.button}>
              <DeleteForeverIcon className={classes.iconButton}/> 
            </Box>
        </>
    )}
   }]
   return dataColumn;
  }

  const yourAsignedPatientsRow = ()=>{
    let patients = auth.patientsList;
    let dataRow = [];
    for(let i=0; i<patients.length;i++){
      dataRow = [...dataRow,{id:patients[i].id,name:patients[i].name ,surname:patients[i].surname,age:patients[i].age,hospital:auth.hospitalsList.find(hospital=>hospital.hospitalId==patients[i].hospitalId).name, ward:auth.allRegisteredApplicationWards[patients[i].ward.wardName].name}]
    }
    return dataRow;
  }

  React.useEffect(()=>{
    getNotAsignedPatients(setNotAsignedPatients,auth.setErrorLogin,auth.token);
    LineChart();
  },[])

  React.useEffect(()=>{
    yourAsignedPatientsRow();
    LineChart();
  },[auth.patientsList])

  React.useEffect(()=>{
    //to delete patient from addPatient grid Table
    getNotAsignedPatients(setNotAsignedPatients,auth.setErrorLogin,auth.token);
  },[openAddPatientWindow])

  React.useEffect(()=>{
    setConfirmationDeletePatientWindow();
    getNotAsignedPatients(setNotAsignedPatients,auth.setErrorLogin,auth.token);
  },[openDeletePatientWindow])

  React.useEffect(()=>{
    getNotAsignedPatients(setNotAsignedPatients,auth.setErrorLogin,auth.token);
  },[deletePatientNotification.isOpen])
  
  return (
    <>
      {auth.error!="" ? (<Navigate to = "/api/error" />) : null}
      <HeaderMenu tabsList = {tabs} listIcons = {icons} actions = {actions} />
      <Box style={{display:'flex', justiContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', justifyContent:'space-around', flexWrap:'wrap', marginBottom:50, marginTop:30}}>
        <UserCard imageButtonColor = "success" text = {"Add Patient"} snakeColorBorder = {"#2e7d32"} imageButton = {<PersonAddIcon fontSize='large' sx={{fontSize:"100px"}}/>}  onClickFunction = {()=>setOpenAddPatientTable(!openAddPatientTable)} />
        <UserCard imageButtonColor = 'error' text={'Remove Patient'} snakeColorBorder={"#d32f2f"} imageButton={<PersonRemoveIcon fontSize='large' sx={{fontSize:"100px"}}/>} onClickFunction = {()=>setOpenDeletePatientTable(!openDeletePatientTable)}/>
      </Box>
      {openAddPatientTable ? <Box style={{display:'flex', justifyContent:'center', alignItems:'center', margin:'auto',height:400, width:"100%", flexDirection:'column'}}>
        <PatientsGridTable  patientsColumn = {notAsignedPatientsColumn} patientsRow = {notAsignedPatientsRow} title="Not Asigned Patients" setOpenPatientWindow = {setOpenAddPatientWindow} setClickedPatientData = {setClickedAddPatientData} icon = {<AddIcon className={classes.iconButton}/>} />
      </Box> : null}
      {openDeletePatientTable ? <Box style={{display:'flex', justifyContent:'center', alignItems:'center', margin:'auto',height:400, width:"100%", flexDirection:'column'}}>
        <PatientsGridTable patientsColumn = {yourAsignedPatientsColumns} patientsRow = {yourAsignedPatientsRow} title="Delete Patient" setOpenPatientWindow = {setOpenDeletePatientWindow} setClickedPatientData = {setClickedDeletePatientData} icon = {<DeleteForeverIcon className={classes.iconButton}/>} />
      </Box> : null}
      <Box style={{display:'flex', justifyContent:'center', alignItems:'center', margin:'auto',height:400, width:"78%", flexDirection:'column'}}>
       <DynamicLineChart dataToLineChart = {dataToLineChart}/>
      </Box>
      <Notification notify={addPatientNotification} setNotify = {setAddPatientNotification} resetError = {auth.resetError} />
      <Popup title = {` Add Patient ${clickedAddPatientData.name} ${clickedAddPatientData.surname} `} children={<AddNewPatient clickedPatientData = {clickedAddPatientData} setOpenAddPatientWindow = {setOpenAddPatientWindow} />} openPopup = {openAddPatientWindow} setOpenPopup = {setOpenAddPatientWindow} />
      <ConfirmDialog  confirmDialog ={confirmDeletePatient} setConfirmDialog = {setConfirmDeletePatient} handleConfirm = {()=>deletePatient(clickedDeletePatientData.id)}/>
      <Notification notify = {deletePatientNotification} setNotify = {setDeletePatientNotification} resetError = {auth.resetError} />
    </>
  )
}

export default Patients