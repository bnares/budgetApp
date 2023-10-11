import React from 'react'
import "./progressbar.css";

function Progressbar(props) {
    const {number,description} = props;
  return (
   <>
        <section>
            <div className='progressBarContainer'>
                <div className='progressBarCard'>
                        <div className='progressBarBox'>
                            <div>
                                <div className='percent'>
                                    <svg>
                                        <circle cx="70" cy="70" r="70"></circle>
                                        <circle cx="70" cy="70" r="70"></circle>
                                    </svg>
                                    <div className='number'>
                                        <h2>{number}<span></span></h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='progressbarText'>
                                {description}
                        </div>
                </div>
            </div>
        </section>
   </>
  )
}

export default Progressbar