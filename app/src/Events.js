import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import RecentIcon from 'material-ui/svg-icons/action/restore';
import CurrentIcon from 'material-ui/svg-icons/action/schedule';


import Layout from './Layout'


const Events = inject('store')( observer (class Events extends Component {
  
  constructor(props) {
    super(props)
    this.state = {listType:'current', selectedIndex:0}
  }

  select(index) {
    var t = 'current';
    if( index === 1 ) {
      t = 'recent';
    }
    this.setState({selectedIndex: index, listType: t});
  }

  changeType( type ) {
    this.setState({listType: type})
  }
  
  sortEvents() {
    var today = new Date();
    var events = [];
    if( this.state.listType === 'current' ) {
      events = this.props.store.events.filter( ev => 
        ev.date.getMonth() >= today.getMonth() &&
        ev.date.getDate() >= today.getDate()
      );
    }
    else {
      console.log( "Getting recent events" );
      events = this.props.store.events.filter( ev => 
        (ev.date.getMonth() === today.getMonth() &&
         ev.date.getDate() < today.getDate()) ||
        ev.date.getMonth() < today.getMonth()
      );
    }
    
    return events
  }

  render() {
    var events = this.sortEvents()
    return (
      <Layout>
        <div style={{marginLeft:10}}>
          <h3>Events</h3>
        </div>
        {events.slice().map(function(item, index) {
          return (
            <Card key={index}>
              <CardHeader title={item.name}
                          subtitle={item.date.toDateString()}
                          actAsExpander={true}
                          showExpandableButton={true}
              />
              <CardText expandable={true}>
                <ul>
                  <li>Location: Hybrid Audio HQ</li>
                  <li>Address: 123 Legatia Way</li>
                  <li>State: GA</li>
                  <li>Zip: 12345</li>
                </ul>
                <h4>Notes:</h4>
                <p>Big event, lots of stuff going on.</p>
              </CardText>
            </Card>
          )
        })}
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="Current"
            icon={<CurrentIcon />}
            onTouchTap={() => this.select(0)}
          />
          <BottomNavigationItem
            label="Recent"
            icon={<RecentIcon />}
            onTouchTap={() => this.select(1)}
          />
        </BottomNavigation>
      </Layout>
    )
  }
}))

export default Events
