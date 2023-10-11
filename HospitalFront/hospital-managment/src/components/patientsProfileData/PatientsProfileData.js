import { Box } from '@mui/system';
import React from 'react'

function PatientsProfileData(props) {
    const {patientData} = props;

  return (
    <Box style = {{display:'flex', justifyContent:'flex-start', alignItems:'flex-start', flexDirection:'column'}}>
        <Box style={{display:'flex', flexDirection:'row'}}>
            <div style={{fontWeight:'700'}}>Name: </div> {patientData.name}
        </Box>
        <Box style={{display:'flex', flexDirection:'row'}}>
            <div style={{fontWeight:'700'}}>Surname: </div> {patientData.surname}
        </Box>
        <Box style={{display:'flex', flexDirection:'row'}}>
            <div style={{fontWeight:'700'}}>Age: </div> {patientData.age}
        </Box>
    </Box>
  )
}

export default PatientsProfileData