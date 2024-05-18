import {apiSlice} from '../apiSlice';

const TICKETS_ROUTES = '/api/tickets';

export const ticketApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserTickets: builder.mutation({
            query: (token) => ({
                url: `${TICKETS_ROUTES}/currentUser`,
                method: 'GET',
                headers: {'Authorization': `Bearer ${token}`}
            })
        }),
        getAlltickets: builder.mutation({
            query: (token) => ({
                url: `${TICKETS_ROUTES}/allTickets`,
                method: 'GET',
                headers: {'Authorization': `Bearer ${token}`}
            })
        }),
        createTicket: builder.mutation({
            query: (args) => {
                const { data, token } = args;
                return {
                    url: `${TICKETS_ROUTES}/createTicket`,
                    method: 'POST',
                    headers: {'Authorization': `Bearer ${token}`},
                    body: data
                }
            }
        }),
        updateTicket: builder.mutation({
            query: (args) => {
                const { token, data, ticketId } = args;
                return {
                    url: `${TICKETS_ROUTES}/${ticketId}`,
                    method: 'PUT',
                    headers: {'Authorization': `Bearer ${token}`},
                    body: data
                }
            }
        })
    })
});

export const { 
    useGetUserTicketsMutation, 
    useGetAllticketsMutation, 
    useCreateTicketMutation, 
    useUpdateTicketMutation 
} = ticketApiSlice;