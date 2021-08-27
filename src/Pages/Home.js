import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fullName: '',
            username: '',
            redirect: false,
            isLoading: true,
            proxy_info: props.proxy_info
        }
        axios.defaults.withCredentials=true;
    }

    componentDidMount(){
        axios.get('https://brick-or-swish.herokuapp.com/api/user',
            /*{
                proxy: this.state.proxy_info
            }*/)
            .then( 
            res => {
                this.setState({
                    fullName: res.data.name,
                    username: res.data.username,
                    redirect: false,
                    isLoading: false,
                })
                })
            .catch( err => {
                if(parseInt(err.message.split(' ').slice(-1).pop()) === 401){
                    this.setState({
                        redirect: true,
                        isLoading: false
                    });
                }
                
            }
            
        )
    }

    render(){
        return (
            <>
                {
                    this.state.isLoading &&
                    <h1>One moment...</h1>
                }
                {
                    !this.state.redirect && !this.state.isLoading &&
                    <>
                        <h1>Welcome to Brick or Swish,</h1>
                        <h1>{this.state.fullName}</h1>
                        <h2>What is Brick or Swish?</h2>
                        <p>Brick or Swish is a application that is primarily for keeping track of
                            NBA players and their individual stats. Use this to draw out your full
                            potential in your Fantasy Leagues and get intricate, detailed data that 
                            is not available elsewhere!
                        </p>
                    </>
                }
                {
                    this.state.redirect && !this.state.isLoading &&
                    <>
                        <Redirect to="/login"/>
                    </>
                }
                
            </>
        )
    }
}