import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route,useNavigate } from 'react-router-dom';
import Auth from "./components/UseContext";
import axios from "axios";
import AxiosInterceptorsNavigate from "./appi/Interceptors";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        
        <App />
    </BrowserRouter>
        
  
);


