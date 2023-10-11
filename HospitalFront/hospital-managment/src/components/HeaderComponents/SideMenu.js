import React from 'react'
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
function SideMenu(props) {

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const {listItem, listIcons, actions} = props;
  return (
    <>
        <Drawer open={openDrawer}>
            <IconButton onClick={()=>setOpenDrawer(!openDrawer)}>
                    <MenuIcon color='primary' />
            </IconButton>
            <List>
                {listItem.map((item,idx)=>(<ListItemButton key={idx} onClick={actions[idx]}><ListItemIcon>{listIcons[idx]}</ListItemIcon><ListItemText>{item}</ListItemText><Divider /></ListItemButton>))}
            </List>
            <Divider />
            
        </Drawer>
        <IconButton onClick={()=>setOpenDrawer(!openDrawer)}>
                <MenuIcon color = "primary"/>
        </IconButton>

    </>
  )
}

export default SideMenu
