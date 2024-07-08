import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    userData: any | null;
    usersData: any[];
    file: any;
}

const initialState: UserState = {
    userData: null,
    usersData: [],
    file: null,
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
        storeFile: (state, action: PayloadAction<any>) => {
            state.file = action.payload;
        },
    },
});

export const { setUserData, setUsersData, storeFile } = userSlice.actions;
export default userSlice.reducer;
