import React from 'react'
import { Box } from '@mui/system';
import {getPatientWard} from "../../apiData/patient/patientData"
import {useAuth} from "../../components/UseContext";

function PatientWardData(props) {
    const auth = useAuth();
    const {patientData} = props;
    const [wardData, setWardData] = React.useState({});

    React.useEffect(()=>{
        getPatientWard(setWardData,auth.setError,auth.token,patientData.ward.wardId);
    },[])
  return (
    <>
    {console.log("wardData")}
    {console.log(wardData)}
    <Box style = {{display:'flex', justifyContent:'flex-start', alignItems:'flex-start', flexDirection:'column'}}>
        <Box style={{display:'flex', flexDirection:'row'}}>
            <div style={{fontWeight:'700'}}>Ward: </div> {wardData.wardNameAsString}
        </Box>
        <Box style={{display:'flex', flexDirection:'row'}}>
            <div style={{fontWeight:'700'}}>Capacity: </div> {patientData.ward.maxCapacity}
        </Box>
        <Box style={{display:'flex', flexDirection:'row'}}>
            <div style={{fontWeight:'700'}}>Occupied Bed: </div> {patientData.ward.occupiedBeds}
        </Box>
        
    </Box>
    </>
  )
}

export default PatientWardData