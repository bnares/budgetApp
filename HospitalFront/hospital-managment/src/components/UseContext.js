import React from 'react'
import {createContext, useContext} from "react";

const Auth = createContext({});

export const AuthProvider = ({children})=>{
    const [user, setUser] = React.useState(null);
    const [token,setToken] = React.useState("");
    const [error, setError] = React.useState("");
    const [errorLogin, setErrorLogin] = React.useState([]);
    const [patientsList, setPatientsList] = React.useState([]);
    const [hospitalsList, setHospitalsList] = React.useState([]);
    const [choosenPatientGridTableData, setChoosenPatientGridTableData] = React.useState(null);
    const [allRegisteredApplicationWards, setAllRegisteredApplicationWards] = React.useState([]);

    const login = (user)=>{
        
        setUser(user);
        console.log("w login");
        console.log(user);
    }

    const logout = ()=>{
        setUser(null);
        setError("");
        setErrorLogin([]);
        setPatientsList([]);
        setToken("");
        setNewHospitalList([]);
    };


    const setNewToken = (token)=>(
        setToken(token)
    )

    const resetToken = ()=>(
        setToken("")
    )
    
    const resetError = ()=>(
        setError("")
    )

    const setNewErrorMessage = (errorMessage)=>(
        setError(errorMessage)
    )

    const resetErrorLogin= ()=>{
        setErrorLogin([])
    }

    const setNewPatientsList = (newList)=>(
        setPatientsList(newList)
    )

    const getNumberOfPatientsCard = ()=>{
        let count = 0;
        patientsList.forEach(patient => {
           count++;
        });
        return count;
    }

    const setNewHospitalList = (newList)=>(
        setHospitalsList(newList)
    )

    const getNumberOfPatientsNotes = ()=>{
        let count = 0;
        patientsList.forEach(patient => {
            // if(Object.keys(patient.patientCard)!=0){
            //     count++;
            // }
            let notesCount = 0;
            if(patient.patientCard.notes.length>0){
                patient.patientCard.notes.forEach(note =>{
                    notesCount++
                })
                count = count+notesCount;
            }
        });
        return count;
    }
    

    return(
        <Auth.Provider value={{login,logout,setNewToken,resetToken, user, token,error,setError, 
                                setNewErrorMessage,resetError,resetErrorLogin,errorLogin, setErrorLogin,
                                patientsList,setNewPatientsList,getNumberOfPatientsCard,getNumberOfPatientsNotes,
                                hospitalsList,setNewHospitalList,choosenPatientGridTableData, setChoosenPatientGridTableData,
                                allRegisteredApplicationWards, setAllRegisteredApplicationWards}}>
            {children}
        </Auth.Provider>
    )
}

export const useAuth = ()=>{
    return useContext(Auth);
};