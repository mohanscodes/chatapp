import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from 'jwt-decode';
import { socket } from "../../utils/utils";
import { getCookie, deleteCookie } from '../../utils/cookies'; // Adjust the path as needed
import { clearData } from "./chatReducer"; // Import clearData from chatReducer

export const user_login = createAsyncThunk(
    'auth/user_login',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/user-login', info);
            localStorage.setItem('accessToken', data.token);
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const user_register = createAsyncThunk(
    'auth/user_register',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/user-register', info);
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_user_info = createAsyncThunk(
    'auth/get_user_info',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get('/get-user-info');
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const profile_image_upload = createAsyncThunk(
    'auth/profile_image_upload',
    async (image, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/profile-image-upload', image);
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const profile_info_add = createAsyncThunk(
    'auth/profile_info_add',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/profile-info-add', info);
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const password_update = createAsyncThunk(
    'auth/password_update',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/password-update', info);
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async ({ navigate,dispatch }, { rejectWithValue, fulfillWithValue }) => {
        try {
            socket.disconnect();
            const { data } = await api.get('/logout');

            dispatch(clearData());
            localStorage.removeItem('accessToken');
            deleteCookie('accessToken');
            navigate('/login');
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const forgot_password = createAsyncThunk(
    'auth/forgot_password',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/forgot-password', info);
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const reset_password = createAsyncThunk(
    'auth/reset_password',
    async ({ new_password, token }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/reset-password/${token}`, { new_password });
            if (response.status === 201) {
                return { status: 'success', message: response.data.message };
            } else {
                return rejectWithValue({ status: 'error', message: 'Unexpected response' });
            }
        } catch (error) {
            return rejectWithValue({ status: 'error', message: error.response.data.message || 'An error occurred' });
        }
    }
);

export const verifynewuser = createAsyncThunk(
    'auth/verifynewuser',
    async ({ token }, { rejectWithValue }) => {
        try {
            const response = await api.get(`/verifynewuser/${token}`);
            if (response.status === 200) {
                return { status: 'success', message: response.data.message };
            } else {
                return rejectWithValue({ status: 'error', message: 'Unexpected response' });
            }
        } catch (error) {
            return rejectWithValue({
                status: 'error',
                message: (error.response && error.response.data && error.response.data.message) || 'An error occurred'
            });
        }
    }
);

const returnRole = (token) => {
    if (token) {
        const decodeToken = jwtDecode(token);
        const expireTime = new Date(decodeToken.exp * 1000);
        if (new Date() > expireTime) {
            localStorage.removeItem('accessToken');
            deleteCookie('accessToken');
            return '';
        } else {
            return decodeToken.role;
        }
    } else {
        return '';
    }
};

export const authReducer = createSlice({
    name: 'auth',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        userInfo: '',
        role: returnRole(localStorage.getItem('accessToken')),
        token: localStorage.getItem('accessToken')
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
            state.successMessage = "";
        },
        dataClear: (state) => {
            state.role = "";
            state.token = "";
            state.userInfo = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(user_register.pending, (state) => {
                state.loader = true;
            })
            .addCase(user_register.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            })
            .addCase(user_register.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
            })
            .addCase(user_login.pending, (state) => {
                state.loader = true;
            })
            .addCase(user_login.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            })
            .addCase(user_login.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
                state.token = payload.token;
                state.role = returnRole(payload.token);
            })
            .addCase(get_user_info.pending, (state) => {
                state.loader = true;
            })
            .addCase(get_user_info.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            })
            .addCase(get_user_info.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.userInfo = payload.userInfo;
            })
            .addCase(profile_image_upload.pending, (state) => {
                state.loader = true;
            })
            .addCase(profile_image_upload.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            })
            .addCase(profile_image_upload.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.userInfo = payload.userInfo;
                state.successMessage = payload.message;
            })
            .addCase(profile_info_add.pending, (state) => {
                state.loader = true;
            })
            .addCase(profile_info_add.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            })
            .addCase(profile_info_add.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.userInfo = payload.userInfo;
                state.successMessage = payload.message;
            })
            .addCase(password_update.pending, (state) => {
                state.loader = true;
            })
            .addCase(password_update.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            })
            .addCase(password_update.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
            })
            .addCase(forgot_password.pending, (state) => {
                state.loader = true;
            })
            .addCase(forgot_password.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            })
            .addCase(forgot_password.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
            })
            .addCase(logout.fulfilled, (state) => {
                state.role = "";
                state.token = "";
                state.userInfo = "";
            });
    }
});

export const { messageClear, dataClear } = authReducer.actions;
export default authReducer.reducer;
