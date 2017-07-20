import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';

class PointCard extends Component {

  render() {
    var item = this.props.item;

    return(<Card> <CardHeader  
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
  }
}

export default PointCard

