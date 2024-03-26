import axios from "axios";
import { loginAPI, getUserAPI, logoutUserAPI, RegisterAPI } from "../../ApiRoutes";


// loginApi for ADMIN
export const userLogin = async (loginData: any) => {
  try {
    const { data } = await axios.post(`${loginAPI}`, loginData, {withCredentials: true});
    return data;
  } catch (error:any) {
    return error.response.data
  }
};
export const RegisterUser = async (registerData: any) => {
  try {
    console.log(registerData);
    const { data } = await axios.post(`${RegisterAPI}`, registerData, {withCredentials: true});
    console.log(data);
    return data;
  } catch (error:any) {
    return error.response.data
  }
};


export const getLoggedInUserData = async () => {
  try {
    const { data } = await axios.get(`${getUserAPI}`, {withCredentials: true});
    console.log(data);
    return data;
  }catch (error:any) {
    if (error.response && (error.response.status === 400 || error.response.status === 404)) {
      console.log(error.response.data.message);
    } else if (error.response && error.response.data) {
      console.log(error.response.data);
    } else {
      console.log(error.toString());
    }
  }
};


// Logout 
export const logoutUser = async () => {
  try {
    const { data } = await axios.get(`${logoutUserAPI}`, {withCredentials: true});
    return data;
  }catch (error:any) {
    if (error.response && (error.response.status === 400 || error.response.status === 404)) {
      console.log(error.response.data.message);
    } else if (error.response && error.response.data) {
      console.log(error.response.data);
    } else {
      console.log(error.toString());
    };
  };
};
