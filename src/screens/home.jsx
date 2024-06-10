import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllticketsMutation, useGetUserTicketsMutation } from '../slices/ticketSlice/ticketApiSlice';
import { setInitialItem } from '../slices/ticketSlice/ticketReducer';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/navBar';
import { Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import Loader from '../components/loader';

const Home = () => {

    const { userInfo } = useSelector((state) => state.auth);
    const { ticketItems } = useSelector((state) => state.ticket);
    const dispatch = useDispatch();
    const [GetMyTickets] = useGetUserTicketsMutation();
    const [GetAllTickets, {isLoading}] = useGetAllticketsMutation();
    const token = userInfo.token;
    const navigate = useNavigate();

    const goToNewTicket = () => {
        navigate('/newTicket');
    }

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
            <Header />
            <div className='my-2'>
                <div className="d-flex justify-content-between">
                    {userInfo.data.isAdmin ? <p style={{fontWeight: 'bold'}}>All Tickets</p> : <p style={{fontWeight: 'bold'}}>My Tickets</p>}
                    <Button style={{ backgroundColor: '#533BBF' }} onClick={goToNewTicket}>Create Ticket</Button>
                </div>
                {ticketItems.length ? <div className='my-2'>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Requestor</th>
                                <th>Short Description</th>
                                <th>Status</th>
                                <th>Priority</th>
                                <th>Assignment Group</th>
                                <th>Assigned to</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ticketItems.map((e, index) => {
                                return <tr key={index}>
                                    <td><Link to='/updateTicket' state={e}>{index + 1}</Link></td>
                                    <td>{e.requestor}</td>
                                    <td>{e.title}</td>
                                    <td>{e.status}</td>
                                    <td>{e.priority}</td>
                                    <td>{e.assignmentGroup}</td>
                                    <td>{e.assignee}</td>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                    {isLoading && <Loader />}
                </div> : <p>You do not have any tickets created, please create if you have any issues</p>}
            </div>
        </div>
    </>)
}

export default Home;