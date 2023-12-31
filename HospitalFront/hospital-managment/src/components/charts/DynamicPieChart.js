import { Box } from '@mui/material';
import { type } from '@testing-library/user-event/dist/type';
import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import {useAuth} from "../UseContext.js"
import { getAllRegisteredWardsName} from "../../apiData/doctor/doctorData"

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy-20} dy={8} textAnchor="middle" fill={fill} fontSize={'15px'} color={"#fff"}>
        {payload.wardName.toUpperCase()}
      </text>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontSize={payload.hospitalName.length>30?'7px':'10px'} color={"#fff"} style={{position:'absolute', top:50}}>
        {payload.hospitalName}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#fff">{`Patients ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#fff">
        {`(${(percent * 100).toFixed(0)}%)`}
      </text>
    </g>
  );
};

function DynamicPieChart(props) {
  const {pieChartData} = props;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const auth = useAuth();

  

  
  const onPieEnter = React.useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  
  

  return(
    <>
      
      <ResponsiveContainer width={500} aspect={1} >
     
          <PieChart width={300} height={400}  margin={{ top: 150, right: 0, left: 0, bottom: 0 }}>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={pieChartData}
              cx={'50%'}
              cy={100}
              innerRadius={80}
              outerRadius={100}
              fill='#00C49F'
              dataKey="percentOccupation"
              onMouseEnter={onPieEnter}
              
            />
          </PieChart>
      </ResponsiveContainer>
    </>
  )
}

export default DynamicPieChart