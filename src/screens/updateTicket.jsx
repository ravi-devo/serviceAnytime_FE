import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useUpdateTicketMutation } from "../slices/ticketSlice/ticketApiSlice";
import { updateTicket } from "../slices/ticketSlice/ticketReducer";
import { toast } from "react-toastify";

const UpdateTicket = () => {

    const location = useLocation();
    console.log("Location", location)
    const data = location.state;
    const {userInfo} = useSelector((state) => state.auth);
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
    const [UpdateTicketAPI] = useUpdateTicketMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await UpdateTicketAPI({ticketId: data._id, data: {title, requestorEmail: data.requestorEmail, description, status, priority, assignee: assignedTo, assignmentGroup}, token}).unwrap();
            if(res.message === 'Ticket updated successfully'){
                dispatch(updateTicket({ticketId: data._id, response: res.data}));
                navigate('/home');
            }else{
                toast.error(res.message)
            }
        } catch (err) {
            toast.error('Internal server error');
            console.log("Error", err)
        }
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="requestor">Requestor:</label>
                    <input id="requestor" value={data.requestor} disabled />
                    <br /><br />
                    <label htmlFor="requestorEmail">Requestor Email:</label>
                    <input id="requestorEmail" value={data.requestorEmail} disabled />
                    <br /><br />
                    <label htmlFor="title">Title:</label>
                    <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <br /><br />
                    <label htmlFor="description">Description:</label>
                    <input type="text" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <br /><br />
                    <label htmlFor="status">Status: </label>
                    <select id="status" onChange={(e) => setStatus(e.target.value)}>
                        <option defaultValue={status}>{status}</option>
                        {statusFiltered.map((e) => {
                            return <option value={e} key={e}>
                                {e}
                            </option>
                        })}
                    </select>
                    <br /><br />
                    <label htmlFor="priority">Priority</label>
                    <select id="priority" onChange={(e) => setPriority(e.target.value)}>
                        <option defaultValue={priority}>{priority}</option>
                        {priorityFiltered.map((item) => {
                            return <option value={item} key={item}>
                                {item}
                            </option>
                        })}
                    </select>
                    <br /><br />
                    <label htmlFor="assignmentGroup">Assignment Group</label>
                    <select id="assignmentGroup" onChange={(e) => setAssignmentGroup(e.target.value)}>
                        <option defaultValue={assignmentGroup}>{assignmentGroup}</option>
                        {assignmentGroupFiltered.map((item) => {
                            return <option value={item} key={item}>
                                {item}
                            </option>
                        })}
                    </select>
                    <br /><br />
                    <label htmlFor="assignee">Assigned to: </label>
                    <input type="text" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}/>
                    <br /><br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default UpdateTicket;