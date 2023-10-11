import { AppBar, Toolbar,Grid, InputBase, IconButton,Badge, makeStyles} from '@material-ui/core'
import React from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SearchIcon from '@mui/icons-material/Search';
import { ThemeContext } from '@emotion/react';

const useStyles = makeStyles(them=>({
    root:{
        backgroundColor:'#fff',
        
    },
    searchInput:{
        opacity:'0.6',
        padding:`0px ${them.spacing(1)}px`,
        fontSize: '0.8rem',
        '&:hover':{
            backgroundColor:'#f2f2f2'
        },
        '& .MuiSvgIcon-root':{
            marginRight:them.spacing(1)
        }
        
    },
    btnRoot:{
        backgroundColor:'green'
    },
    btnLabel:{
        backgroundColor:'red'
    }
}))

export default function Header() {
    const classes = useStyles();
  return (
    <AppBar position='static' className={classes.root}>
        <Toolbar>
            <Grid container alignItems='center'>
                <Grid item  >
                    <InputBase className={classes.searchInput} placeholder='Search Item' startAdornment={<SearchIcon fontSize="small" />}>

                    </InputBase>
                </Grid>
                <Grid item sm></Grid> 
                <Grid item  >
                    <IconButton >
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon fontSize="small"/>
                        </Badge>
                    </IconButton>
                    <IconButton>
                        <Badge badgeContent={2} color="primary">
                            <ChatBubbleOutlineIcon fontSize="small"/>
                        </Badge>
                    </IconButton>
                    <IconButton>
                        <PowerSettingsNewIcon/>
                    </IconButton>
                </Grid>
            </Grid>
        </Toolbar>
    </AppBar>
  )
}
