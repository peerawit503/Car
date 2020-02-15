import React, { useEffect } from 'react';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/pages/Login';
import Cases from './components/cases/Cases';
import About from './components/pages/About';
import Register from './components/pages/Register';
import Users from './components/users/Users';
import Customers from './components/customer/Customers';
import Executives from './components/executive/Executives';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'
import './App.css'

const App = () => {

  useEffect(() => {
    // Init MaterializeCss js
    M.AutoInit()
  }, [])



  return (
    <>

      <Router>
        <Switch>
          <Route exact path="/about"><About /></Route>
          <Route exact path="/cases"><Cases /> /></Route>
          <Route exact path="/dashboard"><Dashboard /></Route>
          <Route exact path="/register"><Register /></Route>
          <Route exact path="/users"><Users /></Route>
          <Route exact path="/customers"><Customers /></Route>
          <Route exact path="/executives"><Executives /></Route>
          <Route exact path="/"><Login /></Route>
          {/* <Route path="*"><NoMatch /></Route> */ }
        </Switch>
      </Router>
    </>
  );
}

export default App;
