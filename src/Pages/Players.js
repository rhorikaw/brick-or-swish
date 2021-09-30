import React, {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import { UserContext } from '../UserContext';

import styled from 'styled-components';

import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem'

import {faSearch, faPlus, faUserMinus, faArrowRight, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


const filterTeamOptions = [
    "All Teams",
    // Atlantic
    "Boston Celtics",
    "Brooklyn Nets",
    "New York Knicks",
    "Philadelphia 76ers",
    "Toronto Raptors",
    // Central
    "Chicago Bulls",
    "Cleveland Cavaliers",
    "Detroit Pistons",
    "Indiana Pacers",
    "Milwaukee Bucks",
    // Southeast
    "Atlanta Hawks",
    "Charlotte Hornets",
    "Miami Heat",
    "Orlando Magic",
    "Washington Wizards",
    // Northwest
    "Denver Nuggets",
    "Minnesota Timberwolves",
    "Oklahoma City Thunder",
    "Portland Trail Blazers",
    "Utah Jazz",
    // Pacific 
    "Golden State Warriors",
    "LA Clippers",
    "Los Angeles Lakers",
    "Phoenix Suns",
    "Sacramento Kings",
    // Southwest
    "Dallas Mavericks",
    "Houston Rockets",
    "Memphis Grizzlies",
    "New Orleans Pelicans",
    "San Antonio Spurs"
];

const StyledForm = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
`

const FlexDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const PageLabel = styled.p`
    padding: 0 20px;
`

const CenterTable = styled.table`
    margin: auto;
    border-collapse: collapse;
`
const StyledTH = styled.th`
    padding: 5px 20px;
    background: #3f51b5;
    color: white;
    font-weight: normal;
    border: 2px solid #3f51b5;
`

const StyledClickableTH = styled(StyledTH)`
    &:hover{
        cursor: pointer;
        opacity: 0.75;
    }
`

const StyledTR = styled.tr`
    &:nth-child(even){
        background: #eceef8
    }
`

const StyledTD = styled.td`
    padding: 5px 15px;
`

const NavLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`

const StyledIconButton = styled.div`
    font-size: 20px;
    color: rgba(0,0,0,0.54);
    &:hover {
        cursor: pointer;
        opacity: 0.35;
    }
`

const PlayerAddButton = styled(StyledIconButton)`
    font-size: 15px;
    padding: 5px 5px;
    color: rgba(255,255,255,0.9);
    background: #3f51b5;    
    border-radius: 5px;
`

const PlayerDeleteButton = styled(PlayerAddButton)`
    background: rgba(0,0,0,0.54);
`

const StyledFadedIcon = styled.div`
    font-size: 20px;
    color: rgba(0,0,0,0.25);
`

function playerExists(playerId, roster){
    for(let player of roster){
        if(playerId === player.id){
            return true;
        }
    }
    return false;
}

export default function PlayerList(){
    const {user, setUser} = useContext(UserContext);
    const [search, setSearch] = useState('');
    const [teamFilter, setTeamFilter] = useState("All Teams");
    const [searchPage, setSearchPage] = useState(1);
    const [playerRes, setPlayerRes] = useState([]);
    const [playerCount, setPlayerCount] = useState(0);
    const [searchCategory, setSearchCategory] = useState('points');

    const updateSearchString = function(event) {
        setSearch(event.target.value);
    }

    const handleSearch = function(event){
        setPlayerRes([]);
        setSearchPage(1);
        getModernPlayers();
    }

    const handlePageIncrease = function(event){
        if(searchPage < 22){
            setPlayerRes([]);
            setSearchPage(searchPage + 1);
            getModernPlayers();
        }
    }

    const handlePageDecrease = function(event){
        if(searchPage > 1){
            setPlayerRes([]);
            setSearchPage(searchPage - 1);
            getModernPlayers();
        }
    }

    const handleTeamSelect = function(event){
        setTeamFilter(event.target.value);
    }

    const getModernPlayers = async () => {
        try{
            var playerInfo = await axios.get('http://localhost:4000/api/players', {
                params: {
                    pageNum: searchPage - 1,
                    searchCategory: searchCategory,
                    teamFilter: teamFilter,
                    nameFilter: search
                }
            });
            setPlayerRes(playerInfo.data.players);
            setPlayerCount(playerInfo.data.playerCount);
        }catch(err){
            alert(err);
        }
    }

    const handleHeaderClick = function(categoryName){
        return function() {
            setSearchCategory(categoryName);
            setPlayerRes([]);
            setSearchPage(1);
            getModernPlayers();
        }   
    }

    const handleAddition = function(player){
        return function() {
            var newUser = JSON.parse(JSON.stringify(user));
            axios.put('http://localhost:4000/api/team/add', {player:player});
            newUser.team.push(player);
            setUser(newUser);
            console.log("player has been added to the team!");
        }
    }

    const handleDeletion = function(playerID){
        return function() {
            var newUser = JSON.parse(JSON.stringify(user));
            axios.put('http://localhost:4000/api/team/delete', {playerID: playerID});
            newUser.team = newUser.team.filter(player => player.id !== playerID);
            setUser(newUser);
        }
    }

    const handleKeyPress = (event) => {
        if(event.key === "Enter"){
            event.preventDefault();
            handleSearch();
        }
    }
   
    // if(playerRes.length === 0){
    //     getModernPlayers();
    // }
    useEffect( () => {
        axios.get('http://localhost:4000/api/players', {
            params: {
                pageNum: searchPage - 1,
                searchCategory: searchCategory,
                teamFilter: teamFilter,
                nameFilter: search
            }
        })
        .then(res => {
            setPlayerRes(res.data.players);
            setPlayerCount(res.data.playerCount);
        })
        .catch(err =>{
            alert(err);
        })
    }, [])

    return(
        <div>
            <StyledForm onKeyPress={handleKeyPress}>
                <TextField select variant="outlined" value={teamFilter} onChange={handleTeamSelect}>
                    {filterTeamOptions.map( (team) => (
                        <MenuItem key={team} value={team}>
                            {team}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField id="search-bar" label="Search" variant="outlined" onChange={updateSearchString} /> 
                <IconButton onClick={handleSearch}>
                    <FontAwesomeIcon icon={faSearch}/>    
                </IconButton>
            </StyledForm>
                <br/> <br/>
            {
               playerRes.length === 0 ?
                (
                    <>
                        <CircularProgress></CircularProgress>
                        <p>Loading... Please wait</p>
                    </> 
                )
                : (
                    <>
                        <p>Click on the table headers to sort by a particular stat. (Default: PPG)</p>
                        <CenterTable>
                            <thead>
                                <tr>
                                    <StyledTH></StyledTH>
                                    <StyledTH>Name</StyledTH>
                                    <StyledTH>Team</StyledTH>
                                    <StyledTH>Pos</StyledTH>
                                    <StyledClickableTH onClick={handleHeaderClick("minutes")}>Min</StyledClickableTH>
                                    <StyledClickableTH onClick={handleHeaderClick("points")}>PPG</StyledClickableTH>
                                    <StyledClickableTH onClick={handleHeaderClick("rebounds")}>Reb</StyledClickableTH>
                                    <StyledClickableTH onClick={handleHeaderClick("assists")}>Ast</StyledClickableTH>
                                    <StyledClickableTH onClick={handleHeaderClick("steals")}>Stl</StyledClickableTH>
                                    <StyledClickableTH onClick={handleHeaderClick("blocks")}>Blk</StyledClickableTH>
                                    <StyledClickableTH onClick={handleHeaderClick("fg_pct")}>FG %</StyledClickableTH>
                                    <StyledClickableTH onClick={handleHeaderClick("fg3_pct")}>3PT %</StyledClickableTH>
                                </tr>
                            </thead>
                            <tbody>
                                {playerRes.map(players => 
                                <StyledTR key={players.id}>
                                    <StyledTD>
                                        {
                                            !playerExists(players.id, user.team) 
                                            ?
                                            (<PlayerAddButton onClick={handleAddition(players)}>
                                                Add <FontAwesomeIcon icon={faPlus}/>    
                                            </PlayerAddButton>)
                                            :
                                            (
                                                <PlayerDeleteButton onClick={handleDeletion(players.id)}>
                                                    Delete <FontAwesomeIcon icon={faUserMinus}/>
                                                </PlayerDeleteButton>
                                            )
                                            
                                        }
                                    </StyledTD>
                                    <StyledTD><NavLink to={{
                                        pathname: `/players/${players.id}`,
                                        playerProps: players
                                    }}>{players.name}</NavLink></StyledTD>
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
                        <FlexDiv>
                            {
                                searchPage > 1 ?
                                (
                                    <StyledIconButton onClick={handlePageDecrease}>
                                        <FontAwesomeIcon icon={faArrowLeft}/>
                                    </StyledIconButton>
                                ) : (
                                    <StyledFadedIcon>
                                        <FontAwesomeIcon icon={faArrowLeft}/>
                                    </StyledFadedIcon>
                                )
                            }
                            <PageLabel>Page {searchPage}/{Math.ceil(playerCount/25)}</PageLabel>
                            {
                                searchPage < Math.ceil(playerCount/25) ? 
                                (
                                    <StyledIconButton onClick={handlePageIncrease}>
                                        <FontAwesomeIcon icon={faArrowRight}/>
                                    </StyledIconButton>
                                ) :(
                                    <StyledFadedIcon>
                                        <FontAwesomeIcon icon={faArrowRight}/>
                                    </StyledFadedIcon>
                                )
                            }
                            
                        </FlexDiv>
                    </>    
                )
            }
        </div>
    )
}