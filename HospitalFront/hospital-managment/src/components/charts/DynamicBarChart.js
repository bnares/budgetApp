import React from 'react'
import "./dynamicBarChart.css";
import Box from '@mui/material/Box';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell
  } from "recharts";


function DynamicBarChart(props) {
    const {barData} = props;
    let introData = barData();
    let barCharData = [];
    const barColors = ["#ff0461","#1f77b4", "#ff7f0e", "#2ca02c"];
    let barIndexColors = 0;
    for(let i =0; i<introData.length;i++){
      if(barIndexColors==barColors.length){
        barIndexColors=0;
      }
      barCharData.push({hospitalName:introData[i].hospitalName, patientsNumber:introData[i].patients,color:barColors[barIndexColors]})
      barIndexColors++;
    }

    const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        return (
          <div className="custom-tooltip">
            <p className="label" style={{color:"#fff"}}>{`${label}`}</p>
            <p className="intro">{'Patients No.: '+`${payload[0].value}`}</p>
          </div>
        );
      }
    
      return null;
    };
    
  return (
    <>
      <Box style={{width:"550px", height:"450px", marginTop:"20px"}}>
      <ResponsiveContainer width={500} height="100%" style={{marginTop:"50px"}}>
        <BarChart
          width={500}
          height={350}
          data={barCharData}
          margin={{
            top: 100,
            right: 30,
            left: 20,
            bottom: 5
        }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hospitalName" tick = {false} />
        <YAxis allowDecimals={false}/>
        <Tooltip content={<CustomTooltip />} />
        {/* <Legend /> */}
        <Bar dataKey="patientsNumber">
          {barCharData.map((item,idx)=>(
            <Cell key={`cell-${idx}`} fill={item.color}/>
          ))}
        </Bar>
        
      </BarChart>
    </ResponsiveContainer>
    </Box>
    </>
  )
}

export default DynamicBarChart