import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";

function ExercisesList(props) {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {

        const abortController = new AbortController();

        axios.get('http://localhost:5000/exercises/')
            .then(response => {
                setExercises(response.data);
            })
            .catch(err => console.log(err));

    }, [exercises]);

    const deleteExercise = id => {
        axios.delete(`http://localhost:5000/exercises/${id}`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        setExercises(exercises.filter(exercise => exercise.id !== id));
    }

    if (exercises.length === 0) {
        return (
            <div>
                <h3>No Exercises</h3>
            </div>
        )
    }

    return (
        <div>
            <h3>Exercises List</h3>
            <Table striped bordered hover size={"sm"}>
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Description</th>
                    <th>Duration (mins)</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {exercises.map(exercise => {
                    return <Exercise key={exercise._id} {...exercise} deleteExercise={deleteExercise}/>
                })}
                </tbody>
            </Table>
        </div>
    );
}


const Exercise = ({_id, username, description, duration, date, deleteExercise}) => {
    return (
        <tr>
            <td>{username}</td>
            <td>{description}</td>
            <td>{duration}</td>
            <td>{date}</td>
            <td>
                <Link to={`/edit/${_id}`}>Edit</Link> | <a href={"#"} variant={"link"}
                                                           onClick={() => deleteExercise(_id)}>Delete</a>
            </td>
        </tr>
    )
}
export default ExercisesList;