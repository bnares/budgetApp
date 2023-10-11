import { Menu, MenuItem,ProSidebar } from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from "react-router-dom";
import {Box, IconButton, Typography, useTheme} from "@mui/material"
import React from "react";
import Avatar from '@mui/material/Avatar';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const Item = ({title, to, icon, selected, setSelected})=>{
    
    return (

        <MenuItem 
            active={selected==title} 
            style={{color:'#e0e0e0'}} 
            onClick={()=>setSelected(title)} 
            icon={icon}
        >
            <Typography>
                {title}
            </Typography>
            <Link to={to} />
        </MenuItem>
    )
}

const AdminSideBar = ({userName})=>{
    const [isCollapsed, setIsCollapsed] = React.useState(false)
    const [selected, setSelected] = React.useState('Dashboard');

    return (
        
        <Box
        sx={{
            "& .pro-sidebar-inner":{
                background: `#1F2A40 !important` 
            },
            "& .pro-icon-wrapper":{
                background:"transparent !important"
            },
            "& .pro-inner-item":{
                padding:"5px 35px 5px 0px !important"
            },
            "& .pro-inner-item:hover":{
                color:"#868dfb !important"
            },
            "& .pro-menu-item.active":{
                color:"#6870fa !important"
            },
            '& .pro-menu-item':{
                padding: "0px 24px !important"
            },
            "& .pro-sidebar-inner":{
                height: "100vh",
                background: "#1F2A40 !important",
                minHeight: '200vh',
                flexGrow:1,
            },
            "& .MuiSvgIcon-root":{
                color:"#fff"
            },
            "& .pro-sidebar.collapsed":{
                display:'flex',
                flexDirection:'column',
                minHeight:'200vh !important',
                width:'90px',
                minWidth:'90px'
            },
            display:'flex',
            flexDirection:'column',
            height:'200vh',
            minHeight:'200vh'

        }}
        >
            <ProSidebar collapsed = {isCollapsed}>
                <Menu iconShape="square">
                    {/* LOGO MENU ICON */}
                    <MenuItem 
                        onClick={()=>setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon/> : undefined}
                        style={{
                            m:'10px 0 20px 0',
                            color:"#e0e0e0"
                        }}
                    >
                        {!isCollapsed && (
                            <Box display='flex' justifyContent='space-around' alignItems='center' ml='15px' gap='5px'>
                                <Typography variant="h5" color={"#e0e0e0"} sx={{fontFamily:'Itallic'}}>
                                    ADMIN PANEL
                                </Typography>
                                <IconButton onClick={()=>setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    
                    </MenuItem>

                    {/* USER */}
                    {!isCollapsed && (
                            <Box mb="25px">
                                <Box display='flex' justifyContent='center' alignItems={'center'}>
                                    <Avatar src={<AccountCircleIcon fontSize="large"/>} sx={{width:'100px', height:'100px', borderRadius :'50%' }}/>
                                </Box>
                                <Box textAlign='center'>
                                    <Typography variant="h5" color={'#e0e0e0'} fontWeight='bold' sx={{m:'10px 0 0 0',fontFamily:'Itallic'}}>{userName.name} {userName.surname}</Typography>
                                    <Typography variant="h6" color={'#4cceac'} sx={{fontFamily:'Itallic'}}>Admin Account</Typography>
                                </Box>
                            </Box>
                        )}
                        {/* MENU ITEMS */}
                        <Box paddingLeft={isCollapsed ? undefined : '10%'}>
                            <Item 
                                title = "Dashboard"
                                to="/api/Admin"
                                icon = {<HomeOutlinedIcon sx={{color:"#4cceac !important", fontSize:'30px'}}/>}
                                selected = {selected}
                                setSelected = {()=>setSelected("Dashboard")}
                            />
                            <Typography
                                variant="h6"
                                color={'#a3a3a3'}
                                sx={{m:"15px 0 5px 5px"}}
                            >
                                Hospital
                            </Typography>
                           
                            <Item 
                                title = "Add New"
                                to="/api/Admin/NewHospital"
                                icon = {<LocalHospitalIcon sx={{color:'white !important'}}/>}
                                selected = {selected}
                                setSelected = {()=>setSelected("Add New")}
                            />

                            <Item 
                                title = "Update Hospital"
                                to="/api/hospitals/UpdateHospital"
                                icon = {<ModeEditIcon sx={{color:'#fca130 !important'}}/>}
                                selected = {selected}
                                setSelected = {()=>setSelected("Update Hospital")}
                            />

                            <Typography
                                variant="h6"
                                color={'#a3a3a3'}
                                sx={{m:"15px 0 5px 5px"}}
                            >
                                Ward
                            </Typography>

                            <Item 
                                title = "Add Ward"
                                to="/api/Admin/AddWard"
                                icon = {<BloodtypeIcon sx={{color:'red !important', fontSize:'30px'}}/>}
                                selected = {selected}
                                setSelected = {()=>setSelected("Add Ward")}
                            />

                            <Item 
                                title = "Update Ward"
                                to="/api/Ward/UpdateWardHospital"
                                icon = {<NoteAltIcon sx={{color:'#fca130 !important', fontSize:'30px'}}/>}
                                selected = {selected}
                                setSelected = {()=>setSelected("Update Ward")}
                            />
                            
                            <Typography
                                variant="h6"
                                color={'#a3a3a3'}
                                sx={{m: '15px 0 5px 5px'}}
                            >
                                Pages
                            </Typography>
                            <Item 
                                title = "Profile Form"
                                to="/form"
                                icon = {<PersonOutlinedIcon/>}
                                selected = {selected}
                                setSelected = {setSelected}
                            />
                           
                            <Typography
                                variant="h6"
                                sx={{m: '15px 0 5px 5px'}}
                                color={'#a3a3a3'}
                            >
                                Charts
                            </Typography>
                            <Item 
                                title = "Bar Chart"
                                to="/bar"
                                icon = {<BarChartOutlinedIcon/>}
                                selected = {selected}
                                setSelected = {setSelected}
                            />
                            <Item 
                                title = "Pie Chart"
                                to="/pie"
                                icon = {<PieChartOutlineOutlinedIcon/>}
                                selected = {selected}
                                setSelected = {setSelected}
                            />
                            <Item 
                                title = "Line Chart"
                                to="/line"
                                icon = {<TimelineOutlinedIcon/>}
                                selected = {selected}
                                setSelected = {setSelected}
                            />
                            <Item 
                                title = "Geography Chart"
                                to="/geography"
                                icon = {<MapOutlinedIcon/>}
                                selected = {selected}
                                setSelected = {setSelected}
                            />
                        </Box>
                </Menu>
            </ProSidebar>
        </Box>
        
    )
}

export default AdminSideBar;