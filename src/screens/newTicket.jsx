import { useState } from "react";
import { useCreateTicketMutation } from "../slices/ticketSlice/ticketApiSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createTicket } from "../slices/ticketSlice/ticketReducer";
import { useNavigate } from "react-router-dom";

const NewTicket = () => {

    const {userInfo} = useSelector((state) => state.auth);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignmentGroup, setAssignmentGroup] = useState('');
    const [CreateTicket] = useCreateTicketMutation();
    const token = userInfo.token;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        if(title.trim() != '' || description.trim() != ''){
            try {
                const res = await CreateTicket({token: token, data: {title, description, assignmentGroup}}).unwrap();
                console.log("Response", res.data)
                if(res.message === 'Ticket logged successfully'){
                    console.log('Create Ticket', res.data)
                    dispatch(createTicket(res.data));
                    navigate('/home')
                }else{
                    console.log("Response is not successful")
                }
            } catch (err) {
                toast.error('Internal server error');
            }
        }else{
            toast.error('Title or Description cannot be empty')
        }
    }

    return (
        <>
            <div>
                Create a ticket
                <br /><br />
                <form onSubmit={submitHandler}>
                    <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <br /><br />
                    <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <br /><br />
                    <label htmlFor="assignmentGroup">Assignment Group</label>
                    <select id="assignmentGroup" value={assignmentGroup} onChange={(e) => setAssignmentGroup(e.target.value)}>
                        <option value="" disabled>Choose an option</option>
                        <option value="General-Support">General Support</option>
                        <option value="Identity-Access-Management">Identity Access Management</option>
                        <option value="End-User-Support">End User Support</option>
                        <option value="HR-Operations">HR Operations</option>
                    </select>
                    {assignmentGroup && <p>You selected: {assignmentGroup}</p>}
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default NewTicket;