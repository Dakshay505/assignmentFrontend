import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RegisterUser, getLoggedInUserData, logoutUser, userLogin } from '../Apis/authAPI';


const initialState = {
    loggedInUserData: null,
    status: 'idle',
    isAuthenticated: false,
    user: null
};
// READ
export const getUserLoginAsync: any = createAsyncThunk(
    'loginUser',
    async (data) => {
        try {
            const response: any = await userLogin(data);
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
export const RegisterUserAsync: any = createAsyncThunk(
    'RegisterUserAsync',
    async (data) => {
        try {
            const response: any = await RegisterUser(data);
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
// READ
export const getLoggedInUserDataAsync: any = createAsyncThunk(
    'getLoggedInUserDataLogin',
    async () => {
        try {
            const response: any = await getLoggedInUserData();
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

// LOGOUT
export const logoutUserAsync: any = createAsyncThunk(
    'getUserLogout',
    async () => {
        try {
            const response: any = await logoutUser();
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


export const LoginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLoggedInUserDataAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getLoggedInUserDataAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.loggedInUserData =  action.payload;
                state.user= action.payload;
                state.isAuthenticated=true;
            })
            .addCase(getUserLoginAsync.pending, (state) => {
                state.status = 'loading';

            })
            .addCase(getUserLoginAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.loggedInUserData =  action.payload;
                state.user= action.payload;
                state.isAuthenticated=true;
            })
            .addCase(RegisterUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(RegisterUserAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.loggedInUserData =  action.payload;
                state.user= action.payload;
                state.isAuthenticated=true;
            })
            .addCase(logoutUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logoutUserAsync.fulfilled, function (state: any) {
                state.status = 'idle';
                state.loggedInUserData = null;
            })
    },
});

export default LoginSlice.reducer;
    