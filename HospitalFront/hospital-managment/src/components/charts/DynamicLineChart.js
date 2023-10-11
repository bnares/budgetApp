import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function DynamicLineChart(props) {
  const {dataToLineChart} = props;

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
    
    <ResponsiveContainer width="100%" aspect={3}>
        <LineChart
          width={500}
          height={300}
          data={dataToLineChart}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          name="# Patients No."
        >
          <CartesianGrid strokeDasharray="1" horizontal="true" vertical="" stroke='#243240'/>
          <XAxis dataKey="name"  tick={{fill:"#fff"}} tickLine={false}/>
          <YAxis tick={{fill:"#fff"}} allowDecimals={false}/>
          <Tooltip content={<CustomTooltip />} contentStyle={{backgroundColor:"#8884d8", color:"#fff"}} itemStyle={{color:"#fff"}} cursor={false}/>
          <Line type="monotone" dataKey="value" stroke="#fff" dot={{fill:"#fff", stroke:'#8884d8', strokeWidth:2, r:3}} activeDot={{fill:"#fff", stroke:'#8884d8', strokeWidth:3, r:5}} />
          
        </LineChart>
      </ResponsiveContainer>
      </>
  )
}

export default DynamicLineChart