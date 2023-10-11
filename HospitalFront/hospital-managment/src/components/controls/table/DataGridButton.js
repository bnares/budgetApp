import { IconButton } from '@mui/material';
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@material-ui/core';
import CircularProgress from '@mui/material/CircularProgress';
import SaveIcon from '@mui/icons-material/Save';
import { green, red } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';
import { Box, Fab } from '@mui/material'


const useStyles = makeStyles({

    dataGrid: {
       width: "100%",
       color:"#fff",
       "&.MuiDataGrid-main":{
        color:"white"
       },
       "&.MuiDataGrid-root":{
        width:"100%"
       },
       "&.MuiButtonBase-root":{
        width:"35px",
        height:"35px",
        backgroundColor: "#ff0461",
        padding:"5px",
        borderRadius:"50%",
        "&:hover":{
            backgroundColor: "#1976d2",
        }
       },
     },

     progressBar:{
        "&.MuiCircularProgress-root":{

            "&.MuiCircularProgress-svg":{
                width:"70px !imporant",
                height:"70px !important",
                size:50,
                "&.MuiCircularProgress-circle":{
                    strokeWidth:"5px !important",
                }
            }

        },
        
     }
   });


function DataGridButton(props) {
    const {success,rowId,setRowId,clickedRow,iconNormallySeen =<DeleteIcon />, iconForMoment=<CheckIcon /> } = props;
    const classes = useStyles();
    const [clickedRowId, setClickedRowId] = React.useState(null);
    React.useEffect(()=>setClickedRowId(rowId),[]);
  return (
    <>
           {success && clickedRow==rowId ?
           <IconButton color="success" size='large' sx={{borderRadius:"50%"}} disabled={true}  onClick={(event)=> setClickedRowId(rowId)}>
                <Fab color='primary' className={classes.progressBar}  sx={{ width:40, height:40, bgcolor:green[500], '&:hover':{bgcolor:green[700]}}}>
                    {iconForMoment}
                </Fab>
            </IconButton>
            : 
            <IconButton color="error" sx={{borderRadius:"50%"}}  className = {classes.dataGrid} onClick={(event)=>setClickedRowId(rowId)}>
                {iconNormallySeen}
            </IconButton>
            }
        
       
    </>
  )
}

export default DataGridButton