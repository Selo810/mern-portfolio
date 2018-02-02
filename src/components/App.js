import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { HashRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import Nav from './Nav';
import Header from './Header';
import Footer from './Footer';
import MainBox from './MainBox';

/*Auth*/
import SignUpPage from './auth/SignUp';
import SignInPage from './auth/SignIn';
import PasswordForgetPage from './auth/PasswordForget';
import HomePage from './Home';
import AccountPage from './auth/Account';
import { firebase } from '../firebase';

import * as routes from '../constants/routes';
import withAuthentication from './withAuthentication';


const App = () =>
      <Router>
        <div style={{height: "100%"}}>
          <section id="appContainer" className="">
          <Nav />
          
          <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
          <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
          <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
          <Route exact path={routes.HOME} component={() => <HomePage />} />
          <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
          
          <Route exact path={routes.WELCOME} component={MainBox}/>
          <Footer/>
          </section>
        </div>
      </Router>
      

  export default withAuthentication(App);

