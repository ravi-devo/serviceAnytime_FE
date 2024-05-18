import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/userSlice/authReducer";
import { apiSlice } from "./slices/apiSlice";
import ticketReducer from "./slices/ticketSlice/ticketReducer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        ticket: ticketReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

export default store;