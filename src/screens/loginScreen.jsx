import { useEffect, useState } from 'react';
import '../styles/login.css';
import { useLoginMutation } from '../slices/userSlice/userApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCredential } from '../slices/userSlice/authReducer';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import Loader from '../components/loader';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const {userInfo} = useSelector((state) => state.auth);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleClick = () => {
        navigate('/register');
    };

    const [login, {isLoading}] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username.trim() !== '' && password.trim() !== '') {
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
        }else{
            toast.error('Username or Password cannot be empty')
        }
    }

    useEffect(() => {
        if(userInfo){
            navigate('/home')
        }
    },[navigate, userInfo]);

    return (<>
        <div className='full-container'>
            <div className="login-container">
                <div className='left-container'>
                    <h4>Welcome back to Service Anytime, please login to proceed</h4>
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
                        <Button className='my-2' type='submit'>Login</Button>
                    </Form>
                    {isLoading && <Loader />}
                </div>
                <div className='right-container'>
                    <h4>Do not have an account yet?</h4>
                    <p>Join with us and get your queries addressed quickly</p>
                    <Button onClick={handleClick}>Sign Up</Button>
                </div>
            </div>
        </div>

    </>)
}

export default LoginScreen;