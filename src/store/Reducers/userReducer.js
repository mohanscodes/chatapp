import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";


export const get_user_request = createAsyncThunk(
    'user/get_user_request',
    async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {

        try {
            const { data } = await api.get(`/request-user-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, { withCredentials: true })
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }

    }
)
// End Method 

export const get_user = createAsyncThunk(
    'user/get_user',
    async (userId, { rejectWithValue, fulfillWithValue }) => {

        try {

            const { data } = await api.get(`/get-user/${userId}`, { withCredentials: true })
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 

export const user_status_update = createAsyncThunk(
    'user/user_status_update',
    async (info, { rejectWithValue, fulfillWithValue }) => {

        try {
            const { data } = await api.post(`/user-status-update`, info, { withCredentials: true })
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 

export const get_active_users = createAsyncThunk(
    'user/get_active_users',
    async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {

        try {

            const { data } = await api.get(`/get-users?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, { withCredentials: true })

            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }

    }
)
// End Method 

export const get_deactive_users = createAsyncThunk(
    'user/get_deactive_users',
    async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {

        try {

            const { data } = await api.get(`/get-deactive-users?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, { withCredentials: true })

            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 

export const create_stripe_connect_account = createAsyncThunk(
    'user/create_stripe_connect_account',
    async () => {
        try {
            const { data: { url: stripeConnectUrl } } = await api.get(`/payment/create-stripe-connect-account`, { withCredentials: true })
            window.location.href = stripeConnectUrl
        } catch (error) {
            // console.log(error.response.data) 
        }
    }
)
// End Method 

export const active_stripe_connect_account = createAsyncThunk(
    'user/active_stripe_connect_account',
    async (activeCode, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put(`/payment/active-stripe-connect-account/${activeCode}`, {}, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data) 
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 

export const userReducer = createSlice({
    name: 'user',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        users: [],
        user: {},
        totalUser: 0
    },
    reducers: {

        messageClear: (state, _) => {
            state.errorMessage = ""
            state.successMessage = ""
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(get_user_request.fulfilled, (state, { payload }) => {
                state.users = payload.users;
                state.totalUser = payload.totalUser;
            })
            .addCase(get_user.fulfilled, (state, { payload }) => {
                state.user = payload.user;
            })

            .addCase(user_status_update.pending, (state, { payload }) => {
                state.loader = true;
            })
            .addCase(user_status_update.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error
            })
            .addCase(user_status_update.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.user = payload.user;
                state.successMessage = payload.message
            })
            .addCase(get_active_users.fulfilled, (state, { payload }) => {
                state.users = payload.users;
                state.totalUser = payload.totalUser;
            })
            
            .addCase(get_deactive_users.fulfilled, (state, { payload }) => {
                state.users = payload.users;
                state.totalUser = payload.totalUser;
            }).addCase(active_stripe_connect_account.pending, (state, { payload }) => {
                state.loader = true;
            })
            .addCase(active_stripe_connect_account.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.message;
            })
            .addCase(active_stripe_connect_account.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
            })


    }

})

export const { messageClear } = userReducer.actions
export default userReducer.reducer