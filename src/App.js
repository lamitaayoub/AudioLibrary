import React, { Component } from 'react';
import classes from './App.css';
import Navigation from './components/UI/Navigation/Navigation'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FullCard from './components/FullCard/FullCard';
import SignIn from './containers/SignIn/SignIn';
import SignUp from './containers/SignUp/SignUpForm';
import CardViewLibrary from './containers/CardViewLibrary/CardViewLibrary';
import { AuthProvider } from './Auth';
import PrivateRoute from './PrivateRoute';



class App extends Component {
  render() {
    return (
      <div className={classes.App}>
      <AuthProvider>
        <BrowserRouter>
          <Navigation />
          <Switch>
            <PrivateRoute exact path="/" component={CardViewLibrary} />
            <Route exact path="/SignUp" component={SignUp} />
            <Route exact path="/SignIn" component={SignIn} />
            <Route path="/:id" exact component={FullCard} />
          </Switch>
        </BrowserRouter>
        </AuthProvider>
      </div>
    );
  }
}

export default App;
