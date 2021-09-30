import {useContext, useState} from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import auth from '../auth';
import { UserContext } from '../UserContext';


const Login = () => {
    const {setUser} = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userLogin = () =>{
        axios.post("http://localhost:4000/api/login",
        // axios.post("https://brick-or-swish.herokuapp.com/api/login", 
        {
            email: email,
            password: password,
        })
        .then( (res) => {
            auth.login();
            setUser(res.data.userData);
        }).catch( err => {
            let errCode = parseInt(err.message.split(' ').slice(-1).pop());
            setEmail('');
            setPassword('');
            if(errCode === 401){
                alert("Wrong username or password!")
            }else if(errCode === 500){
                alert("We are experiencing trouble with the servers. ): Please email richmondhorikawa@gmail.com if it is urgent!")
            }
        })

        
    }

    const guestLogin = () =>{
        axios.post("http://localhost:4000/api/login",
        // axios.post("https://brick-or-swish.herokuapp.com/api/login", 
        {
            email: 'iam@guest.com',
            password: 'iamaguest',
        })
        .then( (res) => {
            setUser(res.body.userData);
            auth.login();
        }).catch( () => {
            alert("Wrong username or password");
        })

    }

    const handleKeyPress = (event) => {
        if(event.key === "Enter"){
            userLogin();
        }
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    
    if(auth.isAuthenticated()){
        return <Redirect to="/home"/>
    }
    return (
        <div>
            <h3>Log into your account</h3>
            <form  onKeyPress={handleKeyPress} noValidate autoComplete="off">
                <TextField id="email" label="Email" variant="outlined" onChange={handleEmail} value={email}/> <br/><br/>
                <TextField id="password" label="Password" variant="outlined" type="password" onChange={handlePassword} value={password}/> <br/><br/>
                <Button onClick={userLogin}>Log In</Button>
            </form>
            <p>Don't have an account? Create one <Link to="/register">here</Link> or continue as a <Button onClick={guestLogin}>guest</Button>.</p>
        </div>
    )
}

export default Login;