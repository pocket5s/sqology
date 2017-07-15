import React from 'react';
import {Link} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import EventIcon from 'material-ui/svg-icons/action/event';
import RankIcon from 'material-ui/svg-icons/action/grade';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.state = {open: false};
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  render() {
    return (
      <div>
        <AppBar title="SQOLOGY" onLeftIconButtonTouchTap={this.handleToggle} />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem leftIcon={<EventIcon />} containerElement={<Link to="/"/>}>Events</MenuItem>
          <MenuItem leftIcon={<RankIcon />}containerElement={<Link to="/standings"/>}>Standings</MenuItem>
        </Drawer>
        {this.props.children}
      </div>
    )
  }
}
