import React from 'react'
import HeaderMenu from '../../../components/HeaderComponents/HeaderMenu.js';
import {useAuth} from "../../../components/UseContext";
import Button from '../../../components/controls/Button';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import GroupsIcon from '@mui/icons-material/Groups';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {useNavigate, Outlet, Navigate,Link} from "react-router-dom";
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import UserCard from '../../../components/userCard/UserCard.js';
import AddHomeIcon from '@mui/icons-material/AddHome';
import ConfirmDialog from '../../../components/confirmDialog/ConfirmDialog.js';
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { makeStyles } from '@material-ui/core';
import Notification from "../../../components/Notification.js";
import {deleteDoctorsHospital,getAllAvailableRegisteredHospitals,addNewHospitalToDoctor} from "../../../apiData/doctor/doctorData" 
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Popup from '../../../components/Popup.js';
import HospitalsGridTable from '../../../components/controls/table/HospitalsGridTable.js';
import DynamicBarChart from '../../../components/charts/DynamicBarChart.js';

const useStyles = makeStyles({

  dataGrid: {
     width: "70%",
     color:"#fff",
     "&.MuiDataGrid-main":{
      color:"white"
     },
     "&.MuiButtonBase-root":{
      width:"50%",
      backgroundColor: "#ff0461",
      padding:"5px",
      borderRadius:"0",
      "&:hover":{
          backgroundColor: "#ff0461",
      }
     },
     
   },

   
 });

