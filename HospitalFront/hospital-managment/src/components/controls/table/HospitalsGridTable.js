import React from 'react'
import SaveIcon from '@mui/icons-material/Save';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
    dataGrid: {
        
        color:"#fff",
        "&.MuiDataGrid-main":{
         color:"white"
        },
        "&.MuiButtonBase-root":{
         width:"50%",
         backgroundColor: "#1976d2",
         padding:"5px",
         borderRadius:"0",
         "&:hover":{
             backgroundColor: "#ff0461",
         }
        },
        
      }
})

function HospitalsGridTable(props) {
    const {allRegisteredHospitals,onClickFunction} = props;
    const [pageSize,setPageSize] = React.useState(5);
    const classes= useStyle();
    const columnTableHeader = [
        {field:"country",headerName:"Country", minWidth:100, flex:1},
        {field:"city",headerName:"City", minWidth:100, flex:1},
        {field:'street', headerName:"Street", minWidth:100,flex:1},
        {field:"name",headerName:"Hospital Name", minWidth:200, flex:2},
        {field:'actions', headerName:"Action", minWidth:50, flex:1, sortable:false, filterable:false, renderCell:params=>{
        return(
            <IconButton color="success" className = {classes.dataGrid} >
                <SaveIcon />
            </IconButton>
        )
        }}
    ]
    let rowTable = []

    
    for(let i=0; i<allRegisteredHospitals.length;i++){
        let rowData = {
                       id:allRegisteredHospitals[i].hospitalId, 
                       country:allRegisteredHospitals[i].country, 
                       city:allRegisteredHospitals[i].city,
                       name:allRegisteredHospitals[i].name,
                       street:allRegisteredHospitals[i].street,
                    }
        rowTable.push(rowData);
    }
    
  return (
    <Box style={{display:"flex", justifyContent:'center',paddingBottom:"80px", backgroundColor:"black", width:"750px"}}>
        <Box style={{height:400, width:'95%', paddingTop:"40px",paddingBottom:"40px" }}>
            <DataGrid
                components={{ Toolbar: GridToolbar }}
                rows={rowTable}
                columns={columnTableHeader}
                pageSize={pageSize}
                rowsPerPageOptions={[5,10,20]}
                onPageSizeChange = {(newNumber)=>setPageSize(newNumber)}
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
                onRowClick = {onClickFunction}
            />
        </Box>
    </Box>
  )
}

export default HospitalsGridTable