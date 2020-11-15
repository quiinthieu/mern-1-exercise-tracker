import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NavBar from './components/NavBar';
import ExercisesList from "./components/ExercisesList";
import CreateExercise from "./components/CreateExercise";
import CreateUser from "./components/CreateUser";
import {Col, Container, Row} from "react-bootstrap";
import EditExercise from "./components/EditExercise";


function App() {
    return (
        <BrowserRouter>
            <Container fluid className={"p-0"}>
                <Row noGutters>
                    <Col xs={12}>
                        <NavBar/>
                    </Col>
                </Row>
                <Row noGutters className={"justify-content-center m-3"}>
                    <Col xs={10}>
                        <Switch>
                            <Route exact path={"/"} component={ExercisesList}/>
                            <Route path={"/exercise"} component={CreateExercise}/>
                            <Route path={"/user"} component={CreateUser}/>
                            <Route path={"/edit/:id"} component={EditExercise}/>
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </BrowserRouter>
    );
}

export default App;
