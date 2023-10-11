
export const PrepareRowDataForDataGridTable = (hospitalsList, hospitalTableRow)=>{
    
    for(let i = 0; i<hospitalsList.length; i++){
      let rowData = {id:hospitalsList[i].hospitalId,country:hospitalsList[i].country,city:hospitalsList[i].city,name:hospitalsList[i].name, street:hospitalsList[i].street}
      hospitalTableRow.push(rowData);
  }
  return hospitalsList
  }