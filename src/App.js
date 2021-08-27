
import NavBar from './Components/NavBar';
import PlayerList from './Pages/Players';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import Registration from './Pages/Registration';
import Home from './Pages/Home';
import Profile from './Pages/Profile';

import './App.css';
import React from 'react';
import { Route, BrowserRouter, Switch, Redirect} from 'react-router-dom';

function LoginMenu(props) {
  return (
    <div className="Login">
      <Route exact path="/" render={() => <Login proxy_info={props.proxy_info}/>}/>
      <Route exact path="/login" render={() => <Login proxy_info={props.proxy_info}/>}/>
      <Route exact path="/register" render={() => <Registration proxy_info={props.proxy_info}/>}/>
      <Route exact path="/logout" render={() => <Logout proxy_info={props.proxy_info}/> }/>
    </div>
  )
}

function UserHome(props){
  return (
    <>
      <NavBar/>
      <div id="app-display" className="App">
        <div id="app-overlay" className="App-Overlay"/>
        <Route exact path="/home" render={() => (
          <Home proxy_info={props.proxy_info}/>
        )}/>
        <Route exact path="/profile" render={() => (
          <Profile proxy_info={props.proxy_info}/>
        )}/>
        <Route exact path="/players" render={() => (
          <PlayerList proxy_info={props.proxy_info}/>
        )}/>
      </div>
      
    </>
  )
}

export default class App extends React.Component{
  constructor(){
    super();
    const IS_DEV = false;

    if(IS_DEV){
      this.state = {
        proxy_info: {
          host: process.env.REACT_APP_DEV_URI,
          port: process.env.REACT_APP_DEV_PORT
        }
      }
    }else{
      this.state = {
        proxy_info: {
          host: process.env.REACT_APP_DEV_URI,
          port: process.env.REACT_APP_DEV_PORT
        }
      }
    }
  }
  
  render(){
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <LoginMenu proxy_info={this.state.proxy_info}/>}/>
            <Route exact path="/login" render={() => <LoginMenu proxy_info={this.state.proxy_info}/>}/>
            <Route exact path="/register" render={() => <LoginMenu proxy_info={this.state.proxy_info}/>}/>
            <Route exact path="/logout" render={() => <LoginMenu proxy_info={this.state.proxy_info}/> }/>
            <Route render={() => <UserHome proxy_info={this.state.proxy_info}/>} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
} 
