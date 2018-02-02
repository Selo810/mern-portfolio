import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { HashRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import SkillBox from './skills/SkillBox';
import ProjectBox from './projects/ProjectBox';
import JobBox from './jobs/JobBox';
import Nav from './Nav';
import Header from './Header';
import Footer from './Footer';



const MainBox = () =>
      
        <div style={{height: "100%"}}>
          <section id="appContainer" className="">
          <Header/>
          <JobBox url='http://localhost:3001/api/jobs' pollInterval={2000} />
          <ProjectBox url='http://localhost:3001/api/projects' pollInterval={2000} />
          <SkillBox url='http://localhost:3001/api/skills' pollInterval={2000} />
          </section>
        </div>
    
      

  export default MainBox;

