import { Axios } from 'axios';
import React, { useRef, useState, useEffect } from 'react'
import { } from 'react-bootstrap'
import axios from 'axios'
import ReactHtmlParser from 'html-react-parser';
import { TextField, Table, TableBody, TableHead, Paper, TableRow, TableContainer, TableCell, Select, MenuItem, InputLabel, Button } from '@mui/material';
import { Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { margin } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';

export default function Todo() {
    console.log('in login')
    let arr = JSON.parse(localStorage.getItem('credentials'));
    const cred = axios.create({ baseURL: 'http://localhost:3001/u' });
    let tasktitle = useRef(null);
    let taskbody = useRef(null);
    let taskprio = useRef(null);
    const [state, updateState] = useState({ index: null, update: 0 });
    const [taskslist, updatetaskslist] = useState(arr[1].tasklist);
    function addTask() {
        if (tasktitle.current.value && taskbody.current.value) {
            updatetaskslist(
                [...taskslist, { title: tasktitle.current.value, body: taskbody.current.value }]
            );
            arr[1].tasklist = [...taskslist, { title: tasktitle.current.value, body: taskbody.current.value }];
            localStorage.setItem('credentials', JSON.stringify(arr));
            tasktitle.current.value = '';
            taskbody.current.value = '';
        }
    }
    function sort() {
        taskslist.sort((a, b) => {
            return b.priority - a.priority;
        });
    }

    function Deletetask(index) {
        if (window.confirm('Are You Sure You want to delete the task?')) {
            taskslist.splice(index, 1);
            updatetaskslist(
                [...taskslist]
            );
            arr[1].tasklist = taskslist;
            localStorage.setItem('credentials', JSON.stringify(arr));
        }
    }
    function RenderTask(index) {
        let pos = index;
        updateState({
            update: 1,
            index: pos
        });
        tasktitle.current.value = taskslist[index].title;
        taskbody.current.value = taskslist[index].body;

    }
    function UpdateTask() {
        const task = tasktitle.current.value;
        const taskcontent = taskbody.current.value;
        taskslist[state.index] = { "title": task, "body": taskcontent };
        updatetaskslist([...taskslist]);
        updateState({
            update: 0,
            index: null
        });
        arr[1].tasklist = taskslist;
        localStorage.setItem('credentials', JSON.stringify(arr));
        tasktitle.current.value = '';
        taskbody.current.value = '';
    }
    return (
        <>
            <div  >
                <Toolbar sx={{ fontSize: '2rem', display: 'flex', justifyContent: 'center' }}  >Category list</Toolbar>
                <Toolbar sx={{ fontSize: '1.4rem', display: 'flex', justifyContent: 'center' }}  >Add Category</Toolbar>
            </div>

            <Table sx={{ textAlign: 'center' }} id='ipfield'>
                <TableBody>
                    <TableRow>
                        <TableCell>Category  Title: </TableCell>
                        <TableCell> <TextField sx={{ margin: '25px 10px ' }} id="standard-basic" inputRef={tasktitle} variant="outlined" /> </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><label htmlFor="taskbody">Category  Body:</label></TableCell>
                        <TableCell><TextField sx={{ margin: '25px 10px ' }} id="standard-basic" multiline inputRef={taskbody} variant="outlined" /></TableCell>
                    </TableRow>


                    {/* conditional rendering for update */}


                    {state.update === 1 ?
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell ><button className=' btn btn-success' onClick={() =>
                                UpdateTask()}> Finish Update </button></TableCell>
                        </TableRow>
                        :
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell ><button className=' btn btn-success' onClick={() =>
                                addTask()}> Add Task </button></TableCell>
                        </TableRow>

                    }
                </TableBody>
            </Table>
            <br />
            <br />

            <div>
                <h3 className='text-center'>Todo list</h3>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Sr. No</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell >Description</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sort()}
                            {taskslist != null ?
                                taskslist.map((element, index) =>
                                    <TableRow>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell> {ReactHtmlParser(element.title)}</TableCell>
                                        <TableCell>{ReactHtmlParser(element.body)}</TableCell>

                                        <TableCell><Button variant="outlined" color="success" startIcon={<UpdateIcon />} onClick={() => RenderTask(index)}>
                                            Update Category
                                        </Button> &nbsp; <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => Deletetask(index)}>
                                                Delete
                                            </Button> </TableCell>

                                    </TableRow>
                                )
                                : <TableRow> <TableCell colSpan='4'>"No Tasks Available"</TableCell></TableRow>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}
