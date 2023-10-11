import React from 'react'
import OccupationPieChart from '../charts/OccupationPieChart'

function PatientStatistics(props) {
    const {pieData} = props;
    const [patientPieData, setPatientPieData] = React.useState([]);

    React.useEffect(()=>{
        let pie = pieData();
        setPatientPieData(pie);
    }, [])


  return (
    <>
    <OccupationPieChart  pieData = {patientPieData}/>
    </>
    
  )
}

export default PatientStatistics