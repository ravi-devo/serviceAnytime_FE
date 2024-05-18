import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllticketsMutation, useGetUserTicketsMutation } from '../slices/ticketSlice/ticketApiSlice';
import { setInitialItem } from '../slices/ticketSlice/ticketReducer';
import { Link } from 'react-router-dom';

const Home = () => {

    const { userInfo } = useSelector((state) => state.auth);
    const { ticketItems } = useSelector((state) => state.ticket);
    const dispatch = useDispatch();
    const [GetMyTickets] = useGetUserTicketsMutation();
    const [GetAllTickets] = useGetAllticketsMutation();
    const token = userInfo.token;

    useEffect(() => {
        const getTickets = async () => {
            if (userInfo.data) {
                if (!userInfo.data.isAdmin) {
                    const res = await GetMyTickets(token).unwrap();
                    dispatch(setInitialItem(res.data));
                } else {
                    const res = await GetAllTickets(token).unwrap();
                    dispatch(setInitialItem(res.data));
                }
            }
        }
        getTickets();
    }, [])
    return (<>
        <div>
            Welcome to homepage!
            {ticketItems.map((e, index) => {
                return <p key={index}><Link to='/updateTicket' state={e}>{e.title}</Link></p>
            })}
            <Link to='/newTicket'><button>New Ticket</button></Link>
        </div>
    </>)
}

export default Home;