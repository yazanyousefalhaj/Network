import ReactDOM from "react-dom"
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie'
import { AuthPage, ProvideAuth } from "./pages/auth.jsx";
import { NavBar } from './components/NavBar.jsx'
import { HomePage } from "./pages/home.jsx";


const App = () => {



  return (
    <ProvideAuth>
      <Router>
        <NavBar />

        <Switch>
          <Route exact path={`/login/`} component={AuthPage} />
          <Route exact path="/" component={HomePage} />
        </Switch>
      </Router>
    </ProvideAuth>
  )
}


ReactDOM.render(<App />, document.getElementById("app"))
