import axios from "axios";
import { createStudentIdAPI, getAllStudentsAPI, updateStudentInfoAPI } from "../../ApiRoutes";

// loginApi for ADMIN
export const getStudents = async () => {
  try {
    const { data } = await axios.get(`${getAllStudentsAPI}`, {withCredentials: true});
    return data;
  } catch (error:any) {
    return error.response.data
  }
};
export const createStudentId = async (userData : {rollNumber : string}) => {
  try {
    const { data } = await axios.post(`${createStudentIdAPI}`,userData,{withCredentials: true});
    return data;
  } catch (error:any) {
    return error.response.data;
  }
};
export const updateStudentInfo = async (userData : {_id : string ;rollNumber ?: string , name ?: string ,email ?:string , contactNumber ?: number;file?:any}) => {
  try {
    const { data } = await axios.patch(`${updateStudentInfoAPI}`,userData,{withCredentials: true});
    return data;
  } catch (error:any) {
    return error.response.data
  };
};
