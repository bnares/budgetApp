import React from 'react'
import {PatientsCardSortedByDates} from "../../helperMethod/SortData"
import {Popup} from "../Popup";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@material-ui/core';
import { useAuth } from '../UseContext';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Box from '@mui/material/Box';

const useStyles = makeStyles({

  
    mainContentBox:{
      
      maxHeight:450,
      marginTop:0,
      "&.MuiDialogContent-root":{
        
      },
      listRoot: {
       
        maxHeight: 450,
        overflow: 'auto',
        '& li:hover': {
            cursor: 'pointer',
            backgroundColor: '#E3E3E3'
        },
        '& li:hover .MuiButtonBase-root': {
            display: 'block',
            color: '#000',
        },
        '& .MuiButtonBase-root': {
            display: 'none'
        },
        '& .MuiButtonBase-root:hover': {
            backgroundColor: 'transparent'
        }
    }
    },
    scrollBar: {
      "&::-webkit-scrollbar": {
        width: "3px",
      },
  
      "&::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 5px rgb(255, 251, 251)",
        borderRadius: "10px",
      },
   
      "&::-webkit-scrollbar-thumb": {
        background: "#077DFA",
        borderRadius: "10px",
      },
  
      "&::-webkit-scrollbar-thumb:hover": {
        background: "rgb(255, 251, 251)",
      }
    },
})

function PatientCardData(props) {
    const {patientData} = props;
    const classes = useStyles();
    const auth = useAuth();
    const [openSideWindow,setOpenSideWindow] = React.useState(false);
    const [clickedNoteData,setClickedNoteData] = React.useState({record:""});

    const listItemButtonClicked = (item)=>{
        console.log("item");
        console.log(item);
        setClickedNoteData(item)
        
        //getTheRightPatientData();
        setOpenSideWindow(true);
      }
    
  return (
    <>
    {console.log("clickedNOteData")}
    {console.log(clickedNoteData)}
    <Grid container spacing={2}>
        <Grid item xs={12}>
            <Box style={{display:'flex', justiContent:'center', alignItems:'flexStart', alignContent:"flexStart"}} className={classes.scrollBar}>
                <List className={classes.listRoot}>
                    {PatientsCardSortedByDates(patientData).map((item,idx)=>(
                    <ListItem key={idx} 
                        secondaryAction={
                        <IconButton edge="end"  aria-label="delete" onClick={(event)=>listItemButtonClicked(item)}>
                            <DoubleArrowIcon/>
                        </IconButton>
                        }
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <FolderIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={auth.user.name+" "+auth.user.surname}
                            secondary={item.date.slice(0,10)}
                        />
                    </ListItem>
                    ))}
                </List>
                <Box>
                    {openSideWindow ? 
                    <Box style={{ width:"400px", height:"100%", padding:"10px",display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',gap:"20px",margin:"10px"}}>
                    <TextareaAutosize 
                        minRows={8}
                        maxRows = {15}
                        style = {{maxWidth:400, maxHeight:450,width:400, height:200}}
                        //defaultValue = {clickedNoteData?.record}
                        name = "record"
                        value={clickedNoteData.record}
                        //onChange={(e)=>formData.handleInputChange(e)}
                    />
                    </Box> : null
                    }
                </Box>
            </Box>
        </Grid>
    </Grid>
    </>
  )
}

export default PatientCardData