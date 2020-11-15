import React from 'react';
import {Link} from "react-router-dom";
import {Nav, Navbar} from "react-bootstrap";

function NavBar(props) {
    return (
        <Navbar bg={"dark"} variant={"dark"} expand={"md"}>
            <Link to={"/"} className={"navbar-brand"}>Exercise Tracker</Link>
            <Navbar.Toggle aria-controls={"basic-navbar-nav"}/>
            <Navbar.Collapse id={"basic-navbar-nav"}>
                <Nav className={"mr-auto"}>
                    <Link className={"nav-link"} to={"/exercise"}>Create Exercise</Link>
                    <Link className={"nav-link"} to={"/user"}>Create User</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;