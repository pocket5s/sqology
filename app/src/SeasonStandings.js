import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';

export default class SeasonStandings extends Component {
  
  constructor(props) {
    super(props)
  }

  render() {
    if( this.state.season != null ) {
      return (
        <div>
          <List>
            <ListItem primaryText="Competitor Name" secondaryText="592" />
          </List>
        </div>
      )
    }
    else {
      return (
        <p>Loading...</p>
      )
    }
  }
}
