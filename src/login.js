import './login.css'
import { useState } from "react";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import 'animate.css';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "./auth";
import Pattern from './pattern'

function Login() {
    const { login , register } = useAuth();
    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    const [formType, setFormType] = useState('login');
    const [registerData, setRegisterData] = useState({
        username: "",
        password: "",
        email: ""
    });
    const [passwordErrors, setPasswordErrors] = useState([]);

    const getTitle = () => {
        switch (formType) {
            case 'login':
                return 'Login';
            case 'register':
                return 'Register';
            default:
                return '';
        }
    };

    const validatePassword = (password) => {
        const errors = [];
        if (password.length < 8) {
            errors.push("Password must be at least 8 characters.");
        }
        if (!/[A-Z]/.test(password)) {
            errors.push("At least one uppercase letter required.");
        }
        if (!/[a-z]/.test(password)) {
            errors.push("At least one lowercase letter required.");
        }
        if (!/[0-9]/.test(password)) {
            errors.push("At least one number required.");
        }
        return errors;
    };
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setRegisterData({ ...registerData, password: newPassword });
        const errors = validatePassword(newPassword);
        setPasswordErrors(errors);
    }
const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    let customErrors = false;
    const form = event.currentTarget;

    if (formType === "login") {
        const username = event.target.elements[0].value;
        const password = event.target.elements[1].value;
        
        const success = await login(username, password);
        if (success) {
            navigate('/');
        } else {
            alert("Invalid username or password");
            customErrors = true;
        }
    }

    if (formType === "register") {
        const errors = validatePassword(registerData.password);
        setPasswordErrors(errors);
        if (errors.length > 0) {
            customErrors = true;
        }
        
        if (!customErrors && form.checkValidity()) {
            const result = await register(registerData.username, registerData.email, registerData.password);
            if (result.success) {
                alert(result.message);
                setFormType('login'); 
            } else {
                alert(result.message);
                customErrors = true;
            }
        }
    }

    if (form.checkValidity() === false || customErrors) {
        setValidated(true);
        return;
    }

    setValidated(true);
};

    return (
        <>
            <div className="Login">
                <Pattern />
                <div className="form-border">
                    {formType === 'login' && (
                        <Form method="post" id="login-form" validated={validated} onSubmit={handleSubmit} noValidate>
                            <h3 className="login-title animate__animated animate__lightSpeedInRight" id="form-title">{getTitle()}</h3>
                            <FloatingLabel controlId="floatingInput" label="Username" className="mb-3 floating-form" >
                                <Form.Control type="text" placeholder="Username" required />
                                <Form.Control.Feedback type="invalid">
                                    Please Enter your username
                                </Form.Control.Feedback>
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3 floating-form" >
                                <Form.Control type="password" placeholder="Password" required />
                                <Form.Control.Feedback type="invalid">
                                    Please Enter your Password
                                </Form.Control.Feedback>
                            </FloatingLabel><br />
                            <Button type="submit" className="ripple-button">Login</Button><br />
                            <hr />
                            <Button type="button" className="ripple-button" onClick={() => setFormType('register')} >Register</Button>
                            <br /><Link to="/">← Back to home</Link>
                        </Form>
                    )}

                    {formType === 'register' && (
                        <Form method="post" id="register-form" validated={validated} onSubmit={handleSubmit} noValidate>
                            <h3 className="login-title animate__animated animate__lightSpeedInRight" id="form-title">{getTitle()}</h3>
                            <FloatingLabel label="Username" className='floating-form mb-2'>
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    aria-describedby="inputGroupPrepend"
                                    value={registerData.username}
                                    onChange={e => setRegisterData({ ...registerData, username: e.target.value })}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a username.
                                </Form.Control.Feedback>
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="Password" className="floating-form mb-2">
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={registerData.password}
                                    onChange={handlePasswordChange}
                                    required
                                    isInvalid={passwordErrors.length > 0}
                                    isValid={passwordErrors.length === 0 && registerData.password.length >= 8}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {passwordErrors.length > 0 && (
                                        <ul style={{ margin: 0, paddingLeft: "1.2em" }}>
                                            {passwordErrors.map((err, idx) => (
                                                <li key={idx}>{err}</li>
                                            ))}
                                        </ul>
                                    )}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingInput" label="E-mail" className="floating-form mb-2">
                                <Form.Control
                                    type="email"
                                    placeholder="E-mail"
                                    value={registerData.email}
                                    onChange={e => setRegisterData({ ...registerData, email: e.target.value })}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid email
                                </Form.Control.Feedback>
                            </FloatingLabel>
                            <Form.Group className="mb-3">
                                <Form.Check
                                    required
                                    label="Agree to terms and conditions"
                                    feedback="You must agree before submitting."
                                    feedbackType="invalid"
                                    style={{ textAlign: "left" }}
                                />
                            </Form.Group>
                            <Button type="submit" className="ripple-button" >Register</Button> <br /> <hr />
                            <Button variant="link" onClick={() => setFormType('login')} >Already have an account ? Sign in</Button>
                        </Form>
                    )}
                    
                </div>
                
            </div>
            
        </>
    );
}

export default Login;