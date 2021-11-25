import React, { Component } from "react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import { GetBookedSession,DeleteSession } from "../Sources/Auth";
export default class SessionsList extends Component {
 
   constructor(props) {
       super(props);
  
       this.state = {
         sessions: [],
       };
       this.viewExperiments = this.viewExperiments.bind(this);
       this.deleteSession = this.deleteSession.bind(this);
     }
 
    
 
     async componentDidMount() {
       var user_email = JSON.parse(localStorage.getItem('currentUser'));
       console.log("going to get sessions");
       /**
        * Function to get sessiondata 
        */
        var session = await GetBookedSession();
        this.setState({sessions : session});
     }
 
     
     viewExperiments(e) {
        e.preventDefault();
    //    localStorage.setItem("current_session_id",JSON.stringify(e));
       console.log(e.target.id.value);
       this.props.history.push({
        pathname: "/experimentsList",
        state: { id : e.target.id.value }
      })
     }

    async deleteSession(e) {
      e.preventDefault();
  //    localStorage.setItem("current_session_id",JSON.stringify(e));
    //  console.log("vvvvvvvvv=== " + e);
      var req = {
        session_id : e.target.id.value
      };
      await DeleteSession(req);
      



   }
 
   render() {
       return (
           <div>
           <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
               <Navbar.Toggle aria-controls="responsive-navbar-nav" />
               <Navbar.Collapse id="responsive-navbar-nav">
                   <Nav className="mr-auto">
                   <Nav.Link href="/requestSession">Request Session    </Nav.Link>
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
                   <th>Experiments Link</th>
                   <th>Delete Session</th>
                  
               </tr>
               </thead>
               <tbody>
           {
           this.state.sessions.map((j, i) => {
             return (
               <tr>
                 <td>{j.sessionDate}</td>
                 <td>{j.sessionStartTime}</td>
                 <td>
                 <form onSubmit={this.viewExperiments}>
                    <div className="form-group">
                        <input type="submit" name="id" value={j.sessionId} className="btn btn-primary" />
                    </div>
                </form>



                     {/* <button onClick={this.viewExperiments(j.sessionId)}>{j.sessionId}</button> */}
                 {/* <Button className="btn btn-primary" value={j.sessionId} /> */}
                 </td>

                 <td>
                 <form onSubmit={this.deleteSession}>
                    <div className="form-group">
                        <input type="submit" name="id" value={j.sessionId} className="btn btn-danger" />
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
 
