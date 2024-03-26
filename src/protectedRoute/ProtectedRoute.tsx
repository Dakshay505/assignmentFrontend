import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { Navigate } from "react-router-dom";
import { getLoggedInUserDataAsync } from "../redux/slices/authSlice";
import {useEffect} from 'react'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();
    const user = useSelector((state:any) => state.user.loggedInUserData);
    useEffect(() => {
        dispatch(getLoggedInUserDataAsync());
    },[dispatch])
    // console.log("user data",user);
    if (!user) {
        return <Navigate to="/login" />;
    }
    if(user.role === "teacher"){
        return <Navigate to = "/dashboard"/>;
    }else if(user.role === "student"){
        return <Navigate to = "/"/>
    }

    return <>{children}</>;
}