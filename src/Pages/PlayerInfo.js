import axios from 'axios';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components'

const CenterContainer = styled.div`
    margin: 0 100px;
    text-align: left;
`
const StyledTH = styled.th`
    padding: 5px 15px;
    background: #3f51b5;
    color: white;
    font-weight: normal;
    border: 2px solid #3f51b5;
`

const StyledTR = styled.tr`
    background: #eceef8;
    text-align: center;
    td {
        padding: 5px 15px;
    }
`

const StyledTD = styled.td`
    padding: 5px 15px;
`

export default function PlayerInfo(props){
    const [playerData, setPlayerData] = useState(props.location.playerProps);
    const [isLoading, setLoadStatus] = useState(playerData === undefined);
    useEffect( () => {
        if(playerData === undefined){
            axios.get(`http://localhost:4000/api/players/${window.location.pathname.split('/')[2]}`)
            .then(res => {
                setPlayerData(res.data[0]);
                setLoadStatus(false);
            })
        }
    },[]);


    return (
        <>
        {
            !isLoading &&
            <CenterContainer>
            <h2>Player Profile:</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <StyledTD>{playerData.name}</StyledTD>
                    </tr>
                    <tr>
                        <th>Position</th>
                        <StyledTD>{playerData.position}</StyledTD>
                    </tr>
                    <tr>
                        <th>Team</th>
                        <StyledTD>{playerData.team}</StyledTD>
                    </tr>
                    <tr>
                        <th>Height</th>
                        <StyledTD>{`${playerData.height_feet}'${playerData.height_inches}`}</StyledTD>
                    </tr>
                    <tr>
                        <th>Weight</th>
                        <StyledTD>{playerData.weight_pounds} lbs</StyledTD>
                    </tr>
                </tbody>
                
            </table>

            <h2>Player Stats:</h2>
            <h3>2020-2021 Season:</h3>
            <table>
                <thead>
                    <tr>
                        <StyledTH>Min</StyledTH>
                        <StyledTH>PPG</StyledTH>
                        <StyledTH>Reb</StyledTH>
                        <StyledTH>Ast</StyledTH>
                        <StyledTH>Stl</StyledTH>
                        <StyledTH>Blk</StyledTH>
                        <StyledTH>PF</StyledTH>
                        <StyledTH>FGM</StyledTH>
                        <StyledTH>FGA</StyledTH>
                        <StyledTH>FG %</StyledTH>
                        <StyledTH>3PM</StyledTH>
                        <StyledTH>3PA</StyledTH>
                        <StyledTH>3PT %</StyledTH>
                        <StyledTH>FTM</StyledTH>
                        <StyledTH>FTA</StyledTH>
                        <StyledTH>FT %</StyledTH> 
                    </tr>
                </thead> 
                <tbody>
                    <StyledTR>
                        <td>{playerData.minutes}</td> 
                        <td>{playerData.points}</td>
                        <td>{playerData.rebounds}</td>
                        <td>{playerData.assists}</td>
                        <td>{playerData.steals}</td> 
                        <td>{playerData.blocks}</td>
                        <td>{playerData.pf}</td>
                        <td>{playerData.fgm}</td>
                        <td>{playerData.fga}</td>  
                        <td>{playerData.fg_pct}</td>
                        <td>{playerData.fg3m}</td>
                        <td>{playerData.fg3a}</td>
                        <td>{playerData.fg3_pct}</td>
                        <td>{playerData.ftm}</td>
                        <td>{playerData.fta}</td>
                        <td>{playerData.ft_pct}</td>
                    </StyledTR>
                </tbody>
            </table>          
        </CenterContainer>
        }
        </>
    )
}