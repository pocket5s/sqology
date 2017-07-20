import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { observer, inject } from 'mobx-react';
import Layout from './Layout';

const AllPoints = inject('store')( observer (class AllPoints extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    var season = this.props.store.standings
    return (
      <Layout>
      <div style={{marginLeft:5}}>
        <h3>Season Standings</h3>
        <h5 style={{marginTop:-10}}>Top 5 Total Scores</h5>
        {season.slice().map(function(item, index) {
            return(<Card key={index}><CardHeader  key={index} 
                         title={item.comp_name} 
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
      </div>
      </Layout>
    )
  }
}))

export default AllPoints
