import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Box } from '@mui/material';
import { useAuth } from '../UseContext';
import BedIcon from '@mui/icons-material/Bed';
import SummarizeIcon from '@mui/icons-material/Summarize';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import VaccinesIcon from '@mui/icons-material/Vaccines';

function AdminDialogWindow({openViewPatientDetails, setOpenViewPatientDetails,clickedPatientData,patientDoctor}) {
  const auth = useAuth();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  return (
    <>
        
        <Dialog
            fullScreen={fullScreen}
            open={openViewPatientDetails}
            onClose={()=>setOpenViewPatientDetails(false)}
            aria-labelledby="responsive-dialog-title"
        >
        <DialogTitle id="responsive-dialog-title" sx={{backgroundColor:'#4cceac', color:'#fff', textAlign:'center'}}>
          {'PATIENT DETAILS'}
        </DialogTitle>
        <DialogContent>
          <Box  display='flex' justifyContent='flex-start' marginTop='20px' flexWrap='wrap' gap='15px'>
          <TextField
            id="input-with-icon-textfield"
            label="Patient Name"
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <AccountCircle sx={{color:'#868dfb'}}/>
                </InputAdornment>
            ),
            }}
            variant="outlined"
            disabled
            value={clickedPatientData.patientName}
            fullWidth
          />

          <TextField
            id="input-with-icon-textfield"
            label="Notes Numbers"
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <SummarizeIcon sx={{color:'#727681'}}/>
                </InputAdornment>
            ),
            }}
            variant="outlined"
            disabled
            value={clickedPatientData.notesNumbers}
            fullWidth
          />

          <TextField
            id="input-with-icon-textfield"
            label="Hospital Name"
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <LocalHospitalIcon sx={{color:'red'}}/>
                </InputAdornment>
            ),
            }}
            variant="outlined"
            disabled
            value={clickedPatientData.patientHospital}
            fullWidth
          />

          <TextField
            id="input-with-icon-textfield"
            label="Hospital City"
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <LocationCityIcon sx={{color:'#141414'}}/>
                </InputAdornment>
            ),
            }}
            variant="outlined"
            disabled
            value={clickedPatientData.patientCity}
            fullWidth
          />

          <TextField
            id="input-with-icon-textfield"
            label="Patient's Doctor"
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <VaccinesIcon sx={{color:'#535ac8'}}/>
                </InputAdornment>
            ),
            }}
            variant="outlined"
            disabled
            defaultValue={patientDoctor.name + " "+patientDoctor.surname}
            fullWidth
          />
          </Box>
          
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>setOpenViewPatientDetails(false)} sx={{backgroundColor:'#4cceac'}} variant='contained'>
            CLOSE
          </Button>
          
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AdminDialogWindow