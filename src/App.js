
import NavBar from './Components/NavBar';
import PlayerList from './Pages/Players';
import PlayerInfo from './Pages/PlayerInfo';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import Registration from './Pages/Registration';
import Help from './Pages/Help';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
// import Messages from './Pages/Messages';
import AddFriend from './Pages/AddFriend';
import ComingSoon from './Pages/ComingSoon';

import './App.css';
import auth from './auth';
import { ProtectedRoute } from './ProtectedRoute';
import { UserContext } from './UserContext';
import React, {useState, useMemo, useEffect} from 'react';
import { Route, BrowserRouter, Switch, Redirect} from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;

const baseURL = "https://brick-or-swish.herokuapp.com";
// const baseURL = "http://localhost:4000";

function LoginMenu() {
  return (
    <div className="Login">
      <Route exact path="/login" render={() => <Login/>}/>
      <Route exact path="/register" render={() => <Registration />}/>
      <Route exact path="/logout" render={() => <Logout/> }/>
    </div>
  )
}

function UserHome(){
  return (
    <>
      <NavBar/>
      <div id="app-display" className="App">
        <div id="app-overlay" className="App-Overlay"/> 
        <ProtectedRoute exact path="/home" component={Home} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/messages" component={ComingSoon}/>
        <ProtectedRoute exact path="/players" component={PlayerList}/>
        <ProtectedRoute path="/players/:id" component={PlayerInfo}/>
        <ProtectedRoute exact path="/teams" component={ComingSoon}/>
        <ProtectedRoute exact path="/addfriend" component={AddFriend}/>
        <ProtectedRoute exact path="/settings" component={ComingSoon}/>
        <ProtectedRoute exact path="/help" component={Help}/>
      </div>
    </>
  )
}

function App() {
  const [user, setUser] = useState(null);
  const providerValue = useMemo( () => ({user, setUser}), [user, setUser]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${baseURL}/api/user`)
    .then( res => {
      setUser(res.data.userData);
      auth.login();
      setLoading(false);
    })
    .catch( err => {
      auth.logout();
      setLoading(false);
    })
  }, []);


  if(isLoading) {
    return (
      <h1> Loading... </h1>
    )
  }

  console.log(process.env.REACT_APP_DEV_URI)

  return (
    <BrowserRouter >
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/home"/>}/>
       <UserContext.Provider value={providerValue}>
        <Route exact path="/login" render={() => <LoginMenu/>}/>
        <Route exact path="/register" render={() => <LoginMenu />}/>
        <Route exact path="/logout" render={() => <LoginMenu/> }/>
        <Route path="/" render={() => <UserHome />} />
       </UserContext.Provider>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
