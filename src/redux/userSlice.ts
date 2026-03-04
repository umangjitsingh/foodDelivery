import {createSlice} from "@reduxjs/toolkit";
import mongoose from "mongoose";

interface UserInterface {
				_id?:mongoose.Types.ObjectId
				name:string,
				email:string,
				password?:string,
				image?:string,
				mobile?:string,
				role?:'User' | 'Delivery Boy' | 'Admin',
				createdAt?:string,
				updatedAt?:string
}

interface IUserSlice{
				userData: UserInterface | null
}

const initialState : IUserSlice= {
				userData:null
}

const userSlice=createSlice({

				name:"user",
				initialState,
				reducers:{
							setUserData:(state,action)=>{
											state.userData=action.payload;
							}
				}
})

export const {setUserData} = userSlice.actions;
export default userSlice.reducer;