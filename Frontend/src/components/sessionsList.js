import React, { Component } from "react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';
import moment from 'moment';
import { GetBookedSession,DeleteSession } from "../Sources/Auth";
export default class SessionsList extends Component {
 
   constructor(props) {
       super(props);
  
       this.state = {
         sessions: [],
         sessionsToShow : [],
         sessionDate : "",
         
       };
       this.viewExperiments = this.viewExperiments.bind(this);
       this.deleteSession = this.deleteSession.bind(this);
       this.onChangeSessionDate = this.onChangeSessionDate.bind(this);
       this.showAll = this.showAll.bind(this);
     }
 
     showAll(){
       console.log(this.state.sessions);
       this.setState({
        sessionsToShow : this.state.sessions,
       });
     }

    async onChangeSessionDate(momentDate) {
      console.log("value:\n");
      // var date = "ALL";
      var date = momentDate ? moment(momentDate).format('YYYY-MM-DD') : undefined;
      console.log(date);
      // this.setState({ sessionDate: momentDate });
      var NewSessions = []
      // console.log(this.state.sessions);
      var OldSessions = this.state.sessions
      console.log(OldSessions);
      for (let index = 0; index < OldSessions.length; index++) {
        console.log(OldSessions[index].sessionDate);
        if(OldSessions[index].sessionDate == date)
        {
          NewSessions.push(OldSessions[index]);
        }
      }
      console.log(NewSessions);
      this.setState({
        sessionsToShow : NewSessions,
      });
      
    }


 
     async componentDidMount() {
       var user_email = JSON.parse(localStorage.getItem('currentUser'));
       console.log("going to get sessions");
       /**
        * Function to get sessiondata 
        */
        var session = await GetBookedSession();
        session.sort((a,b) => {
          return a.sessionDate < b.sessionDate;
        });
        this.setState({sessions : session, 
          // sessiondate : "ALL",
           sessionsToShow : session
        });
     }
 
     
     viewExperiments(e) {
        // e.preventDefault();
    //    localStorage.setItem("current_session_id",JSON.stringify(e));
       console.log(e);
       this.props.history.push({
        pathname: "/experimentsList",
        state: { id : e }
      })
     }

    async deleteSession(e) {
      
  //    localStorage.setItem("current_session_id",JSON.stringify(e));
    //  console.log("vvvvvvvvv=== " + e);
      var req = {
        session_id : e,
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
           <div>
             SelectDate: 
           <DatePicker

              selected={this.state.sessionDate}
              // onSelect={this.state.sessionDate} //when day is clicked
              onChange={this.onChangeSessionDate} //only when value has changed
              />
              <button onClick={this.showAll}>
              Show All
              </button>
           </div>
           
           {/* <div className="form-group">
                    <label>Date : </label>
                    <DatePicker
                    // onSelect={this.onChangeSessionDate}
                    selected={this.state.sessionDate}
            />
            </div> */}
           <table className="table table-striped">
               <thead>
               <tr>
                   <th>Date(YYYY-MM-DD)</th>
                   <th>Time(HH:MM)</th>
                   <th>Experiments Link</th>
                   <th>Delete Session</th>
                  
               </tr>
               </thead>
               <tbody>
           {
           this.state.sessionsToShow.map((j, i) => {
             return (
               <tr>
                 <td>{j.sessionDate}</td>
                 <td>{j.sessionStartTime}</td>
                 <td>
                 <button onClick={() => this.viewExperiments(j.sessionId)}>Enter</button>
                 {/* <form onSubmit={this.viewExperiments}>
                    <div className="form-group">
                        <input type="submit" name="id" value={j.sessionId} placeholder="Enter" className="btn btn-primary" />
                    </div>
                </form> */}



                     {/* <button onClick={this.viewExperiments(j.sessionId)}>{j.sessionId}</button> */}
                 {/* <Button className="btn btn-primary" value={j.sessionId} /> */}
                 </td>

                 <td>
                 <button onClick={() => this.deleteSession(j.sessionId)}>Delete</button>
                 {/* <form onSubmit={this.deleteSession}>
                    <div className="form-group">
                        <input type="submit" name="id" value={j.sessionId} placeholder="Delete" className="btn btn-danger" />
                    </div>
                </form> */}

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
 
