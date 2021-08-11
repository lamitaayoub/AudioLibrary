import React, { Component } from 'react';
import classes from './App.css';
import Navigation from './components/UI/Navigation/Navigation'
import { BrowserRouter, Route } from 'react-router-dom';
import FullCard from './components/FullCard/FullCard';



class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <BrowserRouter>
          <Navigation />
          <Route path="/:id" exact component={FullCard} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
