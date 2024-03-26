import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../common/Loader";
import { getLoggedInUserDataAsync, getUserLoginAsync } from "../redux/slices/authSlice";
import {Navigate } from 'react-router-dom';
import toast from "react-hot-toast";
import XCircle from "../assets/XCircle.svg"
export default function Login() {
    const dispatch = useDispatch();
    
    const [errorMessage, setErrorMessage] = useState("");
    const [loginData , setLoginData] = useState({
        email : "",
        password : ""
    });
    const loggedInUserData = useSelector((state: any) => state.user.loggedInUserData);
    const loaderStatus = useSelector((state: any) => state.user.status);
    useEffect(() => {
        dispatch(getLoggedInUserDataAsync());
    },[dispatch])
    return (
      <>
      {loggedInUserData && loggedInUserData.user?.role === "teacher" && (
        <Navigate to="/dashboard" replace={true}></Navigate>
      )}
      {loggedInUserData && loggedInUserData.user?.role === "student" && (
        <Navigate to="/" replace={true}></Navigate>
      )}
      {loaderStatus === "loading" ? <Loader/> : 
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={(e)=>{
                e.preventDefault();
                dispatch(getUserLoginAsync(loginData)).then((res: any) => {
                    if (res.payload.success) {
                      toast.success(res.payload.message);
                    } else {
                      toast.error(res.payload.message);
                    }
                    if (res.payload.success) {
                      setErrorMessage("");
                    } else {
                      setErrorMessage(res.payload.message);
                    }
                    dispatch(getLoggedInUserDataAsync());
                  });
            }}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address / Roll Number
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    value={loginData.email}
                    required
                    onChange={(e)=>setLoginData({...loginData , email : e.target.value})}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    value={loginData.password}
                    type="password"
                    required
                    onChange={(e)=>setLoginData({...loginData , password : e.target.value})}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="text-sm">
                  <a href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Not having an Account?
                  </a>
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

          {errorMessage !== "" && (
              <div className="flex items-center mt-2 gap-[6px]">
                <div>
                  <img src={XCircle} className="w-[14px] h-[14px]" alt="" />
                </div>
                <p className="text-xs font-medium text-[#E23F3F]">
                  {errorMessage}
                </p>
              </div>
            )}
          </div>
        </div>
        }
      </>
    )
  }
  