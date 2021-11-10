import React, { Component } from "react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Navbar from 'react-bootstrap/Navbar'
import DateTimePicker from 'react-datetime-picker'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';
import moment from 'moment';
export default class RequestSession extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          email: "",
          password: "",
          sessionDate: "",
          StartDate: "",
          availableSlots : [],
          sessionTime : "01:00"
        };

        this.onChangeSessionDate= this.onChangeSessionDate.bind(this);
        this.onChangeSessionTime= this.onChangeSessionTime.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }





    onChangeSessionTime(sessionTime) {
        console.log("value:\n");
        console.log(sessionTime.target.value);
        this.setState({sessionTime : sessionTime.target.value});
      }
      onChangeSessionDate(momentDate) {
        console.log("value:\n");
        var date = momentDate ? moment(momentDate).format('YYYY-MM-DD') : undefined;
        // set state for session time
        // console.log("Hello : " , date);
        this.setState({ sessionDate: momentDate });
        this.setState({StartDate : date});
        // console.log(date);
        
        // let session = 
        // {
        //     params: {
        //         date : date,
        //     }
        // }
        
        

        axios.get("http://localhost:4000/booking/getslot",{ params : {
            date : String(date) }}).then(res => {
            console.log("Got slots: \n");
            console.log(res.data);
            if(res.data.success === true)
            {
                console.log("setting slots");
                this.setState({availableSlots : res.data.slots});
            }
        });


        console.log(this.state.availableSlots);
      }

      onSubmit(e) {
        e.preventDefault();
        // add session to db
        // and redirect to homepage

        console.log("Submitting");
        let session = {
            date : this.state.StartDate,
            starttime : this.state.sessionTime
        };
        console.log(session);

        axios.post("http://localhost:4000/booking/addsession", session).then(res => {
            console.log("Adding session: \n");
            console.log(res.data);
            if(res.data.success === true)
            {
                alert(res.data.res);
                this.props.history.push("/sessionsList");
            }
        });

        
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
                    <label>Date : </label>
                    <DatePicker
                    // selected = {this.state.sessionDate}
                    // dateFormat="YYYY/MM/dd"
                    onSelect={this.onChangeSessionDate}
                    selected={this.state.sessionDate}
                    
                    />
                </div>
                <div className="form-group">
                <label>Time : </label>
                <select onChange={this.onChangeSessionTime}>
                    {this.state.availableSlots.map(slot => {
                        return (
                            <option value={slot} > {slot} </option>
                        )
                    })}
                </select>
                </div>
                
                <div className="form-group">
                    <input type="submit" value="Add Session" className="btn btn-primary" />
                </div>
                </Form>




            </div>
        );
    }




}