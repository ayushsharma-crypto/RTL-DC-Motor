import React, { Component } from "react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'

export default class SessionsList extends Component {

    render() {
        return (
            <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/requestSession">Request Session    </Nav.Link>
                    {/* <Nav.Link href="/sessionHistory">Session History    </Nav.Link> */}
                    {/* <Navbar.Brand href="/startSession">Start Session    </Navbar.Brand> */}
                    </Nav>
                    <Nav>
                        <Nav.Link href="/">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <h1>Sessions: </h1> 
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Time</th>
                    {/* <th>Experiment</th>
                    <th>Session</th> */}
                    <th>Link</th>
                    
                </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
            </div>



        );
    }


}