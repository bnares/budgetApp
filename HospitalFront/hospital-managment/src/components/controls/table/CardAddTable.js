import React from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { makeStyles } from '@material-ui/core';
import DataGridButton from "./DataGridButton";
import { blue, grey, red } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';


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
        width:"40px",
        height:"40px",
        backgroundColor: "#ff0461",
        padding:"5px",
        borderRadius:"50%",
        "&:hover":{
            backgroundColor: "#1976d2",
        }
       },
     },

     button:{
        "&.MuiBox-root":{
            width:"35px", 
            height:"35px", 
            borderRadius:"50%", 
            backgroundColor:blue[500],
            position:'relative',
            cursor:'pointer',
            "&:hover":{
                backgroundColor:red[600]
            },
            
        }
     },

     iconButton:{
        "&.MuiSvgIcon-root":{
            position:'absolute',
            top:6,
            left:6,
        }
     }

   });

function CardAddTable(props) {
    const {patientsColumn,patientsRow,title,setOpenPatientWindow,setClickedPatientData,rowsPerPage = [10,15,20]} = props;
    const classes = useStyles();
    const [pageSize,setPageSize] = React.useState(rowsPerPage[0]);
   

    const handleClickRow = (action)=>{
        setClickedPatientData({id:action.id,name:action.name,surname:action.surname, age:action.age});
        setOpenPatientWindow(true);
    }

  return (
    <>
        <h2>{title}</h2>
         <DataGrid
            components={{ Toolbar: GridToolbar }}
            rows = {patientsRow}
            columns = {patientsColumn}
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
                    },
                    '& .MuiDataGrid-row':{
                        bgcolor: grey[700]
                        
                    },
                    "&.MuiDataGrid-root":{
                        width:"70%"
                       },

            }}
            className = {classes.DataGrid}
            //onCellClick = {handleClick}
            rowsPerPageOptions = {rowsPerPage}
            pageSize = {pageSize}
            onPageSizeChange = {(newNumber)=>setPageSize(newNumber)}
            getRowId = {(row)=>row.id}
            getRowSpacing= {params=>({
                top:params.isFirstVisible?0:5,
                bottom:params.isLastVisible?0:5
            })}
            //onCellEditCommit = {params=>{console.log("params in onCellEditCommit"); console.log(params); setRowId(params.id)}}
            //onRowClick = {params=>handleClickRow(params.row)}
            onCellClick = {params=>handleClickRow(params.row)}
        />
    </>
  )
}

export default CardAddTable