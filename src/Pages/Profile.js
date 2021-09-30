import React, {useContext} from 'react';
import {UserContext} from '../UserContext';
import axios from 'axios';
import styled from 'styled-components'

import defaultPfp from '../assets/blank-profile.png';

import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const CenterTable = styled.table`
    margin: auto;
    border-collapse: collapse;
`
const StyledTH = styled.th`
    padding: 5px 15px;
    background: #3f51b5;
    color: white;
    font-weight: normal;
    border: 2px solid #3f51b5;
`
const StyledTR = styled.tr`
    &:nth-child(even){
        background: #eceef8
    }
`

const StyledTD = styled.td`
    padding: 5px 15px;
`

const StyledProfile = styled.div`
    display: flex;
    justify-content: center;
    padding: 30px;
`

const ProfileImg = styled.img`
    width: 300px;
    height: 300px;
    border-radius: 50%;
`

const UserInfo = styled.div`
    text-align: left;
    padding: 30px; 
`

const StyledIconButton = styled.div`
    font-size: 20px;
    color: rgba(0,0,0,0.54);
    &:hover {
        cursor: pointer;
        color: rgba(255,0,0,0.75);
    }
`

const baseURL = "https://brick-or-swish.herokuapp.com";
// const baseURL = "http://localhost:4000";

function Profile(){
    const {user, setUser} = useContext(UserContext);

    const handleDeletion = function(playerID){
        return function() {
            var newUser = JSON.parse(JSON.stringify(user));
            axios.put(`${baseURL}/api/team/delete`, {playerID: playerID});
            newUser.team = newUser.team.filter(player => player.id !== playerID);
            setUser(newUser);
        }
    }

    return (
        <>  
            <StyledProfile>
                <ProfileImg src={defaultPfp} alt="pfp"/>
                <UserInfo>
                    <h1>Name: {user.fullname}</h1>
                    <h1>Username: {user.username}</h1>
                    <h1>Team Name: {user.teamname}</h1>
                    <h2>{user.friends.length} friends</h2>
                </UserInfo>
            </StyledProfile>
            
            <CenterTable>
                <thead>
                    <tr>
                        <StyledTH></StyledTH>
                        <StyledTH>Name</StyledTH>
                        <StyledTH>Team</StyledTH>
                        <StyledTH>Pos</StyledTH>
                        <StyledTH>Min</StyledTH>
                        <StyledTH>PPG</StyledTH>
                        <StyledTH>Reb</StyledTH>
                        <StyledTH>Ast</StyledTH>
                        <StyledTH>Stl</StyledTH>
                        <StyledTH>Blk</StyledTH>
                        <StyledTH>FG %</StyledTH>
                        <StyledTH>3PT %</StyledTH>
                    </tr>
                </thead>
                <tbody>
                    {user.team.map(players => 
                    <StyledTR key={players.id}>
                        <StyledTD>
                            <StyledIconButton onClick={handleDeletion(players.id)}>
                                <FontAwesomeIcon icon={faTrashAlt}/>
                            </StyledIconButton>
                        </StyledTD>
                        <StyledTD>{players.name}</StyledTD>
                        <StyledTD>{players.team}</StyledTD>
                        <StyledTD>{players.position}</StyledTD> 
                        <StyledTD>{players.minutes}</StyledTD> 
                        <StyledTD>{players.points}</StyledTD>
                        <StyledTD>{players.rebounds}</StyledTD>
                        <StyledTD>{players.assists}</StyledTD>
                        <StyledTD>{players.steals}</StyledTD> 
                        <StyledTD>{players.blocks}</StyledTD>  
                        <StyledTD>{players.fg_pct}</StyledTD>
                        <StyledTD>{players.fg3_pct}</StyledTD>
                    </StyledTR>)}
                </tbody>
            </CenterTable>
        </>
    )
}

export default Profile;