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
import CardAddTable from '../../../components/controls/table/CardAddTable';
import CardUpdateTable from '../../../components/controls/table/CardUpdateTable';
import PreviewIcon from '@mui/icons-material/Preview';
import { makeStyles } from '@material-ui/core';
import { Box } from '@mui/material';
import { blue, grey, red } from '@mui/material/colors';
import Popup from "../../../components/Popup.js";
import {SortPatientsCardByDates} from "../../../helperMethod/SortData.js";
import PatientsList from '../../../components/MUIpatientsList/PatientsList';
import Notification from "../../../components/Notification.js";
import {updatePatientsCard,addPatientNote,getPatientsCard,doctorsPatients} from "../../../apiData/doctor/doctorData"
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AddNewNote from "../../../components/controls/addNewNote/AddNewNote.js";
import DynamicAreaCharts from '../../../components/charts/DynamicAreaCharts';
import UserCard from '../../../components/userCard/UserCard';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { NoteAlt } from '@mui/icons-material';
import NoteIcon from '@mui/icons-material/Note';

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
   },

   mainChildrenContent:{
    overflow:'auto',
    "&.MuiDialogContent-root":{
      overflow:'auto',
    }
  }
 });

function Card() {
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
    const [openViewPatientHistoryWindow, setOpenViewPatientHistoryWindow] = React.useState(false);
    const[openAddPatientNoteWindow, setOpenAddPatientNoteWindow] = React.useState(false);
    const [clickedRowPatient, setClickedRowPatient] = React.useState({id:0});
    const [updatePatientCardConfimration, setUpdatePatientCardConfimration] = React.useState({isOpen:false, message:"", type:"error"})
    const [addNoteNotification, setAddNoteNOtification] = React.useState({isOpen:false, message:"", type:"error"})
    const [chosenPatientCardData, setChosenPatientCardData] = React.useState([]);
    const [updatePatientsNote, setUpdatePatientsNote] = React.useState(false);
    const [addCardtableRow, setAddCardTableRow] = React.useState([]);
    const [addCardColumns, setAddCardColumns] = React.useState([]);
    const [updateCardTableRow, setUpdateCardTableRow] = React.useState([]);
    const [updateCardColumns, setUpdateCardColumns] = React.useState([]);
    const [openAddNoteTable, setOpenAddNoteTable] = React.useState(false);
    const [openUpdateNoteTable, setOpenUpdateNoteTable] = React.useState(false);

    const updateColumns = ()=>{
      let dataColumn = [{field:"name",headerName:"Name", minWidth:100, flex:1},
      {field:"surname",headerName:"Surname", minWidth:100, flex:2},
      {field:"age",headerName:"Age", minWidth:200, flex:1},
      {field:"hospital",headerName:"Hospital", minWidth:200, flex:4},
      {field:"ward",headerName:"Ward", minWidth:200, flex:1},
      {field:'actions', type:"actions",headerName:"Patient History",minWidth:150, flex:1, sortable:false, filterable:false,renderCell:params=>{return(
          <>
              <Box className={classes.button}>
                <PreviewIcon className={classes.iconButton}/> 
              </Box>
          </>
      )}
     }]
     setUpdateCardColumns(dataColumn);
    }

    const patientsAddNoteColumns = ()=>{
      let dataColumn = [{field:"name",headerName:"Name", minWidth:100, flex:1},
      {field:"surname",headerName:"Surname", minWidth:100, flex:2},
      {field:"age",headerName:"Age", minWidth:200, flex:1},
      {field:"hospital",headerName:"Hospital", minWidth:200, flex:4},
      {field:"ward",headerName:"Ward", minWidth:200, flex:1},
      {field:'actions', type:"actions",headerName:"Add Note",minWidth:150, flex:1, sortable:false, filterable:false,renderCell:params=>{return(
          <>
              <Box className={classes.button}>
                <NoteAddIcon className={classes.iconButton}/> 
              </Box>
          </>
      )}
     }]
     //return dataColumn;
     setAddCardColumns(dataColumn);
    }

    const updateCardRow = ()=>{
      let patients = auth.patientsList;
      let dataRow = [];
      for(let i=0; i<patients.length;i++){
        dataRow = [...dataRow,{id:patients[i].id,name:patients[i].name ,surname:patients[i].surname,age:patients[i].age,hospital:auth.hospitalsList.find(hospital=>hospital.hospitalId==patients[i].hospitalId).name, ward:auth.allRegisteredApplicationWards[patients[i].ward.wardName].name}]
      }
      console.log("updateCardRow");
      console.log(dataRow);
      setUpdateCardTableRow(dataRow);
    }

    const AddCardRow = ()=>{
      let patients = auth.patientsList;
      let dataRow = [];
      for(let i=0; i<patients.length;i++){
        dataRow = [...dataRow,{id:patients[i].id,name:patients[i].name ,surname:patients[i].surname,age:patients[i].age,hospital:auth.hospitalsList.find(hospital=>hospital.hospitalId==patients[i].hospitalId).name, ward:auth.allRegisteredApplicationWards[patients[i].ward.wardName].name}]
      }
      setAddCardTableRow(dataRow);
    }

    const confirmUpdate = (patientCardData)=>{
      updatePatientsCard(patientCardData,auth.setError,auth.token,setOpenViewPatientHistoryWindow,setUpdatePatientCardConfimration);
      setClickedRowPatient({id:0});
    }

    const confirmAddNote = (noteData)=>{
      addPatientNote(auth.setError, auth.token,noteData.patientId,noteData,setAddNoteNOtification);
      setUpdatePatientsNote(true);
      auth.resetError();
      setOpenAddPatientNoteWindow(false);
      //debugger;
    }


    const updateAuthPatientsList = ()=>{
      getPatientsCard(setChosenPatientCardData,auth.setError,clickedRowPatient.id,auth.token);
      console.log("updateAuthPatientsList function");
      console.log(chosenPatientCardData);
      auth.patientsList.forEach(patient => {
        if(patient.patientCard.patientCardId==chosenPatientCardData.patientCardId){
          console.log("seeting new notes to patients card");
          console.log(chosenPatientCardData.notes);
          patient.patientCard.notes = chosenPatientCardData.notes;
        }
      });
    }

    React.useEffect(()=>{
      AddCardRow();
      patientsAddNoteColumns();
      updateCardRow();
      updateColumns();
    },[])

    React.useEffect(()=>{
      if(clickedRowPatient.id!=0){
        updateAuthPatientsList();
      }
    },[addNoteNotification.isOpen])

  return (
    <>
        {auth.error!="" ? (<Navigate to = "/api/error" />) : null}
        <HeaderMenu tabsList = {tabs} listIcons = {icons} actions = {actions} />
        <Box style={{display:'flex', justifyContent:'center', alignItems:'center', margin:'auto', width:'80%', flexDirection:'column'}}>
          <h2>LAST ADDED CARDS SUMMARY</h2>
          <DynamicAreaCharts updatePatientCardConfimration = {updatePatientCardConfimration}
                             addNoteNotification = {addNoteNotification}
                             chosenPatientCardData = {chosenPatientCardData}
          />
        </Box>
        <Box style={{display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'space-evenly', alignItems:'center', marginTop:'30px', marginBottom:'30px'}}>
          <UserCard imageButton = {<NoteIcon fontSize='large' sx={{fontSize:"100px"}}/>} 
                    imageButtonColor = {'warning'} 
                    text = "ADD NOTE" 
                    onClickFunction = {()=>setOpenAddNoteTable(!openAddNoteTable)} 
                    snakeColorBorder = {"#ffa500"}
          />
          <UserCard imageButton = {<NoteAlt fontSize='large' sx={{fontSize:"100px"}}/>} 
                    imageButtonColor = {'info'} 
                    text = "UPDATE NOTE" 
                    onClickFunction = {()=>setOpenUpdateNoteTable(!openUpdateNoteTable)} 
                    snakeColorBorder = {"#0288d1"}
          />

        </Box>
        
        {
        openUpdateNoteTable ? <Box style={{display:'flex', justifyContent:'center', alignItems:'center', margin:'auto',height:800, width:"100%", flexDirection:'column'}}>
          <CardUpdateTable patientsColumn = {updateCardColumns}
                           patientsRow = {updateCardTableRow} 
                           title="UPDATE CARDS"
                           setOpenPatientWindow = {setOpenViewPatientHistoryWindow}
                           setClickedPatientData = {setClickedRowPatient}
                           icon = {<PreviewIcon className={classes.iconButton}/>}
                           rowsPerPage={[10,20,30]}
          />
        </Box>: null
        }
        {
          openAddNoteTable ? <Box style={{display:'flex', justifyContent:'center', alignItems:'center', margin:'auto',height:800, width:"100%", flexDirection:'column'}}>
          <CardAddTable patientsColumn ={addCardColumns} 
                        patientsRow ={addCardtableRow} title="NEW CARD"
                        setOpenPatientWindow = {setOpenAddPatientNoteWindow}
                        setClickedPatientData = {setClickedRowPatient}
                        icon = {<NoteAddIcon className={classes.iconButton}/>}
                        rowsPerPage={[10,20,30]} 
          />
        </Box>: null
        }
        
        <Popup className = {classes.mainChildrenContent}
               title={`${clickedRowPatient.name} ${clickedRowPatient.surname}'s Cards`}
               openPopup = {openViewPatientHistoryWindow}
               setOpenPopup = {setOpenViewPatientHistoryWindow}
               children = {<PatientsList sortedByDatePatientsList={SortPatientsCardByDates(auth.patientsList)}
                                         title={"Patient History"}
                                         clickedRowPatient = {clickedRowPatient}
                                         confirmUpdate = {confirmUpdate}
                                         className = {classes.mainChildrenContent}
                            />}
        />
        <Popup className = {classes.mainChildrenContent}
               title={`New note for ${clickedRowPatient.name} ${clickedRowPatient.surname}`}
               openPopup = {openAddPatientNoteWindow}
               setOpenPopup = {setOpenAddPatientNoteWindow}
               children = {<AddNewNote patientData={clickedRowPatient} 
                                       confirmAddNote ={confirmAddNote}
                          />}
        />
        <Notification notify = {updatePatientCardConfimration} 
                      setNotify = {setUpdatePatientCardConfimration}
                      resetError = {auth.resetError}
        />
        <Notification notify ={addNoteNotification}
                      setNotify = {setAddNoteNOtification}
                      resetError = {auth.resetError} 
        />
    </>
  )
}

export default Card 