import React, { Component } from "react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'

export default class ExperimentsList extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          email: "",
        };
        // this.onCreateExperiment= this.onCreateExperiment.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }

    onSubmit(e) {
        e.preventDefault();
        console.log('onononn');
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.setState({ email : currentUser});

        var exp = {
            email : currentUser
        };

        axios.post("http://localhost:4000/booking/createxperiment", exp).then(res => {
            console.log("Creating: \n");
            console.log(res.data);
            if(res.data.success === true)
            {
                this.props.history.push("/sessionsList");
            }
            else
            {
                alert(res.data.res);
            }
            });
    }


    onClickLink(link){
        localStorage.setItem("currentExperimentID",JSON.stringify(link.target.id));
        this.props.history.push("/experiment");
    }
    





    render() {
        return (
            <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/sessionsList">Back to Sessions List    </Nav.Link>
                    {/* <Nav.Link href="/session">Create Experiment   </Nav.Link> */}
                    {/* <Navbar.Brand href="/startSession">Start Session    </Navbar.Brand> */}
                    </Nav>
                    <Nav>
                        <Nav.Link href="/">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <br/>
            {/* <form onSubmit={this.onCreateExperiment}>
                <button className='btn-primary' type="submit">Create Experiment</button>
            </form> */}
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <input type="submit" value="Create Experiment" className="btn btn-primary" />
                </div>
            </form>
            <br/>
            
            <h1>Experiments: </h1> 
            <br/>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Experiment ID</th>
                    <th>Experiment Name</th>
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