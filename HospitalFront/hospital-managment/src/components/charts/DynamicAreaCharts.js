import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../UseContext';
import {SortPatientsCardByDates} from "../../helperMethod/SortData";

function DynamicAreaCharts(props) {
    const {updatePatientCardConfimration,addNoteNotification,chosenPatientCardData} = props;
    const auth = useAuth();
    const [linearChartData, setLinearChartData] = React.useState([]);

    const prepareDataForAreaChart = ()=>{
      const allNotesSortedByDates = SortPatientsCardByDates(auth.patientsList);
      let preparedData = [];
      allNotesSortedByDates.forEach(note=>{
        let noteData = note.date.slice(0,10);
        let indexOfDateToFind = preparedData.findIndex(data=>data.date.slice(0,10)==noteData);
        if(indexOfDateToFind==-1){
          let noteData = {date: note.date.slice(0,10), count:1};
          preparedData.push(noteData);
        }else{
          let elementWhichExistInArray =  preparedData[indexOfDateToFind];
          let countNUmber = elementWhichExistInArray.count+1;
          elementWhichExistInArray.count = countNUmber;
        }
      })
      preparedData.length>10 ? setLinearChartData(preparedData.slice(0,10)) : setLinearChartData(preparedData);
    }

    const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        return (
          <div className="custom-tooltip">
            <p className="label" style={{color:"#fff"}}>{`${label}`}</p>
            <p className="intro">{'Added Cards: '+`${payload[0].value}`}</p>
          </div>
        );
      }
    
      return null;
    };
    
    React.useEffect(()=>{
      prepareDataForAreaChart();
    },[])

    React.useEffect(()=>{
      prepareDataForAreaChart();
    },[JSON.stringify(chosenPatientCardData), JSON.stringify(auth.patientsList)])

  return (
    <>
        <ResponsiveContainer width="100%" aspect={3}>
          <AreaChart width={730} height={250} data={linearChartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
              </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{fill:"#fff"}} />
              <YAxis  tick={{fill:"#fff"}} allowDecimals={false}/>
              <CartesianGrid strokeDasharray="1" horizontal="true" vertical="true" stroke='#243240'/>
              <Tooltip content={<CustomTooltip />}/>
              <Area type="monotone" dataKey="count" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
          </AreaChart>
        </ResponsiveContainer>
    </>
  )
}

export default DynamicAreaCharts