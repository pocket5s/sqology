import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import {List} from 'material-ui/List';

import Layout from './Layout';
import LeaderboardItem from "./LeaderboardItem";

const AllLeaderboard = inject('store')( observer (class AllLeaderboard extends Component {
 
  constructor(props) {
    super(props)
    this.state = {season:null, year:2017, standings:null}
  }

  render() {
    var leaderboard = this.props.store.leaderboard;
    return(
      <Layout>
      <div style={{marginLeft:5}}>
        <h3>Leaderboard</h3>
        <List>
          {leaderboard.slice().map( function(item, index) {
            return( <LeaderboardItem key={item.userId} item={item} /> )
          })}
        </List>
      </div>
      </Layout>
    )
  }
}))

export default AllLeaderboard
