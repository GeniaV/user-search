import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    page: 1
};

const paginationSlice = createSlice({
    name: 'loginSearch',
    initialState,
    reducers: {
        setPageNumber(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
    }
});

export const { setPageNumber } = paginationSlice.actions;

export default paginationSlice.reducer;