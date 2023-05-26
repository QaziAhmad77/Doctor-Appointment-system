import React from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes({children}) {
    if(localStorage.getItem("token")){
        return children;
    }else{
        return <Navigate to="/login" />
    }
}

