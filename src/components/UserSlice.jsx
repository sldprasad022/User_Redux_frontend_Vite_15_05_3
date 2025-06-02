import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const addUser = createAsyncThunk('user/addUser', async (user, { rejectWithValue }) => {
  try
  {
    const response = await axios.post(`${baseUrl}/save`, user);
    return response.data.data;
  }
 catch (err) 
 {
    if (err.response && err.response.data) 
    {
      return rejectWithValue(err.response.data.message || "Something went wrong");
    }
    return rejectWithValue(err.message);
  }
});


export const fetchAllUsers = createAsyncThunk('user/fetchAll',async()=>{
    const response = await axios.get(`${baseUrl}/fetchAll`);
    console.log(response.data);
    return response.data;
})

export const deleteUser = createAsyncThunk('user/deleteUser',async(userId)=>{
    const response = await axios.delete(`${baseUrl}/deleteByUserId/${userId}`);
    return response.data;
})

export const editUser = createAsyncThunk('user/edit',async(userData)=>{
  const userId = userData.get('userId');
  console.log(userId)
  const response = await axios.put(`${baseUrl}/update/${userId}`,userData,{
    headers :{
      'Content-Type':'multipart/form-data'
    }
  });
  return response.data; 
})

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    error: null,
    status: 'idle'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users.push(action.payload);
        state.error = null;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchAllUsers.pending,(state)=>{
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled,(state,action)=>{
        state.status = 'succeeded';
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchAllUsers.rejected,(state,action)=>{
            state.status = 'failed';
            state.error = action.error.message;
      })
      .addCase(deleteUser.pending,(state)=>{
            state.status = 'loading';
            state.error = null;
      })
      .addCase(deleteUser.fulfilled,(state,action)=>{
            state.status = 'succeeded';
            const Id = action.meta.arg;
            state.users = state.users.filter(user=>user.userId !== Id);
            state.error = null;
      })
      .addCase(deleteUser.rejected,(state,action)=>{
            state.status = 'failed';
            state.error = action.error.message;
      })
      .addCase(editUser.pending,(state)=>{
            state.status = 'pending';
            state.error = null;
      })
      .addCase(editUser.fulfilled,(state,action)=>{
            state.status = 'succeeded';
            const updatedUser = action.payload;
            const index = state.users.findIndex(user=>user.userId === updatedUser.userId);
            if (index !== -1)
            {
               state.users[index] = updatedUser;
            }
            state.error = null;
      })
      .addCase(editUser.rejected,(state,action)=>{
          state.status = 'failed';
          state.error = action.error.message;
          state.error = null;
      })
  }
});

export default UserSlice.reducer;
