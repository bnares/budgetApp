import { Box } from '@mui/system';
import React from 'react'

function AdminProgressCircle({progress=0.75, size='60'}) {
    const angle = progress*360;
  return (
    <Box sx={{
        background: `radial-gradient(#1F2A40 55%, transparent 56%),
                    conic-gradient(transparent 0deg ${angle}deg, #6870fa ${angle}deg 360deg),
                    #4cceac`,
        borderRadius:'50%',
        width: `${size}px`,
        height: `${size}px`
        }}  
    >
        
    </Box>
  )
}

export default AdminProgressCircle