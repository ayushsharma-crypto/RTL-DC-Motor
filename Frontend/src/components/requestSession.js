import React, { Component } from "react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Navbar from 'react-bootstrap/Navbar'
import DateTimePicker from 'react-datetime-picker'

export default class RequestSession extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          email: "",
          password: "",
        };
        this.onSubmit = this.onSubmit.bind(this);
      }



    onChangeSessionTime(sessionTime) {
        console.log("value:\n");

        // set state for session time
        // console.log(sessionTime);
        // this.setState({ sessionTime: date });
      }

      onSubmit(e) {
        e.preventDefault();
        // add session to db
        // and redirect to homepage
        this.props.history.push("/sessionsList");
      }
      




    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/sessionsList">Back to sessions list    </Nav.Link>
                    </Nav>
                    {/* <Nav>
                        <Nav.Link href="/">Logout</Nav.Link>
                    </Nav> */}
                </Navbar.Collapse>
                </Navbar>

                <br/>
                <br/>


                <Form onSubmit={this.onSubmit}>
                
                <div className="form-group">
                    <label>Time : </label>
                    <DateTimePicker
                    // value={this.state.sessionTime}
                    // onChange={this.onChangeSessionTime}
                    />
                </div>
                
                <div className="form-group">
                    <input type="submit" value="Add Session" className="btn btn-primary" />
                </div>
                </Form>




            </div>
        );
    }




}