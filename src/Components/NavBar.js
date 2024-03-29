import React, {useContext} from 'react';
import {UserContext} from '../UserContext';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
// For Navbar
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// For Drawer
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {faAddressCard, faCommentDots, faUser, faUsers, faUserPlus, faCog, faQuestionCircle, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

const NavLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`

const StyledLink = styled(Link)`
  color: rgba(0, 0, 0, 0.8);
  text-decoration: none;
`

const StyledAppBar = styled(AppBar)`
  z-index: 1300;
`

const StyledToolBar = styled(ToolBar)`
  justify-content: space-between;
`

const StyledDrawer = styled.div`
  width: 220px;
  z-index: 1000!important;
`

const ResponsiveDrawer = styled(Drawer)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1100;
  transform: translateX(-100%);
  transition: transform 250ms cubic-bezier(.5,0,.5,1);
`

const ResponsiveMenu = styled(IconButton)`
  visibility: visible;
`

const AuthButton = styled(Button)`
  justify-self: right;
`

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`

function SelectedIcon(props){
  if(props.index === 0){
    return <FontAwesomeIcon icon={faAddressCard}/>
  }else if(props.index === 1){
    return <FontAwesomeIcon icon={faCommentDots}/>
  }else if(props.index === 2){
    return <FontAwesomeIcon icon={faUser}/>
  }else if(props.index === 3){
    return <FontAwesomeIcon icon={faUsers}/>
  }else if(props.index === 4){
    return <FontAwesomeIcon icon={faUserPlus}/>
  }else if(props.index === 5){
    return <FontAwesomeIcon icon={faCog}/>
  }else if(props.index === 6){
    return <FontAwesomeIcon icon={faQuestionCircle}/>
  }else{
    return <FontAwesomeIcon icon={faSignOutAlt}/>
  }
}

function toggleMenu(){
  if(document.getElementById("app-overlay").style.display === "block"){
    document.getElementById("app-overlay").style.setProperty("display", "none");
    document.getElementById("drawer").style.setProperty("transform", "translateX(-100%)")
    
  }
  else{
    document.getElementById("app-overlay").style.setProperty("display", "block");
    document.getElementById("drawer").style.setProperty("transform", "translateX(0%)")
  }
  ;
}
  
export default function ButtonAppBar() {
  const {user} = useContext(UserContext);
  React.useEffect( () => {
    function handleResize() {
      if(document.getElementById("app-overlay") && window.innerWidth > 840){
        document.getElementById("app-overlay").style.setProperty("display", "none");
        // document.getElementById("drawer").style.setProperty("display", "flex" );
      }else{
        // document.getElementById("drawer").style.setProperty("display", "none" );
      }
    }
    window.addEventListener('resize', handleResize)
  })
 
  return (
    <>
      <CssBaseline/>
      <StyledAppBar position="fixed">
        <StyledToolBar>
            <FlexContainer>
              <ResponsiveMenu onClick={toggleMenu} edge="start" color="inherit" aria-label="menu">
                <FontAwesomeIcon icon={faBars}/>
              </ResponsiveMenu>
              
              <Typography variant="h6">
                <NavLink to="/home">
                  Brick or Swish
                </NavLink>
              </Typography>
            </FlexContainer>
            
          
          <div>
            {
              user === null &&
              <>
                <AuthButton color="inherit">
                  <NavLink to="/register">
                    Register
                  </NavLink>
                </AuthButton>

                <AuthButton color="inherit">
                  <NavLink to="/login">
                    Login
                  </NavLink>
                </AuthButton>
              </>
            }
              
          </div>
          
        </StyledToolBar>
      </StyledAppBar>
      <ResponsiveDrawer id="drawer" variant="permanent">
        <ToolBar />
        <StyledDrawer>
          <List>
            {['Profile', 'Messages', 'Players', 'Teams', 'Add Friend'].map((text, index) => (
              <StyledLink key={text} to={`/${text.split(" ").join("").toLowerCase()}`}>
                <ListItem button key={text}>
                  <ListItemIcon><SelectedIcon index={index}/></ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </StyledLink>
            ))}
          </List>
          <Divider />
          <List>
            {['Settings', 'Help', 'Log Out'].map((text, index) => (
              <StyledLink key={text} to={`/${text.split(" ").join("").toLowerCase()}`}>
                <ListItem button key={text}>
                  <ListItemIcon><SelectedIcon index={5+index}/></ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </StyledLink>
            ))}
          </List>
        </StyledDrawer>
      </ResponsiveDrawer>
    </>
  );
}