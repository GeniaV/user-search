import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    loginName: ' '
};

const loginSearchSlice = createSlice({
    name: 'loginSearch',
    initialState,
    reducers: {
        sendLoginForSearching(state, action: PayloadAction<string>) {
            state.loginName = action.payload;
        },
    }
});

export const { sendLoginForSearching } = loginSearchSlice.actions;

export default loginSearchSlice.reducer;