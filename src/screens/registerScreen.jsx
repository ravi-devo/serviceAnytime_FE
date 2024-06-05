import { useState } from "react";
import { useRegisterMutation } from "../slices/userSlice/userApiSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import '../styles/register.css';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { setCredential } from "../slices/userSlice/authReducer";

const RegisterScreen = () => {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isAdmin, setAdmin] = useState(true);

    const [register] = useRegisterMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleToggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleClick = () => {
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!name) return toast.error("Name is required");
            if (!username) return toast.error("Email is required");
            if (!password) return toast.error("Password is required");
            if (!confirmPassword) return toast.error("confirmPassword is required");
            if (password.length < 6 || confirmPassword.length < 6) return toast.error("Password/Confirm Password should be atleast 6 characters.");
            if (password !== confirmPassword) return toast.error("Password and confirm password doesn't match.");
            const res = await register({ name, username, password, isAdmin }).unwrap();
            if (res.message === 'User created successfully') {
                dispatch(setCredential({ ...res }));
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
            <div className="fullContainer">
                <div className="registerContainer">
                    <div className="leftContainer">
                        <h4>Already Registered?</h4>
                        <p>Login to know about your ticket status</p>
                        <Button onClick={handleClick}>Login</Button>
                    </div>
                    <div className="rightContainer">
                        <h4>Welcome to Service Anytime, Join us</h4>
                        <br />
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="my-2" id="formName">
                                <Form.Label >Name</Form.Label>
                                <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="my-2" id="formEmail">
                                <Form.Label >Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="my-2" id="formPassword">
                                <Form.Label>Password</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <InputGroup.Text onClick={handleTogglePasswordVisibility}>
                                        {showPassword ? <BsEyeSlash /> : <BsEye />}
                                    </InputGroup.Text>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="my-2" id="formConfirmPassword">
                                <Form.Label htmlFor="confirmPassword">Confirm Password</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <InputGroup.Text onClick={handleToggleConfirmPasswordVisibility}>
                                        {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
                                    </InputGroup.Text>
                                </InputGroup>
                            </Form.Group>
                            <div className="my-2">
                                Are you a admin:
                                <label className="mx-2">
                                    <input
                                        type="radio"
                                        value="true"
                                        checked={isAdmin === true}
                                        onChange={handleOptionChange}
                                    />
                                    Yes
                                </label>
                                <label className="mx-1">
                                    <input
                                        type="radio"
                                        value="false"
                                        checked={isAdmin === false}
                                        onChange={handleOptionChange}
                                    />
                                    No
                                </label>
                            </div>
                            <Button className="my-2" type="submit">Register</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterScreen;