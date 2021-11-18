import React, { Component } from 'react'
import Navb from './Navb'
import Todo from './Todo'
import { Redirect } from 'react-router-dom'
import Page from './Page'
import Budget from './Budget'

export class Dashboard extends Component {
    render() {
        return (
            <div>
                {localStorage.getItem('credentials') != undefined ?
                    <>
                        <Navb />
                        <Budget />
                    </>
                    :
                    <Redirect to='/' />}
            </div>
        )
    }
}

export default Dashboard
