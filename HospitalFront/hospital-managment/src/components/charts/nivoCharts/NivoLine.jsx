import { ResponsiveLine } from '@nivo/line'
import React from 'react'

const NivoLine = ({patientsNotes})=>{
    const [patientData, setPatientData] = React.useState([]);

    React.useEffect(()=>{
        let axisData =[];
        patientsNotes.forEach(data => {
            let variableToAdd = {'x':data.patientName, 'y':data.notesNumbers};
            axisData.push(variableToAdd);
        });
        setPatientData([{data:[...axisData.slice(-10)],color: "hsl(83, 70%, 50%)",id:'wykres'}])
    },[])

    return(
        <ResponsiveLine
            data={patientData}
            theme={{
                axis:{
                    domain:{
                        line:{
                            stroke: "#e0e0e0",
                        }
                    },
                    legend:{
                        text:{
                            fill: "#e0e0e0",
                        }
                    },
                    ticks:{
                        line:{
                            stroke:"#e0e0e0",
                            strokeWidth:1,
                        },
                        text:{
                            fill: "#e0e0e0",
                        }
                    }
                },
                legend:{
                    text:{
                        fill: "#e0e0e0"
                    },
                    ticks:{
                        color:"#fff"
                    }
                },
                tooltip:{
                    container:{
                        color: "#141b2d",
                    }
                },
                crosshair: {
                    line: {
                        stroke: '#fff',
                        strokeWidth: 1,
                        strokeOpacity: 0.35,
                    },
                }
            }}
            margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 0,
                max: 'auto',
                stacked: true,
                reverse: false
            }}
            yFormat=" >-.0x"
            curve="cardinal"
            axisTop={null}
            axisRight={null}
            axisBottom={
                null
            }
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            enableGridX={false}
            enableGridY={false}
            //gridYValues = {[0,5,10,20,40,80]}
            enablePoints = {false}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            enableArea={true}
            useMesh={true}
            colors={{ scheme: 'accent' }}
          
        />
    )
}

export default NivoLine;