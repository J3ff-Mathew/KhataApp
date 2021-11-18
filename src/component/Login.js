import React, { Component } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import CryptoJS from 'crypto-js';
import SocialBotton from './SocialBotton';
import { SocialIcon } from 'react-social-icons';
import { Container, Form, FormControl, FormLabel, Row, Col, Alert } from 'react-bootstrap';



export class Login extends Component {
    cred = axios.create({ baseURL: 'http://localhost:3001/u' });
    constructor(props) {
        super(props);
        this.state = { flag: 0, captcha: 0 }
    }

    async componentDidMount() {
        if (localStorage.getItem('credentials') != undefined) {
            this.setState({ flag: 1, captcha: 0 });
        }
        console.log('in login');
    }
    validate() {


        this.cred.get(`?email=${document.getElementById('mail').value}`)
            .then(res => {
                console.log(res.data);
                // console.log(res.data[0]["password"]);
                if (res.data[0]["password"] == undefined) {
                    alert("log in using your social media");
                }
                else {
                    let bytes = CryptoJS.AES.decrypt(res.data[0]["password"], document.getElementById('mail').value);
                    let originalText = bytes.toString(CryptoJS.enc.Utf8);
                    if (originalText == document.getElementById('pass').value) {
                        if (this.state.captcha == 1) {
                            console.log(document.getElementById('mail').value);
                            let arr = [document.getElementById('mail').value, res.data[0]];
                            localStorage.setItem('credentials', JSON.stringify(arr));
                            this.setState({ flag: 1, captcha: 1 });
                        }
                        else {
                            alert("the captcha is necessary" + this.state.captcha)
                        }
                    }

                    else {
                        alert("Enter Proper Passcode")
                    }
                }
            }).catch(err => alert('enter proper details'))
    }
    onChange(value) {

        this.state.captcha = 1;
        this.setState({ ...this.state });
        console.log("Captcha value:", value);
    }
    handleSocialLogin = (user) => {
        this.cred.get(`?email=${user._profile.email}`).then(res => {
            if (res.data[0]) {
                let arr = [user._profile.email, res.data[0]];
                localStorage.setItem('credentials', JSON.stringify(arr));
                this.setState({ flag: 1, captcha: 1 });
            }
            else {
                alert('need to register user first')
            }
        });

    };

    handleSocialLoginFailure = (err) => {
        console.error(err);
    };
    render() {
        return (
            <div>

                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {
                            my: '1rem',
                            mx: '10rem',
                            width: '100ch'
                        }
                    }}
                    autoComplete="off"
                >
                    <h1 className="my-4">Enter Your Credentials</h1>
                    <TextField label="Outlined secondary" id='mail' label="Enter Your Email" color="secondary" />
                    <TextField label="Outlined secondary" id='pass' label="Enter Your Passcode" color="secondary" />
                    <ReCAPTCHA
                        sitekey="6Le0fBwdAAAAALSa-rSQjbXFvs3lXCwsi3nPa47C"
                        onChange={() => this.onChange()}
                    />
                    <Button className="mb-2" variant="contained" onClick={() => this.validate()}>Log In</Button>
                    <Row>
                        <Col className='mb-4'>
                            <SocialBotton
                                provider="google"
                                appId="592593185581-qk5enpiqver56v50kamu0nd3fvimunvu.apps.googleusercontent.com"
                                onLoginSuccess={this.handleSocialLogin}
                                onLoginFailure={this.handleSocialLoginFailure}
                            >
                                <Button variant="outlined" color="error" startIcon={<SocialIcon network="google" />} >Log in With Google</Button>
                            </SocialBotton>
                        </Col>
                        <Col>
                            <SocialBotton
                                provider="facebook"
                                appId="224795383074770"
                                onLoginSuccess={this.handleSocialLogin}
                                onLoginFailure={this.handleSocialLoginFailure}
                            >
                                <Button variant="outlined" color="primary" startIcon={<SocialIcon network="facebook" />} >Log in With Facebook</Button>
                            </SocialBotton>
                        </Col>
                    </Row>
                    <br />
                    <Link style={{ color: 'blue' }} to="/regis">Register User</Link>
                </Box>
                {this.state.flag == 1 && <Redirect to='/dash' />}
            </div>
        )
    }
}
export default Login