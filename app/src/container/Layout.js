import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import {Link} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import EventIcon from 'material-ui/svg-icons/action/event';
import RankIcon from 'material-ui/svg-icons/action/grade';
import NewEventIcon from 'material-ui/svg-icons/action/date-range';
import AddScoresIcon from 'material-ui/svg-icons/av/hearing';
import AddCompetitorIcon from 'material-ui/svg-icons/action/accessibility';
import LoginIcon from 'material-ui/svg-icons/social/person';

const Layout = inject('store')( observer (class Layout extends Component {

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
    if( this.props.store.user !== null ) {
      return (
        <div>
          <AppBar 
            title="SQOLOGY" 
            onLeftIconButtonTouchTap={this.handleToggle} 
            iconElementRight={<FlatButton href="http://sqology.org">SQOLOGY Home</FlatButton>}
          />
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
    else {
      return (
        <div>
          <AppBar 
            title="SQOLOGY" 
            onLeftIconButtonTouchTap={this.handleToggle}
            iconElementRight={<FlatButton href="http://sqology.org">SQOLOGY Home</FlatButton>}
          />
          <Drawer
            docked={false}
            width={225}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
          >
            <MenuItem leftIcon={<EventIcon />} containerElement={<Link to="/"/>}>Events</MenuItem>
            <MenuItem leftIcon={<RankIcon />}containerElement={<Link to="/standings"/>}>Standings</MenuItem>
            <Divider />
            <MenuItem leftIcon={<LoginIcon />}containerElement={<Link to="/login"/>}>Login</MenuItem>
          </Drawer>
          <div style={styles}>
          {this.props.children}
          </div>
        </div>
      )

    } 
  }
}));

export default Layout;
