import React from 'react'
import AdminSideBar from '../../../components/HeaderComponents/AdminSidebar'
import { useAuth } from '../../../components/UseContext'
import {getDoctorsData,GetDoctorDataBasedOnPatientId,GetAdminsAllDoctorsNumbers,GetAdminsPatientsNumbers,GetGeneralHospitalsOccupation,GetSortedByDatesAllNotes} from "../../../apiData/admin/adminData"
import {useNavigate, Outlet, Navigate,Link} from "react-router-dom";
import NivoLine from '../../../components/charts/nivoCharts/NivoLine';
import { Box, Button, Typography } from '@mui/material';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AdminDialogWindow from '../../../components/adminDialogWindow/AdminDialogWindow';
import AdminStatBox from '../../../components/adminStatBox/AdminStatBox';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import BedIcon from '@mui/icons-material/Bed';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import AdminProgressCircle from '../../../components/adminProgressCircle/AdminProgressCircle';
import Person3Icon from '@mui/icons-material/Person3';
import NivoBar from '../../../components/charts/nivoCharts/NivoBar';
import AdminViewHospitalWindow from '../../../components/adminViewHospitalWindow/AdminViewHospitalWindow';
import NivoPieChart from '../../../components/charts/nivoCharts/NivoPieChart';

function AdminPanel() {
  const auth = useAuth();
  const theme = useTheme();
  const resizeWidth = useMediaQuery(theme.breakpoints.down('lg'));
  const [doctorsData, setDoctorsData] = React.useState([]);
  const [openViewPatientDetails, setOpenViewPatientDetails] = React.useState(false);
  const [displayCharts, setDisplayCharts] = React.useState(false);
  const [clickedPatientData, setClickedPatientData] = React.useState({});
  const [patientDoctor, setPatientDoctor] = React.useState({name:'Bartosz', surname:'Kwolek'});
  const [allDoctorsRegisteredData,setAllDoctorsRegisteredData] = React.useState([]);
  const [allPatientsRegisteredData,setAllPatientsRegisteredData] = React.useState([]);
  const [generalHospitalsOccupation,setGeneralHospitalsOccupation] = React.useState([]);
  const [openAdminViewHospitalWindow,setOpenAdminViewHospitalWindow] = React.useState(false);
  const [clickeHospitalData,setClickeHospitalData ] = React.useState({});
  const [sortedAllNotes,setSortedAllNotes] = React.useState([]);

  const clickViewPatientButton = (item)=>{
    GetDoctorDataBasedOnPatientId(setPatientDoctor,auth.setError,auth.token,item.patientId);
    setOpenViewPatientDetails(true);
    setClickedPatientData(item);
  }

  const clickViewHospitalButton = (item)=>{
    setClickeHospitalData(item);
    setOpenAdminViewHospitalWindow(true);
  }

  

  const generalHospitalOccupation = ()=>{
    if(generalHospitalsOccupation.length>0){
      var currentOccupation = 0;
      var maxOccupation = 0;
      generalHospitalsOccupation.forEach(hospital=>{
        hospital.hospitalsWards.forEach(ward=>{
        maxOccupation+=ward.maxCapacity;
        currentOccupation+=ward.occupiedBed;
      })
    })
      var percentVariable = parseFloat((currentOccupation/maxOccupation).toFixed(2));
      return percentVariable;
    }else{
      return 0.2;
    }

  }

  React.useEffect(()=>{
    GetSortedByDatesAllNotes(setSortedAllNotes,auth.setError,auth.token);
    getDoctorsData(setDoctorsData,auth.setError,auth.token,setDisplayCharts);
    GetAdminsAllDoctorsNumbers(setAllDoctorsRegisteredData,auth.setError,auth.token);
    GetAdminsPatientsNumbers(setAllPatientsRegisteredData,auth.setError,auth.token);
    GetGeneralHospitalsOccupation(setGeneralHospitalsOccupation,auth.setError,auth.token);
    generalHospitalOccupation();
    //setDisplayCharts(true);                          
    
  },[])
  
  return (
    <>
      {auth.error!="" ? (<Navigate to = "/api/error" />) : null}
      <Box display='flex' 
           justifyContent='space-between' 
           gap='100px' 
           alignItems='flex-start' 
           flexDirection='row' 
           width='100vw' 
      >
        <AdminSideBar userName = {auth.user} />

        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' width='100vw'>       
          <Box display='flex' flexDirection='row' flexWrap='wrap' justifyContent='space-around' alignItems='center' width={resizeWidth ? '400px':'1000px'}>
            <AdminStatBox icon={<VaccinesIcon  sx={{color:'#fff', fontSize:'50px'}}/>} title={"Doctors Num."} number={allDoctorsRegisteredData.length}/>
            <AdminStatBox icon={<BloodtypeIcon sx={{color:'red', fontSize:'50px'}}/>} title={"Hospitals Occ."} progressCircle ={generalHospitalOccupation()}/>
            <AdminStatBox icon={<Person3Icon sx={{color:'#a4a9fc', fontSize:'50px'}}/>} title={"Patients Num."} number={allPatientsRegisteredData.length}/>
          </Box>
          <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' flexWrap='wrap'>
            <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' flexWrap='wrap' minWidth={resizeWidth ? '500px' : '900px'}>
              <Box  height='300px' flexGrow='4' flexBasis='0' flexShrink='1' minWidth= {resizeWidth ?'400px':'500px'} width={resizeWidth ? '400px':'600px'}>
                <Typography variant='h5' align='center' sx={{margin:'auto',fontWeight:'600', alignItems:'center', marginTop:'40px'}}>PATIENTS WITH BIGGEST NOTE NUMBERS</Typography>
                {displayCharts && <NivoLine patientsNotes={doctorsData.notesPerPatient} />}
              </Box>
              <Box sx={{marginTop:'50px', overflow:'auto', height:'300px', width:resizeWidth ? '400px' :'600px',minWidth:resizeWidth ? '400px' : '450px' ,backgroundColor:'#1F2A40', flexGrow:3,flexBasis:0,flexShrink:1}}>
                <Box display='flex' 
                    justifyContent='center' 
                    alignItems='center' 
                    borderBottom="4px solid #adadad" 
                    color="#e0e0e0"
                    p='15px'
                    overflow='auto'
                    backgroundColor='#101624'
                    
                >
                  <Typography variant='h6'>PATIENTS DETAILS</Typography>
                </Box>
                {displayCharts && doctorsData.notesPerPatient.slice(-10).map((item,idx)=>(
                  <Box key={idx}
                      display='flex'
                      justifyContent='space-between'
                      alignItems='center'
                      p='15px'
                      borderBottom="4px solid #adadad"
                  >
                    
                    <Box fontSize='15px' color='#4cceac' display='flex' alignItems='flex-start' justifyContent='flex-start' flexDirection='column'>
                      <p>{item.patientName}</p>
                      <p style={{color:'#fff'}}>Note Numbers</p>
                    </Box>
                    <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                      <SummarizeIcon sx={{color:'#4cceac'}}/>
                      <p style={{}}>{item.notesNumbers}</p>
                    </Box>
                    <Box backgroundColor='#4cceac'>
                      <Button variant='contained' style={{backgroundColor:'#4cceac'}} onClick={()=>clickViewPatientButton(item)}>View</Button>
                    </Box>
                  </Box>
                ))}
              </Box>
              
            </Box>

              <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' flexWrap='wrap'  minWidth={resizeWidth ? '500px' : '900px'}>
                <Box height='300px' minWidth= {resizeWidth ?'400px':'500px'} width={resizeWidth ? '400px':'600px'} textAlign='center' flexBasis='0' flexGrow='4' flexShrink='1' >
                  <Typography variant='h6' style={{marginTop:'40px'}}>HISPITALS OCCUPATION</Typography>
                  {displayCharts && <NivoBar nivoBarData= {generalHospitalsOccupation} />}
                </Box>
                <Box sx={{marginTop:'50px', overflow:'auto', height:'300px', width:resizeWidth ? '400px' :'600px',minWidth:resizeWidth ? '400px' : '450px' ,backgroundColor:'#1F2A40', flexGrow:3,flexBasis:0,flexShrink:1}}>
                  <Box display='flex' 
                      justifyContent='center' 
                      alignItems='center' 
                      borderBottom="4px solid #adadad" 
                      color="#e0e0e0"
                      p='15px'
                      overflow='auto'
                      backgroundColor='#101624'
                      
                  >
                    <Typography variant='h6'>HOSPITAL DETAILS</Typography>
                  </Box>
                  {displayCharts && generalHospitalsOccupation.map((hospital,idx)=>(
                    <Box display='flex' justifyContent='space-between' key={idx} borderBottom='4px solid #adadad' alignItems='center' p='15px'>
                      <Box>
                        {hospital.hospitalName}
                      </Box>
                      <Box backgroundColor='#4cceac'>
                        <Button variant='contained' style={{backgroundColor:'#4cceac'}} onClick={()=>clickViewHospitalButton(hospital)}>View</Button>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box marginTop='40px' display='flex' flexDirection='row' justifyContent='center' alignItems='center' flexWrap='wrap'  minWidth={resizeWidth ? '500px' : '900px'}>
                <Box height='300px' minWidth= {resizeWidth ?'400px':'500px'} width={resizeWidth ? '400px':'600px'} textAlign='center' flexBasis='0' flexGrow='4' flexShrink='1' >
                  <Typography variant='h6' style={{marginTop:'40px'}}>NOTES CREATED BY HISPITALS</Typography>
                  {displayCharts && <NivoPieChart doctorsData = {doctorsData} />}
                </Box>
                <Box sx={{marginTop:'50px', overflow:'auto', height:'300px', width:resizeWidth ? '400px' :'600px',minWidth:resizeWidth ? '400px' : '450px' ,backgroundColor:'#1F2A40', flexGrow:3,flexBasis:0,flexShrink:1}}>
                  <Box display='flex' 
                      justifyContent='center' 
                      alignItems='center' 
                      borderBottom="4px solid #adadad" 
                      color="#e0e0e0"
                      p='15px'
                      overflow='auto'
                      backgroundColor='#101624'
                  >
                      <Typography variant='h6' >LAST 10 ADDED NOTES</Typography>
                  </Box>

                  {displayCharts && sortedAllNotes.slice(-10).map((notes,idx)=>(
                    <Box display='flex' justifyContent='space-between' key={idx} borderBottom='4px solid #adadad' alignItems='center' p='15px'>
                      <Box display='flex' flexDirection='column' justifyContent='flex-start' alignItems='flex-start'>
                        <p style={{color:'#4cceac'}}>{notes.name} {notes.surname}</p>
                        <p style={{color:'#dfdfdf'}}>{notes.date.slice(0,10)}</p>
                      </Box>
                      <Box backgroundColor='#4cceac'>
                        <Button variant='contained' style={{backgroundColor:'#4cceac'}} onClick={()=>console.log(notes)}>View</Button>
                      </Box>
                    </Box>
                  ))}


                </Box>
              </Box>
          </Box>
          </Box> 
          
      </Box>
      <AdminDialogWindow openViewPatientDetails = {openViewPatientDetails} 
                         setOpenViewPatientDetails = {setOpenViewPatientDetails} 
                         clickedPatientData = {clickedPatientData}
                         patientDoctor = {patientDoctor}
      />
                                                          
      {openAdminViewHospitalWindow && <AdminViewHospitalWindow clickedHospitalData = {clickeHospitalData} 
                               setOpenAdminViewHospitalWindow = {setOpenAdminViewHospitalWindow}
                               openAdminViewHospitalWindow={openAdminViewHospitalWindow}
      />
      }
    </>
    
  )
}

export default AdminPanel