import React from 'react';
import styled from 'styled-components'

const CenterDiv = styled.div`
  width: 1000px;
  text-align: left;
  margin: 0 auto;
`
function Help(){

    return (
        <>
            <h1>FAQs</h1>
            <CenterDiv>
                <p><b>Why is the website running slow at certain times?</b></p>
                <p>
                    The website makes API calls to the <a href="https://www.balldontlie.io/#introduction">Ball Don't Lie API</a> <></>
                    and the app uses timeouts to prevent the service from throwing a 429 error from excess requests. Your data will
                    be delivered to you, so please be patient with it!
                </p> 

                <p><b>Why are some pages not available/ being loaded?</b></p>
                <p>
                    This service is still in the midst of being developed, as I plan on rolling out more features as I gradually work on it during 
                    my free time. It is possible that you are trying to access a page that is still not available yet.
                </p>

                <p><b>I found a bug, what should I do?</b></p>
                <p>
                    Uh-oh! Please contact me at <a href="mailto:richmondhorikawa@gmail.com">richmondhorikawa@gmail.com</a> and describe
                    exactly what led up to the bug and I'll do my best to fix it right away.
                </p>
            </CenterDiv>
        </>
    )
}

export default Help;