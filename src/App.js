import React, { Component } from 'react';
//import { Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import CommentBox from './CommentBox';
import Header from './header';
//import BoardContainer from './board'
import './App.css';

class App extends Component {
  render() {
    return (    

      <MuiThemeProvider>
        <div className="App">
           <header className="App-header">
              <Header />
           </header>
           <CommentBox url='http://localhost:3001/todo/comments' pollInterval={2000} />
        </div>
      </MuiThemeProvider>
      
    );
  }
}

export default App;
