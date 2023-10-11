import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '../Button';
import { CollectionsOutlined } from '@mui/icons-material';

function DisplayDataTable(props) {
    const {theNewestObjectNotes} = props;
    let dataRow = [];
    let tableHeader = [];
    theNewestObjectNotes.forEach(patient => {
       let dataToFeed =  {date:patient.date,name:patient.name,surname:patient.surname ,record:patient.record};
       dataRow.push(dataToFeed);
       tableHeader = Object.keys(dataToFeed);
    });

    const modifyPatientCardData = (indx)=>{
      console.log(theNewestObjectNotes[indx])
    }
    
  return (
    <>
    {theNewestObjectNotes.length>0?(
      <div style={{display:"flex", flexDirection:"column"}}>
      <h1 style={{color:"#fff", margin:"auto", paddingBottom:"5px"}}>Top 5 Last Add Notes</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableHeader.map((item,idx)=>(<TableCell align="center" key={idx}>{item.toUpperCase()}</TableCell>))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataRow.slice(0,5).map((row,indx) => (
                <TableRow
                  key={indx}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.date.slice(0,10)}
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.surname}</TableCell>
                  <TableCell align="center">{row.record.slice(0,21)+"..."}</TableCell>
                  <TableCell align="center">{<Button text="Modify" onClick = {()=>modifyPatientCardData(indx)}/>}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </div>
    ):null}
    
    </>
  )
}

export default DisplayDataTable