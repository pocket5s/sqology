import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import {List} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import LeaderboardItem from "./LeaderboardItem";

const Leaderboard = inject('store')( observer (class Leaderboard extends Component {
 
  constructor(props) {
    super(props)
    this.state = {season:null, year:2017, standings:null}
    this.fullList = this.fullList.bind(this)
  }

  fullList() {
    this.props.history.push('/leaderboard');
  }

  render() {
    return(
      <div style={{marginLeft:5}}>
        <h3>Leaderboard</h3>
        <h5 style={{marginTop:-10}}>Top 5 Average Scores</h5>
        <Paper zDepth={1}>
        <List>
          {this.props.leaderboard.slice(0,5).map( function(item, index) {
            return( <LeaderboardItem key={item.userId} item={item} /> )
          })}
        </List>
        </Paper>
        <div style={{width:'100%'}}>
          <RaisedButton label="Full Leaderboard List" onTouchTap={this.fullList} secondary={true} fullWidth={true}/>
        </div>
      </div>
    )
  }
}))

export default Leaderboard
