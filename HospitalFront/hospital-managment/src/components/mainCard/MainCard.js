import React from 'react'
import Tilt from 'react-vanilla-tilt';
import "./mainCard.css";
import Button from "../../components/controls/Button"
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

function MainCard(props) {
    const {title,subtitle,titleContent,setOpenModifyAccountWindow} = props;
  return (
    <>
        <div className='cardContainer'>
            <Tilt id="cardTilt">
                <div className='card'>
                    <div className='content'>
                        <h2>{title}</h2>
                        <h3>{subtitle}</h3>
                        <p>
                               {titleContent}
                        </p>
                        {/* <a href='#' className='linkModifyAccount'>Modify Account</a> */}
                        <Button text="Modify Account" className='linkModifyAccount' onClick={()=>setOpenModifyAccountWindow(true)}/>
                    </div>
                </div>
            </Tilt>
        </div>
    </>
  )
}

export default MainCard