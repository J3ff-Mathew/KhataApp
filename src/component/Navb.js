import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import LoginIcon from '@mui/icons-material/Login';
import { Link, Redirect } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import Logout from '@mui/icons-material/Logout';
import axios from 'axios';

export class Navb extends Component {
    cred = axios.create({ baseURL: 'http://localhost:3001/u' });
    constructor(props) {
        super(props);
        this.state = {
            changePass: 0,
            log: 0
        }
    }
    Logout() {
        this.setState({ log: 1 });
        this.arr = JSON.parse(localStorage.getItem('credentials'));
        this.cred.put(`/${this.arr[1].id}`, this.arr[1])
        localStorage.removeItem('credentials');

    }
    getname() {
        if (localStorage.getItem('credentials') != undefined) {
            let arr = JSON.parse(localStorage.getItem('credentials'));
            return arr[1].name;
        }
    }
    render() {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar sx={{ backgroundColor: "black", opacity: "0.8" }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 1 }}
                        >
                        </IconButton>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1, cursor: "pointer" }}>
                            <Link style={{ color: 'white' }} to="/">Home</Link>
                        </Typography>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1, cursor: "pointer", color: 'white' }}>
                            <Link style={{ color: 'white' }} to="/posts">Posts</Link>
                        </Typography>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1, cursor: "pointer", color: 'white' }}>
                            Welcome Back : {this.getname()}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <Badge badgeContent={4} color="error">
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit"
                            >
                                <Badge badgeContent={17} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"

                                aria-haspopup="true"

                                color="inherit"
                            >
                                <LogoutIcon onClick={() => { this.Logout() }} />
                                {this.state.log == 1 && <Redirect to='/' />}
                            </IconButton>
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"

                                aria-haspopup="true"

                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        )
    }
}

export default Navb
