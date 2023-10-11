import React from 'react'
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const columns = [
    { id: 'Ward Name', label: 'Ward Name', minWidth: 150, align:'center' },
    { id: 'Max Capacity', label: 'Max Capacity', minWidth: 100, align:'center' },
    { id: 'Occupy Bed', label: 'Occupy Bed', minWidth: 100, align:'center' },
    
  ];

function AdminViewHospitalWindow({clickedHospitalData, setOpenAdminViewHospitalWindow,openAdminViewHospitalWindow}){
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    {console.log("clickedHospital")}
    {console.log(clickedHospitalData)}
    return(
    <Box sx={{
        "& .MuiTableHead-root":{
            background: '#3e4396'
        }
    }}>
        <Dialog
            fullScreen={fullScreen}
            open={openAdminViewHospitalWindow}
            onClose={()=>setOpenAdminViewHospitalWindow(false)}
            aria-labelledby="responsive-dialog-title"
            sx={{
                "& .MuiTableHead-root":{
                    background: '#3e4396'
                }
            }}
        >
            <DialogTitle id="responsive-dialog-title" sx={{backgroundColor:'#4cceac', color:'#fff', textAlign:'center'}}>
            {`${clickedHospitalData.hospitalName}`}
            </DialogTitle>
            <DialogContent sx={{
               
                "& .MuiTable-root":{
                    
                    backgroundColor:'#3e4396',
                   
                },
            }}>
                <Box  display='flex' justifyContent='flex-start' marginTop='20px' flexWrap='wrap' gap='15px' sx={{
                         "& .MuiTable-root":{
                            "& .MuiTableHead-root":{
                                background: '#3e4396',
                                backgroundColor:'#3e4396',
                                borderBottom: '1px solid red'
                            },
                         },

                         '& .MuiTableCell-root':{
                            backgroundColor:'#3e4396'
                         },
                         
                         '& .MuiTableRow-root':{
                             background: '#3e4396',
                             
                             '& .MuiTableCell-root':{
                                color:'#dfdfdf'
                             }
                         },
                         '& .MuiTablePagination-root':{
                            background: '#3e4396',
                            color:'#dfdfdf',
                            '& .MuiSvgIcon-root':{
                                color:'#dfdfdf'
                            }
                         }
                }}>
                    <Paper sx={{ width: '100%', overflow: 'hidden', background:'#3e4396' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table" >
                        <TableHead sx={{
                           
                            background: '#3e4396',
                            backgroundColor:'#3e4396',
                            borderBottom: '1px solid red'
                        
                        }}>
                            <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                                >
                                {column.label}
                                </TableCell>
                            ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                                            
                            {clickedHospitalData.hospitalsWards
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((ward,idx) => (
                                
                                    <TableRow hover role="checkbox" tabIndex={-1} key={ward.wardId}>
                                        <TableCell align={'center'}>
                                            {ward.wardName}
                                        </TableCell>
                                        <TableCell align={'center'}>
                                            {ward.maxCapacity}
                                        </TableCell>
                                        <TableCell align={'center'}>
                                            {ward.occupiedBed}
                                        </TableCell>
                                    </TableRow>
                                )
                                )
                            }
                        </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={clickedHospitalData.hospitalsWards.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    </Paper>
                </Box>
            </DialogContent>
            <DialogActions>
            <Button autoFocus onClick={()=>setOpenAdminViewHospitalWindow(false)} sx={{backgroundColor:'#4cceac'}} variant='contained'>
                CLOSE
            </Button>
            </DialogActions>
        </Dialog>
    </Box>
    )

}

export default AdminViewHospitalWindow