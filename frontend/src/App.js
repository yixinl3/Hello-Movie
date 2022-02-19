//Reference: https://dzone.com/articles/create-user-registration-and-login-using-web-api-a
import React from "react";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header, Icon } from "semantic-ui-react";
import Friends from "./components/Friends";
import MyInfo from "./components/MyInfo";
import Movies from "./components/Movies";
function App() {
  return (
    <Router>
      <div className="container">
        <br />
        <Header as="h1" block color='blue'>
          
          <Icon name="film" />
          <Header.Content >Hello Movies</Header.Content>
        </Header>
        <br />
        <Switch>
          <Route exact path="/" component={Login} />

          <Route path="/Signup" component={Signup} />
        </Switch>

        <Switch>
          <Route path="/Dashboard" component={Dashboard} />
        </Switch>
        <Switch>
          <Route exact path="/Movies" component={Movies} />

          <Route path="/Friends" component={Friends} />
          <Route path="/MyInfo" component={MyInfo} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
