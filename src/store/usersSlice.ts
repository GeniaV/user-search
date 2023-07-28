import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUsers } from "../utils/types";

const initialState: IUsers = {
    total_count: 0,
    incomplete_results: true,
    items: []
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUsersGitHub(state, action: PayloadAction<IUsers>) {
            state.total_count = action.payload.total_count;
            state.incomplete_results = action.payload.incomplete_results;
            state.items = action.payload.items;
        },
    }
});

export const { getUsersGitHub } = usersSlice.actions;

export default usersSlice.reducer;
