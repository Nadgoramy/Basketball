import { createSlice } from "@reduxjs/toolkit";

const initialState={
    message:""
}
const errorSlice = createSlice({
    name:'error',
    initialState: initialState,
    reducers:{
        setErrorMessage:(state, action)=>{
            state.message = action.payload;
        },
        clearErrorMessage:(state)=>{
            state.message = "";
        }
        
}})

//export const {setErrorMessage, clearErrorMessage} = errorSlice.actions
export const errorActions = { ...errorSlice.actions };

export default errorSlice.reducer