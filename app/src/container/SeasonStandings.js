import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import Layout from './Layout';
import Leaderboard from '../scores/Leaderboard';
import Pointsboard from '../scores/Pointsboard';

const SeasonStandings = inject('store')( observer (class SeasonStandings extends Component {
  
  constructor(props) {
    super(props)
    this.state = {season:null, year:2017, standings:null}
  }

  componentDidMount() {
    //this.setState({standings: this.props.store.standings}); 
  }

  render() {
    var season = null;
    var leaderboard = this.props.store.leaderboard;

    var year = this.state.year;
    if( this.props.store.standings != null ) {
      /*
      var std = this.props.store.standings.filter( item => item.year === year )
      if( std.length > 0 ) {
        season = std[0].listing;
      } 
      */
      season = this.props.store.standings;
    }

    if( season != null ) {
      return (
        <Layout>
          <Leaderboard leaderboard={leaderboard} history={this.props.history} />
          <Pointsboard season={season} history={this.props.history}/>
        </Layout>
      )
    }
    else {
      return (
        <Layout>
        <p style={{marginLeft:10}}>Loading...</p>
        </Layout>
      )
    }
  }
}))

export default SeasonStandings
