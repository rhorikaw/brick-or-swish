import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';


export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            auth:false,
            proxy_info: props.proxy_info
        }
        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        console.log(props.proxy_info);
    }

    userLogin = () =>{
        axios.post("https://brick-or-swish.herokuapp.com/api/login", 
        {
            email: this.state.email,
            password: this.state.password,
        },
        /*{
            proxy: this.state.proxy_info
        }*/)
        .then( () => {
            this.setState({
                auth: true
            })
        }).catch( err => {
            let errCode = parseInt(err.message.split(' ').slice(-1).pop());
            if(errCode === 401){
                this.setState({
                    redirect: true,
                    isLoading: false
                });
            }else if(errCode === 500){
                alert("We are experiencing trouble with the servers. ): Please email richmondhorikawa@gmail.com if it is urgent!")
            }
        })
    }

    guestLogin = () =>{
        axios.post("https://brick-or-swish.herokuapp.com/api/login", 
        {
            email: 'iam@guest.com',
            password: 'iamaguest',
        },
        /*{
            proxy: this.state.proxy_info
        }*/)
        .then( () => {
            this.setState({
                auth: true
            })
        }).catch( () => {
            alert("Wrong username or password");
        })

    }

    updateEmail(event){
        this.setState({
            email: event.target.value
        })
    }

    updatePassword(event){
        this.setState({
            password: event.target.value
        })
    }

    handleKeyPress = (event) => {
        if(event.key === "Enter"){
            this.userLogin();
        }
    }

    render(){
        if(this.state.auth){
            return (<Redirect to="/home"/>)
        }
        return (
            <div>
                <h3>Log into your account</h3>
                <form  onKeyPress={this.handleKeyPress} noValidate autoComplete="off">
                    <TextField id="email" label="Email" variant="outlined" onChange={this.updateEmail} value={this.state.email}/> <br/><br/>
                    <TextField id="password" label="Password" variant="outlined" type="password" onChange={this.updatePassword} value={this.state.password}/> <br/><br/>
                    <Button onClick={this.userLogin}>Log In</Button>
                </form>
                <p>Don't have an account? Create one <Link to="/register" prop>here</Link> or continue as a <Link onClick={this.guestLogin}>guest</Link>.</p>
            </div>
        )
    }
}