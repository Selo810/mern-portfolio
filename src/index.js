import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import registerServiceWorker from './components/registerServiceWorker';

import SkillBox from './components/skills/SkillBox';
import ProjectBox from './components/projects/ProjectBox';
import JobBox from './components/jobs/JobBox';
import Nav from './components/Nav';
import Header from './components/Header';
import Footer from './components/Footer';


const App = () => (
  <Router>
    <div style={{height: "100%"}}>
      <section id="appContainer" className="">
      <Nav/>
      <Header/>
      <JobBox url='http://localhost:3001/api/jobs' pollInterval={2000} />
      <ProjectBox url='http://localhost:3001/api/projects' pollInterval={2000} />
      <SkillBox url='http://localhost:3001/api/skills' pollInterval={2000} />
      <Footer/>
      </section>
    </div>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

