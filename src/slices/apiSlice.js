import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
const baseQuery = fetchBaseQuery({ baseUrl: 'https://serviceanytime-be.onrender.com' });

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Ticket', 'User'],
    endpoints: () => ({})
})
