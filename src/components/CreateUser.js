import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from "axios";
import {Button, Form} from "react-bootstrap";

function CreateUser(props) {
    let history = useHistory();
    const [username, setUsername] = useState('');

    const handleOnChange = e => {
        setUsername(e.target.value);
    }

    const handleOnSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:5000/users/add', {username})
            .then(res => console.log(res.data));
        history.push('/');
    }
    return (
        <div>
            <h3>Create New User</h3>
            <Form onSubmit={handleOnSubmit}>
                <Form.Group>
                    <Form.Label htmlFor={"username"}>Username: </Form.Label>
                    <Form.Control type={"text"} id={"username"} name={"username"} onChange={handleOnChange} />
                </Form.Group>
                <Button variant={"primary"} type={"submit"}>Create New User</Button>
            </Form>
        </div>
    );
}

export default CreateUser;