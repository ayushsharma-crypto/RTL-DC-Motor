import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

// import UsersList from './components/allusers'
import Register from './components/register'
import Login from './components/login'
import Home from './components/homepage'
import Session from './components/session'
import Player from './components/player';
import RequestSession from './components/requestSession';
import SessionsList from './components/sessionsList'
import ExperimentsList from './components/experimentsList'
import Experiment from './components/experiment'
import AdminHandler from './components/Admin-Handler'


function App() {
  return (
    <Router>
      <div className="container">
        <br/>
        <Route path="/" exact component={Home}/>
        {/* <Route path="/allusers" exact component={UsersList}/> */}
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        <Route path="/session" component={Session}/>
        <Route path="/player/:id" component={Player}/>
        <Route path="/requestSession" component={RequestSession}/>
        <Route path="/sessionsList" component={SessionsList}/>
        <Route path="/experimentsList" component={ExperimentsList}/>
        <Route path="/experiment" component={Experiment}/>
        <Route path="/Admin-Handler" component={AdminHandler}/>


        </div>
    </Router>
  );
}

export default App;
