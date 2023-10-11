import React from 'react'
import { useMemo } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { makeStyles } from '@material-ui/core';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useAuth } from '../../UseContext';
import { grey } from '@mui/material/colors';
import DataGridActionButton from '../DataGridActionButton';
import {removeWardFromDoctor} from "../../../apiData/doctor/doctorData"
import EditIcon from '@mui/icons-material/Edit';
import DataGridButton from './DataGridButton';

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
     }
   });

export default function WardsGridTable(props) {
    const {doctorsWards,allWardsNames, title, setConfirmDialog,setDeleteWardClickedRow,success} = props;
    const classes = useStyles();
    let dataRow = [];
    //let dataColumn = [];
    const selectOptionsNames = [];
    const [pageSize,setPageSize] = React.useState(5);
    const [rowId, setRowId] = React.useState(null);
    const auth = useAuth();
   

    const handleClickRow = (event)=>{
        //setConfirmDialog({isOpen:true, title:`Delete ${event.WardName}`, subtitle:"Are You Sure?"})
        setRowId(event.id);
        setDeleteWardClickedRow(event.row)
        setConfirmDialog({isOpen:true, title:`Delete Ward ${event.row.wardName}`, subtitle:"Are You Sure?"})
        //console.log(event);
    }


    for(let i=0; i<doctorsWards.length;i++){
        dataRow = [...dataRow,{id:doctorsWards[i].wardId,city:doctorsWards[i].hospital.city,hospitalName:doctorsWards[i].hospital.name,wardName:doctorsWards[i].wardName}]
    }

    allWardsNames.forEach(element => {
        // console.log("element name");
        // console.log(element)
        selectOptionsNames.push(element.name);
    });

    React.useEffect(()=>{
        
        allWardsNames.forEach(element => {
            
            selectOptionsNames.push(element.name);
        });
    },[])

    let dataColumn = [{field:"city",headerName:"City", minWidth:100, flex:2},
    {field:"hospitalName",headerName:"Hospital Name", minWidth:100, flex:2},
    {field:"wardName",headerName:" Ward Name", minWidth:200, flex:2},
    {field:'actions', type:"actions",headerName:"Delete Ward",minWidth:150, flex:1, sortable:false, filterable:false,renderCell:params=>{return(
        <>
        <DataGridButton  success = {success} rowId={rowId} setRowId = {setRowId} clickedRow = {params.id}/>
        </>
    )}
                                                                                      
   }]


  return (
    <>
       
         <h2>{title}</h2>
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
            rowsPerPageOptions = {[2,3,5]}
            pageSize = {pageSize}
            onPageSizeChange = {(newNumber)=>setPageSize(newNumber)}
            getRowId = {(row)=>row.id}
            getRowSpacing= {params=>({
                top:params.isFirstVisible?0:5,
                bottom:params.isLastVisible?0:5
            })}
            //onCellEditCommit = {params=>{console.log("params in onCellEditCommit"); console.log(params); setRowId(params.id)}}
            //onRowClick = {params=>handleClickRow(params.row)}
            onCellClick = {params=>handleClickRow(params)}
        />
    </>
  )
}
