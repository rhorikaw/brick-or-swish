import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import styled from 'styled-components';
import auth from '../auth';
import {Link} from 'react-router-dom';

const NavLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`

const baseURL = "https://brick-or-swish.herokuapp.com";
// const baseURL = "http://localhost:4000";
export default class Logout extends React.Component{

    async componentDidMount(){
        await axios.get(`${baseURL}/api/logout`);
        auth.logout();
    }

    render(){
        return (
            <div>
                <h3>You have successfully logged out of your account</h3>
                <form noValidate autoComplete="off">
                    <NavLink to="/login">
                        <Button>Log In</Button>
                    </NavLink>
                </form>
                <p>Don't have an account? Create one <Link to="/register">here</Link></p>
            </div>
        )
    }
}