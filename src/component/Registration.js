
import React, { useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import { Container, Form, FormControl, FormLabel, Row, Col, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import axios from 'axios'
import CryptoJS from 'crypto-js';
import SocialBotton from './SocialBotton';
import { SocialIcon } from 'react-social-icons';
import { useHistory } from 'react-router';

export default function Registration() {
    const USER = axios.create({ baseURL: 'http://localhost:3001/u' });
    const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const regexname = RegExp(/^[A-Za-z]{2,30}$/);
    const regexpass = RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()]).{8,}");
    const [pflag, setFlag] = useState(0);
    const [error, setError] = useState({ name: '', email: '', cpass: '', pass: '', fields: '' });
    const [show, setShow] = useState(false);
    let history = useHistory();
    const fNameInput = useRef(null);
    const lNameInput = useRef(null);
    // const uNameInput = useRef(null);
    const emailInput = useRef(null);
    const passInput = useRef(null);
    const cPassInput = useRef(null);
    function validate() {
        if (fNameInput.current.value == '' || lNameInput.current.value == '' || emailInput.current.value == '' || passInput.current.value == '' || cPassInput.current.value == '') {
            setError({ ...error, fields: 'All fields are necessary' });
            setShow(true);
        }
        else {
            error.fields = '';
            error.name = (!regexname.test(fNameInput.current.value) || !regexname.test(lNameInput.current.value)) ? "Both Name Field should contain a minimum of 3 characters and should contain only alphabets" : "";

            error.email = (!regForEmail.test(emailInput.current.value)) ? "Enter valid email" : "";
            error.pass = (!regexpass.test(passInput.current.value)) ? error.pass = "Password should must have atlesr 8 characters be Alphanumeric and contain 1 uppercase & 1 lowercase with a special char" : "";
            error.cpass = (passInput.current.value != cPassInput.current.value) ? "Password and confirm password must be same" : "";
            setError({ ...error })
            if (error.name == "" && error.email == "" && error.cpass == "" && error.pass == "" && error.fields == "") {
                addUser();

            }
        }
    }
    async function addUser() {
        let ciphertext = CryptoJS.AES.encrypt(passInput.current.value, emailInput.current.value).toString();
        await USER.post(``, {
            "email": emailInput.current.value,
            "password": ciphertext,
            "name": `${fNameInput.current.value} ${lNameInput.current.value}`,
            "budgetData": {
                "budget": [],
                "moneyData": {
                    "budgetAmount": 0,
                    "expenseAmount": 0,
                    "pendingAmount": 0
                }
            }
        });

        fNameInput.current.value = '';
        lNameInput.current.value = '';
        passInput.current.value = '';
        emailInput.current.value = '';
        cPassInput.current.value = '';
        setFlag(1);
    }
    const handleSocialLogin = (user) => {

        USER.get(`?email=${user._profile.email}`).then(async (res) => {
            if (res.data[0] == null) {
                await USER.post(``, {
                    "email": user._profile.email,
                    "name": `${user._profile.name}`,
                    "budgetData": {
                        "budget": [],
                        "moneyData": {
                            "budgetAmount": 0,
                            "expenseAmount": 0,
                            "pendingAmount": 0
                        }
                    }
                });
                await USER.get(`?email=${user._profile.email}`).then(res => {
                    let arr = [user._profile.email, res.data[0]];
                    localStorage.setItem('credentials', JSON.stringify(arr));
                    history.push('/dash')
                });

            }
            else {
                setError({ ...error, fields: 'The user already exists' });
                setShow(true);
                localStorage.removeItem('oauth2_ss::http://localhost:3000::1::DEFAULT::_ss_')
            }
        })

        console.log(user);
    };

    const handleSocialLoginFailure = (err) => {
        console.error(err);
    };
    return (
        <div>
            {show && <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Oh snap! You some an error!</Alert.Heading>
                <p>
                    {error.fields}
                </p>
            </Alert>}
            <Container >
                <h1>Hello User!! Join Us By Registering</h1>
                <Row>
                    <Col>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formBasicEmail">
                                        <TextField id="standard-basic" style={{ width: '100%' }} label="Enter first name" inputRef={fNameInput} variant="standard" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formBasicEmail">
                                        <TextField id="standard-basic" style={{ width: '100%' }} label="Enter Last name" inputRef={lNameInput} variant="standard" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Form.Text className="text-danger">
                                    {error.name}
                                </Form.Text>
                            </Row>
                            <Row >
                                <Form.Group controlId="formBasicEmail">
                                    <TextField id="standard-basic" style={{ width: '100%' }} label="Enter Email" inputRef={emailInput} variant="standard" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Text className="text-danger">
                                    {error.email}
                                </Form.Text>
                            </Row>
                            <Row >
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <TextField id="standard-basic" style={{ width: '100%' }} label="Enter Password" inputRef={passInput} variant="standard" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Text className="text-danger">
                                    {error.pass}
                                </Form.Text>
                            </Row>
                            <Row >
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <TextField id="standard-basic" style={{ width: '100%' }} label="Confirm Password" inputRef={cPassInput} variant="standard" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Text className="text-danger">
                                    {error.cpass}
                                </Form.Text>
                            </Row>
                            <Button className="mx-1 mb-4" variant="contained" onClick={() => validate()}  >Register</Button>
                            <br />
                            <Link style={{ color: 'blue' }} to="/">Login Over Here</Link>
                            {pflag == 1 && <Redirect to='/' />}

                        </Form>
                    </Col>

                    <Col className='d-flex justify-content-center align-items-center' >
                        <h3 className='text-primary'>Register with Your Social Media Account</h3>
                        <Row>
                            <Col className='mb-4'>
                                <SocialBotton
                                    provider="google"
                                    appId="592593185581-qk5enpiqver56v50kamu0nd3fvimunvu.apps.googleusercontent.com"
                                    onLoginSuccess={handleSocialLogin}
                                    onLoginFailure={handleSocialLoginFailure}
                                >
                                    <Button variant="outlined" color="error" startIcon={<SocialIcon network="google" />} >Register With Google</Button>
                                </SocialBotton>
                            </Col>
                            <Col>
                                <SocialBotton
                                    provider="facebook"
                                    appId="224795383074770"
                                    onLoginSuccess={handleSocialLogin}
                                    onLoginFailure={handleSocialLoginFailure}
                                >
                                    <Button variant="outlined" color="primary" startIcon={<SocialIcon network="facebook" />} >Register With Facebook</Button>
                                </SocialBotton>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}
