import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useUpdateTicketMutation } from "../slices/ticketSlice/ticketApiSlice";
import { updateTicket } from "../slices/ticketSlice/ticketReducer";
import { toast } from "react-toastify";
import Header from "../components/navBar";
import { Button, Form, Row, Col } from 'react-bootstrap';
import Loader from "../components/loader";

const UpdateTicket = () => {

    const location = useLocation();
    console.log("Location", location)
    const data = location.state;
    const { userInfo } = useSelector((state) => state.auth);
    const [title, setTitle] = useState(data.title);
    const [description, setDescription] = useState(data.description);
    const [status, setStatus] = useState(data.status);
    const statusOptions = ['Open', 'In-Progress', 'Resolved'];
    const statusFiltered = statusOptions.filter(e => e != status);
    const [priority, setPriority] = useState(data.priority);
    const priorityOptions = ['Low', 'Medium', 'High'];
    const priorityFiltered = priorityOptions.filter(e => e != priority);
    const [assignmentGroup, setAssignmentGroup] = useState(data.assignmentGroup);
    const assignmentGroupOptions = ['General-Support', 'Identity-Access-Management', 'HR-Operations', 'End-User-Support'];
    const assignmentGroupFiltered = assignmentGroupOptions.filter(e => e != assignmentGroup);
    const [assignedTo, setAssignedTo] = useState(data.assignee);
    const token = userInfo.token;
    const [UpdateTicketAPI, {isLoading}] = useUpdateTicketMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await UpdateTicketAPI({ ticketId: data._id, data: { title, requestorEmail: data.requestorEmail, description, status, priority, assignee: assignedTo, assignmentGroup }, token }).unwrap();
            if (res.message === 'Ticket updated successfully') {
                dispatch(updateTicket({ ticketId: data._id, response: res.data }));
                navigate('/home');
            } else {
                toast.error(res.message)
            }
        } catch (err) {
            toast.error('Internal server error');
            console.log("Error", err)
        }
    }

    const handleCancel = () => {
        navigate('/home');
    }

    return (
        <>
            <div>
                <Header />
                <div className="d-flex justify-content-between my-2">
                    <p style={{ fontWeight: 'bold' }}>View/Update the ticket</p>
                    <div>
                        <Button className="mx-2" style={{ backgroundColor: '#533BBF' }} onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button style={{ backgroundColor: '#533BBF' }} onClick={handleSubmit}>
                            Update
                        </Button>
                    </div>
                </div>
                <div className="my-2">
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group className="my-2 col-md-10">
                                    <Form.Label htmlFor="requestor">Requestor</Form.Label>
                                    <Form.Control id="requestor" value={data.requestor} disabled />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="my-2 col-md-10">
                                    <Form.Label htmlFor="requestorEmail">Requestor Email</Form.Label>
                                    <Form.Control id="requestorEmail" value={data.requestorEmail} disabled />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="my-2 col-md-10">
                                    <Form.Label htmlFor="status">Status</Form.Label>
                                    <Form.Select id="status" onChange={(e) => setStatus(e.target.value)}>
                                        <option defaultValue={status}>{status}</option>
                                        {statusFiltered.map((e) => {
                                            return <option value={e} key={e}>
                                                {e}
                                            </option>
                                        })}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="my-2 col-md-10">
                                    <Form.Label htmlFor="priority">Priority</Form.Label>
                                    <Form.Select id="priority" onChange={(e) => setPriority(e.target.value)}>
                                        <option defaultValue={priority}>{priority}</option>
                                        {priorityFiltered.map((item) => {
                                            return <option value={item} key={item}>
                                                {item}
                                            </option>
                                        })}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col className="mb-5">
                                <Form.Group className="my-2 col-md-10">
                                    <Form.Label htmlFor="assignmentGroup">Assignment Group</Form.Label>
                                    <Form.Select id="assignmentGroup" onChange={(e) => setAssignmentGroup(e.target.value)}>
                                        <option defaultValue={assignmentGroup}>{assignmentGroup}</option>
                                        {assignmentGroupFiltered.map((item) => {
                                            return <option value={item} key={item}>
                                                {item}
                                            </option>
                                        })}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="my-2 col-md-10">
                                    <Form.Label htmlFor="assignee">Assigned to: </Form.Label>
                                    <Form.Control type="text" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-4 col-lg-11">
                            <Form.Label htmlFor="title">Short Description</Form.Label>
                            <Form.Control type="text" placeholder="Short Description" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="my-2 col-lg-11">
                            <Form.Label htmlFor="description">Description</Form.Label>
                            <Form.Control as='textarea' rows={3} type="text" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                    </Form>
                </div>
                {isLoading && <Loader />}
            </div>
        </>
    )
}

export default UpdateTicket;