import React, {Component} from 'react'

import { observer, inject } from 'mobx-react';
import {ListItem} from 'material-ui/List';

const LeaderboardItem = inject('store')( observer (class LeaderboardItem extends Component {
 
  constructor(props) {
    super(props)
    this.state = {}
    this.itemSelected = this.itemSelected.bind(this)
  }

  itemSelected( e ) {
    console.log( this.props.item.userId + " selected" );
  }

  render() {
    var item = this.props.item;
    var txt = item.comp_name + " - " + item.score;
    return(
       <ListItem primaryText={txt} onTouchTap={this.itemSelected} /> 
    )
  }
}))

export default LeaderboardItem
