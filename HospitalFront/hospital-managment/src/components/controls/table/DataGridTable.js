import React from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import Button from '../Button';
import {getPatientsCard} from "../../../apiData/doctor/doctorData";
import {useAuth} from "../../UseContext.js";
import { ConnectingAirportsOutlined } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { borderRadius } from '@mui/system';
import {SortPatientsCardByDatesAndGetTheNewest} from "../../../helperMethod/SortData";
const useStyles = makeStyles({

    dataGrid: {
       width: "70%",
       color:"#fff",
       "&.MuiDataGrid-main":{
        color:"white"
       },
       "&.MuiButtonBase-root":{
        width:"50%",
        backgroundColor: "#ff0461",
        padding:"5px",
        borderRadius:"0",
        "&:hover":{
            backgroundColor: "#1976d2",
        }
       },
     }
   });

function DataGridTable(props) {
    const {setError,setChoosenPatientGridTableData,token,setOpenPopup,refreshDataGridTable,setRefreshDataGridTable} = props;
    let {theNewestObjectNotes} = props;
    const auth = useAuth();
    const classes = useStyles();
    let dataRow = [];
    let dataColumn = [];
    const [pageSize,setPageSize] = React.useState(5);
    
    theNewestObjectNotes.forEach(patient=>{
        let patientData= {id:patient.id, date:patient.date,name:patient.name, surname:patient.surname,record:patient.record};
        dataRow.push(patientData);
    })

    React.useEffect(()=>{
        theNewestObjectNotes = SortPatientsCardByDatesAndGetTheNewest(auth.patientsList);
        dataRow = [];
        theNewestObjectNotes.forEach(patient=>{
            let patientData= {id:patient.id, date:patient.date,name:patient.name, surname:patient.surname,record:patient.record};
            dataRow.push(patientData);
        })
    },[refreshDataGridTable])
                                                
    const handleClick = (event)=>{
        setChoosenPatientGridTableData(null);
        let eventObjectKeys = Object.keys(event);
        if(eventObjectKeys.includes('row')){
            const temporaryPatienyId =event.row.id;
            getPatientsCard(setChoosenPatientGridTableData,setError,temporaryPatienyId,token)
            setOpenPopup(true);
        }    
    }

    dataColumn = [{field:"date",headerName:"Date", minWidth:100, flex:2, renderCell:params=>params.row.date.slice(0,10)},
                  {field:"name",headerName:"Name", minWidth:200, flex:2},
                  {field:"surname",headerName:"Surname", minWidth:200, flex:2},
                  {field:"record",headerName:"Record", minWidth:200, flex:4},
                  {field:'actions', headerName:"Actions",minWidth:150, flex:1, sortable:false, filterable:false,renderCell:params=>{ return(
                                                                                                    
                                                                                                    <IconButton color='secondary' onClick={(event)=>{handleClick(event)}} className={classes.dataGrid}>
                                                                                                        <EditIcon />
                                                                                                    </IconButton>
                                                                                                    )
                                                                                                    }
                 }]
  return (
        <>
       
        <DataGrid
            components={{ Toolbar: GridToolbar }}
            rows = {dataRow}
            columns = {dataColumn}
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
                    }

            }}
            className = {classes.DataGrid}
            onCellClick = {handleClick}
            rowsPerPageOptions = {[2,3,5]}
            pageSize = {pageSize}
            onPageSizeChange = {(newNumber)=>setPageSize(newNumber)}
        />
   </>
  )
}

export default DataGridTable