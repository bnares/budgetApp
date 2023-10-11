import React from 'react'
import RadioGroup from '../../components/controls/RadioGroup';
import  {UseForm,Form}  from "../../components/UseForm"
function Test() {
    const introData = {name:"", surname:"", password:"", role:0}
    const roles = [{id:"0", title:"Patient"}, {id:"1", title:"Doctor"}]
    const {values, setValues, errors, setErrors,handleInputChange,handleReset} = UseForm(introData);
  return (
    <div>
        <RadioGroup label="Role" name ="role" value = {values.role} onChange = {(e)=>handleInputChange(e)} items = {roles}/>
    </div>
  )
}

export default Test