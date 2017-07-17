import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import { observer, inject } from 'mobx-react';

import Layout from './Layout';

const SeasonStandings = inject('store')( observer (class SeasonStandings extends Component {
  
  constructor(props) {
    super(props)
    this.state = {season:null, year:2017, standings:null}
  }

  componentDidMount() {
    //this.setState({standings: this.props.store.standings}); 
  }

  render() {
    var season = null;
    
    var year = this.state.year;
    if( this.props.store.standings != null ) {
      var std = this.props.store.standings.filter( item => item.year === year )
      if( std.length > 0 ) {
        season = std[0].listing;
      } 
    }

    if( season != null ) {
      return (
        <Layout>
          <div style={{marginLeft:5}}>
            <h3>Season Standings</h3>
          </div>
          
            {season.slice().map(function(item, index) {
                return(<Card key={index}><CardHeader  key={index} 
                             title={item.name} 
                             subtitle={item.totalScore}
                             actAsExpander={true}
                             showExpandableButton={true}/>
                      <CardText expandable={true}>
                        <span>Points Breakdown</span>
                        <ul>
                          <li>IASCA: {item.iasca}</li>
                          <li>MECA: {item.meca}</li>
                          <li>Distance: {item.distance}</li>
                        </ul>
                      </CardText>       
                      </Card>)
            })}
         
        </Layout>
      )
    }
    else {
      return (
        <Layout>
        <p style={{marginLeft:10}}>Loading...</p>
        </Layout>
      )
    }
  }
}))

export default SeasonStandings
