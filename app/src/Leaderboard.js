import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import {List} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';

import LeaderboardItem from "./LeaderboardItem";

const Leaderboard = inject('store')( observer (class Leaderboard extends Component {
 
  constructor(props) {
    super(props)
    this.state = {season:null, year:2017, standings:null}
    this.fullList = this.fullList.bind(this)
  }

  fullList() {
    this.props.history.push('/');
  }

  render() {
    return(
      <div style={{marginLeft:5}}>
        <h3>Leaderboard</h3>
        <h5 style={{marginTop:-10}}>Top 5 Average Scores</h5>
        <List>
          {this.props.leaderboard.slice(0,5).map( function(item, index) {
            return( <LeaderboardItem key={item.userId} item={item} /> )
          })}
        </List>
        <FlatButton label="Full Leaderboard List" fullWidth={true} onTouchTap={this.fullList} secondary={true}/>
      </div>
    )
  }
}))

export default Leaderboard
