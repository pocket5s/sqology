import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import Layout from './Layout'

const Events = inject('store')( observer (class Events extends Component {
  
  render() {
    var events = this.props.store.events;
    return (
      <Layout>
        <div style={{marginLeft:10}}>
          <h3>Events</h3>
        </div>
        {events.slice().map(function(item, index) {
          return (
            <Card key={index}>
              <CardHeader title={item.name}
                          subtitle={item.date}
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
      </Layout>
    )
  }
}))

export default Events
