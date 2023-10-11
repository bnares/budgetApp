import React from 'react'
import { Navigate, Link } from 'react-router-dom';
import Button from '../../../components/controls/Button.js';
import {useAuth} from "../../../components/UseContext.js"
function MainPatientWindow() {
    const auth = useAuth();
    console.log("Main patient window");
    console.log(auth.user);

  return (
    <>
    <div>MainPatientWindow</div>
    <Button onClick={auth.logout} text="Logout"/>
    <Link to = "/api/mainWindow" >Testowe 2</Link>
    </>
    
  )
}

export default MainPatientWindow