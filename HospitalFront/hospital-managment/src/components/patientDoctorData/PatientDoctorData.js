import React from 'react'
import { Box } from '@mui/system';

function PatientDoctorData(props) {
    const {patientData} = props;
  return (
    <Box style = {{display:'flex', justifyContent:'flex-start', alignItems:'flex-start', flexDirection:'column'}}>
        <Box style={{display:'flex', flexDirection:'row'}}>
            <div style={{fontWeight:'700'}}>Name: </div> {patientData.doctor.name}
        </Box>
        <Box style={{display:'flex', flexDirection:'row'}}>
            <div style={{fontWeight:'700'}}>Surname: </div> {patientData.doctor.surname}
        </Box>
    </Box>
  )
}

export default PatientDoctorData