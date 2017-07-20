import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const EventResults = inject('store')( observer (class EventResults extends Component {
  
  constructor(props) {
    super(props);
    this.state = {results:null}
  }

  componentDidMount() {
  }

  findResults() {
    var result = null;
    if( this.props.scoresPosted === true ) {
      var results = this.props.store.eventResults.filter( res => res.event_id === this.props.eventId );
      if( results.length > 0 ) { 
        result = results[0]; 
      }
      else {
        try {
          this.props.store.loadEventResults( this.props.eventId )
        }
        catch( msg ) {
          console.log( "MSG: ", msg );
        }
      }
    }
    return result;
  }

  render() {
    var results = this.findResults();
    const colStyles = {
      paddingLeft:5,
      paddingRight:5
    }
    if( results !== null ) {
      return (
        <div>
        <Table selectable={false}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false} enableSelectAll={false}>
            <TableRow>
              <TableHeaderColumn style={colStyles}>Place</TableHeaderColumn>
              <TableHeaderColumn style={colStyles}>Name</TableHeaderColumn>
              <TableHeaderColumn style={colStyles}>IASCA</TableHeaderColumn>
              <TableHeaderColumn style={colStyles}>MECA</TableHeaderColumn>
              <TableHeaderColumn style={colStyles}>Distance</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
          {results.placings.map(function(item, index) {
            return(
            <TableRow key={index}>
              <TableRowColumn style={colStyles}>{index+1}</TableRowColumn>
              <TableRowColumn style={colStyles}>{item.comp_name}</TableRowColumn>
              <TableRowColumn style={colStyles}>{item.iasca}</TableRowColumn>
              <TableRowColumn style={colStyles}>{item.meca}</TableRowColumn>
              <TableRowColumn style={colStyles}>{item.distance}</TableRowColumn>
            </TableRow>
            )
          })}
          </TableBody>
        </Table>
        <ul>
          <li>Average IASCA score: <strong>{results.iasca}</strong></li>
          <li>Average MECA score: <strong>{results.meca}</strong></li>
          <li>Total distance traveled: <strong>{results.distance}</strong></li>
        </ul>
        </div>
      )
    }
    else if( this.props.scoresPosted === false ) {
      return ( <p>Scores not yet posted</p> )
    }
    else {
      return ( <p>Loading...</p> )
    }
  }
}));

export default EventResults;
