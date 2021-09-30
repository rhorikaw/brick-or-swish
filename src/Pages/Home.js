import React, {useContext} from 'react';
import {UserContext} from '../UserContext';
import banner from '../assets/bball.jpg';
import styled from 'styled-components';

const StyledHomeDiv = styled.div`
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${banner});
    display: flex;
    flex-direction: column;
    color: white;
`

function Home(){
    const {user} = useContext(UserContext);
    return (
        <>
            <StyledHomeDiv>
                <h1>Welcome to Brick or Swish,</h1>
                <h1>{user.fullname}</h1>
                <h2>What is Brick or Swish?</h2>
                <p>Brick or Swish is a application that is primarily for keeping track of
                    NBA players and their individual stats. Use this to draw out your full
                    potential in your Fantasy Leagues and get intricate, detailed data that 
                    is not available elsewhere!
                </p>
            </StyledHomeDiv>
            
        </>
    )
}

export default Home;