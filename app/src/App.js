import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
    BrowserRouter,
    Route,
    Switch
   } from 'react-router-dom';
import SeasonStandings from './SeasonStandings';
import Events from './Events';

const App = inject('store')( observer (class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Events} />
            <Route path="/standings" component={SeasonStandings} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}));

export default App;
