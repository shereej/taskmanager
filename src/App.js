import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import DashboardContainer from './dashboard';
import Header from './header';
import BoardContainer from './board'
import './App.css';
import BrowserRouter from 'react-router-dom/BrowserRouter';


class App extends Component {
  render() {
    return (    

      <MuiThemeProvider>
        <div className="App">
           <header className="App-header">
            <Header />
           </header>
            <Switch>
              <Route exact path="/" component={DashboardContainer} />
              <Route path="/board" component={BoardContainer} />
            </Switch>
        </div>
      </MuiThemeProvider>
      
    );
  }
}

export default App;
