import React, { Component } from "react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import { GetExperimentList,CreateNewExperiment,DeleteExperimentById } from "../Sources/Auth";    
export default class ExperimentsList extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          email: "",
          experiments : [],
          sessionId : "",
        };
        // this.onCreateExperiment= this.onCreateExperiment.bind(this);
        this.onClickLink = this.onClickLink.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.deleteExperiment = this.deleteExperiment.bind(this);
      }
    
      async componentDidMount() {
        var sess_id  = this.props.location.state.id;
        this.setState({sessionId : sess_id});
        var user_email = JSON.parse(localStorage.getItem('currentUser'));
        console.log('sessID = ' + sess_id);
        console.log("going to get sessions");
        var req = {
            session_id : sess_id
        };
        this.setState({experiments : await GetExperimentList(req)});
      }

      async onSubmit(e) {

        e.preventDefault();
        console.log('onononn');
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.setState({ email : currentUser});
        
        var exp = {
            email : currentUser,
            session_Id : this.state.sessionId,
        };
        await CreateNewExperiment(exp)
    }


    onClickLink(e){
        e.preventDefault();
        this.props.history.push({
            pathname: "/experiment",
            state: { experiment_id : e.target.id.value }
          })
    }


    deleteExperiment(e) {
        e.preventDefault();
        var sess_id  = this.props.location.state.id;
        var req = {
          experiment_id : e.target.id.value,
          session_id : sess_id,
        };
        
        DeleteExperimentById(req);
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
                    {/* <th>Experiment Name</th> */}
                    <th>Link</th>
                    <th>Delete Experiment</th>
                    
                </tr>
                </thead>
                <tbody>
                {
                this.state.experiments.map((j, i) => {
                    return (
                    <tr>
                        <td>{j.ExperimentId}</td>
                        {/* <td>{j.sessionStartTime}</td> */}
                        <td>
                        <form onSubmit={this.onClickLink}>
                            <div className="form-group">
                                <input type="submit" name="id" value={j.ExperimentId} className="btn btn-primary" />
                            </div>
                        </form>


                            {/* <button onClick={this.viewExperiments(j.sessionId)}>{j.sessionId}</button> */}
                        {/* <Button className="btn btn-primary" value={j.sessionId} /> */}
                        </td>
                        <td>
                        <form onSubmit={this.deleteExperiment}>
                            <div className="form-group">
                                <input type="submit" name="id" value={j.ExperimentId} className="btn btn-danger" />
                            </div>
                        </form>

                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
            </div>



        );
    }


}