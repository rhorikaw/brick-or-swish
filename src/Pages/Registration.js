import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Registration extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            fullName: '',
            username: '',
            password: '',
            loginStatus: false
        }
        this.updateFullName = this.updateFullName.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
    }

    registerNewUser = () =>{
        axios.post("http://localhost:4000/api/signup", 
        {
            fullName: this.state.fullName,
            username: this.state.username, 
            email: this.state.email,
            password: this.state.password
        }).then( () => {
            alert("Successful Registration")
        })

        this.setState({
           fullName: '',
           username: '',
           email: '',
           password: '' 
        })
    }

    updateFullName(event){
        this.setState({
            fullName: event.target.value
        })
    }

    updateUsername(event){
        this.setState({
            username: event.target.value
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
            this.registerNewUser();
        }
    }

    render(){
        return (
            <>
                <div>
                    <h3>New User Registration</h3>
                    <form noValidate autoComplete="off">
                        <TextField id="fullname" label="Full Name" variant="outlined" onChange={this.updateFullName} value={this.state.fullName}/> <br/><br/>
                        <TextField id="username" label="Username" variant="outlined" onChange={this.updateUsername} value={this.state.username}/> <br/><br/>
                        <TextField id="email" label="Email" variant="outlined" onChange={this.updateEmail} value={this.state.email}/> <br/><br/>
                        <TextField id="password" label="Password" variant="outlined" type="password" onChange={this.updatePassword} value={this.state.password}/> <br/><br/>
                        <Button onKeyPress={this.handleKeyPress} onClick={this.registerNewUser}>Register</Button>
                    </form>
                    <p>Already have an account? Log in <Link to="/login">here</Link></p>
                </div>
                
            </>
        )
    }
}