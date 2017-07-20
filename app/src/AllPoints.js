import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import Layout from './Layout';
import PointCard from './PointCard';

const AllPoints = inject('store')( observer (class AllPoints extends Component {

  render() {
    var season = this.props.store.standings
    return (
      <Layout>
      <div style={{marginLeft:5}}>
        <h3>Season Standings</h3>
        {season.slice().map(function(item, index) {
            return( <PointCard key={index} item={item} /> )
        })}
      </div>
      </Layout>
    )
  }
}))

export default AllPoints
