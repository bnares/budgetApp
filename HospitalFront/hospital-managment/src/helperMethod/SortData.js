import { convertLength } from "@mui/material/styles/cssUtils";

export const sortByDates = (patients)=>{
    let theNewestPatientCardNote =[patients];
    
    patients.forEach(patient => {
        let patientId = patient.id
        let patientName = patient.name;
        let patientSurname = patient.surname;
        let patientsNotes = patient.patientCard.notes
        if(patientsNotes.length>0){
            let sortedPatientNotes = patientsNotes.sort(
                (noteOne,noteTwo)=>Number(new Date(noteTwo.date))-Number(new Date(noteOne.date))
            )
            if(Number(new Date(sortedPatientNotes[0].date))>Number(new Date(theNewestPatientCardNote[0].date))){
                theNewestPatientCardNote = [{}];
                theNewestPatientCardNote[0].date = sortedPatientNotes;
                theNewestPatientCardNote[0].name = patientName;
                theNewestPatientCardNote[0].surname = patientSurname;
                theNewestPatientCardNote[0].id = patientId;
            }
        } 
    });
    
}

export const SortPatientsCardByDatesAndGetTheNewest = (patients)=>{
    let todayDate = new Date().toLocaleDateString("pl-PL",{day:"2-digit", month:"2-digit", year:'numeric'});
    let theNewestNoteOfEachPatient = [];
    patients.forEach(patient=>{
        let patientNotes = patient.patientCard.notes;
        if(patientNotes.length>0){
            let sortedNotes = patientNotes.sort((noteOne,noteTwo)=>(Number(new Date(noteTwo.date))-Number(new Date(noteOne.date))))
            theNewestNoteOfEachPatient.push({...sortedNotes[0], name:patient.name, surname:patient.surname, id:patient.id});
        }
    })
    let sortAllNewstPatientDatesByDate = theNewestNoteOfEachPatient.sort((noteOfPatientOne, noteOfPatientTwo)=>(Number(new Date(noteOfPatientTwo.date))-Number(new Date(noteOfPatientOne.date))));
    return sortAllNewstPatientDatesByDate;
}

export const SortPatientsCardByDates = (patientsList)=>{
    let test = patientsList;
    let notesOfEachPatient = [];
    patientsList.forEach(patient=>{
        let patientNotes = patient.patientCard.notes;
        if(patientNotes.length>0){
            let sortedNotes = patientNotes.sort((noteOne,noteTwo)=>(Number(new Date(noteTwo.date))-Number(new Date(noteOne.date))))
            sortedNotes.forEach(notes=>{
                notesOfEachPatient.push({...notes, name:patient.name, surname:patient.surname, patientId:patient.id, sortedNotes:sortedNotes});
            })
        }
    })
    let sortAllNewstPatientDatesByDate = notesOfEachPatient.sort((noteOfPatientOne, noteOfPatientTwo)=>(Number(new Date(noteOfPatientTwo.date))-Number(new Date(noteOfPatientOne.date))));
    return sortAllNewstPatientDatesByDate;
}


export const PatientsCardSortedByDates = (patientCard)=>{
    let notesOfEachPatient = [];
        if(patientCard.notes.length>0){
            let sortedNotes = patientCard.notes.sort((noteOne,noteTwo)=>(Number(new Date(noteTwo.date))-Number(new Date(noteOne.date))))
            sortedNotes.forEach(notes=>{
                notesOfEachPatient.push({...notes});
            })
        }
    let sortAllNewstPatientDatesByDate = notesOfEachPatient.sort((noteOfPatientOne, noteOfPatientTwo)=>(Number(new Date(noteOfPatientTwo.date))-Number(new Date(noteOfPatientOne.date))));
    return sortAllNewstPatientDatesByDate;
}