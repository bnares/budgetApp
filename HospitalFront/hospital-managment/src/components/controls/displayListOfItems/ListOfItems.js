import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { sx } from '@mui/joy/styles/styleFunctionSx';
import { display, fontSize } from '@mui/system';

function ListOfItems(props) {
  const {theNewestObjectNotes} = props;
  console.log("SEnd data to objcet which creates LIST")
  console.log(theNewestObjectNotes);
  const textSize = {fontSize:"25px", alignItems:"center"};
  console.log("Feed data")
  console.log(theNewestObjectNotes.length);
  return (
    
    <div  style={{display:"flex", flexDirection:"column", justifyContent:'center', alignItems:'center'}}>
    <h2 style={{color:"#fff", justifyContent:'center', margin:'auto'}}>MOST RECENT NOTES</h2>
    {theNewestObjectNotes.length>0?(
      <List sx={{ width: '100%', maxWidth: "40vw", bgcolor: 'background.paper', fontSize:"25px", padding:"20px 10px", margin:"40px 10px" }}>
      {theNewestObjectNotes.slice(0,3).map(note=>(
        <ListItem alignItems="center" divider sx={{fontSize:"25px"}}>
          <ListItemAvatar>
            <Avatar alt="Patient's Note" sx={{widdth:"40px", height:"40px"}}>
              <AccountCircleIcon sx={{fontSize:"40px"}}/>
            </Avatar>
          </ListItemAvatar>
            <ListItemText
              primaryTypographyProps = {textSize}
              secondaryTypographyProps = {textSize}
              sx={{fontSize:"35px"}}
              primary={note.name.toUpperCase()+" "+note.surname.toUpperCase()}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline', fontSize:"25px" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {note.date.slice(0,10)+": "} 
                  </Typography>
                  {note.record.slice(0,20)+"..."}
                </React.Fragment>
              }
            />
        </ListItem>
      ))}
    </List>
    ):(
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListItem alignItems='center'>
          <ListItemText primary="No Added Notes"  primaryTypographyProps = {textSize}/>
        </ListItem>
      </List>)}
    </div>
  )
}

export default ListOfItems