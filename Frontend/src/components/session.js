import React, { Component } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from 'react-bootstrap/Navbar';
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

// var data = [
//     {
//       name: "Page A",
//       uv: 4000,
//       pv: 2400,
//       amt: 2400
//     },
//     {
//       name: "Page B",
//       uv: 3000,
//       pv: 1398,
//       amt: 2210
//     },
//     {
//       name: "Page C",
//       uv: 2000,
//       pv: 9800,
//       amt: 2290
//     },
//     {
//       name: "Page D",
//       uv: 2780,
//       pv: 3908,
//       amt: 2000
//     },
//     {
//       name: "Page E",
//       uv: 1890,
//       pv: 4800,
//       amt: 2181
//     },
//     {
//       name: "Page F",
//       uv: 2390,
//       pv: 3800,
//       amt: 2500
//     },
//     {
//       name: "Page G",
//       uv: 3490,
//       pv: 4300,
//       amt: 2100
//     }
//   ];

export default class Session extends Component {
    constructor() {
        super();
        this.state = {
            videos: [],
            vcc : "",
            graphData : []
        };
        this.onChangevcc = this.onChangevcc.bind(this);
        this.onSubmitvcc = this.onSubmitvcc.bind(this);
        

    }

    async componentDidMount() {
        try {
            var destination = 'http://127.0.0.1:8080/~/in-cse/in-name/AE-RTL-MOTOR/' + this.props.location.state.experiment_id + '/la';

            var receivedData = await fetch(destination);
            var response = await receivedData.json();
            console.log(response);
            const val_array = response.split(' ');

            var formattedData = {
                RPM : parseFloat(val_array[0]),
                Voltage : parseFloat(val_array[1]),
                Avg_Current : parseFloat(val_array[2])
            };
            // var receivedData = await response.json();
            if(this.state.graphData.length == 6)
            {
                var temp = this.state.graphData;
                temp.shift();
                temp.push(formattedData);
                this.setState({
                    graphData : temp
                });
            }
            else
            {
                var temp = this.state.graphData;
                temp.shift();
                temp.push(formattedData);
                this.setState({
                    graphData : temp
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
    onChangevcc(e){
        console.log("get" ,e.target.value);
        this.setState({vcc : e.target.value});
    }

    onSubmitvcc(e){
        e.preventDefault();
        console.log("voltage is " + this.state.vcc);
        this.
        axios.get("http://192.168.1.7/voltage",{ params : {
            voltage : this.state.vcc,
            experiment_id : this.props.location.state.experiment_id
        }}).then(res => {
            console.log(res.data);
            if(res.data.status == 200)
            {
                alert("Value sent");
            }
            else 
            {
                alert("Send value again");
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

                <div class="container">
                    <div class="row">
                        {/* {this.state.videos.map(video =>
                        <div className="col-md-4" key={video.id}>
                            <Link to={`/player/${video.id}`}>
                                <div className="card border-0">
                                    <img src={`http://localhost:4000${video.poster}`} alt={video.name} />
                                    <div className="card-body">
                                        <p>{video.name}</p>
                                        <p>{video.duration}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        )} */}
                        <ReactPlayer url='https://www.youtube.com/watch?v=ZIhKmUGSpIo' />
                    </div>
                    <br/>
                    <br/>
                    <input type="submit" value="Start Session" className="btn btn-success" />
                    &nbsp;
                    <input type="submit" value="Stop Session" className="btn btn-danger" />
                    &nbsp;
                    <input type="submit" value="Save Session" className="btn btn-primary" />

                </div>
                <div>

                <form onSubmit={this.onSubmitvcc}>
                <div className="form-group">
                    <label>VCC : </label>
                    <input
                    type="text"
                    className="form-control"
                    name = "vcc"
                    value={this.state.vcc}
                    onChange={this.onChangevcc}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="submit" className="btn btn-primary" />
                </div>
                </form>


                </div>
                <br/>
                <br/>
                <div class = "graph">
                    <LineChart
                        width={500}
                        height={300}
                        data={this.state.graphData}
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
                            dataKey="pv"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                        />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>     
                </div>
            </div>
        )
    }
}
