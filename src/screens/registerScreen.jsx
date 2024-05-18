import { useState } from "react";
import { useRegisterMutation } from "../slices/userSlice/userApiSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const RegisterScreen = () => {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isAdmin, setAdmin] = useState(true);

    const [register] = useRegisterMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(!name) return toast.error("Name is required");
            if(!username) return toast.error("Email is required");
            if(!password) return toast.error("Password is required");
            if (!confirmPassword) return toast.error("confirmPassword is required");
            if (password.length < 6 || confirmPassword.length < 6) return toast.error("Password/Confirm Password should be atleast 6 characters.");
            if (password !== confirmPassword) return toast.error("Password and confirm password doesn't match.");
            const res = await register({name, username, password, isAdmin}).unwrap();
            if(res.message === 'User created successfully'){
                dispatch({...res});
                navigate('/home');
                console.log('User created successfully')
            }
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

    const handleOptionChange = (event) => {
        setAdmin(event.target.value === 'true');
      };

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="username">Email</label>
                        <input type="email" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <br />
                    <div>
                        Are you a admin:
                        <label>
                            <input
                                type="radio"
                                value="true"
                                checked={isAdmin === true}
                                onChange={handleOptionChange}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="false"
                                checked={isAdmin === false}
                                onChange={handleOptionChange}
                            />
                            No
                        </label>
                    </div>
                    <p>Already a member? <Link to='/'> Login </Link> </p>
                    <button type="submit">Register</button>
                </form>
            </div>
        </>
    )
}

export default RegisterScreen;