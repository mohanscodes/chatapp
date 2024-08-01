import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";


export const get_all_members = createAsyncThunk(
    'chat/get_all_members',
    async (userId, { rejectWithValue, fulfillWithValue }) => {

        try {
            const { data } = await api.get(`/chat/get-all-members/${userId}`, { withCredentials: true })
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 

export const add_friend = createAsyncThunk(
    'chat/add_friend',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/chat/add-friend', info)
            console.log(data)
            // return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 


export const memberReducer = createSlice({
    name: 'product',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        members: [],
        member: '',
        totalMember: 0
    },
    reducers: {

        messageClear: (state, _) => {
            state.errorMessage = ""
            state.successMessage = ""
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(get_all_members.pending, (state, { payload }) => {
                state.loader = true;
            })
            .addCase(get_all_members.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error
            })
            .addCase(get_all_members.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.members = payload.members
                state.successMessage = payload.message
            })

    }

})


export const { messageClear } = memberReducer.actions
export default memberReducer.reducer