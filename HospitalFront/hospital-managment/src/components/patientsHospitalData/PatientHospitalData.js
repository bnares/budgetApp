import React from 'react';
import { Box } from '@mui/system';

function PatientHospitalData(props) {
    const {patientData} = props;
  return (
    <Box style = {{display:'flex', justifyContent:'flex-start', alignItems:'flex-start', flexDirection:'column'}}>
        <Box style={{display:'flex', flexDirection:'row'}}>
            <div style={{fontWeight:'700'}}>Hospital: </div> {patientData.hospital.name}
        </Box>
        <Box style={{display:'flex', flexDirection:'row'}}>
            <div style={{fontWeight:'700'}}>Country: </div> {patientData.hospital.country}
        </Box>
        <Box style={{display:'flex', flexDirection:'row'}}>
            <div style={{fontWeight:'700'}}>City: </div> {patientData.hospital.city}
        </Box>
        <Box style={{display:'flex', flexDirection:'row'}}>
            <div style={{fontWeight:'700'}}>Street: </div> {patientData.hospital.street}
        </Box>
    </Box>
  )
}

export default PatientHospitalData