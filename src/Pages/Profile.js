import React from 'react';
import axios from 'axios';

export default class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fullName: '',
            username: '',
            teamname: '',
            team: [],
            proxy_info: props.proxy_info
        }
    }

    componentDidMount(){

        axios.get('/api/user',{proxy: this.state.proxy_info})
        .then( 
            res => {
                this.setState({
                    fullName: res.data.name,
                    username: res.data.username
                })
            }
        )

        axios.get('/api/team',{proxy: this.state.proxy_info})
        .then(
            res => {
                this.setState({
                    teamname: res.data.teamName,
                    team: res.data.players
                })
            }
        )
    }

    render(){
        return (
            <>
                <h1>Profile</h1>
                <h1>Name: {this.state.fullName}</h1>
                <h1>Team Name: {this.state.teamname}</h1>
                <h2>What is Brick or Swish?</h2>
                <p>Brick or Swish is a application that is primarily for keeping track of
                    NBA players and their individual stats. Use this to draw out your full
                    potential in your Fantasy Leagues and get intricate, detailed data that 
                    is not available elsewhere!
                </p>
            </>
        )
    }
}