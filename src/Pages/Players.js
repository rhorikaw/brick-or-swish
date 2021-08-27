import React from 'react';
import axios from 'axios';

import styled from 'styled-components';

import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import {faSearch, faPlus} from '@fortawesome/free-solid-svg-icons';
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

const StyledTD = styled.td``
/*`
    border: 1px solid #eceef8
`*/

function handleAddition(){
    axios.get('https://www.balldontlie.io/api/v1/players' + this.getSearchString() + 'per_page=100&page=' + this.state.pageNum)
}

function PlayerDisplay(props){
    if(!(props.isSearch && props.players.length > 1) && props.players.length < 30){
        return (
            <>
                <CircularProgress></CircularProgress>
                <p>Loading... Please wait</p>
            </>
        )
    }else{
        return (
        <CenterTable>
            <thead>
                <tr>
                    <StyledTH></StyledTH>
                    <StyledTH>Name</StyledTH>
                    <StyledTH>Team</StyledTH>
                    <StyledTH>Pos</StyledTH>
                    <StyledTH>PPG</StyledTH>
                    <StyledTH>Reb</StyledTH>
                    <StyledTH>Ast</StyledTH>
                    <StyledTH>FG %</StyledTH>
                    <StyledTH>3PT %</StyledTH>
                </tr>
            </thead>
            <tbody>
                {props.players.map(players => 
                <StyledTR key={players.id}>
                    <StyledTD>
                        <IconButton onClick={handleAddition}>
                            <FontAwesomeIcon icon={faPlus}/>    
                        </IconButton>
                    </StyledTD>
                    <StyledTD>{players.first_name + ' ' + players.last_name}</StyledTD>
                    <StyledTD>{players.team}</StyledTD>
                    <StyledTD>{players.position}</StyledTD>  
                    <StyledTD>{players.points}</StyledTD>
                    <StyledTD>{players.rebounds}</StyledTD>
                    <StyledTD>{players.assists}</StyledTD>   
                    <StyledTD>{players.fg_pct}</StyledTD>
                    <StyledTD>{players.fg3_pct}</StyledTD>
                </StyledTR>)}
            </tbody>
        </CenterTable>
            
        )
    }
}

export default class PlayerList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            players: [],
            pageNum: 17,
            search: '',
            searchReady: true,
            isLoading: true
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.updateSearchString = this.updateSearchString.bind(this);
    }
    

    convertToIdList(data){
        return data.map( (element) => {
            return element.player_id
        })
    }

    getIdsAsString(data){
        var ret = '';
        for(let i = 0; i < data.data.length; i++){
            ret += data.data[i].id;
            if(i !== data.data.length - 1){
                ret += ',';
            }
        }
        return ret;
    }

    getFullData(playerData, playerStats){
        var fullData = [];
        var currentPlayerIds = this.convertToIdList(playerStats)
        for(let i = 0; i < playerData.length; i++){
            if(currentPlayerIds.includes(playerData[i].id)){
                const statIndex = currentPlayerIds.indexOf(playerData[i].id)
                
                fullData.push({
                    // Player Data
                    "id": playerData[i].id,
                    "first_name": playerData[i].first_name,
                    "last_name": playerData[i].last_name,
                    "height_feet": playerData[i].height_feet,
                    "height_inches": playerData[i].height_inches,
                    "position": playerData[i].position,
                    "weight_pounds": playerData[i].weight_pounds,
                    "team": playerData[i].team.full_name,
                    // Season Stats
                    "minutes": playerStats[statIndex].min,
                    "points": playerStats[statIndex].pts,
                    "rebounds": playerStats[statIndex].reb,
                    "assists": playerStats[statIndex].ast,
                    "fg_pct": playerStats[statIndex].fg_pct,
                    "fg3_pct": playerStats[statIndex].fg3_pct,
                    "ft_pct": playerStats[statIndex].ft_pct
                })
            }
        }
        return fullData;
    }

    getSearchString(){
        if(this.state.search !== ''){
            return '?search=' + this.state.search + '&'
        }
        return '?';
    }

    async getModernPlayers(){
        if(this.state.searchReady){
            var fullPlayerData = [];
            var playerInfo = [];
            var playerStats = [];
            
            try{
                playerInfo = await axios.get('https://www.balldontlie.io/api/v1/players' + this.getSearchString() + 'per_page=100&page=' + this.state.pageNum)
                playerStats = await axios.get('https://www.balldontlie.io/api/v1/season_averages?season=2020&player_ids[]=' + this.getIdsAsString(playerInfo.data))    
            }catch(err){
                alert(err);
            }
            
            fullPlayerData = this.state.players.concat(this.getFullData(playerInfo.data.data, playerStats.data.data))
            if(fullPlayerData.length < 30 && playerInfo.data.meta.next_page !== null){
                this.setState({
                    players: fullPlayerData,
                    pageNum: this.state.pageNum+1,
                }, () => this.getModernPlayers())
            }else{
                this.setState({
                    players: fullPlayerData,
                    isLoading: false
                })
            }
        }
    }

    componentDidMount(){
        this.getModernPlayers();
    }

    // shouldComponentUpdate(nextProps, nextState){
    //     if(nextState.players.length > 50){
    //         return true;
    //     }
    //     return false;
    // }

    handleSearch = (event) => {
        console.log(event);
        this.setState({
            players: [],
            searchReady: true,
            pageNum: 1
        }, () => console.log(this.state.search));
    }

    updateSearchString = (event) => {
        this.setState({
            search: event.target.value,
            searchReady: false
        });
    }

    render(){
        return(
            <div>
                <form>
                    <TextField id="search-bar" onChange={this.updateSearchString} /> 
                    <IconButton onClick={this.handleSearch}>
                        <FontAwesomeIcon icon={faSearch}/>    
                    </IconButton>
                </form>
                 <br/> <br/>
                <PlayerDisplay players={this.state.players} isSearch={this.state.search !== ''}/>
            </div>
        )
    }
}