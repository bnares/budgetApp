import React from 'react'
import "./progressBar.css"

function ProgressBar(prop) {
    const {occupation} = prop;
    
  return (
    <>
        <div className='containerBar'>
            <div className='cardBar'>
            <p className='cardTitle'>Ward Occupation</p>
                <div className='percentBar' style={{"--clr":"#04fc43", "--num":`${occupation.occupation}`, position:"relative", left:30}}>
                    <div className='dot'></div>
                    <svg>
                        <circle cx="70" cy="70" r="70"></circle>
                        <circle cx="70" cy="70" r="70"></circle>
                    </svg>
                    <div className='number'>
                        <h2>{occupation.occupation} <span>%</span></h2>
                        
                    </div>
                    
                </div>
                <p className='nameHospital' style={occupation.hospitalName.length>27?{fontSize:'8px'}:{fontSize:'11px'}}>{occupation.hospitalName}</p>
                <p className='nameHospital' style={{position:"relative", top:110, left:-75}}>{occupation.wardName}</p>
            </div>
        </div>
    </>
  )
}

export default ProgressBar