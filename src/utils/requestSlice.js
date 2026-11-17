import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "requests",
    initialState: null,
    reducers: {
        addRequests: (state, action) => {
            return action.payload;
        },

        removeRequest: (state, action) => {
            const res = state.filter((req) => req._id !== action.payload);
            return res;
        },

        removeRequests: () => null,
    },
});

export const { addRequests, removeRequests, removeRequest } =
    requestSlice.actions;

export default requestSlice.reducer;
