import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ticketItems: []
}

const ticketReducer = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        setInitialItem: (state, action) => {
            state.ticketItems = action.payload;
        },
        createTicket: (state, action) => {
            state.ticketItems.push(action.payload);
        },
        updateTicket: (state, action) => {
            const {ticketId, response} = action.payload;
            state.ticketItems = state.ticketItems.filter((item) => item._id != ticketId);
            state.ticketItems.push(response);
        }
    }
});

export const { setInitialItem, createTicket, updateTicket } = ticketReducer.actions;

export default ticketReducer.reducer;