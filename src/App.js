import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/navbar/Navbar";
import Alert from "./components/layout/alert/Alert";
import About from "./components/layout/pages/About";
import User from "./components/user/User";
import GithubState from "./context/github/GithubState";
import Home from "./components/layout/pages/Home";
import NotFound from "./components/layout/pages/NotFound";

const App = () => {
  return (
    <GithubState>
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' component={User} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
