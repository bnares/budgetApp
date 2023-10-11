import React from 'react'
import { ResponsivePie } from '@nivo/pie'

const NivoPieChart = ({doctorsData}) =>{
    const [pieData, setPieData] = React.useState([]);
    const [displayChart, setDisplayChart] = React.useState(false);

    const prepareDataForPieChart = ()=>{
        var allNotesNumbers = 0;
        var data = [];
        var pieChartColors = ["hsl(114, 70%, 50%)","hsl(77, 70%, 50%)","hsl(277, 70%, 50%)","hsl(81, 70%, 50%)","hsl(74, 70%, 50%)","hsl(90, 70%, 50%)", "hsl(241, 70%, 50%)",
        "hsl(226, 70%, 50%)","hsl(307, 70%, 50%)","hsl(160, 70%, 50%)","hsl(176, 70%, 50%)"];
        var count = 0;
        doctorsData.notesNumbersDtos.forEach(hospitalNotes=>{
          allNotesNumbers+=hospitalNotes.occuranceNumber;
        })
    
        doctorsData.notesNumbersDtos.forEach(hospitalNotes=>{
          var dataToFeedPie = {id:null, lable:'', value:0, color:''};
          if((hospitalNotes.occuranceNumber/allNotesNumbers)*100<5){
            if(data.filter(x=>x.lable=='Inne').length==0){
                var smallAmount = {id:'inne', lable:'Inne', value:hospitalNotes.occuranceNumber, color:pieChartColors[count]}
                data.push(smallAmount);
            }else{
                var indexOfOtherLable = data.findIndex(x=>x.lable=="Inne");
                var otherLableData = data[indexOfOtherLable];
                otherLableData.value +=hospitalNotes.occuranceNumber;
            }
            
          }else{
            dataToFeedPie.lable = hospitalNotes.hospitalName;
            dataToFeedPie.value = hospitalNotes.occuranceNumber
            dataToFeedPie.color = pieChartColors[count];
            dataToFeedPie.id = hospitalNotes.hospitalName;
            data.push(dataToFeedPie);
          }
          
        })
        setPieData(data);
        setDisplayChart(true);
      }

      React.useEffect(()=>{
        prepareDataForPieChart();
      },[])

  return (
    <>
    {displayChart && 
    <ResponsivePie
    data={pieData}
    theme={{
        tooltip:{
            color:'black'
        }
    }}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    colors={{ scheme: 'set1' }}
    borderWidth={1}
    borderColor={{
        from: 'color',
        modifiers: [
            [
                'darker',
                0.2
            ]
        ]
    }}
    enableArcLinkLabels={true}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#dfdfdf"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: 'color' }}
    enableArcLabels={false}
    arcLabelsSkipAngle={10}
    arcLinkLabelsDiagonalLength={4}
    arcLinkLabelsStraightLength={7}
    arcLabelsTextColor={{
        from: 'color',
        modifiers: [
            [
                'darker',
                2
            ]
        ]
    }}
    defs={[
        {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true
        },
        {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
        }
    ]}
    fill={[
        {
            match: {
                id: 'ruby'
            },
            id: 'dots'
        },
        {
            match: {
                id: 'c'
            },
            id: 'dots'
        },
        {
            match: {
                id: 'go'
            },
            id: 'dots'
        },
        {
            match: {
                id: 'python'
            },
            id: 'dots'
        },
        {
            match: {
                id: 'scala'
            },
            id: 'lines'
        },
        {
            match: {
                id: 'lisp'
            },
            id: 'lines'
        },
        {
            match: {
                id: 'elixir'
            },
            id: 'lines'
        },
        {
            match: {
                id: 'javascript'
            },
            id: 'lines'
        }
    ]}
    legends={[]}
/>}
    </>
)
}
export default NivoPieChart