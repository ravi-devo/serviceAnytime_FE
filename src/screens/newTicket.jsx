import { useState } from "react";
import { useCreateTicketMutation } from "../slices/ticketSlice/ticketApiSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createTicket } from "../slices/ticketSlice/ticketReducer";
import { useNavigate } from "react-router-dom";
import Header from "../components/navBar";
import { Form, Button } from 'react-bootstrap';
import Loader from "../components/loader";

const NewTicket = () => {

    const { userInfo } = useSelector((state) => state.auth);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignmentGroup, setAssignmentGroup] = useState('');
    const [CreateTicket, {isLoading}] = useCreateTicketMutation();
    const token = userInfo.token;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (title.trim() != '' || description.trim() != '') {
            try {
                const res = await CreateTicket({ token: token, data: { title, description, assignmentGroup } }).unwrap();
                console.log("Response", res.data)
                if (res.message === 'Ticket logged successfully') {
                    console.log('Create Ticket', res.data)
                    dispatch(createTicket(res.data));
                    navigate('/home')
                } else {
                    console.log("Response is not successful")
                }
            } catch (err) {
                toast.error('Internal server error');
            }
        } else {
            toast.error('Title or Description cannot be empty')
        }
    }

    const handleCancel = () => {
        navigate('/home');
    }

    return (
        <>
            <div>
                <Header />
                <div>
                    <div className="my-2 d-flex justify-content-between">
                        <p style={{ fontWeight: 'bold' }}>Create a ticket</p>
                        <div>
                            <Button className="mx-2" onClick={handleCancel} style={{backgroundColor: '#533BBF'}}>Cancel</Button>
                            <Button onClick={submitHandler} style={{backgroundColor: '#533BBF'}}>Submit</Button>
                        </div>
                    </div>
                    <Form>
                        <Form.Group className="my-2">
                            <Form.Label>Short Description</Form.Label>
                            <Form.Control type="text" placeholder="Short Description" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as='textarea' rows={3} size="md" type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="col-lg-4 my-2">
                            <Form.Label htmlFor="assignmentGroup">Assignment Group</Form.Label>
                            <Form.Select id="assignmentGroup" value={assignmentGroup} onChange={(e) => setAssignmentGroup(e.target.value)}>
                                <option value="" disabled>Choose an option</option>
                                <option value="General-Support">General Support</option>
                                <option value="Identity-Access-Management">Identity Access Management</option>
                                <option value="End-User-Support">End User Support</option>
                                <option value="HR-Operations">HR Operations</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </div>
                {isLoading && <Loader />}
            </div>
        </>
    )
}

export default NewTicket;