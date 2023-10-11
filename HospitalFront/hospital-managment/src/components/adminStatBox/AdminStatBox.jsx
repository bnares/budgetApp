import { Box } from '@mui/material'
import React from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AdminProgressCircle from '../adminProgressCircle/AdminProgressCircle';

function AdminStatBox({icon,title,number=null, progressCircle=null}) {
    
  return (
    <Box backgroundColor="#1F2A40" 
         display='flex' 
         justifyContent='space-araund' 
         alignItems='center' 
         flexDirection='row' 
         p='20px 30px' 
         borderTop= '1px solid rgba(255, 255, 255, 0.5)'
         borderLeft= '1px solid rgba(255, 255, 255, 0.5)' 
         marginTop='30px' 
         borderRadius='5px' 
         gap='10px'
         width='250px'
         height='150px'
    >
        <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' gap='10px'>
            {icon}
            <p style={{color:'#4cceac', fontSize:'15px', fontWeight:'400'}}>{title}</p>
        </Box>
        <Box display='flex' justifyContent='center' alignItems='center' flexDirection='row' gap='5px'>
            {progressCircle==null ? 
                (<Box display='flex' 
                      justifyContent='center' 
                      alignItems='center' 
                      flexDirection='row' 
                      gap='5px'
                >
                    <ArrowUpwardIcon  sx={{color:'#1e5245', fontSize:'50px'}}/>
                    <p style={{ color:'#fff', fontWeight:'600', fontSize:'40px'}}>{number}</p>
                </Box>)
            : <Box>
                <AdminProgressCircle progress={progressCircle}/>
              </Box>}
        </Box>
    </Box>
  )
}

export default AdminStatBox