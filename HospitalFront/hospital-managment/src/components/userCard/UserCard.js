import React from 'react'
import "./userCard.scss";
import Tilt from 'react-vanilla-tilt';
import Button from "../../components/controls/Button"
import IconButton from '@mui/material/IconButton';
import { Box } from '@material-ui/core';

function UserCard(props) {
  const {imageButton,imageButtonColor, text,onClickFunction,snakeColorBorder} = props;
 
  return (
    <>
    <Box style={{display:'flex', justifyContent:"center", alignItems:"center",paddingTop:"40px"}}>
    
      <Tilt id="userCardTilt" style={{"--clr":`${snakeColorBorder}`}}>
          <div className='box' style={{position:"relative"}}>
              <div className="form">
                <IconButton size="large" color={imageButtonColor} style={{display:"flex", flexDirection:"column",gap:"0px", justifyContent:'center', alignItems:"center"}} onClick = {onClickFunction}>
                  {imageButton}
                  <h6 style={{zIndex:"30", color:'#fff', position:"absolute", top:"120px"}}>{text}</h6>
                </IconButton>
              </div>
          </div>
      </Tilt>
    </Box>
    
    </>
  )
}

export default UserCard