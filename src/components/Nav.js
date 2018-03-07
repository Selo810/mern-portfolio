import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SignOutButton from './auth/SignOut';
import { connect } from 'react-redux';

import * as routes from '../constants/routes';


const Nav = ({ authUser }) =>
 
<div className='Nav'>
<nav>
<div class="nav-wrapper blue-grey darken-4">
<a href="https://github.com/Selo810" target='new' class="brand-logo">GitHub</a>
<a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
<ul class="right hide-on-med-and-down">
    <li><a href="#projects">Projects</a></li>
    <li><a href="#jobs">Work Experience</a></li>
    <li><a href="#skills">Skills</a></li>
    <li><a href="#contactMe">Contact Me</a></li>
    { authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
    }

</ul>
<ul class="side-nav" id="mobile-demo">
    <li>
        <div class="user-view">
        <div class="background">
            <img src="http://www.handsonlabs.org/wp-content/uploads/2015/02/brain-chip2.jpg"/>
        </div>
        <a href="#!user"><img class="circle" src="https://www.elsevier.com/__data/assets/image/0016/102247/pure-icon-profile.png"/></a>
        <a href="#!name"><span class="white-text name">John Doe</span></a>
        <a href="#!email"><span class="white-text email">jdandturk@gmail.com</span></a>
        </div>
    </li>
    <li><a href="#projects">Projects</a></li>
    <li><a href="#jobs">Work Experience</a></li>
    <li><a href="#skills">Skills</a></li>
    <li><a href="#contactMe">Contact Me</a></li>
</ul>
</div>
</nav>
</div>

Nav.contextTypes = {
    authUser: PropTypes.object,
  };

const NavigationAuth = () =>

    <li><SignOutButton /></li>

const NavigationNonAuth = () =>
    
    <li><Link to={routes.SIGN_IN}>Sign In</Link></li>


    const mapStateToProps = (state) => ({
        authUser: state.sessionState.authUser,
      });
      
export default connect(mapStateToProps)(Nav);