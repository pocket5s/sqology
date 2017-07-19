import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import {List, ListItem} from 'material-ui/List';

const Leaderboard = inject('store')( observer (class Leaderboard extends Component {
 
  constructor(props) {
    super(props)
    this.state = {season:null, year:2017, standings:null}
  }

  componentDidMount() {
  }

  render() {
    return(
      <div style={{marginLeft:5}}>
        <h3>Leaderboard</h3>
        <h5 style={{marginTop:-10}}>Top Average Scores</h5>
        <List>
          {this.props.leaderboard.map( function(item, index) {
            var txt = item.name + " - " + item.score;
            return( <ListItem key={index} primaryText={txt} /> )
          })}
        </List>
      </div>
    )
  }
}))

export default Leaderboard
