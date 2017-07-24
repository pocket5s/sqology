import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';

import api from '../api';
import Layout from '../container/Layout';

const AddEventScore = inject('store')( observer (class AddEventScore extends Component {
 
  constructor(props) {
    super(props)
    var eventId = this.props.match.params.id;
    if( eventId ) {
      eventId = parseInt(eventId, 10);
    }
    var compId = this.props.match.params.competitorId;
    if( compId ) {
      compId = parseInt(compId, 10);
    }
    this.state = {eventId:eventId, 
                  competitorId:compId,
                  mecaScore:'', 
                  iascaScore:'', 
                  distance:'', 
                  mecaError:'', 
                  iascaError:'', 
                  distanceError:'',
                  snackbarOpen:false,
                  snackbarMessage:'Score saved. You may enter another',
                  compNames:[],
                  isValid:true
                }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.viewEvent= this.viewEvent.bind(this);
    this.updateName = this.updateName.bind(this);
    this.handleEventChange = this.handleEventChange.bind(this);
    this.handleCompetitorChange = this.handleCompetitorChange.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.resetFields = this.resetFields.bind(this);
    this.markCompleted = this.markCompleted.bind(this);
    this.addCompetitor = this.addCompetitor.bind(this);
    this.validateData = this.validateData.bind(this);
    this.props.store.loadCompetitorNames();
  }

  componentDidMount() {
    this.setState({compNames: this.props.store.competitorNames});
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({[name]:value});
  }

  validateData() {
    console.log( "Validating..." );
    var valid = true;
    if( isNaN(this.state.mecaScore) || (parseFloat(this.state.mecaScore) < 0 || parseFloat(this.state.mecaScore) > 100) ) {
      this.setState({mecaError:'Value must be between 0 and 100'});
      valid = false;
    }
    else {
      this.setState({mecaError:''});
    }
    if( isNaN(this.state.iascaScore) || (parseInt(this.state.iascaScore,10) < 0 || parseFloat(this.state.iascaScore) > 268) ) {
      this.setState({iascaError:'Value must be between 0 and 268'});
      valid = false;
    }
    else {
      this.setState({iascaError:''});
    }
    if( isNaN(this.state.distance) ) {
      this.setState({distanceError:'Value must be a number'});
      valid = false;
    }
    else {
      this.setState({distanceError:''});
    }

    console.log( "Setting valid state to ", valid );
    this.setState({isValid:valid});
  }

  handleEventChange(e, i, v) {
    this.setState({eventId:v})
  }

  handleCompetitorChange(e, i, v) {
    this.setState({competitorId:v})
  }

  updateName( chosen, index ) {
    this.setState({competitorId:chosen.value});
    this.setState({searchText:chosen.name});
  }

  handleRequestClose() {
    this.setState({snackbarOpen:false});
  }

  handleSubmit() {
    this.validateData();
    if( this.state.isValid ) {
      var data = {
        eventId:this.state.eventId,
        competitorId:this.state.competitorId,
        mecaScore:this.state.mecaScore,
        iascaScore:this.state.iascaScore,
        distance:this.state.distance
      };

      api.addEventScore( data, this.resetFields ).then( function(cb) {
      });
    }
    else {
      console.log( "Not valid" );
    }
  }

  resetFields( response ) {
    console.log( response );
      this.setState({
        eventId:this.state.eventId,
        competitorId:null,
        mecaScore:'',
        iascaScore:'',
        distance:'',
        searchText:'',
        snackbarOpen:true
      });
  }

  viewEvent() {
    this.props.history.push('/');
  }

  markCompleted() {
    this.props.store.markCompleted( this.state.eventId );
    this.setState({snackbarMessage:'Scores marked completed', snackbarOpen:true});
  }

  addCompetitor() {
    this.props.history.push('/addCompetitor/' + this.state.eventId);
  }

  render() {
    const style = {
      margin:5
    }
    return(
      <Layout>
      <div style={{marginLeft:5}}>
        <h3>Add Competitor Score</h3>
        <Paper zDepth={1}>
          <div style={{padding:'5px'}}>
            <SelectField
              value={this.state.eventId}
              floatingLabelText="Event"
              onChange={this.handleEventChange}
            >
              {this.props.store.events.map( function(item, index) {
                return (<MenuItem key={item.name} value={item.id} primaryText={item.name} />)
              })}
            </SelectField>
            <br />
            <SelectField
              value={this.state.competitorId}
              floatingLabelText="Competitor"
              onChange={this.handleCompetitorChange}
              >
              {this.props.store.competitorNames.map( function(item, index) {
                return( <MenuItem key={item.id} value={item.id} primaryText={item.name} />)
              })}
            </SelectField>
            <br />
            <TextField name="mecaScore" 
                       hintText="MECA Score" 
                       value={this.state.mecaScore} 
                       errorText={this.state.mecaError} 
                       onChange={this.handleChange}/>
            <br />
            <TextField name="iascaScore" 
                       hintText="IASCA Score" 
                       value={this.state.iascaScore} 
                       errorText={this.state.iascaError} 
                       onChange={this.handleChange} />
            <br />
            <TextField name="distance" 
                       hintText="Distance" 
                       value={this.state.distance} 
                       errorText={this.state.distanceError} 
                       onChange={this.handleChange} />
            <br />
          </div>
        </Paper>
        <div style={{width:'100%', marginTop:5}}>
          <RaisedButton label="Save" style={style} onTouchTap={this.handleSubmit} secondary={true} /> 
          <RaisedButton label="Event Completed" style={style} onTouchTap={this.markCompleted} primary={true}/> 
          <RaisedButton label="Done" style={style} onTouchTap={this.addCompetitor} /> 
          <RaisedButton label="Add Competitor" style={style} onTouchTap={this.addCompetitor} /> 
        </div>
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMessage}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
      </Layout>
    )
  }
}))

export default AddEventScore
