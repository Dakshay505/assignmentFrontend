import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createStudentId, getStudents, updateStudentInfo } from '../Apis/studentAPI';

const initialState = {
    loggedInUserData: null,
    status: 'idle',
    users: {},
    student : null
};
// READ
export const getAllUserAsync : any = createAsyncThunk(
    'getAllUsers',
    async () => {
        try {
            const response: any = await getStudents();
            return response;
        } catch (error:any) {
            if (error.response && (error.response.status === 400 || error.response.status === 404)) {
              console.log(error.response.data.message);
            } else if (error.response && error.response.data) {
              console.log(error.response.data);
            } else {
              console.log(error.toString());
            }
          }
    }
);
export const createStudentIdAsync: any = createAsyncThunk(
    'createStudentIdAsync',
    async (data : {rollNumber : string}) => {
        try {
            const response: any = await createStudentId(data);
            return response;
        } catch (error:any) {
            if (error.response && (error.response.status === 400 || error.response.status === 404)) {
              console.log(error.response.data.message);
            } else if (error.response && error.response.data) {
              console.log(error.response.data);
            } else {
              console.log(error.toString());
            }
          }
    }
);
export const updateStudentInfoAsync: any = createAsyncThunk(
    'updateStudentInfoAsync',
    async (data : {_id : string,rollNumber ?:string;name?:string;email?:string;password?:string;contactNumber?:number;file?:any}) => {
        try {
            const response: any = await updateStudentInfo(data);
            return response;
        } catch (error:any) {
            if (error.response && (error.response.status === 400 || error.response.status === 404)) {
              console.log(error.response.data.message);
            } else if (error.response && error.response.data) {
              console.log(error.response.data);
            } else {
              console.log(error.toString());
            }
          }
    }
);

export const StudentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllUserAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.users= action.payload;
            })
            .addCase(createStudentIdAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createStudentIdAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.student= action.payload;
            })
            .addCase(updateStudentInfoAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateStudentInfoAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.student= action.payload;
            })
    },
});

export default StudentSlice.reducer;
    