function Hospitals() {

  const auth = useAuth();
  const handleLogout = ()=>{
    auth.logout();
    auth.resetToken();
    navigate("/api/auth/register");
  }
  const classes = useStyles();
  const navigate = useNavigate();
  const tabs = ["Home","Hospitals", "Wards","Patients", "Cards", "Logout"];
  const icons = [<HomeIcon />,<ApartmentIcon />,<BloodtypeIcon />,<GroupsIcon />,<TextSnippetOutlinedIcon />,<LogoutOutlinedIcon /> ];
  const actions = [()=>(navigate("/api/MainWindow")),()=>(navigate("/api/hospitals")),()=>(navigate("/api/wards")),()=>(navigate("/api/patients")),()=>(navigate("/api/cards")),handleLogout]
  let hospitalTableRow = [];
  let hospitalTableColumn = [];
  const [pageSize,setPageSize]=React.useState(2);
  const [confirmDialog, setConfirmDialog] = React.useState({isOpen:false, title:"", subtitle:""});
  const [clickData, setClickData] = React.useState({});
  const [deleteHospitalNotification, setDeleteHospitalNotification] = React.useState({isOpen:false, message:"", type:'error'})
  const [notify, setNotify] = React.useState({isOpen:false, message:"", type:"error"})
  const [addNewHospitalWindow, setAddNewHospitalWindow] = React.useState(false);
  const [allRegisteredHospitals, setAllRegisteredHospitals] = React.useState([]);
  const [openConfimrAddNewHospitalWindow, setOpenConfirmAddNewHospitalWindow] = React.useState({isOpen:false, title:"", subtitle:""});
  const [clickedHospitalToAdd, setClickedHospitalToAdd] = React.useState({});
  const [addingNewHospitalNotification, setAddingNewHospitalNotification] = React.useState({isOpen:false, message:"", type:"error"});
  const [openDelteDoctorsHospitalsTable, setOpenDelteDoctorsHospitalsTable] = React.useState(false);

  const getAllRegisteredHospitals = ()=>{
    getAllAvailableRegisteredHospitals(auth.setError,auth.token,setAllRegisteredHospitals,setNotify);
  }
  
  const deleteHospitalFromUseContextList = (dataArray,itemToDelete)=>{
    let temporaryHospitalsList = [];
    for(let i = 0; i<dataArray.length; i++){
      if(dataArray[i].hospitalId!=itemToDelete.id){
        temporaryHospitalsList.push(dataArray[i]);
      } 
    }
    auth.setNewHospitalList(temporaryHospitalsList);
  }

  const addHispitalToUseContextList= (itemToAdd)=>{
    auth.setNewHospitalList([...auth.hospitalsList, itemToAdd])
  }

  const handleConfirmDelete = (event)=>{
   
    let objectKeys = Object.keys(event);
    setClickData({});
    if(objectKeys.includes("row")){
      setClickData(event.row);
      setConfirmDialog({isOpen:true, title:"Are You Sure to delete this Record?",subtitle:"You Can't undo this operation"})
    }
  }

  const handleSelectHospitalToAdd = (event)=>{
    let objcetKeys = Object.keys(event);
    setClickedHospitalToAdd({});
    if(objcetKeys.includes("row")){
      setAddNewHospitalWindow(false);
      document.body.style.overflow = 'auto'; //otherwise you cant scroll down the page
      let hospitalName = event.row.name;
      setClickedHospitalToAdd(event.row);
      setOpenConfirmAddNewHospitalWindow({isOpen:true, title:"Are You Sure To Add This Hospital ?", subtitle:hospitalName})
    }

  }

  
hospitalTableColumn=[
    {field:"country",headerName:"Country", minWidth:200, flex:2},
    {field:"city",headerName:"City", minWidth:200, flex:2},
    {field:"name",headerName:"Hospital Name", minWidth:200, flex:2},
    {field:"street",headerName:"Street", minWidth:200, flex:2},
    {field:'actions', headerName:"Action", minWidth:150, flex:1, sortable:false, filterable:false, renderCell:params=>{
      return(
        <IconButton color="error" onClick={(event)=>{handleConfirmDelete(event)}} className = {classes.dataGrid}>
          <ClearIcon />
        </IconButton>
      )
    }}
]

  React.useEffect(()=>{
    if(auth.error.length>0){
      setNotify(()=>{return{isOpen:true, message:auth.error, type:"error"}});
    }
     
  },[auth.error])

  React.useEffect(()=>{
    getAllRegisteredHospitals();
  },[addNewHospitalWindow])

  for(let i = 0; i<auth.hospitalsList.length; i++){
    let rowData = {id:auth.hospitalsList[i].hospitalId,country:auth.hospitalsList[i].country,city:auth.hospitalsList[i].city,name:auth.hospitalsList[i].name, street:auth.hospitalsList[i].street}
    hospitalTableRow.push(rowData);
   
}

const handleDeleteHospital = ()=>{
  deleteDoctorsHospital(clickData.id,auth.setError,auth.token,setDeleteHospitalNotification);
  deleteHospitalFromUseContextList(auth.hospitalsList,clickData);
  setConfirmDialog({isOpen:false, title:"",subtitle:""});
  
}

const handleAddNewHospital = ()=>{
  addNewHospitalToDoctor(auth.setError,auth.token,setOpenConfirmAddNewHospitalWindow,clickedHospitalToAdd,addHispitalToUseContextList,setAddingNewHospitalNotification );
  setOpenConfirmAddNewHospitalWindow({isOpen:false, title:"", subtitle:""});
}

const prepareDataForBarCharts = ()=>{
  let readyData = [];
  for(let i =0; i<auth.hospitalsList.length;i++){
    readyData.push({hospitalId:auth.hospitalsList[i].hospitalId,hospitalName:auth.hospitalsList[i].name})
    let count =0;
    for(let x = 0; x<auth.patientsList.length; x++){
      if(auth.patientsList[x].hospitalId==readyData[i].hospitalId){
        count++;
        readyData[i]= {...readyData[i],patients:count}
      }
    }
  }
  return readyData;
}

  return (
    <>
        {auth.error!="" ? (<Navigate to = "/api/error" />) : null}
        <HeaderMenu tabsList = {tabs} listIcons = {icons} actions = {actions} />
        <Box style={{display:"flex", justifyContent:"center", alignItems:"center", flexWrap:'wrap', gap:"20px", justifyContent:'space-around'}}>
          <UserCard imageButtonColor = "success" text = {"Add New"} snakeColorBorder = {"#2e7d32"} imageButton = {<AddHomeIcon fontSize='large' sx={{fontSize:"100px"}}/>} setConfirmDialog = {setConfirmDialog} onClickFunction = {()=>setAddNewHospitalWindow(true)}/>
          <DynamicBarChart  barData = {prepareDataForBarCharts}/>
          <UserCard imageButtonColor='error' text = {"Delete Hospitals: "+auth.hospitalsList.length} snakeColorBorder = "#d32f2f" imageButton = {<LocalHospitalIcon fontSize='large' sx={{fontSize:"100px"}}/>} setConfirmDialog = {setConfirmDialog} onClickFunction = {()=>setOpenDelteDoctorsHospitalsTable(!openDelteDoctorsHospitalsTable)}/>
        </Box>
        
      {openDelteDoctorsHospitalsTable?<Box style={{width:"100%", display:"flex", justifyContent:'center',paddingBottom:"80px"}}>
        <Box style={{height:400, width:'70%', paddingTop:"40px",paddingBottom:"40px" }}>
            <h2>Your Hospitals</h2>
            <DataGrid
                components={{ Toolbar: GridToolbar }}
                rows={hospitalTableRow}
                columns={hospitalTableColumn}
                pageSize={pageSize}
                rowsPerPageOptions={[2,5,10,20]}
                onPageSizeChange = {(newNumber)=>setPageSize(newNumber)}
                sx = {{color:"#fff",
                  marginBottom:"20px",
                  boxShadow: 2,
                  border: 2,
                  borderColor: 'grey',
                  '& .MuiDataGrid-iconButtonContainer':{
                  color:'#fff'
                  },
                  '& .MuiSvgIcon-root':{
                      color:'#fff'
                  },
                  '& .MuiButtonBase-root':{
                      color:"#fff"
                  },
                  '& .MuiTablePagination-root':{
                      color:"#fff"
                  },
                  '& .MuiInputBase-root':{
                      color:"#fff"
                  }

                 }}
                 onRowClick = {handleConfirmDelete}
            />
        </Box>
      </Box>:null}
      <ConfirmDialog confirmDialog = {confirmDialog} setConfirmDialog = {setConfirmDialog} dataToDelete={clickData}  handleConfirm = {handleDeleteHospital}/>
      <Notification notify = {deleteHospitalNotification} setNotify = {setDeleteHospitalNotification} resetError = {auth.resetError}/>
      <Notification notify = {notify} setNotify = {setNotify} resetError = {auth.resetError}/>
      <Popup openPopup = {addNewHospitalWindow} setOpenPopup = {setAddNewHospitalWindow} title = {"Add Hospital"}
       children = {<HospitalsGridTable allRegisteredHospitals = {allRegisteredHospitals} 
                  onClickFunction = {(event)=>handleSelectHospitalToAdd(event)}/>}
      />
      <ConfirmDialog confirmDialog = {openConfimrAddNewHospitalWindow} setConfirmDialog = {setOpenConfirmAddNewHospitalWindow} handleConfirm = {handleAddNewHospital}/>
      <Notification notify = {addingNewHospitalNotification} setNotify = {setAddingNewHospitalNotification} resetError = {auth.resetError} />
    </>
    
  )
}

export default Hospitals