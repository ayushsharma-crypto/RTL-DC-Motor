import React, { Component } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

var data = [
    {
      // name: "Page A",
      RPM: 4000,
      Voltage: 2400,
      Avg_Current: 2400
    },
    {
      name: "Page B",
      RPM: 3000,
      Voltage: 1398,
      Avg_Current: 2210
    },
    {
      name: "Page C",
      RPM: 2000,
      Voltage: 9800,
      Avg_Current: 2290
    },
    {
      name: "Page D",
      RPM: 2780,
      Voltage: 3908,
      Avg_Current: 2000
    },
    {
      name: "Page E",
      RPM: 1890,
      Voltage: 4800,
      Avg_Current: 2181
    },
    {
      name: "Page F",
      RPM: 2390,
      Voltage: 3800,
      Avg_Current: 2500
    },
    {
      name: "Page G",
      RPM: 3490,
      Voltage: 4300,
      Avg_Current: 2100
    }
  ];

export default class Experiment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      data : ''
    };
    // this.onGetData = this.onGetData.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);

  }
  
  componentDidMount(){
    var exp_id  = this.props.location.state.id;
    var req = {
      experiment_id : exp_id
    };
    axios.post("http://localhost:4000/booking/experimentdata", req)
    .then(response => {
        if(response.data.success === true)
        {
            console.log(response.data.data);
            this.setState({data : response.data.data});
        }
    });
  }


  // onSubmit(e)
  // {
  //   e.preventDefault();
  // }




    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link href="/requestSession">Request Session    </Nav.Link>
                        <Nav.Link href="/sessionsList">Back to sessions list    </Nav.Link>
                        
                        {/* <Nav.Link href="/sessionHistory">Session History    </Nav.Link> */}
                        {/* <Navbar.Brand href="/startSession">Start Session    </Navbar.Brand> */}
                        </Nav>
                        <Nav>
                            <Nav.Link href="/">Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <br/>
                <br/>
                <h1>Experiment Analysis{this.state.data.name}</h1>
                <br/>
                <br/>
                <div class = "graph">
                    {/* <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="RPM"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                        />
                        <Line type="monotone" dataKey="Voltage" stroke="#82ca9d" />
                    </LineChart>      */}

                <LineChart width={600} height={400} data={data}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="Voltage" />
                    <YAxis yAxisId="left-axis" />
                    <YAxis yAxisId="right-axis" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left-axis" type="monotone" dataKey="RPM" 
                    stroke="green"/>
                    <Line yAxisId="right-axis" type="monotone" dataKey="Avg_Current" 
                    stroke="red" />
                  </LineChart>
                </div>
                
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Voltage</th>
                        <th>Theoretical RPM</th>
                        <th>Observed RPM</th>
                        <th>Temperature</th>
                        <th>Humidity</th>
                        
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        )
    }
}