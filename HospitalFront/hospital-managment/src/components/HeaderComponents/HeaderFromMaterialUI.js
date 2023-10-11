import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar'; 
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import IconButton from '@mui/material/IconButton';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import Box from '@mui/material/Box';
import {useAuth} from "./UseContext.js"
import useMediaQuery from '@mui/material/useMediaQuery';
import {Icon, useTheme} from '@mui/material'
import SideMenu from './SideMenu.js';

function HeaderMenu(props) {
    const {tabsList,logout,listIcons} = props;
    const [tabValue, setTabValue] = React.useState(0);
    const auth = useAuth();
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));

    const handleTabChange = (event, newValue) =>{
        setTabValue(newValue)
    }
  return (
    <>
        <AppBar position='static'>
            <Toolbar variant='dense'>
                {isMatch?(<><SideMenu listItem={tabsList} listIcons={listIcons}/></>):(<><BloodtypeIcon fontSize='large' color='error' sx={{fontSize:30}}/>
                <Tabs sx={{marginLeft:"auton"}} value={tabValue} textColor = "secondary" onChange = {handleTabChange}>
                    {tabsList.map((item,idx)=>(<Tab label={item} key={idx}></Tab>))}
                </Tabs>
                <Box sx={{width:"40px", height:"40px", borderRadius:"50%",  marginLeft:"auto", color:"black", textAlign:"center", justifyContent:"center"}}>
                    <IconButton  size='large' onClick={logout}>
                        <LogoutTwoToneIcon color='action' sx={{fontSize:30}}/>
                    </IconButton>
                </Box></>)}
            </Toolbar>

        </AppBar>
        
    </>
  )
}

export default HeaderMenu