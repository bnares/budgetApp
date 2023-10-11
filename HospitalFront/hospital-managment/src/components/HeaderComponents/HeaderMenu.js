import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar'; 
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import IconButton from '@mui/material/IconButton';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import {useAuth} from "../UseContext.js"
import useMediaQuery from '@mui/material/useMediaQuery';
import {Icon, useTheme} from '@mui/material'
import SideMenu from './SideMenu.js';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
//import { Link } from 'react-router-dom';
import "./headerMenu.css";
import { makeStyles } from '@material-ui/core'

const useStyle = makeStyles(theme=>({
    root:{
        "& .Mui-selected":{
            
            width: "85px",
            height: "85px",
            background: "#29fd53",
            borderRadius: "50%",
            border: "6px solid black",
            
        }
    }

}))

function HeaderMenu(props) {
    const {tabsList,listIcons,actions} = props;
    const auth = useAuth();
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    const [selected,setSelected] = React.useState(false); 
    const classes = useStyle();
    
    
    
  return (
    <>
                {isMatch?(<><SideMenu listItem={tabsList} listIcons={listIcons} actions = {actions}/></>):( 
                <div className='mainContainer'>
                    <ul className='list'>
                        {tabsList.map((item,idx)=>(
                            <li key={idx} className = 'listItem' onClick={actions[idx]}>
                                <a href ="#" className='listLink'>
                                <span className='icon'>{listIcons[idx]}</span>
                                <span className='text'>{item}</span>
                                </a>
                            </li>
                        ))}
                        <div className='indicator'></div>
                    </ul>
                </div>
                )}
    </>
  )
}

export default HeaderMenu