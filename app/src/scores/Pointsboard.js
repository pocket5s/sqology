import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { observer, inject } from 'mobx-react';
import PointCard from './PointCard';

const Pointsboard = inject('store')( observer (class Pointsboard extends Component {

  constructor(props) {
    super(props)
    this.fullList = this.fullList.bind(this)
  }

  fullList() {
    this.props.history.push('/points')
  }

  render() {
    var season = this.props.season;
    return (
      <div style={{marginLeft:5}}>
        <h3>Season Standings</h3>
        <h5 style={{marginTop:-10}}>Top 5 Total Scores</h5>
        {season.slice(0,5).map(function(item, index) {
            return(<PointCard key={index} item={item} /> )
        })}
        <RaisedButton label="Full Standings List" fullWidth={true} onTouchTap={this.fullList} secondary={true}/>
      </div>
    )
  }
}))

export default Pointsboard
