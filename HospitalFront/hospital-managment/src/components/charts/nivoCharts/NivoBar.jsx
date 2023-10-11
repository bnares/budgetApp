import { Box } from '@mui/system';
import { ResponsiveBar } from '@nivo/bar'

import React from 'react'

const NivoBar = ({nivoBarData}) => {
    const [barData, setBarData] = React.useState([]);
    const [barKeys, setBarKeys] = React.useState([]);
    const [barColor, setBarColor] = React.useState(["hsl(114, 70%, 50%)","hsl(77, 70%, 50%)","hsl(277, 70%, 50%)","hsl(81, 70%, 50%)","hsl(74, 70%, 50%)","hsl(90, 70%, 50%)", "hsl(241, 70%, 50%)",
    "hsl(226, 70%, 50%)","hsl(307, 70%, 50%)","hsl(160, 70%, 50%)","hsl(176, 70%, 50%)"])
      

      React.useEffect(()=>{
        let data = [];
        let usedHospitalWardNames = [];
        setBarData([]);
        nivoBarData.forEach(hospital => {
            var hospitalData = {'hospitalName':hospital.hospitalName }
            var count = 0;
            
            hospital.hospitalsWards.forEach(ward=>{
                var wardHospitalName = String(ward.wardName);
                if(usedHospitalWardNames.every(wardName=>wardName != ward.wardName)) usedHospitalWardNames.push(ward.wardName);
                var wardHospitalColor = wardHospitalName+"Color";
                //hospitalData = {...hospitalData, wardHospitalName:ward.occupiedBed,wardColor:barColor[count]};
                hospitalData[wardHospitalName] = ward.occupiedBed;
                hospitalData[wardHospitalColor] = barColor[count];
                //data.push(hospitalData);
                count++;
                if(count>=barColor.length) count=0;
            })
            data =[...data, hospitalData];
            hospitalData = {};
            //data = [];   
        });
        setBarData(data);
        setBarKeys(usedHospitalWardNames);
        
      },[])

      console.log("barData");
      console.log(barData);

  return (
    <ResponsiveBar
        data={barData}
        keys={barKeys}
        theme = {{
            axis:{
                domain:{
                    
                },
                ticks:{
                    line:{
                        stroke:'#e0e0e0',
                        strokeWidth:1,
                    },
                    text:{
                        fill:'#e0e0e0',
                    }
                },
                legend:{
                    text:{
                        fill:'#e0e0e0',
                    }
                }
            },
            legends:{
                text:{
                    fill:'#e0e0e0',
                }
            },
            tooltip:{
                container:{
                    color: "#141b2d",
                    fontWeight:500,
                }
            },
            
        }}
        indexBy="hospitalName"
        margin={{ top: 20, right: 50, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
       
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Patients Num.',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legends={[]}
        role="application"
        ariaLabel="bar chart demo"
        barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
    />
  )
}

export default NivoBar