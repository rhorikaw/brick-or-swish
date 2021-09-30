import React, {useContext, useState, useEffect } from 'react';
import axios from 'axios';

import { UserContext } from '../UserContext';
import defaultPfp from '../assets/blank-profile.png';

import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import {faSearch, faUserPlus, faTimes, faCheck, faUserClock, faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const baseURL = "https://brick-or-swish.herokuapp.com";
// const baseURL = "http://localhost:4000";

const StyledForm = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
`

const FlexDiv = styled.div`
    display:flex;
    align-items: center;
`

const SpacedFlexDiv = styled(FlexDiv)`
    justify-content: space-between;
    background-color: white;
    border: 1px solid rgba(0,0,0,0.05);
    border-radius: 15px;
    padding: 10px 10px;
    margin: 10px 10px;
    p {
        margin: 0;
    }
`


const PfpThumbnail = styled.img`
    width: 100px;
    height: 100px;
    padding: 10px 10px;
    border-radius: 50%;
`

const StyledIconButton = styled.div`
    font-size: 15px;
    background-color: gray;
    color: white;
    border-radius: 4px;
    padding: 5px;
    margin: 0 5px;
    &:hover {
        cursor: pointer;
        opacity: 0.75;
    }
`

const AcceptIconButton = styled(StyledIconButton)`
    background-color: #3f51b5;
    &:hover {
        cursor: pointer;
        opacity: 0.75;
    }
`

const BlueIconButton = styled(AcceptIconButton)`
    opacity: 0.75;
    &:hover {
        cursor: pointer;
        opacity: 0.55;
    }
`

const Container = styled.div`
    margin-left: auto;
    margin-right: auto;
    width: 1000px;
    text-align: left;
    padding: 15px 50px;
`

function UserButton(props){
    const [isSent, setIsSent] = useState(props.friend.requests.includes(props.currUser.id))

    const sendRequest = function(currUser, userId){
        return async function() {
            try{
                setIsSent(true);
                await axios.put(`${baseURL}/user/add`, 
                {
                    currUser: currUser,
                    id: userId
                });
            }catch(err){
                alert(err);
            }
        }   
    }

    const cancelRequest = function(currUser, userId){
        return async function() {
            try{
                setIsSent(false);
                await axios.put(`${baseURL}/api/user/cancel`, 
                {
                    currUser: currUser,
                    id: userId
                });
            }catch(err){
                alert(err);
            }
        }   
    }
    
    if(props.currUser.id !== props.friend._id ){
        return(
            <>
                {props.currUser.friends.includes(props.friend._id) ?
                <BlueIconButton onClick={sendRequest(props.currUser.id, props.friend._id)}>
                    Send Message <FontAwesomeIcon icon={faPaperPlane}/>
                </BlueIconButton>
                :
                <>
                    {!isSent ? 
                    <BlueIconButton onClick={sendRequest(props.currUser.id, props.friend._id)}>
                        Send Friend Request <FontAwesomeIcon icon={faUserPlus}/>
                    </BlueIconButton>
                    :
                    <StyledIconButton onClick={cancelRequest(props.currUser.id, props.friend._id)}>
                        Cancel Friend Request <FontAwesomeIcon icon={faUserClock}/>
                    </StyledIconButton>}
                </>
                }
            </>
        );
    }
    return (
        <>
        </>
    )
}

function User(props){
    const {user, setUser} = useContext(UserContext);
    const [userList, setUserList] = useState([]);

    useEffect( () => {
        if(props.request){
            console.log(props);
            axios.get(`${baseURL}/api/users`, {
                params: {
                    userIds: props.users
                }
            })
            .then( res => {
                setUserList(res.data);
            })
            .catch( err => {
                alert("Could not retrieve user data");
            })
        } 
       
    }, []);
    
    const acceptRequest = function(currUser, userId){
        return async function() {
            try{
                var newUser = JSON.parse(JSON.stringify(user));
                const friend = await axios.put(`${baseURL}/api/user/confirm`,
                {
                    currUser: currUser,
                    id: userId
                });
                newUser.friends.push(friend.newFriend);
                newUser.requests = newUser.requests.filter(req => req !== userId);
                setUser(newUser);
            }catch(err){
                alert(err);
            }
        }
    }
    
    const rejectRequest = function(currUser, userId){
        return async function() {
            console.log("Reject Button Pressed");
            try{
                var newUser = JSON.parse(JSON.stringify(user));
                await axios.put(`${baseURL}/api/user/reject`,
                {
                    currUser: currUser,
                    id: userId
                });
                newUser.requests = newUser.requests.filter(req => req !== userId);
                setUser(newUser);
            }catch(err){
                alert(err);
            }
        }
    }

    if(props.request){
        return (
            <>
                {userList.map( friend => 
                    <SpacedFlexDiv key={friend._id}>
                        <FlexDiv>
                            <PfpThumbnail src={defaultPfp} alt="pfp"></PfpThumbnail>
                            <div>
                                <p><b>{friend.fullName}</b></p>
                                <p>{friend.username}</p>
                                {
                                    props.currUser.friends.includes(friend._id) &&
                                    <p>Friends</p> 
                                }
                                <p>{props.currUser.friends.filter(function(val){
                                    return friend.friends.indexOf(val) !== -1;
                                }).length} Mutual Friends</p>
                            </div>
                        </FlexDiv>
                        {
                            <FlexDiv>
                                <AcceptIconButton onClick={acceptRequest(props.currUser.id, friend._id)}>
                                    Accept <FontAwesomeIcon icon={faCheck}/>
                                </AcceptIconButton>
                                <StyledIconButton onClick={rejectRequest(props.currUser.id, friend._id)}>
                                    Reject <FontAwesomeIcon icon={faTimes}/>
                                </StyledIconButton>
                            </FlexDiv>
                        }
                        
                    </SpacedFlexDiv>
                    )
                }
            </>
        )
    }
    return (
        <>
            {props.users.map( friend => 
                <SpacedFlexDiv key={friend._id}>
                    <FlexDiv>
                        <PfpThumbnail src={defaultPfp} alt="pfp"></PfpThumbnail>
                        <div>
                            <p><b>{friend.fullName}</b></p>
                            <p>{friend.username}</p>
                            {
                                props.currUser.friends.includes(friend._id) &&
                                <p>Friends</p> 
                            }
                            {
                                props.currUser.id !== friend._id  && (
                                    <p>{props.currUser.friends.filter(function(val){
                                        return friend.friends.indexOf(val) !== -1;
                                    }).length} Mutual Friends</p>
                                )
                            }
                        </div>
                    </FlexDiv>
                    <UserButton currUser={props.currUser} friend={friend}/>
                </SpacedFlexDiv>
                )
            }
        </>
    )
}

export default function AddFriend(){
    const {user} = useContext(UserContext);
    const [search, setSearch] = useState('');
    const [searchPage, setSearchPage] = useState(1);
    const [userRes, setUserRes] = useState([]);

    const updateSearchString = function(event) {
        setSearch(event.target.value);
    }

    const handleSearch = function(event){
        setUserRes([]);
        setSearchPage(1);
        getUsers();
    }

    const getUsers = async () => {
        try{
            var userInfo = await axios.get(`${baseURL}/api/users`, {
                params: {
                    searchFilter: search,
                    pageNum: searchPage - 1
                }
            });
            setUserRes(userInfo.data.users);
        }catch(err){
            alert(err);
        }
    }

    const handleKeyPress = (event) => {
        if(event.key === "Enter"){
            event.preventDefault();
            setUserRes([]);
            setSearchPage(1);
            getUsers();
        }
    }

    return(
        <div>
            <StyledForm onKeyPress={handleKeyPress}>
                <TextField id="search-bar" label="Search" variant="outlined" onChange={updateSearchString} /> 
                <IconButton onClick={handleSearch}>
                    <FontAwesomeIcon icon={faSearch}/>    
                </IconButton>
            </StyledForm>
                <br/> <br/>
            {
               userRes.length === 0 &&
                (
                    <>
                        <p>Look up a user by their name, username, or email</p>
                    </> 
                ) 
            }
            <Container>
                <h2>Friend Requests</h2>
                {
                    user.requests.length === 0 ? (
                        <>
                            <p>No pending requests</p>
                        </>
                    ) : (
                        <>
                            <User currUser={user} users={user.requests} request={true}/>
                        </>
                    )
                }
            </Container>
            <Container>
                <h2>Search Results</h2>
                <User currUser={user} users={userRes}/>
            </Container>
        </div>
    )
}