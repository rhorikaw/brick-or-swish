import React, {useContext} from 'react';
import styled from 'styled-components';
import io from "socket.io-client"

const socket = io.connect("http://localhost:4000");

const CenterDiv = styled.div`
  width: 1000px;
  text-align: left;
  margin: 0 auto;
`
function Messages(){
    
    return (
        <>
            <div>
                Hello World
            </div>
        </>
    )
}

function ChatMessage(props){
    const {text, uid} = props.message;
    
    return <p>{text}</p>
}

export default Messages;