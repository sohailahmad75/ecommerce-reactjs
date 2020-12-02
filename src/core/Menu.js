import React, {Fragment , useState}  from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button
} from 'reactstrap';
import Avatar from '@material-ui/core/Avatar';
import {Link, withRouter, NavLink} from "react-router-dom";
import '../styles/Menu.scss';
import {isAuthenticate, signOut} from '../auth/Index'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import { API } from "../config";
// import ImageAvatars from '../core/UserImage'
const theme = createMuiTheme({
  palette: {
    secondary: indigo,
  },
});

const isActive = (history, path) => {
  if (history.location.pathname === path) {
      return { color: "rgb(255, 255, 255)" };
  } else {
      return { color: "rgba(255,255,255,.5)" };
  }
};

const Menu = ({history}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
 const { user } = isAuthenticate();
  return (
    <div>
      <MuiThemeProvider theme={theme}>
      <Navbar style={{backgroundColor: '#3f51b5'}} light expand="md" className='navbar-dark'>
        <Link to='/'><NavbarBrand>Let's Buy</NavbarBrand></Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          {isAuthenticate()  && isAuthenticate().user.role === 1 && (
              <NavItem className='nav-links'>
                <NavLink style={isActive(history, "/admin/dashboard")}  to={`/${isAuthenticate().user.role === 1 ? 'admin/dashboard': ''}`} className='nav-link'>
                  Dashboard
                </NavLink>
              </NavItem>
            )}
            <NavItem className='nav-links'>
              <NavLink  to='/' className='nav-link' style={isActive(history, "/")}>
                Home
              </NavLink>
            </NavItem>
          
            <NavItem className='nav-links'>
              <NavLink  to='/shop' className='nav-link' style={isActive(history, "/shop")}>
                Shop
              </NavLink>
            </NavItem>

           
             {isAuthenticate()  && (
              <NavItem className='nav-links'>
                <NavLink style={isActive(history, "/create/product")}  to={`/${isAuthenticate() ? 'create/product': ''}`} className='nav-link'>
                  Sell Product
                </NavLink>
              </NavItem>
            )}

          </Nav>
          {!isAuthenticate()  && (
            <Fragment>
              <NavItem className='nav-links'>
                <Link to='/signin'  activeClassName = 'activeLink' className='menu-link signin-btn'>
                  <Button style={{backgroundColor: 'rgb(43 57 137)', borderColor: 'rgb(63, 81, 181)', color: 'white'}}>SignIn</Button>
                </Link>
              </NavItem>
              <NavItem className='nav-links'>
                <NavLink to='/signup'  activeClassName = 'activeLink' className='menu-link'>
                  <Button style={{backgroundColor: 'rgb(43 57 137)', borderColor: 'rgb(63, 81, 181)', color: 'white'}}>SignUp</Button></NavLink>
              </NavItem>
            </Fragment>
          )}
          {isAuthenticate()  && (
              <NavItem className='nav-links'>
                <NavLink style={isActive(history, "/myads")}  to={`/${isAuthenticate() ? 'myads': ''}`} className='nav-link'>
                  My Ads
                </NavLink>
              </NavItem>
            )}
          {isAuthenticate() && (
            <div>
              <NavItem className='nav-links'>
            <span className='menu-link' style={{color : '#fff' , cursor : "pointer"}}
                  onClick={ () => {
                    signOut(()=> {
                      history.push('/')
                    })
                  }}>
              <Button style={{backgroundColor: 'rgb(43 57 137)', borderColor: 'rgb(63, 81, 181)', color: 'white'}}>Logout</Button>
            </span>
              </NavItem>
            </div>

          )}
          
        </Collapse>
        {isAuthenticate()  && (
              <NavItem className='nav-links'>
                <NavLink style={isActive(history, `/profile/${user._id}`)}  to={`/profile/${user._id}`} className='nav-link'>
                  <Avatar alt={`${user.name}`} src={`${API}/user/photo/${user._id}`} />
                </NavLink>
              </NavItem>
            )}
      </Navbar>
      </MuiThemeProvider>
    </div>
  );
}

export default withRouter(Menu);