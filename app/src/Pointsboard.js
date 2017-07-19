import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import { observer, inject } from 'mobx-react';

const Pointsboard = inject('store')( observer (class Pointsboard extends Component {

  render() {
    var season = this.props.season;
    return (
      <div style={{marginLeft:5}}>
        <h3>Season Standings</h3>
        <h5 style={{marginTop:-10}}>Top Total Scores</h5>
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
      </div>
    )
  }
}))

export default Pointsboard