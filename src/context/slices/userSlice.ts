import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    userData: any | null;
    usersData: any[];
}

const initialState: UserState = {
    userData: null,
    usersData: [],
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<any | null>) => {
            state.userData = action.payload;
        },
        setUsersData: (state, action: PayloadAction<any[]>) => {
            state.usersData = action.payload;
        },
    },
});

export const { setUserData, setUsersData } = userSlice.actions;
export default userSlice.reducer;
