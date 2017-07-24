import React from 'react';
import {Link} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import EventIcon from 'material-ui/svg-icons/action/event';
import RankIcon from 'material-ui/svg-icons/action/grade';
import NewEventIcon from 'material-ui/svg-icons/action/date-range';
import AddScoresIcon from 'material-ui/svg-icons/av/hearing';
import AddCompetitorIcon from 'material-ui/svg-icons/action/accessibility';

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
    const styles = {
      maxWidth:1024,
      margin:'0 auto'
    }
    return (
      <div>
        <AppBar title="SQOLOGY" onLeftIconButtonTouchTap={this.handleToggle} />
        <Drawer
          docked={false}
          width={225}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem leftIcon={<EventIcon />} containerElement={<Link to="/"/>}>Events</MenuItem>
          <MenuItem leftIcon={<RankIcon />}containerElement={<Link to="/standings"/>}>Standings</MenuItem>
          <Divider />
          <MenuItem leftIcon={<AddScoresIcon />}containerElement={<Link to="/addEventScore"/>}>Add Event Scores</MenuItem>
          <MenuItem leftIcon={<NewEventIcon />}containerElement={<Link to="/addEvent"/>}>Add Event</MenuItem>
          <MenuItem leftIcon={<AddCompetitorIcon />}containerElement={<Link to="/addCompetitor"/>}>Add Competitor</MenuItem>
        </Drawer>
        <div style={styles}>
        {this.props.children}
        </div>
      </div>
    )
  }
}
