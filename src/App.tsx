import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast'
import Login from "./pages/Login";
import { ProtectedRoute } from "./protectedRoute/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import StudentDetails from "./pages/StudentDetails";
import UserForm from "./pages/updateStudentForm";
import Header from "./pages/Header";

export default function App() {

  return (
    <>
    <BrowserRouter>
        <Toaster
            position="top-center"
            reverseOrder={false}
          />
          <Header/>
        <Routes>
          
          <Route path="/" element={
          <ProtectedRoute> 
            <StudentDetails/>
          </ProtectedRoute>}/>

          <Route path="/dashboard" element={
          <ProtectedRoute>
             <Dashboard/>
          </ProtectedRoute>}/>

          <Route path="/updateStudent" element={
          <ProtectedRoute>
             <UserForm/>
          </ProtectedRoute>
        }/>


          <Route path="/login" element ={<Login/>} />
          <Route path="/register" element ={<Register/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}