import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";


export const add_friend = createAsyncThunk(
    'chat/add_friend',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/chat/add-friend', info)
            // console.log(JSON.stringify(data)); // Logging the response data as a string
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 

export const get_my_friends = createAsyncThunk(
    'chat/get_my_friends',
    async (myId, { rejectWithValue, fulfillWithValue }) => {

        try {
            // console.log(myId)
            const { data } = await api.get(`/chat/get-my-friends/${myId}`, { withCredentials: true })
            // console.log(JSON.stringify(data)); // Logging the response data as a string
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const send_message = createAsyncThunk(
    'chat/send_my_message',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post(`/chat/send-my-message/`, info, { withCredentials: true })
            // console.log(info)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 

export const delete_my_msg = createAsyncThunk(
    'chat/delete_my_message',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post(`/chat/delete-my-message/`, info, { withCredentials: true });
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.error('Error deleting message:', error);
            return rejectWithValue(error.response.data);
        }
    }
);
// End Method 


export const chatReducer = createSlice({
    name: 'chat',
    initialState: {
        my_friends: [],
        all_messages: [],
        currentFd: "",
        errorMessage: '',
        successMessage: '',
        deleteMessage_event: '',

    },
    reducers: {

        messageClear: (state, _) => {
            state.errorMessage = ""
            state.successMessage = ""
            state.deleteMessage_event = ""
        },
        updateMessage: (state, { payload }) => {
            state.all_messages = [...state.all_messages, payload]
        },
        clearData: (state, _) => {
            state.my_friends = [];
            state.all_messages = [];
            state.currentFd = "";
            state.errorMessage = '';
            state.successMessage = '';
            state.deleteMessage_event = '';
        }

    },
    extraReducers: (builder) => {

        builder
            .addCase(add_friend.pending, (state, { payload }) => {
                state.loader = true;
            }).addCase(add_friend.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error
            }).addCase(add_friend.fulfilled, (state, { payload }) => {
                state.messages = payload.messages || []
                state.currentFd = payload.currentFd;
                state.all_messages = payload.all_messages;
            })
            .addCase(get_my_friends.fulfilled, (state, { payload }) => {
                state.my_friends = payload.myFriends;
            })
            .addCase(send_message.fulfilled, (state, { payload }) => {
                let tempFriends = state.my_friends
                let index = tempFriends.findIndex(f => f.fdId === payload.message.receverId)

                while (index > 0) {
                    // get my current user friend
                    let temp = tempFriends[index]

                    // set curent user position = to one level below position friend
                    tempFriends[index] = tempFriends[index - 1]

                    // set that one level below position = to my current user friend
                    tempFriends[index - 1] = temp

                    // now i got one postion in my user friend so indrectly decrease a index
                    index--
                }
                state.my_friends = tempFriends;
                state.all_messages = [...state.all_messages, payload.message];
                state.successMessage = 'Message Send Success';
            })
            .addCase(delete_my_msg.fulfilled, (state, { payload }) => {
                state.all_messages = payload.message;
                state.deleteMessage_event = "msgdelete";
            })

    }
})
export const { messageClear, updateMessage ,clearData} = chatReducer.actions
export default chatReducer.reducer