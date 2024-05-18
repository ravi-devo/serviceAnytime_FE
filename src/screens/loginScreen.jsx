import { useState } from 'react';
import '../styles/login.css';
import { useLoginMutation } from '../slices/userSlice/userApiSlice';
import { useDispatch } from 'react-redux';
import { setCredential } from '../slices/userSlice/authReducer';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };    

    const [login] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ username, password }).unwrap();
            if (res.message === 'User authenticated successfully') {
                dispatch(setCredential({ ...res }));
                navigate('/home');
                console.log('User authenticated successfully')
            }
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }
    return (<>
        <div className='full-container'>
            <div className="login-container">
                <div className='left-container'>
                    <h2>Welcome Back!</h2>
                    <h6>Login and get your issue addressed at earliest</h6>
                </div>
                <div className='right-container'>
                    <h4>Login Here</h4>
                    <br />
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='my-2' controlId='formUsername'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                        </Form.Group>
                        <Form.Group className='my-2' controlId='formPassword'>
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
                        <p className='my-2'>Do not have an account yet? <Link to='/register'>Register Now</Link> </p>
                        <Button className='my-2' type='submit'>Login</Button>
                    </Form>
                </div>
            </div>
        </div>

    </>)
}

export default LoginScreen;