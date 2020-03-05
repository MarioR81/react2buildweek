import React from 'react';
import './App.css';
import Login from './components/Login';
import CardList from './components/CardList';
import PrivateRoute from './components/PrivateRoute';
import {Switch, Route} from 'react-router-dom';


function App() {
  return (
    <div className="App">
     
      <Switch>
        <PrivateRoute exact path = '/dash' component = {CardList}/>
        <Route path = '/' component = {Login}/>
      </Switch>
    </div>
  );
}

export default App;