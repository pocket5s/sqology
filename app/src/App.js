import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
    BrowserRouter,
    Route,
    Switch
   } from 'react-router-dom';
import SeasonStandings from './container/SeasonStandings';
import Events from './event/Events';
import Competitor from './Competitor';
import AllPoints from './scores/AllPoints';
import AllLeaderboard from './scores/AllLeaderboard';
import AddEventScore from './admin/AddEventScore';
import AddCompetitor from './admin/AddCompetitor';

const App = inject('store')( observer (class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Events} />
            <Route path="/standings" component={SeasonStandings} />
            <Route path="/points" component={AllPoints} />
            <Route path="/leaderboard" component={AllLeaderboard} />
            <Route path="/competitor/:id" component={Competitor} />
            <Route path="/addEventScore/:id?/:competitorId?" component={AddEventScore} />
            <Route path="/addCompetitor/:id?" component={AddCompetitor} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}));

export default App;
