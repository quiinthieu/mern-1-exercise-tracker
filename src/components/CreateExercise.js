import React, {useEffect, useState} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import {useHistory} from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import {Form} from "react-bootstrap";

function CreateExercise(props) {
    let history = useHistory();

    const [exercise, setExercise] = useState({
        username: '',
        description: '',
        duration: 0,
        date: new Date()
    });

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    setUsers(response.data.map(user => user.username));
                    setExercise({...exercise, username: response.data[0].username});
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const handleOnChange = e => {
        setExercise({...exercise, [e.target.name]: e.target.value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(exercise);
        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => console.log(res.data));

        history.push('/');
    }

    return (
        <div>
            <h3>Create New Exercise Log</h3>
            <Form onSubmit={e => handleSubmit(e)}>
                <Form.Group>
                    <Form.Label htmlFor={"username"}>Username: </Form.Label>
                    <Form.Control as={"select"} required id={"username"} value={exercise.username}
                                  onChange={handleOnChange} name={"username"}>
                        {users.map(user => {
                            return (
                                <option key={user} value={user}>{user}</option>
                            )
                        })}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor={"description"}>Description: </Form.Label>
                    <Form.Control id={"description"} type={"text"} required className={"form-control"}
                                  value={exercise.description} name={"description"} onChange={handleOnChange}
                                  step={"1"}/>
                </Form.Group>
                <Form.Group className={"form-group"}>
                    <Form.Label htmlFor={"duration"}>Duration (in minutes): </Form.Label>
                    <Form.Control id={"duration"} type={"number"} className={"form-control"} value={exercise.duration}
                                  onChange={handleOnChange} name={"duration"}/>
                </Form.Group>
                <Form.Group className={"form-group"}>
                    <Form.Label htmlFor={"date"}>Date: </Form.Label>
                    <div>
                        <DatePicker id={"date"} name={"date"} selected={exercise.date}
                                    onChange={date => setExercise({...exercise, date: date})}/>
                    </div>
                </Form.Group>
                <div className={"form-group"}>
                    <input type={"submit"} value={"Create Exercise Log"} className={"btn btn-primary"}/>
                </div>
            </Form>
        </div>
    );
}

export default CreateExercise;