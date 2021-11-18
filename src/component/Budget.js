
import React, { useRef, useState, useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import axios from 'axios'
import ReactHtmlParser from 'html-react-parser';
import { TextField, Table, TableBody, TableHead, Paper, TableRow, TableContainer, TableCell, Select, MenuItem, InputLabel, Button } from '@mui/material';
import { Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { margin } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

export default function Budget() {
    let arr = JSON.parse(localStorage.getItem('credentials'));
    const cred = axios.create({ baseURL: 'http://localhost:3001/u' });
    let expenseTitle = useRef(null);
    let expenseAmount = useRef(null);
    let budgetAmount = useRef(null);
    const [state, updateState] = useState({ index: null, update: 0, prevAmount: 0 });
    const [data, setData] = useState({ ...arr[1].budgetData.moneyData })
    const [budgetList, updatebudgetList] = useState(arr[1].budgetData.budget);
    function addExpense() {
        if (expenseAmount.current.value && expenseTitle.current.value) {
            if (parseFloat(expenseAmount.current.value) <= parseFloat(data.pendingAmount)) {
                updatebudgetList(
                    [...budgetList, { title: expenseTitle.current.value, amount: expenseAmount.current.value }]
                );
                setData({ ...data, pendingAmount: parseFloat(data.pendingAmount) - parseFloat(expenseAmount.current.value), expenseAmount: parseFloat(data.expenseAmount) + parseFloat(expenseAmount.current.value) })
                arr[1].budgetData.budget = [...budgetList, { title: expenseTitle.current.value, amount: expenseAmount.current.value }];
                arr[1].budgetData.moneyData = { ...data, pendingAmount: parseFloat(data.pendingAmount) - parseFloat(expenseAmount.current.value), expenseAmount: parseFloat(data.expenseAmount) + parseFloat(expenseAmount.current.value) };
                localStorage.setItem('credentials', JSON.stringify(arr));
                expenseTitle.current.value = '';
                expenseAmount.current.value = '';
            }
            else {
                alert(`Expense Out of Budget`);
                expenseTitle.current.value = '';
                expenseAmount.current.value = '';
            }
        }
        else {
            alert("Both the Field for expense is necessary")
        }
    }

    function DeleteBudget(index) {
        // console.log(budgetList[index].amount)
        if (window.confirm('Are You Sure You want to delete the Expense?')) {
            setData({ ...data, pendingAmount: parseFloat(data.pendingAmount) + parseFloat(budgetList[index].amount), expenseAmount: parseFloat(data.expenseAmount) - parseFloat(budgetList[index].amount) });
            arr[1].budgetData.moneyData = { ...data, pendingAmount: parseFloat(data.pendingAmount) + parseFloat(budgetList[index].amount), expenseAmount: parseFloat(data.expenseAmount) - parseFloat(budgetList[index].amount) };
            budgetList.splice(index, 1);
            updatebudgetList(
                [...budgetList]
            );

            arr[1].budgetData.budget = budgetList;
            localStorage.setItem('credentials', JSON.stringify(arr));
        }
    }
    function RenderBudget(index) {
        let pos = index;
        updateState({
            update: 1,
            index: pos,
            prevAmount: budgetList[index].amount
        });
        expenseTitle.current.value = budgetList[index].title;
        expenseAmount.current.value = budgetList[index].amount;

    }
    function UpdateBudget() {
        if (expenseAmount.current.value && expenseTitle.current.value) {
            const expensetitle = expenseTitle.current.value;
            const expenseamount = expenseAmount.current.value;
            budgetList[state.index] = { "title": expensetitle, "amount": expenseamount };
            console.log(state.prevAmount);
            setData({ ...data, pendingAmount: parseFloat(data.pendingAmount) + parseFloat(state.prevAmount) - parseFloat(expenseAmount.current.value), expenseAmount: parseFloat(data.expenseAmount) - parseFloat(state.prevAmount) + parseFloat(expenseAmount.current.value) })

            updatebudgetList([...budgetList]);

            arr[1].budgetData.moneyData = { ...data, pendingAmount: parseFloat(data.pendingAmount) + parseFloat(state.prevAmount) - parseFloat(expenseAmount.current.value), expenseAmount: parseFloat(data.expenseAmount) - parseFloat(state.prevAmount) + parseFloat(expenseAmount.current.value) };
            arr[1].budgetData.budget = budgetList;

            localStorage.setItem('credentials', JSON.stringify(arr));
            updateState({
                update: 0,
                index: null,
                prevAmount: 0
            });


            expenseTitle.current.value = '';
            expenseAmount.current.value = '';
        }
    }
    function addBudget() {
        if (budgetAmount.current.value) {
            setData({ ...data, budgetAmount: parseFloat(data.budgetAmount) + parseFloat(budgetAmount.current.value), pendingAmount: parseFloat(data.pendingAmount) + parseFloat(budgetAmount.current.value) });
            arr[1].budgetData.moneyData = { ...data, budgetAmount: parseFloat(data.budgetAmount) + parseFloat(budgetAmount.current.value), pendingAmount: parseFloat(data.pendingAmount) + parseFloat(budgetAmount.current.value) };
            localStorage.setItem('credentials', JSON.stringify(arr));
            budgetAmount.current.value = '';
        }
    }
    return (
        <Container fluid>
            <div className='text-center' >
                <Toolbar sx={{ fontSize: '2rem', display: 'flex', justifyContent: 'center' }}  >BUDGET APP</Toolbar>
            </div>
            <Row >
                <Col>
                    <Container>
                        <Row className=' mb-5 border border-success flex-flow-column'>
                            <h4 className='text-success'>Add Budget</h4>
                            <div>Enter Your Budget Amount</div>
                            <TextField type='number' sx={{ margin: '0.8rem 0.3rem', width: '40rem' }} id="standard-basic" inputRef={budgetAmount} variant="outlined" />
                            <button style={{ margin: '1rem 0.8rem ', width: '40rem' }} className=' btn btn-success' onClick={() => addBudget()}> Add Budget </button>
                        </Row>
                        <Row className=' mt-5 border border-danger flex-flow-column'>
                            <h4 className='text-danger'>Add Expense</h4>
                            <div>Enter Your Expense Title</div>
                            <TextField sx={{ margin: '0.8rem 0.3rem', width: '40rem' }} id="standard-basic" inputRef={expenseTitle} variant="outlined" />
                            <div>Enter Your Expense Amount</div>
                            <TextField type='number' sx={{ margin: '0.8rem 0.3rem', width: '40rem' }} id="standard-basic" inputRef={expenseAmount} variant="outlined" />
                            {state.update === 1 ? <button style={{ margin: '1rem 0.8rem ', width: '40rem' }} className=' btn btn-danger' onClick={() => UpdateBudget()}>  Update Expense</button> : <button style={{ margin: '1rem 0.8rem ', width: '40rem' }} className=' btn btn-danger' onClick={() => addExpense()}> Add Expense </button>}
                        </Row>
                    </Container>
                </Col>
                <Col>
                    <div>
                        <Row>
                            <Col xs={4}>
                                <AttachMoneyIcon color="success" sx={{ fontSize: '7rem', textAlign: 'center' }} />
                                <div className='text-success ' style={{ fontSize: '2.5rem' }}>
                                    {data.budgetAmount}
                                </div>

                            </Col>
                            <Col>
                                <PaymentIcon color="error" sx={{ fontSize: '7rem', textAlign: 'center' }} />
                                <div className='text-danger ' style={{ fontSize: '2.5rem' }}>
                                    {data.expenseAmount}
                                </div>
                            </Col>
                            <Col>
                                <AccountBalanceWalletOutlinedIcon color="success" sx={{ fontSize: '7rem', textAlign: 'center' }} />
                                <div className='text-success ' style={{ fontSize: '2.5rem' }}>
                                    {data.pendingAmount}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <h3 className='text-center'>Expense list</h3>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Sr.No</TableCell>
                                            <TableCell>Title</TableCell>
                                            <TableCell >Amount</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {budgetList != null ?
                                            budgetList.map((element, index) =>
                                                <TableRow>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell> {element.title}</TableCell>
                                                    <TableCell>{element.amount}</TableCell>

                                                    <TableCell><Button variant="outlined" color="success" startIcon={<UpdateIcon />} onClick={() => RenderBudget(index)}>
                                                        Update Expense
                                                    </Button> &nbsp; <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => DeleteBudget(index)}>
                                                            Delete
                                                        </Button> </TableCell>

                                                </TableRow>
                                            )
                                            : <TableRow> <TableCell colSpan='4'>"No Tasks Available"</TableCell></TableRow>}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Row>
                    </div>

                </Col>
            </Row>
        </Container>
    )
}
